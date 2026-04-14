import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 lg:py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-primary-foreground text-balance">
              Pronto para cuidar de quem você ama?
            </h2>
            <p className="mt-6 text-primary-foreground/80 text-lg leading-relaxed">
              Entre em contato conosco para uma avaliação gratuita. Nossa equipe 
              está pronta para entender suas necessidades e criar um plano de 
              cuidado personalizado.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90 px-8 h-14 text-base"
              >
                Solicitar Avaliação Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-8 lg:p-10">
            <h3 className="font-serif text-2xl font-medium text-primary-foreground mb-6">
              Fale Conosco
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-primary-foreground font-medium">Telefone</p>
                  <p className="text-primary-foreground/80 mt-1">(11) 99999-0000</p>
                  <p className="text-primary-foreground/80">(11) 3333-0000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-primary-foreground font-medium">E-mail</p>
                  <p className="text-primary-foreground/80 mt-1">contato@cuidarbem.com.br</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-primary-foreground font-medium">Endereço</p>
                  <p className="text-primary-foreground/80 mt-1">
                    Av. Paulista, 1000 - Bela Vista<br />
                    São Paulo - SP, 01310-100
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
