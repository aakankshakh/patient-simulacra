'use client';

import { Check, ChevronDown } from 'lucide-react';
import { startTransition, useMemo, useOptimistic, useState } from 'react';

import { savePatient } from '@/app/(chat)/actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Patient, patients } from '@/lib/patients';
import { useRouter } from 'next/navigation';

export function PatientSelector({
  selectedPatientID,
  className,
}: {
  selectedPatientID: Patient['name'];
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [optimisticPatientID, setOptimisticPatientID] =
    useOptimistic(selectedPatientID);

  const selectPatient = useMemo(
    () => patients.find((patient) => patient.name === optimisticPatientID),
    [optimisticPatientID]
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground md:h-8 [&>svg]:!size-5 md:[&>svg]:!size-4',
          className
        )}
      >
        <Button variant="ghost">
          {selectPatient?.label}
          <ChevronDown className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[300px]">
        {patients.map((patient) => (
          <DropdownMenuItem
            key={patient.name}
            onSelect={() => {
              setOpen(false);

              startTransition(() => {
                setOptimisticPatientID(patient.name);
                savePatient(patient.name);
                router.push('/');
              });
            }}
            className="gap-4 group/item"
            data-active={patient.name === optimisticPatientID}
          >
            <div className="flex flex-col gap-1 items-start">
              {patient.label}
            </div>
            <Check className="size-4 ml-auto opacity-0 group-data-[active=true]/item:opacity-100" />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
