// Single place for flags that gate an entire section on or off, readable from both server and client components.

// Shows the "Reader reactions" and "Discussion" sections on article pages (see @/lib/blog-feedback). Off while
// those sections are localStorage-only: they never show one visitor's entry to another, and contribute no
// content to search/AI crawlers. Flip to true once there's a real backend; nothing else needs to change.
export const BLOG_FEEDBACK_ENABLED = false;

// Makes /learning/projects and /learning/resources temporarily inaccessible: the routes 404, the nav/footer
// links and sitemap/llms.txt entries disappear, but nothing is deleted. Flip back to true to restore all of it.
export const LEARNING_PROJECTS_RESOURCES_ENABLED = false;
