import { NextResponse } from "next/server";
import { getCapitalPipeline } from "@/lib/capital-v7/services";

export async function GET() {
  const data = await getCapitalPipeline();
  return NextResponse.json(data);
}
