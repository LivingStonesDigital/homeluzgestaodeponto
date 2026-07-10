import Link from "next/link"

const footerLinks = {
  servicos: [
    { label: "Cuidador Domiciliar", href: "#" },
    { label: "Enfermagem Especializada", href: "#" },
    { label: "Plantao 24 Horas", href: "#" },
    { label: "Cuidados Paliativos", href: "#" },
  ],
  empresa: [
    { label: "Sobre Nos", href: "#sobre" },
    { label: "Nossa Equipe", href: "#equipe" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Trabalhe Conosco", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#000618] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-primary flex items-center justify-center">
                <span className="text-[#000618] font-headline font-extrabold text-sm">H</span>
              </div>
              <span className="font-headline text-xl font-bold text-white tracking-tight">
                Home<span className="text-gold-primary">Luz</span>
              </span>
            </Link>
            <p className="mt-4 text-white/40 text-sm leading-relaxed max-w-xs">
              Cuidado humanizado e profissional para quem voce ama. Ha mais de 10 anos cuidando de familias.
            </p>
            <div className="mt-6 flex gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-gold-primary/20 transition-colors cursor-pointer">
                <span className="text-white/40 hover:text-gold-primary text-xs font-bold transition-colors">IG</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-gold-primary/20 transition-colors cursor-pointer">
                <span className="text-white/40 hover:text-gold-primary text-xs font-bold transition-colors">FB</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-gold-primary/20 transition-colors cursor-pointer">
                <span className="text-white/40 hover:text-gold-primary text-xs font-bold transition-colors">WA</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold text-white text-sm mb-5 tracking-wide">
              Servicos
            </h4>
            <ul className="space-y-3">
              {footerLinks.servicos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-gold-primary text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-white text-sm mb-5 tracking-wide">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-gold-primary text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-white text-sm mb-5 tracking-wide">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="text-white/40 text-sm">(11) 99999-0000</li>
              <li className="text-white/40 text-sm">contato@homeluz.com.br</li>
              <li className="text-white/40 text-sm leading-relaxed">
                Av. Paulista, 1000
                <br />
                Sao Paulo - SP
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} HomeLuz. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              Politica de Privacidade
            </Link>
            <Link
              href="#"
              className="text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              Termos de Uso
            </Link>
          </div>
          <p className="text-white/20 text-xs">
            Desenvolvido por{" "}
            <a
              href="https://livingstonesdigital.netlify.app"
              target="_blank"
              className="text-white/30 hover:text-gold-primary transition-colors"
            >
              Living Stones Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
