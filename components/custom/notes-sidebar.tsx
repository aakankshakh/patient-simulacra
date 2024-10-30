'use client';

import Link from 'next/link';
import { type User } from 'next-auth';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { Textarea } from '../ui/textarea';

export function NotesSidebar({ user }: { user: User | undefined }) {
  const { setOpenMobile } = useSidebar();

  const pathName = usePathname();
  if (pathName == '/') {
    return null;
  }

  return (
    <Sidebar
      side="right"
      collapsible="none"
      className="group-data-[side=right]:border-r-0 h-screen"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" onClick={() => setOpenMobile(false)}>
                <span className="text-lg font-semibold font-mono tracking-tighter">
                  Notes
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Textarea
            rows={35}
            placeholder="Type in your doctors notes here..."
          ></Textarea>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

// TO DO: make this look better on phone screen (h-screen is not fire)
