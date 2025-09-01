import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { deleteAnime } from "./actions";

const prisma = new PrismaClient();

export default async function AdminAnimeList() {
  const animes = await prisma.anime.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Kelola Anime</h1>
        <Link href="/admin/anime/new" className="rounded border px-3 py-2">Tambah</Link>
      </div>

      <ul className="grid gap-4 md:grid-cols-3">
        {animes.map((a) => (
          <li key={a.id} className="rounded border p-3">
            <p className="font-medium">{a.title}</p>
            <p className="text-sm text-gray-500">{a.year} · {a.status}</p>
            <div className="mt-2 flex gap-2">
              <Link href={`/admin/anime/${a.id}/edit`} className="rounded border px-2 py-1 text-sm">Edit</Link>

              <form action={async () => { "use server"; await deleteAnime(a.id); }}>
                <button className="rounded border px-2 py-1 text-sm">Hapus</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
