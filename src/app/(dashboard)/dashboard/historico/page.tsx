import BottomBar from "@/components/bottom-bar";
import Navbar from "@/components/navbar";
import { ChartColumnStacked } from "@hugeicons/core-free-icons";
import { Calendar, ChartColumnStackedIcon, Filter, Search } from "lucide-react";
import React from "react";

function page() {
  return (
    <main className="bg-surface text-on-background min-h-screen pb-24">
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="md:col-span-2 p-6 rounded-3xl bg-blue-500 text-white flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <span className="text-white font-medium text-sm">
                Resumo do Dia
              </span>
              <h2 className="text-4xl font-extrabold mt-2 tracking-tight">
                84% Presentes
              </h2>
              <p className="text-white mt-4 text-sm max-w-[200px]">
                32 de 38 colaboradores ativos no turno atual.
              </p>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-20">
              <ChartColumnStackedIcon className="size-40" />
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-surface-container-lowest flex flex-col justify-between">
            <span className="text-on-surface-variant text-sm font-medium">
              Em Intervalo
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-bold text-tertiary">04</span>
              <span className="text-on-surface-variant text-xs">pessoas</span>
            </div>
            <div className="h-1 bg-surface-container mt-4 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full w-1/4"></div>
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-surface-container-lowest flex flex-col justify-between">
            <span className="text-on-surface-variant text-sm font-medium">
              Ausências
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-bold text-error">02</span>
              <span className="text-on-surface-variant text-xs">pessoas</span>
            </div>
            <div className="h-1 bg-surface-container mt-4 rounded-full overflow-hidden">
              <div className="bg-error h-full w-[10%]"></div>
            </div>
          </div>
        </div>
        <section className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search />
              </div>
              <input
                className="w-full bg-surface-container-low border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-outline"
                placeholder="Buscar colaborador ou cargo..."
                type="text"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <button className="flex items-center gap-2 bg-surface-container-high px-5 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap active:scale-95 transition-all">
                <Calendar />
                Hoje, 24 Out
              </button>
              <button className="flex items-center gap-2 bg-surface-container-high px-5 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap active:scale-95 transition-all">
                <Filter />
                Departamentos
              </button>
            </div>
          </div>
        </section>
        <div className="space-y-4">
          <div className="hidden md:grid grid-cols-12 px-8 py-2 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
            <div className="col-span-5">Colaborador</div>
            <div className="col-span-2">Entrada</div>
            <div className="col-span-2">Saída</div>
            <div className="col-span-3 text-right">Status</div>
          </div>
          <div className="bg-surface-container-lowest rounded-3xl p-4 md:px-8 md:py-6 transition-all hover:scale-[1.01] hover:shadow-xl shadow-sm border border-outline-variant/10">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-primary-fixed flex-shrink-0">
                  <img
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    data-alt="Close-up professional portrait of a male manager with glasses in a modern office setting, soft corporate lighting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuABfdSNFQ9PVP9VEShRshZ1xMCwYuN--Qlx9Vyf2ji62zFueAggqTWCgPn7zLAyj8TnSKng2saofnbAkEr_3c9gDvjTSZ1Qhlv75sSIFgn3G-hSuCBA-BepZgOWvB43fqqYP5GhIdMVp9NeIIp8Zv2HbD8hhWNyS_UejVzavMmy3sTyU-XCESxM1z2qM3TAwy9Nt-LXJz9JNjAluxitFsxH2jq2gc0V_7Avb3mE8hQto1s-Di_ejxfDCvZYForEVw20TcIcKZPIL78"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">
                    Ricardo Mendonça
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Design de Produto
                  </p>
                </div>
              </div>
              <div className="col-span-2 flex flex-col md:block">
                <span className="text-xs font-medium text-on-surface-variant md:hidden">
                  Entrada
                </span>
                <span className="font-bold text-on-surface">08:02</span>
              </div>
              <div className="col-span-2 flex flex-col md:block">
                <span className="text-xs font-medium text-on-surface-variant md:hidden">
                  Saída
                </span>
                <span className="font-medium text-outline">--:--</span>
              </div>
              <div className="col-span-3 flex justify-between md:justify-end items-center">
                <span className="text-xs font-medium text-on-surface-variant md:hidden">
                  Status
                </span>
                <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Presente
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-3xl p-4 md:px-8 md:py-6 transition-all hover:scale-[1.01] hover:shadow-xl shadow-sm border border-outline-variant/10">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-tertiary-fixed flex-shrink-0">
                  <img
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    data-alt="Portrait of a smiling young woman professional in a bright studio, wearing a neutral blazer, minimalist style"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB852sHsQKJJOZ4b8NSaQRbpZOsWRldauv2ktzYA5fi2KM0Lq7p6YXkyzfnmHotzUZhvT2OSAyrKXEcjBCgwSQ4NKRIqsabtk-DjR2MWjJ5qjLeQo8o87DKcbyist2-xa6AR3J1BPRA8iD_a06FJweLUj5gn2IM4G2uUbcg4WLxjljhBoTYMxS31FLyyoXGvXqM-A5VGQmTqJskxMUYX42sOIY7Jlvyxm1JIT4g3QepHI6SPOheFXpoxMfu31aj-g86yLAqU2CgdJU"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Beatriz Santos</h3>
                  <p className="text-xs text-on-surface-variant">
                    Desenvolvimento
                  </p>
                </div>
              </div>
              <div className="col-span-2 flex flex-col md:block">
                <span className="text-xs font-medium text-on-surface-variant md:hidden">
                  Entrada
                </span>
                <span className="font-bold text-on-surface">08:55</span>
              </div>
              <div className="col-span-2 flex flex-col md:block">
                <span className="text-xs font-medium text-on-surface-variant md:hidden">
                  Saída
                </span>
                <span className="font-medium text-outline">--:--</span>
              </div>
              <div className="col-span-3 flex justify-between md:justify-end items-center">
                <span className="text-xs font-medium text-on-surface-variant md:hidden">
                  Status
                </span>
                <div className="flex items-center gap-2 bg-tertiary/10 text-tertiary px-4 py-2 rounded-full">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="coffee"
                  >
                    coffee
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Em Intervalo
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-3xl p-4 md:px-8 md:py-6 transition-all hover:scale-[1.01] hover:shadow-xl shadow-sm border border-outline-variant/10 opacity-70">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-secondary-fixed flex-shrink-0">
                  <img
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    data-alt="Middle-aged man with beard in creative workspace, warm morning sunlight, casual professional portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5WCsRVk3RR_3q633BWjrr5htC6jUXkH1jR5iq0FhMZecHJwOJyAYIMFZiUYoKjTlOuYHkGMbup43stOJtR7aw6voU1GJDCmddoTjNGg0--8xHRqyYP-8JwXAm7_HDg_ofWq2BI6iObxsnxDC8D1ynyHQ2GFXwARR1P5WV2XY_sel38GmNqRjtBOWdLoDp0sdjgeZysltjlYzNikPR9sBQpUBcWtz6hFm6DBN9UAG_5mlvTGByZOuObhyyh5QN5wHL4iiwY_BtNV0"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Lucas Oliveira</h3>
                  <p className="text-xs text-on-surface-variant">Marketing</p>
                </div>
              </div>
              <div className="col-span-2 flex flex-col md:block">
                <span className="text-xs font-medium text-on-surface-variant md:hidden">
                  Entrada
                </span>
                <span className="font-bold text-outline">--:--</span>
              </div>
              <div className="col-span-2 flex flex-col md:block">
                <span className="text-xs font-medium text-on-surface-variant md:hidden">
                  Saída
                </span>
                <span className="font-medium text-outline">--:--</span>
              </div>
              <div className="col-span-3 flex justify-between md:justify-end items-center">
                <span className="text-xs font-medium text-on-surface-variant md:hidden">
                  Status
                </span>
                <div className="flex items-center gap-2 bg-error/10 text-error px-4 py-2 rounded-full">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="event_busy"
                  >
                    event_busy
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Ausente
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-3xl p-4 md:px-8 md:py-6 transition-all hover:scale-[1.01] hover:shadow-xl shadow-sm border border-outline-variant/10">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-primary-fixed flex-shrink-0">
                  <img
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    data-alt="Smiling woman professional with braids in a bright office, natural skin, neutral tones, soft background blur"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUR3XPHCUlVnbaCf9-jVClD-9otCVK_wAyS9GYkvRgKMCW8bBOQZxefJBRCuayfQlj-SqlNHGpCJSoNt68XSS_Ux_eL7krkZkmFFnQUuRwm4fLe3tVdo-cVlo_l3RvjzggZ3qs8cUN5iwyMBKIRijhWBBrSYlaST7Ss_OJR6Uji7RzrkrbRek44n-RHwhWqxvPV1JdjvZZwsFPJJoMUuL0WhZ_tWUjAzePSS29GnlKX0e5HYvjN5PeFDiHqPbAGi40kpZ26zWjNgY"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Camila Ferreira</h3>
                  <p className="text-xs text-on-surface-variant">
                    Recursos Humanos
                  </p>
                </div>
              </div>
              <div className="col-span-2 flex flex-col md:block">
                <span className="text-xs font-medium text-on-surface-variant md:hidden">
                  Entrada
                </span>
                <span className="font-bold text-on-surface">07:58</span>
              </div>
              <div className="col-span-2 flex flex-col md:block">
                <span className="text-xs font-medium text-on-surface-variant md:hidden">
                  Saída
                </span>
                <span className="font-bold text-on-surface">17:04</span>
              </div>
              <div className="col-span-3 flex justify-between md:justify-end items-center">
                <span className="text-xs font-medium text-on-surface-variant md:hidden">
                  Status
                </span>
                <div className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="check_circle"
                  >
                    check_circle
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Finalizado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
