import { PrismaClient } from "@prisma/client";
import AdminAnimeForm from "@/components/AdminAnimeForm";
import { createAnime } from "../actions";

const prisma = new PrismaClient();

export default async function NewAnime() {
  const genres = await prisma.genre.findMany({ orderBy: { name: "asc" } });
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Tambah Anime</h1>
      <AdminAnimeForm genres={genres} onSubmit={createAnime} />
    </section>
  );
}
