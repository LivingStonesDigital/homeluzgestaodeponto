"use client";

import { useMemo, useState, useDeferredValue } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import {
  ArrowRight,
  Calendar,
  CircleCheck,
  Search,
  Users,
  Plus,
} from "lucide-react";
import { DotmCircular14 } from "@/components/ui/dotm-circular-14";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DirectionalTransition } from "@/components/directional-transition";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Loader from "@/components/loader";
import dynamic from "next/dynamic";

const RegisterEmployeeModal = dynamic(
  () => import("@/components/modals/register-employee"),
  { loading: () => <Loader /> },
);

function page() {
  const router = useRouter();
  const employees = useQuery(api.employees.listEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtra funcionários pelo nome
  const filteredEmployees = useMemo(
    () =>
      employees?.filter((employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ) || [],
    [employees, searchQuery],
  );

  // Calcula estatísticas baseadas nos funcionários filtrados
  const stats = useMemo(() => {
    const onlineCount = filteredEmployees.filter(
      (e) => e.status === "online",
    ).length;
    const pausaCount = filteredEmployees.filter(
      (e) => e.status === "pausa",
    ).length;
    const ausenteCount = filteredEmployees.filter(
      (e) => e.status === "ausente",
    ).length;
    const totalCount = filteredEmployees.length;
    return { onlineCount, pausaCount, ausenteCount, totalCount };
  }, [filteredEmployees]);

  if (!employees) {
    return <Loader />;
  }

  return (
    <DirectionalTransition>
      <main className="bg-surface dark:bg-zinc-900 font-body text-on-surface min-h-screen pb-32">
        <section className="pt-12 px-6 max-md:px-4 max-w-md mx-auto space-y-8">
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/20 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-medium uppercase tracking-widest opacity-80 mb-1">
                Status Atual
              </p>
              <h2 className="text-2xl font-bold headline">Colaboradores</h2>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span className="text-sm opacity-90">
                  Lista com colabordores.
                </span>
              </div>
            </div>

            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          <section className="flex overflow-x-auto gap-4 pb-2 no-scrollbar scroll-smooth">
            <div className="flex-none w-40 bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10">
              <div className="flex items-center justify-between mb-3">
                <Users className=" text-primary bg-primary-container/10" />
                <span className="text-xs font-bold text-outline uppercase tracking-wider">
                  Total
                </span>
              </div>
              <div className="text-3xl font-extrabold text-on-surface">
                {stats.totalCount}
              </div>
            </div>
            <div className="flex-none w-40 bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10">
              <div className="flex items-center justify-between mb-3">
                <CircleCheck className="text-green-500" />
                <span className="text-xs font-bold text-outline uppercase tracking-wider">
                  Online
                </span>
              </div>
              <div className="text-3xl font-extrabold text-on-surface">
                {stats.onlineCount}
              </div>
            </div>
            <div className="flex-none w-40 bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10">
              <div className="flex items-center justify-between mb-3">
                <Calendar className="text-amber-500" />
                <span className="text-xs font-bold text-outline uppercase tracking-wider">
                  Pausa
                </span>
              </div>
              <div className="text-3xl font-extrabold text-on-surface">
                {stats.pausaCount}
              </div>
            </div>
            <div className="flex-none w-40 bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10">
              <div className="flex items-center justify-between mb-3">
                <Calendar className="text-red-500" />
                <span className="text-xs font-bold text-outline uppercase tracking-wider">
                  Ausentes
                </span>
              </div>
              <div className="text-3xl font-extrabold text-on-surface">
                {stats.ausenteCount}
              </div>
            </div>
          </section>

          <div className="py-4 max-w-7xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
              <input
                className="w-full shadow border border-black bg-white border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-sm"
                placeholder="Buscar por nome ou cargo..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <section className="space-y-4">
            {/* Cards */}
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-bold text-on-surface">Equipe</h2>
              <div className="flex gap-2">
                <button
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity active:scale-95 duration-150"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  Adicionar
                </button>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee._id}
                  className="bg-primary-container/10 p-4 rounded-2xl flex flex-col  gap-4 group hover:bg-surface-container transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        alt="Ricardo Mendonça"
                        className="w-14 h-14 rounded-full object-cover"
                        data-alt="Modern close-up portrait of a professional man with beard, soft office interior lighting, vibrant colors"
                        src={
                          employee?.avatarUrl ||
                          `https://avatar.vercel.sh/${employee.name}`
                        }
                      />
                      <div
                        className={cn(
                          "absolute bottom-0 right-0 w-4 h-4 bg-gray-500 border-2 border-white rounded-full",
                          employee.status === "online" && "bg-green-500",
                          employee.status === "pausa" && "bg-amber-500",
                          employee.status === "ausente" && "bg-red-500",
                        )}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-on-surface truncate">
                        {employee.name}
                      </h3>
                      <p className="text-xs text-on-surface-variant font-medium">
                        {employee.role}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={cn(
                          "px-3 py-1  text-[10px] font-bold uppercase rounded-full",
                          employee.status === "online"
                            ? "bg-green-100 text-green-800"
                            : employee.status === "pausa"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800",
                          employee.status === "ausente"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800",
                        )}
                      >
                        {employee.status || "online"}
                      </span>
                      <ArrowRight className="w-4 h-4 text-outline opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <Button asChild>
                    <Link
                      href={`/dashboard/funcionarios/${employee._id}`}
                      prefetch={true}
                    >
                      Ver detalhes
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </section>

          <RegisterEmployeeModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </section>
      </main>
    </DirectionalTransition>
  );
}

export default page;
