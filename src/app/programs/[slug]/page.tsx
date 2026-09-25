import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseCard, CourseHeader } from "@/components/course/course-hero";
import { CourseMain } from "@/components/course/course-sections";
import { JsonLd } from "@/components/seo/json-ld";
import { COURSE_DETAILS, getCourseDetail } from "@/data/course-details";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return COURSE_DETAILS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = getCourseDetail((await params).slug);
  if (!course) return {};
  const title = `${course.title} | Techno Gurukul`;
  return {
    title,
    description: course.description,
    openGraph: { title, description: course.description, type: "website", ...(course.heroImage ? { images: [{ url: course.heroImage, alt: course.heroAlt }] } : {}) },
  };
}

// Every course renders through this one template; the content comes from data/course-details.ts.
// Desktop: a dark header band whose right side is the sticky course card, then the main column beside it.
export default async function Page({ params }: Props) {
  const course = getCourseDetail((await params).slug);
  if (!course) notFound();

  const url = `${SITE_URL}/programs/${course.slug}`;
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.description,
          url,
          provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Programs", item: `${SITE_URL}/programs` },
            { "@type": "ListItem", position: 2, name: course.title, item: url },
          ],
        }}
      />
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
