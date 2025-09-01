"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PrismaClient, AnimeStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function createAnime(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slug  = String(formData.get("slug")  || "").trim();
  const coverUrl = String(formData.get("coverUrl") || "");
  const status = String(formData.get("status") || "ONGOING") as AnimeStatus;
  const year = Number(formData.get("year") || 2025);
  const sinopsis = String(formData.get("sinopsis") || "");
  const popularity = Number(formData.get("popularity") || 0);
  const genres = (formData.getAll("genres") as string[]) || [];

  if (!title || !slug) throw new Error("Title dan slug wajib.");

  await prisma.anime.create({
    data: {
      title, slug, coverUrl, status, year, sinopsis, popularity,
      genres: { create: genres.map((genreId) => ({ genreId })) },
    },
  });

  revalidatePath("/admin/anime");
  redirect("/admin/anime");
}

export async function updateAnime(id: string, formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slug  = String(formData.get("slug")  || "").trim();
  const coverUrl = String(formData.get("coverUrl") || "");
  const status = String(formData.get("status") || "ONGOING") as AnimeStatus;
  const year = Number(formData.get("year") || 2025);
  const sinopsis = String(formData.get("sinopsis") || "");
  const popularity = Number(formData.get("popularity") || 0);
  const genres = (formData.getAll("genres") as string[]) || [];

  await prisma.$transaction([
    prisma.anime.update({
      where: { id },
      data: { title, slug, coverUrl, status, year, sinopsis, popularity },
    }),
    prisma.animeGenre.deleteMany({ where: { animeId: id } }),
    prisma.animeGenre.createMany({
      data: genres.map((genreId) => ({ animeId: id, genreId })),
      skipDuplicates: true,
    }),
  ]);

  revalidatePath("/admin/anime");
  redirect("/admin/anime");
}

export async function deleteAnime(id: string) {
  await prisma.anime.delete({ where: { id } });
  revalidatePath("/admin/anime");
}
