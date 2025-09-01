import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role || "GUEST";
  return (
    <header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur dark:bg-black/40">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-xl">Anime Catalog</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/search">Search</Link>
          <Link href="/favorites">Favorites</Link>
          <Link href="/continue">Continue</Link>
          {session ? (
            <form action="/api/auth/signout?callbackUrl=/" method="post">
              <button className="underline">Logout</button>
            </form>
          ) : (
            <Link href="/login">Login</Link>
          )}
          <span className="opacity-40">|</span>
          {role === "ADMIN" ? <Link href="/admin/dashboard">Admin</Link> : <span className="opacity-50">Admin</span>}
        </div>
      </nav>
    </header>
  );
}
