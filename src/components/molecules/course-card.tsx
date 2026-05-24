import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{course.title}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {course.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-foreground/60 flex flex-1 flex-col gap-2 text-sm">
        {course.date && (
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 shrink-0" />
            <span>{formatDate(course.date)}</span>
          </div>
        )}
        {course.time && (
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 shrink-0" />
            <span>{course.time}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <User className="h-4 w-4 shrink-0" />
          <span>{course.instructor}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        {course.price !== null && (
          <span className="font-semibold">{course.price} €</span>
        )}
        <Link
          href={`/kurse/${course.slug}`}
          className="ml-auto text-sm font-medium underline-offset-4 hover:underline"
        >
          Details →
        </Link>
      </CardFooter>
    </Card>
  );
}
