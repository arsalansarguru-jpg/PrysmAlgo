import { NextResponse } from "next/server";
import { getIrCommunications } from "@/lib/capital-v7/services";

export async function GET() {
  const communications = await getIrCommunications();
  return NextResponse.json({ communications });
}
