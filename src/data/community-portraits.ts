// Circular learner avatars shown around the blog's closing CTA.
// These are illustrated avatars (Avataaars by Pablo Stanley, generated via DiceBear and saved
// locally in /public/community; free for personal and commercial use), NOT photos of real
// Techno Gurukul learners. To use real photos later, point `src` at approved, consented images
// and give each a meaningful `alt`. Up to 16 entries are placed; extras are ignored.
export interface CommunityPortrait {
  id: string;
  src: string | null;
  alt: string;
}

export const COMMUNITY_PORTRAITS: CommunityPortrait[] = Array.from({ length: 16 }, (_, i) => ({
  id: `portrait-${i + 1}`,
  src: `/community/avatar-${String(i + 1).padStart(2, "0")}.png`,
  alt: "Illustrated learner avatar",
}));
