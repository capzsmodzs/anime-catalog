import Image from "next/image";
import Link from "next/link";
import type { Anime } from "@/lib/types";

export default function AnimeCard({ a }: { a: Anime }) {
  return (
    <article className="overflow-hidden rounded-2xl border shadow-sm">
      <Link href={`/detail/${a.id}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.cover} alt={a.title} className="h-64 w-full object-cover" />
      </Link>
      <div className="space-y-2 p-3">
        <div className="flex flex-wrap gap-1">
          {a.genres.map(g => (
            <span key={g} className="rounded-full border px-2 py-0.5 text-xs text-blue-700">
              {g}
            </span>
          ))}
        </div>
        <h3 className="line-clamp-1 font-semibold">
          <Link href={`/detail/${a.id}`}>{a.title}</Link>
        </h3>
        <p className="text-xs text-gray-500">{a.status} • {a.year}</p>
        <div className="flex items-center gap-2">
          <Link className="rounded-md border px-3 py-1 text-sm" href={`/watch/${a.id}/1`}>▶ Tonton E1</Link>
          <button className="rounded-md border px-3 py-1 text-sm" aria-label="favorit">☆ Favorit</button>
        </div>
      </div>
    </article>
  );
}
