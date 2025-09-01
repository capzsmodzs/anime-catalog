"use server";

type Props = {
  initial?: any;
  submitLabel?: string;
  action: (fd: FormData) => Promise<void>;
  genres?: { id: string; name: string }[];
};

export default function AdminAnimeForm({ initial, submitLabel="Simpan", action }: Props) {
  return (
    <form action={action} className="space-y-3 max-w-xl">
      <div className="space-y-1">
        <label className="block text-sm">Judul</label>
        <input name="title" defaultValue={initial?.title ?? ""} className="w-full rounded border px-3 py-2" required />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="block text-sm">Tahun</label>
          <input name="year" type="number" defaultValue={initial?.year ?? ""} className="w-full rounded border px-3 py-2" required />
        </div>
        <div className="space-y-1">
          <label className="block text-sm">Status</label>
          <select name="status" defaultValue={initial?.status ?? "ONGOING"} className="w-full rounded border px-3 py-2">
            <option value="ONGOING">ONGOING</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm">Cover URL</label>
        <input name="coverUrl" defaultValue={initial?.coverUrl ?? ""} className="w-full rounded border px-3 py-2" />
      </div>

      <div className="space-y-1">
        <label className="block text-sm">Sinopsis</label>
        <textarea name="sinopsis" defaultValue={initial?.sinopsis ?? ""} rows={4} className="w-full rounded border px-3 py-2" />
      </div>

      <button className="rounded border px-4 py-2">{submitLabel}</button>
    </form>
  );
}
