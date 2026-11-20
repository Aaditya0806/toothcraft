"use client";

import { Play } from "lucide-react";
import { useState } from "react";

/**
 * Lightweight YouTube embed: shows the video's thumbnail and only loads the
 * player (from the privacy-enhanced youtube-nocookie.com domain) when pressed.
 */
export function VideoCard({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-graphite">
        {playing ? (
          <iframe
            title={title}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 block size-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- remote thumbnail, intentionally not proxied */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-[1600ms] ease-luxe group-hover:scale-105"
            />
            <span aria-hidden className="absolute inset-0 bg-charcoal/35 transition-colors duration-700 group-hover:bg-charcoal/20" />
            <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory text-charcoal shadow-lift transition-all duration-700 ease-luxe group-hover:scale-110 group-hover:bg-gold">
              <Play aria-hidden className="ml-0.5 size-5" strokeWidth={1.5} fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-4 font-display text-[1.35rem] leading-snug text-ivory">{title}</figcaption>
    </figure>
  );
}
