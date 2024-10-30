import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/custom/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { auth } from '../(auth)/auth';
import { NotesSidebar } from '@/components/custom/notes-sidebar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);

  return (
    <SidebarProvider>
      <AppSidebar user={session?.user} />
      <SidebarInset>{children}</SidebarInset>
      <NotesSidebar user={session?.user} />
    </SidebarProvider>
  );
}
