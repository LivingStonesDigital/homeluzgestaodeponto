"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Coffee, LogIn, LogOut, ArrowUpRight, ArrowDownLeft, Sunset } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

type TimeType = "work_start" | "lunch_start" | "lunch_end" | "work_end";

function calculateDailyHours(records: any[]): string {
  let totalMs = 0;
  let lastEntry = null;
  
  const sorted = [...records].sort((a, b) => a.timestamp - b.timestamp);
  
  for (const record of sorted) {
    if (record.type === "work_start") {
      lastEntry = record.timestamp;
    } else if (record.type === "work_end" && lastEntry) {
      totalMs += record.timestamp - lastEntry;
      lastEntry = null;
    }
  }
  
  const hours = Math.floor(totalMs / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}

function calculateWeeklyTotal(recordsByDate: any[]) {
  let totalMs = 0;
  
  for (const dayGroup of recordsByDate) {
    const sorted = [...dayGroup.records].sort((a, b) => a.timestamp - b.timestamp);
    let lastEntry = null;
    
    for (const record of sorted) {
      if (record.type === "work_start") {
        lastEntry = record.timestamp;
      } else if (record.type === "work_end" && lastEntry) {
        totalMs += record.timestamp - lastEntry;
        lastEntry = null;
      }
    }
  }
  
  const hours = Math.floor(totalMs / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}

function calculateOvertime(weeklyHours: number) {
  const regularHours = 40;
  const diff = weeklyHours - regularHours;
  if (diff > 0) {
    const hours = Math.floor(diff);
    return `+${hours}h ${Math.floor((diff - hours) * 60)}m`;
  }
  return "0h 0m";
}

function page() {
  const myTimeRecords = useQuery(api.timeRecords.myTimeRecords, { limit: 30 });
  const currentUser = useQuery(api.employees.currentUser);

  const weeklyTotal = myTimeRecords ? calculateWeeklyTotal(myTimeRecords) : "0h 0m";
  const weeklyHoursNum = myTimeRecords 
    ? myTimeRecords.reduce((acc: number, day: any) => {
        const hours = calculateDailyHours(day.records).replace("h", "").trim();
        return acc + parseFloat(hours || "0");
      }, 0)
    : 0;
  const overtime = calculateOvertime(weeklyHoursNum);

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <main className="bg-surface text-on-surface min-h-screen pb-32">
      <section className="max-w-md mx-auto px-6 pt-14 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">
              Meu Histórico
            </h1>
            <p className="text-muted-foreground capitalize text-sm font-medium">
              {format(new Date(), "MMMM yyyy", { locale: ptBR })}
            </p>
          </div>
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/15 py-2.5 px-4 rounded-xl shadow-sm hover:bg-surface-container transition-colors">
            <Calendar />
            <span className="text-on-surface text-sm font-semibold">
              Filtro
            </span>
          </button>
        </div>

        <div className="relative overflow-hidden mb-8 p-6 rounded-xl bg-blue-500/5 border border-blue-500/10 backdrop-blur-md">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-blue-500 text-[11px] font-bold uppercase tracking-widest block mb-1">
                Weekly Total
              </span>
              <span className="text-3xl font-extrabold text-blue-500 tracking-tight">
                {weeklyTotal}
              </span>
            </div>
            <div className="text-right">
              <span className="text-on-surface-variant text-[11px] font-bold uppercase tracking-widest block mb-1">
                Overtime
              </span>
              <span className="text-lg font-bold text-emerald-500">
                {overtime}
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
        </div>

        <div className="rounded-2xl">
          <div className="space-y-10 ">
            {myTimeRecords && myTimeRecords.length > 0 ? (
              myTimeRecords.map((dayGroup: any) => {
                const dailyHours = calculateDailyHours(dayGroup.records);
                const dayOfWeek = format(new Date(dayGroup.date), "EEEEEE", { locale: ptBR });
                const dayNumber = format(new Date(dayGroup.date), "d");
                
                const workStart = dayGroup.records.find((r: any) => r.type === "work_start");
                const workEnd = dayGroup.records.find((r: any) => r.type === "work_end");
                const lunchStart = dayGroup.records.find((r: any) => r.type === "lunch_start");
                const lunchEnd = dayGroup.records.find((r: any) => r.type === "lunch_end");

                return (
                  <section key={dayGroup.date}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-none w-12 h-14 bg-blue-500 flex flex-col items-center justify-center rounded-xl border border-outline-variant/10">
                        <span className="text-[10px] font-bold text-white uppercase">
                          {dayOfWeek}
                        </span>
                        <span className="text-lg font-extrabold text-white">
                          {dayNumber}
                        </span>
                      </div>
                      <div className="h-[1px] flex-grow bg-black/20"></div>
                    </div>
                    <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm space-y-5">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                            Entrada
                          </span>
                          <div className="flex items-center gap-2">
                            <LogIn />
                            <span className="font-bold text-on-surface">
                              {workStart ? format(new Date(workStart.timestamp), "HH:mm") : "--:--"}
                            </span>
                          </div>
                        </div>
                        <div className={cn(
                          "text-center px-3 py-1 rounded-full",
                          dayGroup.records.some((r: any) => r.status === "approved") 
                            ? "bg-emerald-500" 
                            : dayGroup.records.some((r: any) => r.status === "rejected")
                              ? "bg-red-500"
                              : "bg-amber-500"
                        )}>
                          <span className="text-sm font-bold text-white">
                            {dailyHours}
                          </span>
                        </div>
                        <div className="space-y-1 text-right">
                          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                            Saída
                          </span>
                          <div className="flex items-center gap-2 justify-end">
                            <span className="font-bold text-on-surface">
                              {workEnd ? format(new Date(workEnd.timestamp), "HH:mm") : "--:--"}
                            </span>
                            <LogOut />
                          </div>
                        </div>
                      </div>
                      {(lunchStart || lunchEnd) && (
                        <div className="bg-surface-container-low rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Coffee />
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">
                                Parada
                              </span>
                              <span className="text-xs font-semibold text-on-surface">
                                {lunchStart ? format(new Date(lunchStart.timestamp), "HH:mm") : "--:--"} - {lunchEnd ? format(new Date(lunchEnd.timestamp), "HH:mm") : "--:--"}
                              </span>
                            </div>
                          </div>
                          {lunchStart && lunchEnd && (
                            <span className="text-xs font-bold text-on-surface-variant">
                              {Math.round((lunchEnd.timestamp - lunchStart.timestamp) / 60000)}m
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </section>
                );
              })
            ) : (
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-none w-12 h-12 bg-surface-container-lowest flex flex-col items-center justify-center rounded-xl border border-outline-variant/10">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                      {format(new Date(), "EEE", { locale: ptBR })}
                    </span>
                    <span className="text-lg font-extrabold text-on-surface">
                      {format(new Date(), "d")}
                    </span>
                  </div>
                  <div className="h-[1px] flex-grow bg-surface-container"></div>
                </div>
                <div className="bg-surface-dim/40 border border-dashed border-outline-variant/30 rounded-xl p-5 flex items-center justify-center">
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-semibold italic">
                      Nenhum registro encontrado
                    </span>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;