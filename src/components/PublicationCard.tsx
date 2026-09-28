import { ExternalLink } from "@/components/external-link";
import { Meta } from "@/components/meta";
import { Placeholder } from "@/components/Placeholder";

type Props = {
  title: string;
  date?: string;
  category?: string;
  summary?: string;
  url?: string;
  showImagePlaceholder?: boolean;
  image?: string;
};

const cardClass =
  "flex h-full min-h-11 flex-col border border-line bg-white p-5 text-navy-deep transition-colors hover:border-brand hover:bg-mist no-underline";

function Content({
  title,
  date,
  category,
  summary,
  showImagePlaceholder,
  image,
}: Omit<Props, "url">) {
  return (
    <>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element -- static gallery photo, no optimization needed
        <img src={image} alt={title} loading="lazy" className="mb-4 aspect-video w-full shrink-0 border border-line bg-mist object-cover" />
      ) : showImagePlaceholder ? (
        <div className="mb-4 flex aspect-video items-center justify-center border border-line bg-mist">
          <Placeholder>{"[ISI: Foto kegiatan]"}</Placeholder>
        </div>
      ) : null}
      <h2 className="font-display text-step-1 font-bold text-navy-deep">
        <Placeholder>{title}</Placeholder>
      </h2>
      <Meta date={date} category={category} className="mt-2" />
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
  image,
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
          image={image}
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
          image={image}
        />
      </ExternalLink>
    </li>
  );
}