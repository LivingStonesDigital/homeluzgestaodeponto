"use client"

import { Check, Award } from "lucide-react"

const values = [
  "Cuidadores certificados e com experiencia comprovada",
  "Processo de selecao rigoroso com verificacao de antecedentes",
  "Treinamento continuo em tecnicas de cuidado",
  "Supervisao e acompanhamento por enfermeiros",
]

const highlights = [
  { number: "10+", label: "Anos de experiencia" },
  { number: "500+", label: "Profissionais capacitados" },
  { number: "50+", label: "Familias atendidas" },
]

export function About() {
  return (
    <section id="sobre" className="py-28 lg:py-36 bg-white relative overflow-hidden">
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-[#000618]/[0.02] blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative animate-fade-in-left">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#f8f6f0]">
                  <img
                    src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=667&fit=crop"
                    alt="Enfermeira profissional"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#f8f6f0]">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop"
                    alt="Cuidado com idosos"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="pt-12 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <div className="aspect-[3/5] rounded-2xl overflow-hidden bg-[#f8f6f0]">
                  <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=833&fit=crop"
                    alt="Cuidador auxiliando paciente"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-gold-primary rounded-2xl p-6 shadow-2xl shadow-gold-primary/20 hidden sm:block animate-scale-in" style={{ animationDelay: "500ms" }}>
              <Award className="w-8 h-8 text-[#000618]" />
              <p className="text-[#000618] font-headline font-bold text-sm mt-2">Excelencia</p>
              <p className="text-[#000618]/60 text-xs">em cuidados</p>
            </div>
          </div>

          <div className="animate-fade-in-right" style={{ animationDelay: "200ms" }}>
            <span className="text-gold-primary font-bold text-sm tracking-[0.2em] uppercase">
              Sobre Nos
            </span>
            <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#000618] mt-4 leading-[1.05] tracking-tight">
              Dedicacao e profissionalismo
              <br />
              <span className="text-gold-primary">no cuidado com idosos</span>
            </h2>
            <p className="mt-6 text-[#000618]/60 text-lg leading-relaxed">
              Ha mais de 10 anos, a HomeLuz se dedica a oferecer servicos de cuidadores e enfermeiros especializados em atendimento domiciliar. Nossa missao e proporcionar qualidade de vida, dignidade e conforto para idosos e suas familias.
            </p>
            <p className="mt-4 text-[#000618]/50 leading-relaxed">
              Entendemos que cada pessoa e unica, por isso desenvolvemos planos de cuidado personalizados que respeitam a individualidade, historia e preferencias de cada paciente.
            </p>

            <ul className="mt-8 space-y-4">
              {values.map((value, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 animate-fade-in-left"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <div className="h-7 w-7 rounded-full bg-gold-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#000618]" />
                  </div>
                  <span className="text-[#000618]/70">{value}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 grid grid-cols-3 gap-8 pt-8 border-t border-[#000618]/5 animate-fade-in-up" style={{ animationDelay: "800ms" }}>
              {highlights.map((h) => (
                <div key={h.label}>
                  <p className="font-headline text-2xl font-extrabold text-[#000618]">{h.number}</p>
                  <p className="text-[#000618]/50 text-sm mt-1">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
