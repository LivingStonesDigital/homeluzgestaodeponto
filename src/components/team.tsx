"use client"

import { Globe, Mail } from "lucide-react"

const team = [
  {
    name: "Dra. Maria Santos",
    role: "Enfermeira Chefe",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=600&fit=crop&crop=faces",
    description: "COREN ativo, especialista em geriatria com 15 anos de experiencia.",
  },
  {
    name: "Ana Paula Oliveira",
    role: "Coordenadora de Cuidadores",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=600&fit=crop&crop=faces",
    description: "Formada em enfermagem, coordena nossa equipe de cuidadores.",
  },
  {
    name: "Carlos Eduardo",
    role: "Cuidador Senior",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=600&fit=crop&crop=faces",
    description: "8 anos de experiencia em cuidados domiciliares.",
  },
  {
    name: "Juliana Costa",
    role: "Enfermeira Especialista",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=500&h=600&fit=crop&crop=faces",
    description: "Especializacao em cuidados paliativos e dor cronica.",
  },
]

export function Team() {
  return (
    <section id="equipe" className="py-28 lg:py-36 bg-[#f8f6f0] relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gold-primary/3 blur-3xl" />
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[#000618]/[0.02] blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
          <span className="text-gold-primary font-bold text-sm tracking-[0.2em] uppercase">
            Nossa Equipe
          </span>
          <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#000618] mt-4 leading-[1.05] tracking-tight">
            Profissionais dedicados
            <br />
            <span className="text-gold-primary">ao seu cuidado</span>
          </h2>
          <p className="mt-4 text-[#000618]/60 text-lg leading-relaxed">
            Nossa equipe e formada por profissionais altamente qualificados e apaixonados pelo que fazem.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${200 + index * 150}ms` }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white mb-5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000618]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                  <button className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-gold-primary transition-colors">
                    <Globe className="w-4 h-4 text-white" />
                  </button>
                  <button className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-gold-primary transition-colors">
                    <Mail className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              <h3 className="font-headline text-lg font-bold text-[#000618]">{member.name}</h3>
              <p className="text-gold-primary text-sm font-medium mt-1">{member.role}</p>
              <p className="text-[#000618]/50 text-sm mt-2 leading-relaxed">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
