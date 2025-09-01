import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Anime Catalog",
  description: "Katalog & pemutar anime",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-white text-black antialiased dark:bg-black dark:text-white">
        <AuthProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl p-4">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
