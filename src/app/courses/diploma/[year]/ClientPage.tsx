// app/courses/diploma/[year]/ClientPage.tsx

"use client";

import { use } from "react";
import { useLanguage } from "@/lib/language-context";
import { Clock, Award, Code } from "lucide-react";
import Link from "next/link";
import { coursesData } from "@/data/courses";
import { Breadcrumb } from "@/components/breadcrumb";

export default function DiplomaYearClient({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { language } = useLanguage();
  const { year } = use(params);
  const yearData =
    coursesData.diploma[year as keyof typeof coursesData.diploma];

  if (!yearData) {
    return <div>Data not found</div>;
  }

  const content = {
    en: {
      backToCourses: "Back to Courses",
      academicYear: "Academic Year",
      credits: "Credits",
      lessons: "Lessons",
      technologies: "Technologies",
      viewLessons: "View Lessons",
    },
    lo: {
      backToCourses: "ກັບໄປວິຊາຮຽນ",
      academicYear: "ປີການສຶກສາ",
      credits: "ຫົວໜ່ວຍກິດ",
      lessons: "ບົດຮຽນ",
      technologies: "ເທັກໂນໂລຊີ",
      viewLessons: "ເບິ່ງບົດຮຽນ",
    },
  };

  const currentContent = content[language];

  const breadcrumbItems = [
    { label: "Courses", labelLao: "ວິຊາຮຽນ", href: "/courses" },
    { label: "Diploma", labelLao: "ຊັ້ນສູງ", href: "/courses/diploma" },
    { label: yearData.title, labelLao: yearData.titleLao },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          {language === "en" ? yearData.title : yearData.titleLao}
        </h1>
        <p className="text-xl text-muted-foreground">
          {currentContent.academicYear}: {yearData.year}
        </p>
      </div>

      <div className="grid gap-6">
        {yearData.courses.map((course) => (
          <div key={course.id} className="bg-card rounded-lg border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  {language === "en" ? course.title : course.titleLao}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {language === "en" ? course.description : course.descriptionLao}
                </p>
              </div>
              <Link
                href={`/lessons/${course.id}`}
                className="ml-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                {currentContent.viewLessons}
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                {course.lessons} {currentContent.lessons}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Award className="h-4 w-4 mr-2" />
                {course.credits} {currentContent.credits}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Code className="h-4 w-4 mr-2" />
                {currentContent.technologies}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {course.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}