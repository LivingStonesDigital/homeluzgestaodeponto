"use client";
import { LoginForm } from "@/components/login-form";

import { useAuthActions } from "@convex-dev/auth/react";
import { Container, Home, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function LoginPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      await signIn("password", { email, password, flow: "signIn" });
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(
        "Failed to login. Please check your credentials and try again.",
      );
    }
  };
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
      <div className="fixed top-0 right-0 -z-10 opacity-20 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-primary/30 rounded-full blur-[140px] -mr-64 -mt-64"></div>
      </div>
      <div className="fixed bottom-0 left-0 -z-10 opacity-20 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-tertiary/20 rounded-full blur-[120px] -ml-48 -mb-48"></div>
      </div>
      <main className="w-full max-w-md bg-white/90 backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/50">
        <header className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 primary-gradient rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary/20 ring-4 ring-primary/5">
            <Home className="text-white" />
          </div>
          <h1 className="logo-text text-3xl font-extrabold tracking-tight text-primary">
            Home Luz
          </h1>
          <p className="text-on-surface-variant font-semibold mt-2 text-[10px] uppercase tracking-[0.2em] opacity-70">
            The Fluid Authority
          </p>
        </header>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label
              className="block text-xs font-bold text-on-surface-variant/80 ml-1 uppercase tracking-wider"
              htmlFor="identity"
            >
              E-mail ou ID
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                <Mail className="opacity-50"></Mail>
              </div>
              <input
                className="w-full pl-11 pr-4 py-4 bg-surface-container-low/50 border border-outline-variant/10 rounded-2xl text-on-surface placeholder:text-outline/40 focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all duration-300 outline-none text-sm"
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label
                className="block text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider"
                htmlFor="password"
              >
                Senha
              </label>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                <Lock className="opacity-50" />
              </div>
              <input
                className="w-full pl-11 pr-4 py-4 bg-surface-container-low/50 border border-outline-variant/10 rounded-2xl text-on-surface placeholder:text-outline/40 focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all duration-300 outline-none text-sm"
                id="password"
                name="password"
                type="password"
                required
              />
            </div>
          </div>
          <div className="flex justify-end pr-1">
            <a
              className="text-primary text-xs font-bold hover:text-primary-container transition-colors tracking-tight"
              href="#"
            >
              Esqueci minha senha
            </a>
          </div>
          <button
            className="w-full primary-gradient text-white font-bold py-4.5 rounded-2xl shadow-[0_8px_20px_-4px_rgba(0,72,141,0.3)] hover:primary-gradient-hover hover:shadow-[0_12px_25px_-4px_rgba(0,72,141,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 text-base mt-6 py-4"
            type="submit"
          >
            Entrar
          </button>
        </form>
        <footer className="mt-10 pt-8 border-t border-outline-variant/5 text-center">
          <p className="text-on-surface-variant/70 text-sm font-medium">
            Novo na plataforma?
            <a
              className="text-primary font-bold ml-1 hover:underline underline-offset-4"
              href="#"
            >
              Solicite acesso
            </a>
          </p>
        </footer>
      </main>
      <div className="mt-8 text-on-surface-variant/40 text-[10px] uppercase tracking-widest font-bold">
        Desenvolvido com amor por{" "}
        <a
          href="https://livingstonesdigital.netlify.app/"
          target="_blank"
          className="text-primary hover:underline"
        >
          LivingStones
        </a>
      </div>
    </main>
  );
}
