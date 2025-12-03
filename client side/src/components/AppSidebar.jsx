import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Circle } from 'lucide-react'

const items = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Services",
    url: "/services",
  },
  {
    title: "Search",
    url: "#",
  },
  {
    title: "Settings",
    url: "#",
  },
]
const AppSidebar = () => {
  return (
    <div>
      <Sidebar className={"bg-gray-100/50"}>
        <SidebarContent className={"mt-20 bg-gray-100/50  "}>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        {/* <item.icon /> */}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            <SidebarGroupLabel>Filter</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton >
                  <a href="#" className='flex gap-2 items-center'>
                    <Circle size={10} className='bg-black rounded-full' /><span>Blogs</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            </SidebarGroupContent>

          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}

export default AppSidebar