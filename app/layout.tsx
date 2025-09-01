import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Anime Catalog",
  description: "Katalog & pemutar anime",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-white text-black antialiased dark:bg-black dark:text-white">
        <Navbar />
        <main className="mx-auto max-w-6xl p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
