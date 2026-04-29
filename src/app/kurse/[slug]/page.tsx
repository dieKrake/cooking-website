import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PLACEHOLDER_COURSES } from "@/lib/placeholder-data";

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PLACEHOLDER_COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = PLACEHOLDER_COURSES.find((c) => c.slug === slug);
  if (!course) return {};
  return { title: course.title, description: course.description };
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { slug } = await params;
  const course = PLACEHOLDER_COURSES.find((c) => c.slug === slug);

  if (!course) notFound();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="mt-2 text-gray-500">
        {course.hasFixedDate
          ? `${course.date} | ${course.time}`
          : "Datum wird noch bekanntgegeben"}
      </p>
      <p className="mt-4">{course.description}</p>
      <p className="mt-2 text-gray-600">
        Kursleiter: {course.instructor} | Preis:{" "}
        {course.price ? `${course.price} €` : "auf Anfrage"}
      </p>
      <p className="mt-6 text-sm text-gray-400">
        Placeholder – Kurs-Detailseite. Hier entstehen: CourseDetail,
        TicketButton, ShareLinks.
      </p>
    </div>
  );
}
