import AdminAnimeForm from "@/components/AdminAnimeForm";
import { createAnime } from "../actions";

export default function NewAnime() {
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Tambah Anime</h1>
      <AdminAnimeForm submitLabel="Create" action={async (fd)=>{ "use server"; await createAnime(fd); }} />
    </section>
  );
}
