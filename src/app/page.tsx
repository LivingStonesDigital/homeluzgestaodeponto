import { About } from "@/components/about";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Team } from "@/components/team";
import { Testimonials } from "@/components/testimonials";

function Page() {
  return (
    <main className="min-h-screen bg-[#000618]">
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

export default Page;
