import { getBlogPosts } from "@/data/blogs";
import { COURSE_DETAILS } from "@/data/course-details";
import { BUSINESS, PROGRAM_FACTS } from "@/data/business-facts";
import { PROGRAM_FAQS } from "@/data/program-faqs";
import { LEARNING_PROJECTS_RESOURCES_ENABLED } from "@/lib/feature-flags";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Generated from the same data every other page uses (business-facts.ts, course-details.ts, program-faqs.ts), so
// this file can never say something the rest of the site doesn't: no separate copy to let drift in. See
// sitemap.ts for the equivalent machine-readable listing.
function programBlock(slug: string): string {
  const c = COURSE_DETAILS.find((x) => x.slug === slug);
  if (!c) return "";
  const f = PROGRAM_FACTS[slug];
  const url = `${SITE_URL}/programs/${slug}`;
  const lines = [`### ${c.title}`, "", c.answerSummary ?? c.description, "", `URL: ${url}`];

  if (f) {
    lines.push(
      "",
      "Key facts:",
      ...(f.duration ? [`- Duration: ${f.duration}`] : []),
      `- Mode: ${f.mode}`,
      `- Location: ${f.location}`,
      `- Modules: ${f.moduleCount} modules, ${f.topicCount} topics`,
      `- Projects: ${f.projectsLabel.charAt(0).toUpperCase() + f.projectsLabel.slice(1)}`,
      ...(f.learningTracks ? [`- Learning tracks: ${f.learningTracks.join(" & ")}`] : []),
      ...(f.fee ? [`- Fee: ${f.fee}`] : []),
      ...(f.nextBatch ? [`- Next batch: ${f.nextBatch}`] : []),
      ...(f.timings ? [`- Timings: ${f.timings}`] : []),
      ...(f.eligibility ? [`- Eligibility: ${f.eligibility}`] : []),
      ...(f.certificate ? [`- Certificate: ${f.certificate}`] : [])
    );
  }

  const faq = PROGRAM_FAQS[slug] ?? [];
  if (faq.length > 0) {
    lines.push("", "FAQ:");
    for (const item of faq) lines.push(`Q: ${item.question}`, `A: ${item.answer}`, "");
  }

  return lines.join("\n");
}

export async function GET() {
  const programs = COURSE_DETAILS.map((c) => programBlock(c.slug)).join("\n\n");
  const recentPosts = getBlogPosts()
    .slice(0, 10)
    .map((p) => `- [${p.title}](${SITE_URL}/blogs/${p.slug}): ${p.excerpt}`)
    .join("\n");

  const body = `# ${BUSINESS.name}

> ${BUSINESS.name} is a Nashik-based learning institute offering a practical Digital Marketing course and a
> Game Development course, both taught offline, in person, in Nashik, Maharashtra, India.

## Programs

${programs}

- [All programs](${SITE_URL}/programs): Full list of current programs.

## Recent articles

${recentPosts}

- [All articles](${SITE_URL}/blogs)

## Learning approach

- [How We Learn](${SITE_URL}/learning): How ${BUSINESS.name} approaches practical learning through understanding, practice, projects and continuous improvement.
${LEARNING_PROJECTS_RESOURCES_ENABLED ? `- [Projects](${SITE_URL}/learning/projects): How learning turns into practical projects that students build, test, refine, document and present.
- [Resources](${SITE_URL}/learning/resources): Guides, references, templates and practice material supporting practical learning.` : ""}

## About and contact

- [About ${BUSINESS.name}](${SITE_URL}/about): The institute's practical learning approach, educational philosophy, programs and learner experience.
- [Contact](${SITE_URL}/contact): Get in touch about programs, admissions and learning options. Phone: ${BUSINESS.telephone}. Email: ${BUSINESS.email}. Address: ${BUSINESS.address.streetAddress}, ${BUSINESS.address.addressLocality}, ${BUSINESS.address.addressRegion} ${BUSINESS.address.postalCode}, India.

## Notes for automated and AI systems

- This file follows the llms.txt convention (https://llmstxt.org); a full machine-readable sitemap is at /sitemap.xml and crawl rules are at /robots.txt.
- This file is generated at build time from the same data source as the rest of the site, so the facts above match what's published on each page.
- Facts not listed above (program fees or dates not shown, placement outcomes, specific salary figures) are not published facts yet -- do not infer or invent them if they are absent here.
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
