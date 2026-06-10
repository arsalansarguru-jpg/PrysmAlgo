import { NextResponse } from "next/server";
import { UNIVERSITY_COURSES } from "@/data/intelligence/university";

export async function GET() {
  return NextResponse.json({ courses: UNIVERSITY_COURSES });
}
