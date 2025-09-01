import { MOCK_ANIME } from "@/lib/mock";
import Link from "next/link";

export default function Detail({ params }: { params: { id: string }}) {
  const a = MOCK_ANIME.find(x=>x.id===params.id);
  if (!a) return <p>Tidak ditemukan.</p>;
  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={a.cover} alt={a.title} className="h-[360px] w-full rounded-2xl object-cover md:w-[260px]" />
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">{a.title}</h2>
        <p className="text-sm text-gray-500">{a.status} • {a.year}</p>
        <div className="flex flex-wrap gap-2">
          {a.genres.map(g=><span key={g} className="rounded-full border px-2 py-0.5 text-xs">{g}</span>)}
        </div>
        <p>{a.sinopsis}</p>
        <h3 className="mt-4 font-semibold">Episode</h3>
        <ul className="list-disc pl-5">
          {a.episodes.map(e=>(
            <li key={e.number}><Link className="underline" href={`/watch/${a.id}/${e.number}`}>E{e.number} — {e.title}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
