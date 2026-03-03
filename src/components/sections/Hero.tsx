import { Button } from "@/components/ui/button";
import Link from "next/link";
import Silk from "@/components/ui/Silk";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center -mt-20 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Silk color="#C7B8D6" />
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl font-headline tracking-tight text-accent sm:text-6xl md:text-7xl">
          Pamper Yourself at the Best Salon in Town
        </h1>
        <p className="mt-6 text-lg max-w-2xl mx-auto text-foreground/80">
          Experience luxury, comfort, and the latest trends in beauty and wellness.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-7 px-10 transition-transform hover:scale-105">
            <Link href="#contact">Book an Appointment</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
