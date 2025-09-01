"use client";
import { GENRES } from "@/lib/mock";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filters() {
  const sp = useSearchParams();
  const router = useRouter();
  const q = sp.get("q") ?? "";
  const genre = sp.get("genre") ?? "";
  const status = sp.get("status") ?? "";
  const sort = sp.get("sort") ?? "newest";

  function update(upd: Record<string,string>) {
    const n = new URLSearchParams(sp.toString());
    Object.entries(upd).forEach(([k,v]) => v ? n.set(k,v) : n.delete(k));
    router.push(`/?${n.toString()}`);
  }

  return (
    <section className="mb-4 flex flex-wrap gap-2">
      <input
        defaultValue={q}
        onChange={(e)=>update({ q: e.target.value })}
        placeholder="Cari judul..."
        className="rounded-lg border px-3 py-2"
      />
      <select defaultValue={genre} onChange={(e)=>update({ genre: e.target.value })} className="rounded-lg border px-3 py-2">
        <option value="">Semua Genre</option>
        {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
      </select>
      <select defaultValue={status} onChange={(e)=>update({ status: e.target.value })} className="rounded-lg border px-3 py-2">
        <option value="">Semua Status</option>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
      <select defaultValue={sort} onChange={(e)=>update({ sort: e.target.value })} className="rounded-lg border px-3 py-2">
        <option value="newest">Terbaru</option>
        <option value="popular">Populer</option>
        <option value="title">Judul A-Z</option>
      </select>
    </section>
  );
}
