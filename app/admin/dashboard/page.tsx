import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  return (
    <section className="space-y-3">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <p>Halo, {session?.user?.name ?? "Admin"}.</p>
      <ul className="list-disc pl-5 text-sm text-gray-600">
        <li>Rencana: CRUD Anime, Episode, Uploads</li>
        <li>Akses ini hanya untuk role <code>ADMIN</code></li>
      </ul>
    </section>
  );
}
