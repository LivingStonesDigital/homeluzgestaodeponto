"use client"

import { 
  Heart, 
  Clock, 
  Stethoscope, 
  Home, 
  Users, 
  Pill,
  ChevronDown
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const services = [
  {
    icon: Home,
    title: "Cuidador Domiciliar",
    description: "Acompanhamento diário no conforto do lar, auxiliando em atividades básicas como higiene, alimentação e mobilidade.",
    details: [
      "Auxílio na higiene pessoal e banho",
      "Preparo e administração de refeições",
      "Acompanhamento em atividades de lazer",
      "Estímulo à independência do idoso"
    ]
  },
  {
    icon: Stethoscope,
    title: "Enfermagem Especializada",
    description: "Cuidados de enfermagem profissional para pacientes que necessitam de atenção médica especializada.",
    details: [
      "Administração de medicamentos",
      "Curativos e cuidados com feridas",
      "Monitoramento de sinais vitais",
      "Cuidados pós-operatórios"
    ]
  },
  {
    icon: Clock,
    title: "Plantão 24 Horas",
    description: "Atendimento ininterrupto para garantir segurança e tranquilidade para toda a família.",
    details: [
      "Cuidadores em turnos rotativos",
      "Supervisão constante",
      "Atendimento de emergência",
      "Relatórios diários de acompanhamento"
    ]
  },
  {
    icon: Heart,
    title: "Cuidados Paliativos",
    description: "Suporte compassivo e digno para pacientes em tratamento de doenças graves.",
    details: [
      "Controle de dor e sintomas",
      "Apoio emocional e espiritual",
      "Suporte à família",
      "Cuidados de conforto"
    ]
  },
  {
    icon: Users,
    title: "Acompanhamento Hospitalar",
    description: "Presença e cuidado durante internações hospitalares, garantindo atenção personalizada.",
    details: [
      "Acompanhamento em consultas",
      "Presença durante internação",
      "Comunicação com equipe médica",
      "Suporte emocional contínuo"
    ]
  },
  {
    icon: Pill,
    title: "Gestão de Medicamentos",
    description: "Organização e controle rigoroso da medicação, evitando erros e garantindo eficácia do tratamento.",
    details: [
      "Organização de medicamentos",
      "Lembretes e administração",
      "Controle de estoque",
      "Relatórios para familiares"
    ]
  }
]

export function Services() {
  return (
    <section id="servicos" className="py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
            Nossos Serviços
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground">
            Cuidado completo para cada necessidade
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Oferecemos uma ampla gama de serviços especializados, adaptados às 
            necessidades individuais de cada paciente e família.
          </p>
        </div>

        {/* Services Accordion */}
        <div className="mt-16">
          <Accordion type="single" collapsible className="space-y-4">
            {services.map((service, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-medium text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1 hidden sm:block">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="pl-16">
                    <p className="text-muted-foreground mb-4 sm:hidden">
                      {service.description}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
