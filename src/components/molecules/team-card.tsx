import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { TeamMember } from "@/types";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="group text-pure-white relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl shadow-[0_10px_40px_-12px_rgba(29,29,27,0.45)] ring-1 ring-white/10 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_28px_60px_-18px_rgba(29,29,27,0.6)]">
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover transition-transform duration-1200 ease-out group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 360px"
        quality={60}
        loading="lazy"
        decoding="async"
      />

      <div
        aria-hidden
        className="from-deep-black/95 via-deep-black/55 absolute inset-0 bg-linear-to-t to-transparent transition-opacity duration-500 group-hover:from-black"
      />

      <div className="relative z-10 flex flex-col gap-4 p-6 sm:p-7">
        <span
          aria-hidden
          className="bg-pasta-gelb h-px w-10 origin-left transition-all duration-500 group-hover:w-16"
        />

        <div className="flex flex-col gap-2">
          <p className="text-pure-white/70 text-sm leading-snug font-medium">
            {member.role}
          </p>
          <h3 className="font-heading text-2xl leading-tight tracking-tight">
            {member.name}
          </h3>
        </div>

        <p className="text-pure-white/80 text-sm leading-relaxed">
          {member.bio}
        </p>

        {member.externalUrl && (
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/15 pt-4">
            <span className="text-pure-white/60 text-xs font-semibold tracking-[0.35em] uppercase">
              Team Culina
            </span>
            <a
              href={member.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pasta-gelb inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors hover:text-white"
            >
              Profil ansehen
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
