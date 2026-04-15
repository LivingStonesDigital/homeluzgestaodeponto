"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Home,
  Clock,
  ClipboardList,
  Users,
  RotateCcw,
  User,
  List,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItemsByRole: Record<
  string,
  { icon: React.ReactNode; label: string; href: string }[]
> = {
  admin: [
    { icon: <Home className="w-5 h-5" />, label: "Home", href: "/dashboard" },
    // {
    //   icon: <Clock className="w-5 h-5" />,
    //   label: "Ponto",
    //   href: "/dashboard/ponto",
    // },
    {
      icon: <List className="w-5 h-5" />,
      label: "Historico",
      href: "/dashboard/historico",
    },
    {
      icon: <ClipboardList className="w-5 h-5" />,
      label: "Aprovar",
      href: "/dashboard/aprovacoes",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Equipe",
      href: "/dashboard/funcionarios",
    },
     {
      icon: <User className="w-5 h-5" />,
      label: "Perfil",
      href: "/dashboard/perfil",
    },
  ],
  employee: [
    { icon: <Home className="w-5 h-5" />, label: "Home", href: "/dashboard" },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Ponto",
      href: "/dashboard/ponto",
    },
    {
      icon: <List className="w-5 h-5" />,
      label: "Historico",
      href: "/dashboard/meuhistorico",
    },
    {
      icon: <RotateCcw className="w-5 h-5" />,
      label: "Revisões",
      href: "/dashboard/revisoes",
    },
    {
      icon: <User className="w-5 h-5" />,
      label: "Perfil",
      href: "/dashboard/perfil",
    },
  ],
};

export default function BottomBar() {
  const pathname = usePathname();
  const currentUser = useQuery(api.employees.currentUser);
  const role = currentUser?.role;

  const items = role ? navItemsByRole[role] || navItemsByRole.employee : [];

  return (
    <nav className="sticky bottom-0  w-full bg-white/95 starting:z-50 ">
      <div className="flex justify-around items-center px-2 py-3">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <span
                className={
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-500"
                }
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
