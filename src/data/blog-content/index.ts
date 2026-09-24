import { GAME_ARTICLES } from "./game";
import { LEARNING_ARTICLES } from "./learning";
import { MARKETING_ARTICLES } from "./marketing";
import type { ArticleContent } from "./types";

/** Full article content by post slug. A post with no entry falls back to the short sections in data/blogs.ts. */
export const ARTICLE_CONTENT: Record<string, ArticleContent> = { ...GAME_ARTICLES, ...MARKETING_ARTICLES, ...LEARNING_ARTICLES };
