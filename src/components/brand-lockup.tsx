import { SITE } from "@/constants/site";

type BrandLockupProps = {
  variant: "header" | "footer";
  theme?: "light" | "dark";
};

export function BrandLockup({ variant, theme = "light" }: BrandLockupProps) {
  const isDark = theme === "dark";
  const eyebrowColor = isDark ? "text-white/70" : "text-brand";
  const nameColor = isDark ? "text-white" : "text-navy-deep";
  const name = variant === "header" ? SITE.shortName : SITE.officialName;
  const nameSize = variant === "header" ? "text-step--1" : "text-step-1";
  const eyebrowSize = variant === "header" ? "text-step--2" : "text-step--1";

  return (
    <span className="flex flex-col leading-snug">
      <span className={`hidden ${eyebrowSize} font-semibold uppercase tracking-wide sm:block ${eyebrowColor}`}>
        {SITE.fullName}
      </span>
      <span className={`font-display font-semibold leading-snug ${nameSize} ${nameColor}`}>
        {name}
      </span>
    </span>
  );
}
