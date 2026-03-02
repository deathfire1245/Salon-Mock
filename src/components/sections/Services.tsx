import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Palette, Sparkles, Hand, Smile } from "lucide-react";

const services = [
  {
    icon: <Scissors className="h-10 w-10 text-primary" />,
    title: "Haircuts & Styling",
    description: "Modern cuts, elegant updos, and perfect blowouts to match your style.",
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: "Hair Coloring",
    description: "From subtle highlights to bold new colors, our experts create stunning results.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Specialty Styling",
    description: "Get ready for your big day with our bridal and special occasion styling.",
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
            <Card key={index} className="text-center group hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
