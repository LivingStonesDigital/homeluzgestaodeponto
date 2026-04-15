"use client";
import BottomBar from "@/components/bottom-bar";
import Navbar from "@/components/navbar";
import { useQuery } from "convex/react";
import { Clock, LucideFingerprint, Pin } from "lucide-react";
import { api } from "../../../../convex/_generated/api";

function page() {
  const currentUser = useQuery(api.employees.currentUser);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-surface font-body text-on-surface min-h-screen pb-32">
      <section className="pt-12 px-6 max-w-md mx-auto space-y-8">
        <section className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-surface-container-lowest p-6 rounded-3xl flex items-center justify-between">
            <div>
              <p className="text-on-surface-variant text-sm font-medium mb-1 font-label">
                Horas Trabalhadas
              </p>
              <p className="text-3xl font-extrabold text-blue-500 font-headline">
                06:42
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500">
              <Clock className="w-6 h-6"></Clock>
            </div>
          </div>
          <div className="bg-surface-container-low p-5 rounded-3xl">
            <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2 font-label">
              Horas Extras
            </p>
            <p className="text-xl font-bold text-tertiary font-headline">
              +01:15
            </p>
          </div>
          <div className="bg-surface-container-low p-5 rounded-3xl">
            <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2 font-label">
              Faltas
            </p>
            <p className="text-xl font-bold text-red-500   font-headline">00:00</p>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center py-10 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <svg height="280" viewBox="0 0 100 100" width="280">
              <circle
                className="text-amber-400"
                cx="50"
                cy="50"
                fill="none"
                r="45"
                stroke="currentColor"
                stroke-width="8"
              ></circle>
              <circle
                className="text-amber-400"
                cx="50"
                cy="50"
                fill="none"
                r="45"
                stroke="currentColor"
                stroke-dasharray="283"
                stroke-dashoffset="70"
                stroke-width="8"
              ></circle>
            </svg>
          </div>
          <div className="relative z-10 group">
            <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full blur-2xl group-active:scale-110 transition-transform"></div>
            <button className="relative w-56 h-56 rounded-full bg-blue-400 flex flex-col items-center justify-center shadow-2xl transition-transform active:scale-95 border-8 border-white/20">
              <LucideFingerprint className="w-12 h-12 text-white" />
              <span className="text-white font-bold text-lg font-headline">
                Bater Ponto
              </span>
              <span className="text-blue-100/70 text-sm mt-1 font-label">
                Toque para registrar
              </span>
            </button>
          </div>
          <div className="mt-12 z-10 bg-white px-6 py-3 rounded-full flex items-center gap-3 border border-white/30 shadow-sm">
            <div className="relative  flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </div>
            <span className="text-blue-500 font-bold tracking-wide font-headline">
              Em Trabalho
            </span>
            <span className="text-on-surface-variant font-medium font-body text-sm border-l border-outline-variant pl-3">
              Início: 08:00
            </span>
          </div>
        </section>
        <section className="space-y-4">
          <div className="bg-surface-container-high/50 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary">
                <Pin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface font-headline leading-tight">
                  GPS Ativo
                </p>
                <p className="text-xs text-on-surface-variant font-body">
                  Av. Paulista, São Paulo - SP
                </p>
              </div>
            </div>
            <div className="bg-tertiary/10 px-3 py-1 rounded-lg">
              <span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">
                Verificado
              </span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-on-surface font-bold font-headline">
                Meta Diária
              </h3>
              <span className="text-blue-500 font-extrabold text-lg font-headline">
                84%
              </span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "84%" }}
              ></div>
            </div>
            <p className="text-xs text-on-surface-variant mt-3 font-body">
              Faltam <span className="font-bold text-on-surface">01:18</span>{" "}
              para concluir seu turno.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default page;
