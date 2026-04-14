import { Check } from "lucide-react"

const values = [
  "Cuidadores certificados e com experiência comprovada",
  "Processo de seleção rigoroso com verificação de antecedentes",
  "Treinamento contínuo em técnicas de cuidado",
  "Supervisão e acompanhamento por enfermeiros"
]

export function About() {
  return (
    <section id="sobre" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted">
                  <img
                    src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=533&fit=crop"
                    alt="Enfermeira profissional"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
                    alt="Cuidado com idosos"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="pt-8">
                <div className="aspect-[3/5] rounded-xl overflow-hidden bg-muted">
                  <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=667&fit=crop"
                    alt="Cuidador auxiliando paciente"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
              Sobre Nós
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground text-balance">
              Dedicação e profissionalismo no cuidado com idosos
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Há mais de 10 anos, a CuidarBem se dedica a oferecer serviços de 
              cuidadores e enfermeiros especializados em atendimento domiciliar. 
              Nossa missão é proporcionar qualidade de vida, dignidade e conforto 
              para idosos e suas famílias.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Entendemos que cada pessoa é única, por isso desenvolvemos planos 
              de cuidado personalizados que respeitam a individualidade, história 
              e preferências de cada paciente.
            </p>

            {/* Values */}
            <ul className="mt-8 space-y-4">
              {values.map((value, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-foreground">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
