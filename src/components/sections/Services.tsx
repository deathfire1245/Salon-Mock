import Image from "next/image";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const services = [
  {
    imageId: "service-haircut",
    title: "Haircut & Styling",
    description: "Modern cuts, elegant updos, and perfect blowouts to match your style.",
  },
  {
    imageId: "service-coloring",
    title: "Hair Coloring",
    description: "From subtle highlights to bold new colors, our experts create stunning results.",
  },
  {
    imageId: "service-keratin",
    title: "Keratin Treatment",
    description: "Tame frizz and get smooth, shiny hair with our premium keratin treatments.",
  },
  {
    imageId: "service-spa",
    title: "Hair Spa",
    description: "A rejuvenating spa experience for your hair to restore its health and shine.",
  },
  {
    imageId: "service-bridal",
    title: "Bridal & Party Styling",
    description: "Get ready for your big day with our bespoke bridal and special occasion styling.",
  },
  {
    imageId: "service-extensions",
    title: "Hair Extensions",
    description: "Add volume and length to your hair with our high-quality, natural-looking extensions.",
  },
  {
    imageId: "service-blowdry",
    title: "Blow Dry & Straightening",
    description: "Achieve a sleek, polished look with our professional blow-dry and straightening services.",
  },
  {
    imageId: "service-nails",
    title: "Nail Care",
    description: "Luxurious manicures and pedicures to leave your hands and feet feeling rejuvenated.",
  },
  {
    imageId: "service-skincare",
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
          {services.map((service, index) => {
            const image = PlaceHolderImages.find(img => img.id === service.imageId);
            return (
              <Card key={index} className="group overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
                {image && (
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={image.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={image.imageHint}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <CardTitle className="font-headline text-2xl mb-2">{service.title}</CardTitle>
                  <p className="text-muted-foreground flex-grow mb-6">{service.description}</p>
                  <div className="mt-auto">
                    <Link href="/book-appointment" className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all bg-background border border-primary text-primary rounded-md group/button">
                        <span className="w-48 h-48 rounded rotate-[-40deg] bg-primary absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover/button:ml-0 group-hover/button:mb-32 group-hover/button:translate-x-0"></span>
                        <span className="relative w-full text-center transition-colors duration-300 ease-in-out group-hover/button:text-primary-foreground">Book Appointment</span>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
