import BottomBar from "@/components/bottom-bar";
import Navbar from "@/components/navbar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Coffee, LogIn, LogOut } from "lucide-react";
import React from "react";

function page() {
  return (
    <main className="bg-surface text-on-surface min-h-screen pb-32">
      <section className="max-w-md mx-auto px-6 pt-24 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">
              Histórico
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
                38h 45m
              </span>
            </div>
            <div className="text-right">
              <span className="text-on-surface-variant text-[11px] font-bold uppercase tracking-widest block mb-1">
                Overtime
              </span>
              <span className="text-lg font-bold text-emerald-500">
                +2h 15m
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
        </div>
        <div className="rounded-2xl ">
          <div className="space-y-10 ">
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-none w-12 h-14 bg-blue-500 flex flex-col items-center justify-center rounded-xl border border-outline-variant/10">
                  <span className="text-[10px] font-bold text-white uppercase">
                    Wed
                  </span>
                  <span className="text-lg font-extrabold text-white">22</span>
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
                        08:42 AM
                      </span>
                    </div>
                  </div>
                  <div className="text-center bg-emerald-500 px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-emerald-100">
                      8h 12m
                    </span>
                  </div>
                  <div className="space-y-1 text-right">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Saída
                    </span>
                    <div className="flex items-center gap-2 justify-end">
                      <span className="font-bold text-on-surface">
                        05:24 PM
                      </span>
                      <LogOut />
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Coffee />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">
                        Parada
                      </span>
                      <span className="text-xs font-semibold text-on-surface">
                        12:30 PM - 01:00 PM
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant">
                    30m
                  </span>
                </div>
              </div>
            </section>
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-none w-12 h-14 bg-blue-500 flex flex-col items-center justify-center rounded-xl border border-outline-variant/10">
                  <span className="text-[10px] font-bold text-white uppercase">
                    Wed
                  </span>
                  <span className="text-lg font-extrabold text-white">23</span>
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
                        08:42 AM
                      </span>
                    </div>
                  </div>
                  <div className="text-center bg-emerald-500 px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-emerald-100">
                      8h 12m
                    </span>
                  </div>
                  <div className="space-y-1 text-right">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Saída
                    </span>
                    <div className="flex items-center gap-2 justify-end">
                      <span className="font-bold text-on-surface">
                        05:24 PM
                      </span>
                      <LogOut />
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Coffee />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">
                        Parada
                      </span>
                      <span className="text-xs font-semibold text-on-surface">
                        12:30 PM - 01:00 PM
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant">
                    30m
                  </span>
                </div>
              </div>
            </section>
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-none w-12 h-12 bg-surface-container-lowest flex flex-col items-center justify-center rounded-xl border border-outline-variant/10">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                    Mon
                  </span>
                  <span className="text-lg font-extrabold text-on-surface">
                    20
                  </span>
                </div>
                <div className="h-[1px] flex-grow bg-surface-container"></div>
              </div>
              <div className="bg-surface-dim/40 border border-dashed border-outline-variant/30 rounded-xl p-5 flex items-center justify-center">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span
                    className="material-symbols-outlined"
                    data-icon="event_busy"
                  >
                    event_busy
                  </span>
                  <span className="text-sm font-semibold italic">
                    Public Holiday: Victoria Day
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
