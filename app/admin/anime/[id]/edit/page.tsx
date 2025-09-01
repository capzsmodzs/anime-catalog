import { PrismaClient } from "@prisma/client";
import AdminAnimeForm from "@/components/AdminAnimeForm";
import { updateAnime } from "../../actions";

const prisma = new PrismaClient();

export default async function EditAnime({ params }: { params: { id: string } }) {
  const [anime, genres] = await Promise.all([
    prisma.anime.findUnique({ where: { id: params.id }, include: { genres: true } }),
    prisma.genre.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!anime) return <p>Tidak ditemukan.</p>;

  const initial = {
    id: anime.id,
    title: anime.title,
    year: anime.year,
    status: anime.status,
    coverUrl: anime.coverUrl,
    sinopsis: anime.sinopsis,
  };

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Edit: {anime.title}</h1>
      <AdminAnimeForm
        genres={genres}
        initial={initial as any}
        submitLabel="Update"
        action={async (fd)=>{ "use server"; await updateAnime(anime.id, fd); }}
      />
    </section>
  );
}
