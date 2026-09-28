import pegawaiData from "@/data/pegawai.json";
import { isEmployee } from "@/utils/type-guards";
import { Placeholder } from "@/components/Placeholder";

const employees = (pegawaiData as unknown[]).filter(isEmployee);

export default function DaftarPegawai() {
  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Daftar Pegawai</h1>
        {employees.length === 0 ? (
          <p className="mt-8 text-ink-soft">Belum ada data pegawai yang ditampilkan.</p>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {employees.map((e) => (
              <li key={e.id} className="border border-line bg-white p-5">
                <h2 className="font-display text-step-1 font-bold text-navy-deep">
                  <Placeholder>{e.name}</Placeholder>
                </h2>
                <p className="mt-1 text-ink-soft">
                  <Placeholder>{e.position}</Placeholder>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}