import { NextResponse } from "next/server";
import { COMMUNITY_POSTS } from "@/data/intelligence/community";

export async function GET() {
  return NextResponse.json({ posts: COMMUNITY_POSTS });
}
