import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image) => (
              <Card key={image.id} className="overflow-hidden group relative rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={image.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-headline translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {image.description}
                  </p>
                </div>
              </Card>
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
