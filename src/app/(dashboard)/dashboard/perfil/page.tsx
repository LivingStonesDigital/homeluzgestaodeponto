"use client";
import BottomBar from "@/components/bottom-bar";
import { ModeToggle } from "@/components/ModeToggle";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  ChevronRight,
  HelpCircle,
  HelpCircleIcon,
  IdCard,
  LogOut,
  Mail,
  MessageCircleQuestion,
  Palette,
  Pencil,
  ShieldCheck,
  User2,
  Building2,
  BadgeCheck,
  PaintRoller,
} from "lucide-react";
import { DirectionalTransition } from "@/components/directional-transition";

function page() {
  const { signOut } = useAuthActions();
  const user = useQuery(api.employees.currentUser);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <DirectionalTransition>
        <main className="bg-surface text-on-surface min-h-screen pb-32">
          <section className="pt-14 px-6 max-w-md mx-auto">
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
          </section>
        </main>
      </DirectionalTransition>
    );
  }

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const roleLabel = user.role === "admin" ? "Administrador" : "Funcionário";

  return (
    <DirectionalTransition>
      <main className="bg-surface dark:bg-zinc-900 text-on-surface dark:text-white min-h-screen pb-32">
        <section className="pt-14 px-6 max-w-md mx-auto">
          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-blue-500 mb-4">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-surface-container-lowest bg-blue-100 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">
                    {initials}
                  </span>
                </div>
              </div>
              <button className="absolute bottom-4 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:scale-105 transition-transform">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
            <h1 className="text-2xl font-extrabold text-on-surface dark:text-white tracking-tight">
              {user.name}
            </h1>
            <p className="text-on-surface-variant dark:text-white font-medium">
              {roleLabel}
            </p>
          </div>
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-4 px-1">
              Dados Pessoais
            </h2>
            <div className="bg-surface-container-lowest dark:bg-zinc-800 rounded-xl p-1 overflow-hidden">
              <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <User2 />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-wider">
                    Nome Completo
                  </p>
                  <p className="text-on-surface dark:text-white font-medium">
                    {user.name}
                  </p>
                </div>
                <ChevronRight className="opacity-50" />
              </div>
              <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <Mail />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-wider">
                    E-mail Corporativo
                  </p>
                  <p className="text-on-surface dark:text-white font-medium">
                    {user.email}
                  </p>
                </div>
                <ChevronRight className="opacity-50" />
              </div>
              {user.department && (
                <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low transition-colors group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                    <Building2 />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-wider">
                      Departamento
                    </p>
                    <p className="text-on-surface dark:text-white font-medium">
                      {user.department}
                    </p>
                  </div>
                  <ChevronRight className="opacity-50" />
                </div>
              )}
              <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <BadgeCheck />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-wider">
                    Cargo
                  </p>
                  <p className="text-on-surface font-medium">{roleLabel}</p>
                </div>
                <ChevronRight className="opacity-50" />
              </div>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-4 px-1">
              Configurações da Conta
            </h2>
            <div className="bg-surface-container-lowest dark:bg-zinc-800 rounded-xl p-1 overflow-hidden">
              <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <ShieldCheck />
                </div>
                <div className="flex-1">
                  <p className="text-on-surface font-semibold">
                    Segurança e Senha
                  </p>
                </div>
                <ChevronRight className="opacity-50" />
              </div>
              {/* <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low transition-colors group cursor-pointer">
                <PaintRoller />
                <div className="flex-1">
                  <p className="text-on-surface font-semibold">Aparência</p>
                </div>

                <ChevronRight className="opacity-50" />
              </div> */}
            </div>
          </section>
          <section className="mb-12">
            <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-4 px-1">
              Suporte
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-blue-50 transition-colors group cursor-pointer">
                <HelpCircleIcon />
                <span className="text-sm font-bold text-on-surface">
                  Central de Ajuda
                </span>
              </div>
              {/* <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-blue-50 transition-colors group cursor-pointer">
              <MessageCircleQuestion />
              <span className="text-sm font-bold text-on-surface">
                Falar com TI
              </span>
            </div> */}
            </div>
          </section>
          <Button
            onClick={handleSignOut}
            variant={"destructive"}
            size={"lg"}
            className="w-full py-4 flex items-center justify-center gap-2  transition-all active:scale-[0.98] mb-8"
          >
            <LogOut />
            Sair da Conta
          </Button>
        </section>
      </main>
    </DirectionalTransition>
  );
}

export default page;
