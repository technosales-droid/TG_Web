import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseCard, CourseHeader } from "@/components/course/course-hero";
import { CourseMain } from "@/components/course/course-sections";
import { JsonLd } from "@/components/seo/json-ld";
import { COURSE_DETAILS, getCourseDetail } from "@/data/course-details";
import { FACULTY } from "@/data/institute";
import { BUSINESS, ORG_ID, PROGRAM_FACTS } from "@/data/business-facts";
import { SITE_URL } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { DM_PROGRAM_SLUG, GD_PROGRAM_SLUG } from "@/lib/program-routes";
import { PROGRAM_FAQS } from "@/data/program-faqs";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return COURSE_DETAILS.map((c) => ({ slug: c.slug }));
}

// Dedicated, keyword-first copy for the <title>/meta description of each program page. Deliberately separate from
// course.description (the shorter line also used on-page): a meta description earns its own 140-160 character
// target, which the on-page copy isn't written to hit. Visible page copy (H1, subtitle) is untouched here.
const SEO_COPY: Record<string, { title: string; description: string }> = {
  [DM_PROGRAM_SLUG]: {
    title: "Digital Marketing Course in Nashik | Techno Gurukul",
    description:
      "A practical, offline Digital Marketing course in Nashik covering SEO, Google Ads, Meta Ads, social media, content and analytics through hands-on projects.",
  },
  [GD_PROGRAM_SLUG]: {
    title: "Game Development Course in Nashik | Techno Gurukul",
    description:
      "A practical, offline Game Development course in Nashik covering game design, 2D/3D art, animation, Unity, Unreal Engine and programming through projects.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = getCourseDetail((await params).slug);
  if (!course) return {};
  const seo = SEO_COPY[course.slug];
  return buildMetadata({
    title: seo?.title ?? `${course.title} | Techno Gurukul`,
    description: seo?.description ?? course.description,
    path: `/programs/${course.slug}`,
    ...(course.heroImage ? { image: { url: course.heroImage, alt: course.heroAlt } } : {}),
  });
}

// Every course renders through this one template; the content comes from data/course-details.ts.
// Desktop: a dark header band whose right side is the sticky course card, then the main column beside it.
export default async function Page({ params }: Props) {
  const course = getCourseDetail((await params).slug);
  if (!course) notFound();

  const url = `${SITE_URL}/programs/${course.slug}`;
  const facts = PROGRAM_FACTS[course.slug];
  const teaches = course.curriculum.map((m) => m.title);
  const instructor = course.instructor ? FACULTY.find((f) => f.slug === course.instructor?.facultySlug) : undefined;
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          "@id": `${url}/#course`,
          name: course.title,
          description: course.description,
          url,
          inLanguage: "en",
          provider: { "@id": ORG_ID },
          ...(teaches.length > 0 ? { teaches } : {}),
          ...(facts
            ? {
                hasCourseInstance: {
                  "@type": "CourseInstance",
                  courseMode: "onsite",
                  location: {
                    "@type": "Place",
                    name: BUSINESS.name,
                    address: { "@type": "PostalAddress", ...BUSINESS.address },
                  },
                  ...(facts.durationIso ? { courseWorkload: facts.durationIso } : {}),
                },
              }
            : {}),
          ...(course.requirements.length > 0 ? { coursePrerequisites: course.requirements.join("; ") } : {}),
          ...(course.certificate ? { educationalCredentialAwarded: "Certificate of Completion" } : {}),
          ...(facts?.fee ? { offers: { "@type": "Offer", price: facts.fee, priceCurrency: "INR", availability: "https://schema.org/InStock" } } : {}),
          ...(instructor ? { instructor: { "@type": "Person", name: instructor.name } } : {}),
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Programs", path: "/programs" }, { name: course.title, path: `/programs/${course.slug}` }])} />
      {(() => {
        const faq = faqSchema(PROGRAM_FAQS[course.slug] ?? []);
        return faq && <JsonLd data={faq} />;
      })()}
      <div className="mx-auto -mt-[5.25rem] grid max-w-[1350px] px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_23rem] lg:grid-rows-[auto_1fr] lg:gap-x-10 xl:px-8">
        <section
          aria-labelledby="course-title"
          className="bg-[#0b3d50] pt-[7.5rem] pb-8 text-white shadow-[0_0_0_100vmax_#0b3d50] [clip-path:inset(0_-100vmax)] lg:col-start-1 lg:row-start-1 lg:pb-10"
        >
          <CourseHeader course={course} />
        </section>

        <div className="relative z-10 mt-6 lg:col-start-2 lg:row-[1/3] lg:mt-[7rem] lg:self-start lg:sticky lg:top-24">
          <CourseCard course={course} />
        </div>

        <div className="pt-4 lg:col-start-1 lg:row-start-2">
          <CourseMain course={course} />
        </div>
      </div>

    </main>
  );
}
