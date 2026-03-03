import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors, Palette, Sparkles, Hand, Smile, Crown, Waves, Gem, Wind } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <Scissors className="h-10 w-10 text-primary" />,
    title: "Haircut & Styling",
    description: "Modern cuts, elegant updos, and perfect blowouts to match your style.",
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: "Hair Coloring",
    description: "From subtle highlights to bold new colors, our experts create stunning results.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Keratin Treatment",
    description: "Tame frizz and get smooth, shiny hair with our premium keratin treatments.",
  },
  {
    icon: <Waves className="h-10 w-10 text-primary" />,
    title: "Hair Spa",
    description: "A rejuvenating spa experience for your hair to restore its health and shine.",
  },
  {
    icon: <Crown className="h-10 w-10 text-primary" />,
    title: "Bridal & Party Styling",
    description: "Get ready for your big day with our bespoke bridal and special occasion styling.",
  },
  {
    icon: <Gem className="h-10 w-10 text-primary" />,
    title: "Hair Extensions",
    description: "Add volume and length to your hair with our high-quality, natural-looking extensions.",
  },
  {
    icon: <Wind className="h-10 w-10 text-primary" />,
    title: "Blow Dry & Straightening",
    description: "Achieve a sleek, polished look with our professional blow-dry and straightening services.",
  },
  {
    icon: <Hand className="h-10 w-10 text-primary" />,
    title: "Nail Care",
    description: "Luxurious manicures and pedicures to leave your hands and feet feeling rejuvenated.",
  },
  {
    icon: <Smile className="h-10 w-10 text-primary" />,
    title: "Facials & Skincare",
    description: "Customized facial treatments to nourish your skin and reveal a radiant glow.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline tracking-tight text-accent sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/80">
            Indulge in our wide range of professional beauty and wellness treatments.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="text-center group hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center">
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
              <CardFooter className="justify-center pt-4">
                <Button asChild>
                  <Link href="/book-appointment">Book Appointment</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
