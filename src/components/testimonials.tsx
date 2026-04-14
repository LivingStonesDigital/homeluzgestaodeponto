import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "A CuidarBem transformou a vida da minha mãe. Os cuidadores são extremamente atenciosos e profissionais. Recomendo de olhos fechados.",
    author: "Roberto Almeida",
    relation: "Filho de paciente",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
  },
  {
    quote: "Depois de muita pesquisa, encontramos a CuidarBem. A tranquilidade de saber que meu pai está em boas mãos não tem preço.",
    author: "Fernanda Lima",
    relation: "Filha de paciente",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces"
  },
  {
    quote: "Profissionalismo, carinho e dedicação. A enfermeira que cuida da minha avó se tornou parte da família. Excelente serviço!",
    author: "Marcos Pereira",
    relation: "Neto de paciente",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
  }
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
            Depoimentos
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground">
            O que dizem as famílias que confiam em nós
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-xl p-8 relative"
            >
              <Quote className="h-10 w-10 text-primary/20 absolute top-6 right-6" />
              <p className="text-foreground leading-relaxed relative z-10">
                {`"${testimonial.quote}"`}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.relation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
