import { Placeholder } from "@/components/Placeholder";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";
import { getPegawai } from "@/utils/api";

export default async function DaftarPegawai() {
  const employees = await getPegawai().catch(() => null);

  return (
    <section className="section bg-white bleed bleed-white">
      <div className="wrap">
        <h1 className="text-step-3 font-bold text-navy-deep">Daftar Pegawai</h1>
        {employees === null ? (
          <EmptyState
            variant="error"
            message="Daftar pegawai sedang tidak dapat dimuat dari server. Silakan coba lagi sebentar."
            actionHref="/profil/daftar-pegawai"
            actionLabel="Coba muat ulang"
          />
        ) : employees.length === 0 ? (
          <EmptyState
            variant="empty"
            message="Belum ada data pegawai yang ditampilkan."
          />
        ) : (
          <Reveal stagger>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {employees.map((e) => (
              <li key={e.id} className="border border-line bg-white p-5">
                <div>
                  <h2 className="font-display text-step-0 leading-snug font-bold text-navy-deep">
                    <Placeholder>{e.name}</Placeholder>
                  </h2>
                  <p className="mt-1 text-ink-soft">
                    <Placeholder>{e.position}</Placeholder>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
