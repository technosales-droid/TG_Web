import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import type { SocialId } from "./footer-data";

// Real brand marks (react-icons' Font Awesome 6 Brands set), not hand-drawn approximations.
const ICONS: Record<SocialId, React.ComponentType<{ className?: string }>> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
};

export function SocialIcon({ id, className }: { id: SocialId; className?: string }) {
  const Icon = ICONS[id];
  return <Icon aria-hidden="true" className={className} />;
}
