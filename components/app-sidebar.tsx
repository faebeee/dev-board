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
} from "@/components/ui/sidebar"
import {Home, User} from "lucide-react"
import {UserInfo} from "./user/user-info"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },

  {
    title: "Personal",
    url: "/me",
    icon: User,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <UserInfo/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup/>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon/>
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup/>
      </SidebarContent>
      <SidebarFooter/>
    </Sidebar>
  )
}