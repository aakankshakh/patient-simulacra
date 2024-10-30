import { convertToCoreMessages, Message, streamText } from 'ai';
import { z } from 'zod';

import { customModel } from '@/ai';
import { auth } from '@/app/(auth)/auth';
import { deleteChatById, getChatById, saveChat } from '@/db/queries';
import { Model, models } from '@/lib/model';
import { patients } from '@/lib/patients';

export async function POST(request: Request) {
  const {
    id,
    messages,
    model,
    patientID
  }: { id: string; messages: Array<Message>; model: Model['name']; patientID: string } =
    await request.json();

  const session = await auth();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!models.find((m) => m.name === model)) {
    return new Response('Model not found', { status: 404 });
  }

  const patient = patients.find((m) => m.name === patientID)

  if (!patient) {
    return new Response('Patient not found', { status: 404 });
  }

  const coreMessages = convertToCoreMessages(messages);

  const patientDescription = patient.description


  const systemPrompt =
`You are a patient at a hospital with the following information:

${patientDescription}

Have a conversation with your healthcare provider, describing your symptoms based on the medical condition. You have not been diagnosed with your medical condition yet, only use it to describe symptoms. Only respond using plain text and with quick answers.
`
;


  const result = await streamText({
    model: customModel(model),
    system: systemPrompt,
    messages: coreMessages,
    maxSteps: 5,
    onFinish: async ({ responseMessages }) => {
      if (session.user && session.user.id) {
        try {
          await saveChat({
            id,
            messages: [...coreMessages, ...responseMessages],
            userId: session.user.id,
          });
        } catch (error) {
          console.error('Failed to save chat');
        }
      }
    },
    experimental_telemetry: {
      isEnabled: true,
      functionId: 'stream-text',
    },
  });

  return result.toDataStreamResponse({});
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Not Found', { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    await deleteChatById({ id });

    return new Response('Chat deleted', { status: 200 });
  } catch (error) {
    return new Response('An error occurred while processing your request', {
      status: 500,
    });
  }
}
