import { NextRequest, NextResponse } from "next/server";
import { getDataRoomDocuments, trackDataRoomDownload } from "@/lib/capital-v7/services";
import { logAudit } from "@/lib/security/audit";

export async function GET() {
  const documents = await getDataRoomDocuments();
  return NextResponse.json({ documents });
}

export async function POST(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("download");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  await trackDataRoomDownload(slug);
  await logAudit({ action: "data_room_download", resourceType: "document", resourceId: slug });

  return NextResponse.json({ ok: true });
}
