"use client";
import { useState } from "react";
import type { Genre, Anime } from "@prisma/client";

export default function AdminAnimeForm({
  genres, initial, onSubmit,
}: {
  genres: Genre[];
  initial?: Anime & { genreIds?: string[] };
  onSubmit: (fd: FormData) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    await onSubmit(fd);
    setLoading(false);
  }

  const checked = new Set(initial?.genreIds || []);
  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-2xl">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm">Title</span>
          <input name="title" defaultValue={initial?.title}
            className="w-full rounded-lg border px-3 py-2" required />
        </label>
        <label className="space-y-1">
          <span className="text-sm">Slug</span>
          <input name="slug" defaultValue={initial?.slug}
            className="w-full rounded-lg border px-3 py-2" required />
        </label>
        <label className="space-y-1 md:col-span-2">
          <span className="text-sm">Cover URL</span>
          <input name="coverUrl" defaultValue={initial?.coverUrl}
            className="w-full rounded-lg border px-3 py-2" />
        </label>
        <label className="space-y-1">
          <span className="text-sm">Status</span>
          <select name="status" defaultValue={initial?.status || "ONGOING"}
            className="w-full rounded-lg border px-3 py-2">
            <option value="ONGOING">ONGOING</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-sm">Year</span>
          <input name="year" type="number" defaultValue={initial?.year || 2025}
            className="w-full rounded-lg border px-3 py-2" />
        </label>
        <label className="space-y-1">
          <span className="text-sm">Popularity</span>
          <input name="popularity" type="number" defaultValue={initial?.popularity || 0}
            className="w-full rounded-lg border px-3 py-2" />
        </label>
      </div>

      <label className="space-y-1 block">
        <span className="text-sm">Sinopsis</span>
        <textarea name="sinopsis" defaultValue={initial?.sinopsis}
          className="w-full rounded-lg border px-3 py-2 min-h-28" />
      </label>

      <div className="space-y-2">
        <div className="text-sm font-medium">Genres</div>
        <div className="flex flex-wrap gap-2">
          {genres.map(g => (
            <label key={g.id} className="flex items-center gap-1 border rounded-md px-2 py-1 text-sm">
              <input type="checkbox" name="genres" value={g.id}
                defaultChecked={checked.has(g.id)} />
              {g.name}
            </label>
          ))}
        </div>
      </div>

      <button disabled={loading} className="rounded-lg border px-4 py-2">
        {loading ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}
