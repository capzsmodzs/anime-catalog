import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur dark:bg-black/40">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-xl">Anime Catalog</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/search">Search</Link>
          <Link href="/favorites">Favorites</Link>
          <Link href="/continue">Continue</Link>
          <Link href="/login">Login</Link>
          <span className="opacity-40">|</span>
          <Link href="/admin/dashboard">Admin</Link>
        </div>
      </nav>
    </header>
  );
}
