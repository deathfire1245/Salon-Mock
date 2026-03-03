import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import AIStyleAdvisor from '@/components/sections/AIStyleAdvisor';
import Services from '@/components/sections/Services';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <AIStyleAdvisor />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
