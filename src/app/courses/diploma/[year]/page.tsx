// app/courses/diploma/[year]/page.tsx   ← ไฟล์นี้เป็น Server Component

import { coursesData } from "@/data/courses";
import DiplomaYearClient from "./ClientPage";

// สำคัญ! ต้องมี generateStaticParams และไม่มี "use client"
export function generateStaticParams() {
  return Object.keys(coursesData.diploma).map((year) => ({
    year,
  }));
}

export default function DiplomaYearPage({
  params,
}: {
  params: { year: string };
}) {
  return <DiplomaYearClient params={params} />;
}