"use client";
import * as React from "react";

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
  SidebarRail,
} from "@/components/ui/sidebar";
import { VersionSwitcher } from "./version-switcher";
import { NavUser } from "./nav-user";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function getNavItemsByRole(role: string | undefined) {
  const allItems = [
    {
      title: "Principal",
      items: [
        { title: "Dashboard", url: "/dashboard", roles: ["admin",] },
        { title: "Inicio", url: "/dashboard/inicio", roles: [ "employee"] },
        { title: "Funcionários", url: "/dashboard/funcionarios", roles: ["admin"] },
      ],
    },
    {
      title: "Gestão de ponto",
      items: [
         { title: "Bater ponto", url: "/dashboard/ponto", roles: ["admin", "employee"] },
        { title: "Aprovações", url: "/dashboard/aprovacoes", roles: ["admin"] },
        { title: "Histórico", url: "/dashboard/historico", roles: ["admin", "employee"] },
        { title: "Revisões", url: "/dashboard/revisoes", roles: ["employee"] },
      ],
    },
    {
      title: "Configurações",
      items: [
        { title: "Perfil", url: "/dashboard/perfil", roles: ["admin", "employee"] },
      ],
    },
  ];

  if (!role) return [];

  return allItems
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.roles.includes(role)),
    }))
    .filter((group) => group.items.length > 0);
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUser = useQuery(api.employees.currentUser);
  const role = currentUser?.role;

  const isActive = (url: string) => {
    return window.location.pathname === url;
  };

  const navMain = getNavItemsByRole(role);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={["1.0.0"]}
          defaultVersion={"1.0.0"}
        />
      </SidebarHeader>
      <SidebarContent>
        {navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      className={cn(
                        "",
                        isActive(item.url) && "data-active:bg-primary data-active:text-white",
                      )}
                    >
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
