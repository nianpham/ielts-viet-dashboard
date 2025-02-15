"use client"

import * as React from "react"
import {
    LogOut,
    GalleryHorizontal,
} from "lucide-react"
import { NavProjects } from "./nav-projects"
import { TeamSwitcher } from "./team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import Cookies from "js-cookie";
import { ROUTES } from "@/utils/route"

const data = {
    projects: [
        {
            name: "Slider",
            url: "?tab=slider",
            tab: "slider",
            icon: GalleryHorizontal,
        },
    ],
}

export function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {

    const handleLogOut = () => {
        Cookies.remove("isLogin");
        window.location.href = ROUTES.LOGIN
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter
                className="flex flex-row justify-center gap-3 text-[16px] cursor-pointer pb-10 text-orange-700 font-semibold"
                onClick={() => { handleLogOut() }}
            >
                <LogOut /> Đăng xuất
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
