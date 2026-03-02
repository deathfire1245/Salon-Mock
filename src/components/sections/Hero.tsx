import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

const Hero = () => {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-main");

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white -mt-20">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl font-headline tracking-tight text-white sm:text-6xl md:text-7xl">
          Pamper Yourself at the Best Salon in Town
        </h1>
        <p className="mt-6 text-lg max-w-2xl mx-auto text-white/90">
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
