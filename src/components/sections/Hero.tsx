import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center -mt-20 overflow-hidden bg-background">
      <div className="relative z-10 px-4 w-full max-w-4xl">
        <h1 className="font-headline font-bold tracking-tighter text-accent text-7xl sm:text-9xl md:text-[10rem] leading-none">
          <div className="text-left">YOUR</div>
          <div className="text-right -mt-4 sm:-mt-8">SALON</div>
        </h1>
        <p className="mt-6 text-lg max-w-2xl mx-auto text-foreground/80 text-center">
          Experience luxury, comfort, and the latest trends in beauty and wellness.
        </p>
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-7 px-10 transition-transform hover:scale-105">
            <Link href="/">Book an Appointment</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
