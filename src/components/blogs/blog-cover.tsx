import Image from "next/image";
import { Briefcase, Cpu, GraduationCap, Gamepad2, Layers, Megaphone, type LucideIcon } from "lucide-react";
import type { BlogCardData, BlogCategory } from "@/data/blogs";

const VISUAL: Record<BlogCategory, { tone: string; icon: LucideIcon }> = {
  Education: { tone: "from-primary via-primary/70 to-brand-green/50", icon: GraduationCap },
  "Game Development": { tone: "from-brand-green/80 via-primary/70 to-[#0b3d50]", icon: Gamepad2 },
  "Game Design": { tone: "from-[#0d6386] to-[#0b3d50]", icon: Layers },
  "Digital Marketing": { tone: "from-[#0b3d50] via-primary to-brand-green/60", icon: Megaphone },
  Careers: { tone: "from-[#0b3d50] to-primary", icon: Briefcase },
  Technology: { tone: "from-primary/90 via-[#0d6386] to-[#0b3d50]", icon: Cpu },
};

/** Fills its (relatively positioned) parent with the article photo, or a category-toned placeholder. */
export function BlogCover({
  post,
  sizes,
  priority,
  className,
}: {
  post: Pick<BlogCardData, "heroImage" | "heroImageAlt" | "heroFocus" | "category">;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (post.heroImage) {
    return (
      <Image
        src={post.heroImage}
        alt={post.heroImageAlt}
        fill
        priority={priority}
        sizes={sizes}
        className={className ?? "object-cover"}
        style={{ objectPosition: post.heroFocus ?? "center" }}
      />
    );
  }
  const { tone, icon: Icon } = VISUAL[post.category];
  return (
    <div aria-hidden="true" className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${tone}`}>
      <Icon className="size-1/4 max-h-40 min-h-12 text-white/20" />
    </div>
  );
}
