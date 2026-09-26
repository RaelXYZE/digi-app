import { formatDate } from "@/utils/format-date";
import { ExternalLink } from "@/components/external-link";
import { Placeholder } from "@/components/Placeholder";

type Props = {
  title: string;
  date?: string;
  category?: string;
  summary?: string;
  url?: string;
  showImagePlaceholder?: boolean;
};

const cardClass =
  "flex h-full min-h-11 flex-col border border-line bg-white p-5 text-navy-deep transition-colors hover:border-brand hover:bg-mist no-underline";

function Meta({ date, category }: { date?: string; category?: string }) {
  if (!date && !category) return null;
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-step--1">
      {category && (
        <span className="bg-mist px-2 py-0.5 font-semibold text-navy-deep">{category}</span>
      )}
      {date && (
        <time dateTime={date} className="text-ink-soft">
          {formatDate(date)}
        </time>
      )}
    </div>
  );
}

function Content({
  title,
  date,
  category,
  summary,
  showImagePlaceholder,
}: Omit<Props, "url">) {
  return (
    <>
      {showImagePlaceholder && (
        <div className="mb-4 flex aspect-video items-center justify-center border border-line bg-mist">
          <Placeholder>{"[ISI: Foto kegiatan]"}</Placeholder>
        </div>
      )}
      <h2 className="font-display text-step-1 font-bold text-navy-deep">
        <Placeholder>{title}</Placeholder>
      </h2>
      <Meta date={date} category={category} />
      {summary && (
        <p className="mt-2 flex-1 text-ink-soft">
          <Placeholder>{summary}</Placeholder>
        </p>
      )}
    </>
  );
}

export function PublicationCard({
  title,
  date,
  category,
  summary,
  url,
  showImagePlaceholder,
}: Props) {
  if (!url) {
    return (
      <li className={cardClass}>
        <Content
          title={title}
          date={date}
          category={category}
          summary={summary}
          showImagePlaceholder={showImagePlaceholder}
        />
      </li>
    );
  }

  return (
    <li>
      <ExternalLink href={url} className={cardClass}>
        <Content
          title={title}
          date={date}
          category={category}
          summary={summary}
          showImagePlaceholder={showImagePlaceholder}
        />
      </ExternalLink>
    </li>
  );
}