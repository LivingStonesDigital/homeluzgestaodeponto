"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#servicos", label: "Servicos" },
  { href: "#sobre", label: "Sobre Nos" },
  { href: "#equipe", label: "Equipe" },
  { href: "#depoimentos", label: "Depoimentos" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-slide-down",
        "bg-[#000618]/70 backdrop-blur-lg border-b border-white/5",
        scrolled && "bg-[#000618]/90 backdrop-blur-xl",
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gold-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-[#000618] font-headline font-extrabold text-sm">H</span>
            </div>
            <span className="font-headline text-xl font-bold text-white tracking-tight">
              Home<span className="text-gold-primary">Luz</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-medium tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/5"
            >
              <Link href="/login">Area do Colaborador</Link>
            </Button>
            <Button className="bg-gold-primary hover:bg-gold-dark text-[#000618] font-bold shadow-lg shadow-gold-primary/20">
              Agendar Consulta
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors py-2 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Button className="bg-gold-primary hover:bg-gold-dark text-[#000618] font-bold w-full">
                  Agendar Consulta
                </Button>
                <Button asChild variant="ghost" className="text-white/60 hover:text-white w-full">
                  <Link href="/login">Area do Colaborador</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
