"use client";
import { MOCK_ANIME } from "@/lib/mock";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Player() {
  const { id, ep } = useParams<{id:string; ep:string}>();
  const router = useRouter();
  const anime = MOCK_ANIME.find(a=>a.id===id);
  const list = anime ? [...anime.episodes].sort((a,b)=>a.number-b.number) : [];
  const epNum = Number(ep || 1);
  const current = list.find(e=>e.number===epNum) ?? list[0];
  const vRef = useRef<HTMLVideoElement>(null);
  const [info,setInfo] = useState("");

  useEffect(()=>{
    if(!anime || !current) return;
    const key = (n:number)=>`prog:guest:${anime.id}:${n}`;
    const v=vRef.current!;
    function onLoaded(){
      const saved = Number(localStorage.getItem(key(current.number))||0);
      if(saved>0 && saved < (v.duration||0)-5){ v.currentTime=saved; setInfo(`Lanjut di ${Math.floor(saved)} dtk`); }
    }
    function onTime(){
      if(!isFinite(v.duration)) return;
      localStorage.setItem(key(current.number), String(v.currentTime));
    }
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTime);
    return ()=>{ v.removeEventListener("loadedmetadata", onLoaded); v.removeEventListener("timeupdate", onTime); };
  },[anime, current]);

  if(!anime || !current) return <p>Tidak ditemukan.</p>;

  const idx = list.findIndex(e=>e.number===current.number);
  const prev = idx>0 ? list[idx-1] : null;
  const next = idx<list.length-1 ? list[idx+1] : null;

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">{anime.title} — E{current.number}: {current.title}</h2>
      <video ref={vRef} className="aspect-video w-full rounded-2xl bg-black" controls src={current.url}/>
      <p className="text-sm text-gray-500">{info}</p>
      <div className="flex gap-2">
        <button className="rounded-md border px-3 py-1" onClick={()=>prev && router.push(`/watch/${anime.id}/${prev.number}`)} disabled={!prev}>Prev</button>
        <button className="rounded-md border px-3 py-1" onClick={()=>next && router.push(`/watch/${anime.id}/${next.number}`)} disabled={!next}>Next</button>
      </div>
    </section>
  );
}
