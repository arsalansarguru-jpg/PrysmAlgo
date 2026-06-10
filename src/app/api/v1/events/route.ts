import { NextResponse } from "next/server";
import { getEvents } from "@/lib/capital-v7/services";

export async function GET() {
  const events = await getEvents();
  return NextResponse.json({ events });
}
