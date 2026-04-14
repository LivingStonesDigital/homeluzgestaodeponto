import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
              Cuidado Humanizado
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-foreground text-balance">
              Cuidado amoroso para quem você ama
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Oferecemos cuidadores e enfermeiros especializados em atendimento 
              domiciliar para idosos, proporcionando conforto, segurança e 
              qualidade de vida para toda a família.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base"
              >
                Solicitar Atendimento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border text-foreground hover:bg-secondary h-14 text-base px-8"
              >
                <Phone className="mr-2 h-5 w-5" />
                (11) 99999-0000
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-12 flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-serif font-semibold text-lg">10+</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Anos de</p>
                  <p className="text-sm text-muted-foreground">Experiência</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-serif font-semibold text-lg">500+</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Famílias</p>
                  <p className="text-sm text-muted-foreground">Atendidas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-serif font-semibold text-lg">24h</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Suporte</p>
                  <p className="text-sm text-muted-foreground">Disponível</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=1000&fit=crop&crop=faces"
                alt="Cuidadora sorrindo com paciente idosa"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border max-w-[280px]">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <span className="text-accent-foreground text-lg">★</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Avaliação 4.9/5</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Baseado em mais de 200 avaliações de famílias
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
