import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";

const Gallery = () => {
  const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith("gallery-"));

  return (
    <section id="gallery" className="py-20 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline tracking-tight text-accent sm:text-4xl">
            Our Gallery
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/80">
            A glimpse into the transformations and artistry at EleganceHaven.
          </p>
        </div>
        
        {galleryImages.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <div key={image.id} className="break-inside-avoid">
                 <Card className="overflow-hidden group">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={400}
                    height={600}
                    className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={image.imageHint}
                  />
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Gallery images are not available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default Gallery;
