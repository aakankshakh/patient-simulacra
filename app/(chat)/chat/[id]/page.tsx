import { CoreMessage } from 'ai';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { auth } from '@/app/(auth)/auth';
import { Chat as PreviewChat } from '@/components/custom/chat';
import { getChatById } from '@/db/queries';
import { Chat } from '@/db/schema';
import { DEFAULT_MODEL_NAME, models } from '@/lib/model';
import { convertToUIMessages } from '@/lib/utils';
import { DEFAULT_PATIENT_NAME, patients } from '@/lib/patients';

export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const { id } = params;
  const chatFromDb = await getChatById({ id });

  if (!chatFromDb) {
    notFound();
  }

  // type casting
  const chat: Chat = {
    ...chatFromDb,
    messages: convertToUIMessages(chatFromDb.messages as Array<CoreMessage>),
  };

  const session = await auth();

  if (!session || !session.user) {
    return notFound();
  }

  if (session.user.id !== chat.userId) {
    return notFound();
  }

  const cookieStore = await cookies();
  const modelValue = cookieStore.get('model')?.value;
  const selectedModelName =
    models.find((m) => m.name === modelValue)?.name || DEFAULT_MODEL_NAME;
  const patientValue = cookieStore.get('patient')?.value;
  const selectedPatientID =
    patients.find((m) => m.name === patientValue)?.name || DEFAULT_PATIENT_NAME;
  console.log(selectedPatientID);

  return (
    <PreviewChat
      id={chat.id}
      initialMessages={chat.messages}
      selectedModelName={selectedModelName}
      selectedPatientID={selectedPatientID}
    />
  );
}
