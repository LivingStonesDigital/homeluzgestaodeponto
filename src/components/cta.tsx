"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react"

export function CTA() {
  return (
    <section id="contato" className="py-28 lg:py-36 bg-[#000618] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(26,35,126,0.1),transparent_50%)]" />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-gold-primary/3 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="animate-fade-in-left">
            <span className="text-gold-primary font-bold text-sm tracking-[0.2em] uppercase">
              Entre em Contato
            </span>
            <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-4 leading-[1.05] tracking-tight">
              Pronto para cuidar
              <br />
              <span className="text-gold-primary">de quem voce ama?</span>
            </h2>
            <p className="mt-6 text-white/50 text-lg leading-relaxed max-w-md">
              Entre em contato conosco para uma avaliacao gratuita. Nossa equipe esta pronta para entender suas necessidades e criar um plano de cuidado personalizado.
            </p>
            <div className="mt-10">
              <Button className="bg-gold-primary hover:bg-gold-dark text-[#000618] px-10 h-14 text-base font-bold shadow-2xl shadow-gold-primary/25 hover:shadow-gold-primary/40 transition-all duration-300">
                Solicitar Avaliacao Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/5 animate-fade-in-right" style={{ animationDelay: "200ms" }}>
            <h3 className="font-headline text-2xl font-bold text-white mb-8">
              Fale Conosco
            </h3>
            <div className="space-y-8">
              <div className="flex items-start gap-5 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <div className="h-12 w-12 rounded-2xl bg-gold-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-gold-primary" />
                </div>
                <div>
                  <p className="text-white font-medium">Telefone</p>
                  <p className="text-white/50 mt-1">(11) 99999-0000</p>
                  <p className="text-white/50">(11) 3333-0000</p>
                </div>
              </div>
              <div className="flex items-start gap-5 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <div className="h-12 w-12 rounded-2xl bg-gold-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-gold-primary" />
                </div>
                <div>
                  <p className="text-white font-medium">E-mail</p>
                  <p className="text-white/50 mt-1">contato@homeluz.com.br</p>
                </div>
              </div>
              <div className="flex items-start gap-5 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
                <div className="h-12 w-12 rounded-2xl bg-gold-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-gold-primary" />
                </div>
                <div>
                  <p className="text-white font-medium">Endereco</p>
                  <p className="text-white/50 mt-1">
                    Av. Paulista, 1000 - Bela Vista
                    <br />
                    Sao Paulo - SP, 01310-100
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
