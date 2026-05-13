"use client";

import React from "react";
import { api } from "@/convex/_generated/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "convex/react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Bell, Check } from "lucide-react";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  meta: string;
  tone: "blue" | "amber";
};

function formatDate(dateStr: string) {
  try {
    return format(parseISO(dateStr), "dd 'de' MMMM, yyyy", { locale: ptBR });
  } catch {
    return dateStr;
  }
}

function Notification() {
  const currentUser = useQuery(api.employees.currentUser);
  const isAdmin = currentUser?.role === "admin";
  const isEmployee = currentUser?.role === "employee";
  const pendingRecords = useQuery(
    api.timeRecords.pendingRecords,
    isAdmin ? {} : "skip",
  );
  const openCorrections = useQuery(
    api.timeRecords.openCorrections,
    isAdmin ? {} : "skip",
  );
  const employeeRevisions = useQuery(
    api.timeRecords.myTimeRecordsWithRevision,
    isEmployee ? {} : "skip",
  );

  const groupedData =
    pendingRecords?.reduce((acc: Record<string, any>, record: any) => {
      const key = `${record.date}-${record.userId}`;
      if (!acc[key]) {
        acc[key] = {
          date: record.date,
          userId: record.userId,
          userName: record.user?.name || "Usuário",
          records: [],
        };
      }
      acc[key].records.push(record);
      return acc;
    }, {}) || {};

  const pendingGroups = Object.values(groupedData);
  const revisionRecords =
    employeeRevisions?.flatMap((dayGroup: any) => dayGroup.records) || [];
  const notificationCount =
    (openCorrections?.length || 0) + pendingGroups.length + revisionRecords.length;
  const notificationItems: NotificationItem[] = [
    ...(openCorrections ?? []).map((correction: any) => ({
      id: correction._id,
      title: correction.user?.name || "Usuário",
      description: correction.reason,
      meta: correction.record?.date
        ? `Revisão em ${formatDate(correction.record.date)}`
        : "Solicitação de revisão",
      tone: "blue" as const,
    })),
    ...pendingGroups.map((group: any) => ({
      id: `${group.date}-${group.userId}`,
      title: group.userName,
      description: `${group.records.length} registro${group.records.length > 1 ? "s" : ""} pendente${group.records.length > 1 ? "s" : ""}`,
      meta: formatDate(group.date),
      tone: "amber" as const,
    })),
    ...revisionRecords.map((record: any) => ({
      id: record._id,
      title: "Revisão solicitada",
      description: record.note || "Seu gestor solicitou revisão deste ponto.",
      meta: `Ponto de ${formatDate(record.date)}`,
      tone: "blue" as const,
    })),
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-container-lowest text-on-surface shadow-sm transition-colors hover:bg-surface-container"
          type="button"
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1.5 text-[10px] font-extrabold text-white ring-2 ring-surface">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-2">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notificações</span>
          <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">
            {notificationCount}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notificationItems.length > 0 ? (
          notificationItems.map((item) => (
            <DropdownMenuItem className="items-start gap-3 py-3" key={item.id}>
              <span
                className={`mt-1 h-2.5 w-2.5 rounded-full ${
                  item.tone === "blue" ? "bg-blue-500" : "bg-amber-500"
                }`}
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-on-surface">
                  {item.title}
                </span>
                <span className="block text-xs font-medium text-on-surface-variant">
                  {item.description}
                </span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-outline">
                  {item.meta}
                </span>
              </span>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="px-3 py-8 text-center">
            <Check className="mx-auto mb-2 h-6 w-6 text-primary" />
            <p className="text-sm font-semibold text-on-surface">
              Nenhuma notificação
            </p>
            <p className="mt-1 text-xs text-on-surface-variant">
              Não há solicitações pendentes.
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Notification;
