import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getConfig } from '@/lib/get-config';
import { SignOutButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { FC } from 'react';

export const AppSidebar: FC = async () => {
  const dashboards = await getConfig();

  return (
    <Sidebar>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup/>
        <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {dashboards.map((link) => (
              <SidebarMenuItem key={link.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/${link.id}`}>
                    <span>{link.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup/>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <UserButton/>
          </div>
        </div>
        <div className="mt-3 px-2 space-y-1">
          <div className="block w-full text-left px-3 py-2">
            <SignOutButton/>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};