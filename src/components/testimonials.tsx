"use client"

import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "A HomeLuz transformou a vida da minha mae. Os cuidadores sao extremamente atenciosos e profissionais. Recomendo de olhos fechados.",
    author: "Roberto Almeida",
    relation: "Filho de paciente",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
  },
  {
    quote: "Depois de muita pesquisa, encontramos a HomeLuz. A tranquilidade de saber que meu pai esta em boas maos nao tem preco.",
    author: "Fernanda Lima",
    relation: "Filha de paciente",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces",
  },
  {
    quote: "Profissionalismo, carinho e dedicacao. A enfermeira que cuida da minha avo se tornou parte da familia. Excelente servico!",
    author: "Marcos Pereira",
    relation: "Neto de paciente",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces",
  },
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-28 lg:py-36 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold-primary/3 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
          <span className="text-gold-primary font-bold text-sm tracking-[0.2em] uppercase">
            Depoimentos
          </span>
          <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#000618] mt-4 leading-[1.05] tracking-tight">
            O que dizem as familias
            <br />
            <span className="text-gold-primary">que confiam em nos</span>
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-[#f8f6f0] rounded-3xl p-8 group hover:bg-white hover:shadow-2xl hover:shadow-[#000618]/5 transition-all duration-500 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${200 + index * 150}ms` }}
            >
              <Quote className="h-8 w-8 text-gold-primary/30 mb-6" />
              <p className="text-[#000618]/70 leading-relaxed text-sm">
                {`"${testimonial.quote}"`}
              </p>
              <div className="mt-8 pt-6 border-t border-[#000618]/5 flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-gold-primary/20"
                />
                <div>
                  <p className="font-headline font-bold text-[#000618] text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-[#000618]/50 text-xs mt-0.5">{testimonial.relation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
