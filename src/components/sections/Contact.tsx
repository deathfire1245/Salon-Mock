"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const contactInfo = [
  { icon: MapPin, text: "123 Beauty Lane, Glamour City, 12345" },
  { icon: Phone, text: "(123) 456-7890" },
  { icon: Mail, text: "contact@elegancehaven.com" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline tracking-tight text-accent sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/80">
            We can't wait to welcome you. Book your appointment today.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col items-center justify-center text-center p-8 bg-secondary/30 rounded-lg">
                <h3 className="text-2xl font-headline mb-6">Book an Appointment</h3>
                <p className="mb-6 text-foreground/80">Ready for a transformation? Schedule your visit with our expert stylists now.</p>
                <Button asChild size="lg">
                    <Link href="/book-appointment">Book Now</Link>
                </Button>
            </div>
          <div className="space-y-8">
            <h3 className="text-2xl font-headline text-center lg:text-left">Contact Information</h3>
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <item.icon className="h-8 w-8 text-primary flex-shrink-0" />
                <span className="text-lg text-foreground/80">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
