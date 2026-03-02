import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Jessica M.",
    avatar: "JM",
    review:
      "EleganceHaven is my go-to salon! The atmosphere is so relaxing, and my stylist always knows exactly what I want. I leave feeling beautiful and refreshed every single time.",
  },
  {
    name: "Samantha P.",
    avatar: "SP",
    review:
      "I had my wedding hair and makeup done here, and it was perfect. The team was so professional and made my special day even more memorable. I can't recommend them enough!",
  },
  {
    name: "Emily R.",
    avatar: "ER",
    review:
      "The best facial I've ever had! The esthetician was incredibly knowledgeable and customized the treatment for my skin. My face has never felt so soft and looked so radiant.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline tracking-tight text-accent sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/80">
            We are proud to have earned the trust of our amazing clients.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <p className="text-foreground/80 mb-6 italic">
                        "{testimonial.review}"
                      </p>
                      <div className="flex items-center">
                        <Avatar className="mr-4">
                           <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <p className="font-bold text-foreground">
                          - {testimonial.name}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
