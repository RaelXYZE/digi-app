import { Placeholder } from "@/components/Placeholder";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";
import { getPegawai } from "@/utils/api";
import type { Employee } from "@/types";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function Avatar({ employee }: { employee: Employee }) {
  if (employee.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- pegawai foto, no optimization needed
      <img
        src={employee.image}
        alt={`Foto ${employee.name}`}
        loading="lazy"
        width={96}
        height={128}
        className="w-24 shrink-0 aspect-[3/4] rounded-md border border-line bg-mist object-cover"
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="flex w-24 shrink-0 aspect-[3/4] items-center justify-center rounded-md bg-mist font-display text-step-0 font-bold text-navy-deep"
    >
      {initials(employee.name)}
    </div>
  );
}

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
              <li key={e.id} className="flex gap-4 border border-line bg-white p-5">
                <Avatar employee={e} />
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
