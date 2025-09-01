import AnimeCard from "@/components/AnimeCard";
import Filters from "@/components/Filters";
import { MOCK_ANIME } from "@/lib/mock";

function applyFilters(params: URLSearchParams) {
  const q = (params.get("q") ?? "").toLowerCase();
  const genre = params.get("genre") ?? "";
  const status = params.get("status") ?? "";
  const sort = params.get("sort") ?? "newest";
  let list = [...MOCK_ANIME];
  if (q) list = list.filter(a => a.title.toLowerCase().includes(q));
  if (genre) list = list.filter(a => a.genres.includes(genre));
  if (status) list = list.filter(a => a.status === status);
  if (sort === "newest") list.sort((a,b)=>b.year-a.year);
  if (sort === "popular") list.sort((a,b)=>b.popularity-a.popularity);
  if (sort === "title") list.sort((a,b)=>a.title.localeCompare(b.title));
  return list;
}

export default async function Home({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const spObj = await searchParams;
  const sp = new URLSearchParams(
    Object.entries(spObj).flatMap(([k,v]) => v ? [[k, Array.isArray(v)?v[0]:v]] : [])
  );
  const list = applyFilters(sp);
  return (
    <section>
      <Filters />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {list.map(a => <AnimeCard key={a.id} a={a} />)}
      </div>
    </section>
  );
}
