"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const prisma = new PrismaClient();

const animeSchema = z.object({
  title: z.string().min(1).max(200),
  coverUrl: z.string().url(),
  status: z.enum(["ONGOING","COMPLETED"]),
  year: z.coerce.number().int().min(1900).max(2100),
  sinopsis: z.string().min(1),
  genresCSV: z.string().optional().default(""),
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)+/g,"");
}

export async function createAnime(_: any, formData: FormData) {
  const parsed = animeSchema.safeParse({
    title: formData.get("title"),
    coverUrl: formData.get("coverUrl"),
    status: formData.get("status"),
    year: formData.get("year"),
    sinopsis: formData.get("sinopsis"),
    genresCSV: formData.get("genresCSV") ?? "",
  });
  if (!parsed.success) return { ok:false, error: parsed.error.flatten() };

  const { title, coverUrl, status, year, sinopsis, genresCSV } = parsed.data;
  const slug = slugify(title);

  // genre connect: nama dipisah koma
  const names = genresCSV.split(",").map(s=>s.trim()).filter(Boolean);
  const genresCreate = await Promise.all(
    names.map(async name => {
      const g = await prisma.genre.upsert({ where:{ name }, update:{}, create:{ name } });
      return { genreId: g.id };
    })
  );

  await prisma.anime.create({
    data:{
      title, slug, coverUrl, status, year, sinopsis,
      genres: { create: genresCreate }
    }
  });

  revalidatePath("/admin/anime");
  redirect("/admin/anime");
}

export async function updateAnime(id: string, formData: FormData) {
  const parsed = animeSchema.safeParse({
    title: formData.get("title"),
    coverUrl: formData.get("coverUrl"),
    status: formData.get("status"),
    year: formData.get("year"),
    sinopsis: formData.get("sinopsis"),
    genresCSV: formData.get("genresCSV") ?? "",
  });
  if (!parsed.success) return { ok:false, error: parsed.error.flatten() };

  const { title, coverUrl, status, year, sinopsis, genresCSV } = parsed.data;
  const slug = slugify(title);

  const names = genresCSV.split(",").map(s=>s.trim()).filter(Boolean);
  const genres = await Promise.all(
    names.map(async name => {
      const g = await prisma.genre.upsert({ where:{ name }, update:{}, create:{ name } });
      return g.id;
    })
  );

  await prisma.$transaction([
    prisma.anime.update({
      where:{ id },
      data:{ title, slug, coverUrl, status, year, sinopsis }
    }),
    prisma.animeGenre.deleteMany({ where:{ animeId: id } }),
    ...(genres.length
      ? [prisma.anime.update({
          where:{ id },
          data:{ genres:{ create: genres.map(genreId => ({ genreId })) } }
        })]
      : [])
  ]);

  revalidatePath("/admin/anime");
  redirect("/admin/anime");
}

export async function deleteAnime(id: string) {
  await prisma.anime.delete({ where:{ id } });
  revalidatePath("/admin/anime");
  return { ok:true };
}
