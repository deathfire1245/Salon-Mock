'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";

const Hero = () => {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-main");

  return (
    <section id="home" className="relative h-screen flex items-center justify-center -mt-20 overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover object-center"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div className="relative z-10 px-4 w-full max-w-4xl text-center">
        <h1 className="font-headline font-bold tracking-tighter text-white text-7xl sm:text-9xl md:text-[10rem] leading-none overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-left"
          >
            YOUR
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="text-right -mt-4 sm:-mt-8"
          >
            SALON
          </motion.div>
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="mt-6 text-lg max-w-2xl mx-auto text-white/90"
        >
          Experience luxury, comfort, and the latest trends in beauty and wellness.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="mt-10"
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-7 px-10 transition-transform hover:scale-105">
            <Link href="/">Book an Appointment</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
