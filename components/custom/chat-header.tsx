import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SidebarToggle } from '@/components/custom/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { BetterTooltip } from '@/components/ui/tooltip';
import { Patient } from '@/lib/patients';
import { NotesToggle } from './notes-toggle';
import { PatientSelector } from './patient-selector';

export function ChatHeader({
  selectedPatientID,
}: {
  selectedPatientID: Patient['name'];
}) {
  return (
    <header className="flex h-16 sticky top-0 bg-background md:h-12 items-center px-2 md:px-2 z-10">
      <SidebarToggle />
      <BetterTooltip content="New Chat">
        <Button
          variant="ghost"
          className="w-auto md:size-8 [&>svg]:!size-5 md:[&>svg]:!size-4 pl-2 md:p-0 order-2 md:order-1 ml-auto md:ml-0 md:hidden group-data-[state=collapsed]/sidebar-wrapper:flex"
          asChild
        >
          <Link href="/">
            <Plus />
            <span className="md:sr-only">New Chat</span>
          </Link>
        </Button>
      </BetterTooltip>
      <PatientSelector
        selectedPatientID={selectedPatientID}
        className="order-1 md:order-2"
      />
      <NotesToggle className="absolute top-0 right-0" /> 
    </header>
  );
}

// TO DO: NotesToggle positioning is weird and needs to change!