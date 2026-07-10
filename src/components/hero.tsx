"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, ShieldCheck } from "lucide-react"

const stats = [
  { number: "10+", label: "Anos de experiência" },
  { number: "50+", label: "Famílias atendidas" },
  { number: "24h", label: "Suporte disponível" },
  { number: "98%", label: "Satisfação" },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#000618]">
      <div className="absolute inset-0 animate-fade-in bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(26,35,126,0.15),transparent_50%)]" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-gold-primary/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <div className="animate-fade-in-up animate-delay-100">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-primary/20 bg-gold-primary/5 mb-8">
                <ShieldCheck className="w-4 h-4 text-gold-primary" />
                <span className="text-gold-primary text-sm font-medium tracking-wide">
                  CUIDADO HUMANIZADO E PROFISSIONAL
                </span>
              </div>
            </div>

            <h1 className="animate-fade-in-up animate-delay-200 font-headline text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95] tracking-tight text-white text-balance">
              Cuidado amoroso
              <br />
              <span className="text-gold-primary">para quem</span>
              <br />
              você ama
            </h1>

            <p className="animate-fade-in-up animate-delay-300 mt-6 text-lg text-white/60 leading-relaxed max-w-lg">
              Oferecemos cuidadores e enfermeiros especializados em atendimento domiciliar para idosos, proporcionando conforto, seguranca e qualidade de vida para toda a familia.
            </p>

            <div className="animate-fade-in-up animate-delay-400 mt-10 flex flex-col sm:flex-row gap-4">
              <Button className="bg-gold-primary hover:bg-gold-dark text-[#000618] px-8 h-14 text-base font-bold shadow-2xl shadow-gold-primary/25 hover:shadow-gold-primary/40 transition-all duration-300">
                Solicitar Atendimento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 h-14 text-base px-8"
              >
                <Phone className="mr-2 h-5 w-5" />
                (11) 99999-0000
              </Button>
            </div>

            <div className="animate-fade-in-up animate-delay-500 mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-headline text-2xl sm:text-3xl font-extrabold text-white">
                    {stat.number}
                  </p>
                  <p className="text-white/50 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative animate-scale-in animate-delay-200">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=1000&fit=crop&crop=faces"
                alt="Cuidadora sorrindo com paciente idosa"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000618]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="animate-fade-in-up animate-delay-600 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <div className="h-12 w-12 rounded-full bg-gold-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-[#000618] font-headline font-extrabold text-lg">
                      {`"`}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      Avaliacao 4.9/5
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">
                      Baseado em mais de 200 avaliacoes de familias
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
