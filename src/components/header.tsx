"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="uppercase font-sans text-2xl font-semibold text-foreground">
              Home Luz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="#servicos"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Serviços
            </Link>
            <Link
              href="#sobre"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Sobre Nós
            </Link>
            <Link
              href="#equipe"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Equipe
            </Link>
            <Link
              href="#depoimentos"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Depoimentos
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex gap-3 justify-between">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
              Agendar Consulta
            </Button>

            <Button
              asChild
              variant="outline"
              className="bg-primary/20 hover:bg-primary/30 px-6"
            >
              <Link href="/login">Area do Colaborador</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="#servicos"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </Link>
              <Link
                href="#sobre"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nós
              </Link>
              <Link
                href="#equipe"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Equipe
              </Link>
              <Link
                href="#depoimentos"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Depoimentos
              </Link>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full mt-2">
                Agendar Consulta
              </Button>
               <Button
              asChild
              variant="outline"
              className="bg-primary/20 hover:bg-primary/30 px-6"
            >
              <Link href="/login">Area do Colaborador</Link>
            </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
