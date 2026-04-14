const team = [
  {
    name: "Dra. Maria Santos",
    role: "Enfermeira Chefe",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=faces",
    description: "COREN ativo, especialista em geriatria com 15 anos de experiência."
  },
  {
    name: "Ana Paula Oliveira",
    role: "Coordenadora de Cuidadores",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=faces",
    description: "Formada em enfermagem, coordena nossa equipe de cuidadores."
  },
  {
    name: "Carlos Eduardo",
    role: "Cuidador Sênior",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=faces",
    description: "8 anos de experiência em cuidados domiciliares."
  },
  {
    name: "Juliana Costa",
    role: "Enfermeira Especialista",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=faces",
    description: "Especialização em cuidados paliativos e dor crônica."
  }
]

export function Team() {
  return (
    <section id="equipe" className="py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
            Nossa Equipe
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground">
            Profissionais dedicados ao seu cuidado
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Nossa equipe é formada por profissionais altamente qualificados e 
            apaixonados pelo que fazem.
          </p>
        </div>

        {/* Team Grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group">
              <div className="aspect-square rounded-xl overflow-hidden bg-muted mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground">
                {member.name}
              </h3>
              <p className="text-primary text-sm mt-1">{member.role}</p>
              <p className="text-muted-foreground text-sm mt-2">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
