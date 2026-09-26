const MESSAGE =
  "Seluruh layanan Balmon Jayapura TIDAK DIPUNGUT BIAYA di luar tarif resmi PNBP. Jangan Memberi, Jangan Menerima — Berani Tolak, Berani Laporkan!";

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3L22 20H2L12 3Z" />
      <path d="M12 10v4" />
      <path d="M12 17.5v.5" />
    </svg>
  );
}

export default function AnnouncementBar() {
  return (
    <div role="region" aria-label="Pemberitahuan penting" className="on-dark bg-navy overflow-hidden border-b border-white/20">
      <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4">
        <WarningIcon className="h-4 w-4 shrink-0 text-warning" />
        <div className="marquee min-w-0 flex-1 overflow-hidden border-l border-white/20 pl-2">
          <div className="marquee-track flex w-max whitespace-nowrap">
            <span className="marquee-text shrink-0 pr-12 font-sans text-step--1 font-semibold tracking-wide leading-snug text-warning">
              {MESSAGE}
            </span>
            <span
              className="marquee-text shrink-0 pr-12 font-sans text-step--1 font-semibold tracking-wide leading-snug text-warning"
              aria-hidden="true"
            >
              {MESSAGE}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}