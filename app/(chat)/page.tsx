import { cookies } from 'next/headers';

import { Chat } from '@/components/custom/chat';
import { DEFAULT_MODEL_NAME, models } from '@/lib/model';
import { generateUUID } from '@/lib/utils';
import { DEFAULT_PATIENT_NAME, patients } from '@/lib/patients';

export default async function Page() {
  const id = generateUUID();

  const cookieStore = await cookies();
  const modelValue = cookieStore.get('model')?.value;
  const selectedModelName =
    models.find((m) => m.name === modelValue)?.name || DEFAULT_MODEL_NAME;
  const patientValue = cookieStore.get('patient')?.value;
  const selectedPatientID =
    patients.find((m) => m.name === patientValue)?.name || DEFAULT_PATIENT_NAME;


  return (
    <Chat
      key={id}
      id={id}
      initialMessages={[]}
      selectedModelName={selectedModelName}
      selectedPatientID={selectedPatientID}
    />
  );
}
