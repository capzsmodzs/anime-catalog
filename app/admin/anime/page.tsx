import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { deleteAnime } from "./actions";

const prisma = new PrismaClient();

export default async function AdminAnimeList() {
  const list = await prisma.anime.findMany({
    orderBy: { updatedAt: "desc" },
    include: { genres: { include: { genre: true } } },
  });

  async function onDelete(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await deleteAnime(id);
  }

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Anime — Admin</h1>
        <Link href="/admin/anime/new" className="rounded-lg border px-3 py-2">+ Tambah</Link>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-[720px] w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Slug</th>
              <th className="p-2">Year</th>
              <th className="p-2">Status</th>
              <th className="p-2">Genres</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {list.map(a => (
              <tr key={a.id} className="border-b">
                <td className="p-2">{a.title}</td>
                <td className="p-2">{a.slug}</td>
                <td className="p-2 text-center">{a.year}</td>
                <td className="p-2 text-center">{a.status}</td>
                <td className="p-2">
                  {a.genres.map(g => g.genre.name).join(", ")}
                </td>
                <td className="p-2 flex gap-2">
                  <Link href={`/admin/anime/${a.id}/edit`} className="rounded-md border px-2 py-1">Edit</Link>
                  <form action={onDelete}>
                    <input type="hidden" name="id" value={a.id} />
                    <button className="rounded-md border px-2 py-1"
                      onClick={(e) => { if (!confirm("Hapus data ini?")) e.preventDefault(); }}>
                      Hapus
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td className="p-4 text-center text-gray-500" colSpan={6}>Belum ada data.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
