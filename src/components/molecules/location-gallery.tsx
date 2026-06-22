import Image from "next/image";
import type { GalleryImage } from "@/types";

interface LocationGalleryProps {
  images: GalleryImage[];
}

export function LocationGallery({ images }: LocationGalleryProps) {
  return (
    <section className="py-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {images.map((image) => (
          <div
            key={image.alt}
            className="group bg-muted relative aspect-2/3 overflow-hidden rounded-2xl shadow-xs transition-all duration-300 hover:shadow-md"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 17vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <p className="pointer-events-none absolute bottom-0 left-0 line-clamp-2 w-full translate-y-2 px-3 pb-3 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {image.alt}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
