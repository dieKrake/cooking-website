import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PLACEHOLDER_COURSES } from "@/lib/placeholder-data";
import { CourseDetail } from "@/components/organisms/course-detail";

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

  return <CourseDetail course={course} />;
}
