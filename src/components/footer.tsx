import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--custom-bg-primary)] text-background py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-accent fill-accent" />
              <span className="font-serif text-xl font-semibold text-background">
                CuidarBem
              </span>
            </Link>
            <p className="mt-4 text-background/70 text-sm leading-relaxed">
              Cuidado humanizado e profissional para quem você ama. Há mais de
              10 anos cuidando de famílias.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium text-background mb-4">Serviços</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  Cuidador Domiciliar
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  Enfermagem Especializada
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  Plantão 24 Horas
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  Cuidados Paliativos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-background mb-4">Empresa</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#sobre"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="#equipe"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  Nossa Equipe
                </Link>
              </li>
              <li>
                <Link
                  href="#depoimentos"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  Depoimentos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  Trabalhe Conosco
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-background mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="text-background/70 text-sm">(11) 99999-0000</li>
              <li className="text-background/70 text-sm">
                contato@cuidarbem.com.br
              </li>
              <li className="text-background/70 text-sm">
                Av. Paulista, 1000
                <br />
                São Paulo - SP
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © 2024 CuidarBem. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-background/60 hover:text-background text-sm transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="#"
                className="text-background/60 hover:text-background text-sm transition-colors"
              >
                Termos de Uso
              </Link>
            </div>
            <div className="mt-12 pt-8 border-t border-background/20">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-background/60 text-sm">
                  Desenvolvido com ❤️ por
                  <a
                    href="https://livingstones.netlify.app"
                    target="_blank"
                    className="text-background/60 hover:text-background text-sm transition-colors"
                  >
                    {" "}
                    Living Stones Digital
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
