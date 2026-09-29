import type { SocialPlatform } from "@/types";

const ICON_SRC: Record<SocialPlatform, string> = {
  instagram: "/Media Sosial Resmi/instagram-white-icon.svg",
  tiktok: "/Media Sosial Resmi/tiktok-simplified-white-icon.svg",
  whatsapp: "/Media Sosial Resmi/whatsapp-white-icon.svg",
};

type SocialIconProps = {
  platform: SocialPlatform;
  className?: string;
};

export function SocialIcon({ platform, className }: SocialIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- social media brand icon, no optimization needed
    <img src={ICON_SRC[platform]} alt="" aria-hidden="true" loading="lazy" className={className} />
  );
}