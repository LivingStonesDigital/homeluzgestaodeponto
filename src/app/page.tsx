import { About } from "@/components/about";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Team } from "@/components/team";
import { Testimonials } from "@/components/testimonials";
import React from "react";

function page() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <Team />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}

export default page;
