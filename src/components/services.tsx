"use client"

import { Heart, Clock, Stethoscope, Home, Users, Pill, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Home,
    title: "Cuidador Domiciliar",
    description: "Acompanhamento diario no conforto do lar, auxiliando em atividades basicas como higiene, alimentacao e mobilidade.",
    highlight: "Ideal para idosos que precisam de assistencia diaria",
  },
  {
    icon: Stethoscope,
    title: "Enfermagem Especializada",
    description: "Cuidados de enfermagem profissional para pacientes que necessitam de atencao medica especializada continua.",
    highlight: "Enfermeiros registrados e experientes",
  },
  {
    icon: Clock,
    title: "Plantao 24 Horas",
    description: "Atendimento ininterrupto para garantir seguranca e tranquilidade para toda a familia em qualquer horario.",
    highlight: "Disponibilidade total, todos os dias",
  },
  {
    icon: Heart,
    title: "Cuidados Paliativos",
    description: "Suporte compassivo e digno para pacientes em tratamento de doencas graves, com foco em qualidade de vida.",
    highlight: "Dignidade e conforto em cada etapa",
  },
  {
    icon: Users,
    title: "Acompanhamento Hospitalar",
    description: "Presenca e cuidado durante internacoes hospitalares, garantindo atencao personalizada ao paciente.",
    highlight: "Suporte dentro e fora do hospital",
  },
  {
    icon: Pill,
    title: "Gestao de Medicamentos",
    description: "Organizacao e controle rigoroso da medicacao, evitando erros e garantindo eficacia do tratamento.",
    highlight: "Controle profissional da medicacao",
  },
]

export function Services() {
  return (
    <section id="servicos" className="py-28 lg:py-36 bg-[#f8f6f0] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gold-primary/3 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="text-gold-primary font-bold text-sm tracking-[0.2em] uppercase">
            Nossos Servicos
          </span>
          <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#000618] mt-4 leading-[1.05] tracking-tight">
            Cuidado completo
            <br />
            <span className="text-gold-primary">para cada necessidade</span>
          </h2>
          <p className="mt-4 text-[#000618]/60 text-lg leading-relaxed max-w-lg">
            Oferecemos uma ampla gama de servicos especializados, adaptados as necessidades individuais de cada paciente e familia.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 border border-[#000618]/5 hover:border-gold-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-primary/5 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gold-primary/10 flex items-center justify-center mb-6 group-hover:bg-gold-primary/20 transition-colors duration-300">
                <service.icon className="w-6 h-6 text-gold-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold text-[#000618]">
                {service.title}
              </h3>
              <p className="mt-3 text-[#000618]/60 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 pt-6 border-t border-[#000618]/5">
                <p className="text-xs font-medium text-gold-primary tracking-wide">
                  {service.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: "800ms" }}>
          <Button
            asChild
            className="bg-[#000618] hover:bg-[#1a237e] text-white px-10 h-14 text-base font-bold rounded-full transition-all duration-300"
          >
            <Link href="#contato">
              Ver todos os servicos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
