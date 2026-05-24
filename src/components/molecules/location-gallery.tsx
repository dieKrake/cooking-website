import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types";

interface LocationGalleryProps {
  images: GalleryImage[];
}

const spanClasses: Record<string, string> = {
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  default: "",
};

export function LocationGallery({ images }: LocationGalleryProps) {
  return (
    <section className="py-12">
      {/* Mobile: horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto pb-4 md:hidden">
        {images.map((image) => (
          <div
            key={image.alt}
            className="relative aspect-4/3 w-72 shrink-0 overflow-hidden rounded-xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="288px"
            />
          </div>
        ))}
      </div>

      {/* Desktop: Bento Grid */}
      <div className="hidden gap-3 md:grid md:auto-rows-[220px] md:grid-cols-3">
        {images.map((image) => (
          <div
            key={image.alt}
            className={cn(
              "group relative overflow-hidden rounded-xl",
              spanClasses[image.span ?? "default"],
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 1280px) 33vw, 400px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <p className="absolute bottom-0 left-0 w-full translate-y-2 px-4 pb-4 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {image.alt}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
