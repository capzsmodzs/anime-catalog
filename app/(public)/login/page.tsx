"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const sp = useSearchParams();
  const router = useRouter();
  const callbackUrl = sp.get("callbackUrl") || "/";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", { redirect: false, email, password, callbackUrl });
    setLoading(false);
    if (!res) return;
    if (res.ok) router.push(callbackUrl);
    else alert(res.error || "Login gagal");
  }

  return (
    <div className="mx-auto max-w-sm space-y-4">
      <h1 className="text-xl font-semibold">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="block text-sm">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-lg border px-3 py-2" placeholder="you@example.com"/>
        </div>
        <div className="space-y-1">
          <label className="block text-sm">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-lg border px-3 py-2" placeholder="••••••••"/>
        </div>
        <button disabled={loading} className="w-full rounded-lg border px-3 py-2">{loading ? "Memproses..." : "Masuk"}</button>
      </form>
      <p className="text-sm text-gray-500">Akun admin seed: <code>admin@site.test</code> / <code>admin123</code></p>
    </div>
  );
}
