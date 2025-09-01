import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const g = await prisma.$transaction(
    ["Action","Adventure","Comedy","Drama","Fantasy","Sci-Fi"].map(name =>
      prisma.genre.upsert({ where:{ name }, update:{}, create:{ name } })
    )
  );
  const gid = (name:string)=> g.find(x=>x.name===name)!.id;

  await prisma.anime.create({
    data:{
      title:"Sky Blazers", slug:"sky-blazers", coverUrl:"https://picsum.photos/seed/a1/400/600",
      status:"ONGOING", year:2025, sinopsis:"Tim pilot muda menembus batas langit.", popularity:98,
      genres:{ create:[ { genreId: gid("Action") }, { genreId: gid("Adventure") } ]},
      episodes:{ create:[
        { number:1, title:"Takeoff",  duration:600, sourceType:"URL", sourceUrl:"https://www.w3schools.com/html/mov_bbb.mp4" },
        { number:2, title:"Crosswind",duration:720, sourceType:"URL", sourceUrl:"https://www.w3schools.com/html/movie.mp4" }
      ]}
    }
  });

  await prisma.anime.create({
    data:{
      title:"Echo of Avalon", slug:"echo-of-avalon", coverUrl:"https://picsum.photos/seed/a2/400/600",
      status:"COMPLETED", year:2024, sinopsis:"Legenda pedang yang bergema kembali.", popularity:86,
      genres:{ create:[ { genreId: gid("Drama") }, { genreId: gid("Fantasy") } ]},
      episodes:{ create:[
        { number:1, title:"Awakening", duration:540, sourceType:"URL", sourceUrl:"https://www.w3schools.com/html/mov_bbb.mp4" },
        { number:2, title:"Trial",     duration:540, sourceType:"URL", sourceUrl:"https://www.w3schools.com/html/movie.mp4" }
      ]}
    }
  });

  await prisma.anime.create({
    data:{
      title:"Quantum Beat", slug:"quantum-beat", coverUrl:"https://picsum.photos/seed/a3/400/600",
      status:"ONGOING", year:2025, sinopsis:"DJ kuantum menggoyang multisemesta.", popularity:74,
      genres:{ create:[ { genreId: gid("Sci-Fi") }, { genreId: gid("Comedy") } ]},
      episodes:{ create:[
        { number:1, title:"Phase Shift", duration:480, sourceType:"URL", sourceUrl:"https://www.w3schools.com/html/mov_bbb.mp4" },
        { number:2, title:"Entangle",    duration:660, sourceType:"URL", sourceUrl:"https://www.w3schools.com/html/movie.mp4" }
      ]}
    }
  });

  console.log("Seed OK");
}

main().catch(e=>{ console.error(e); process.exit(1); })
.finally(async ()=>{ await prisma.$disconnect(); });
