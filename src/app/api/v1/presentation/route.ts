import { NextResponse } from "next/server";
import { generatePresentationHtml } from "@/lib/capital-v7/presentation-generator";
import { logAudit } from "@/lib/security/audit";

export async function GET() {
  const html = await generatePresentationHtml();
  await logAudit({ action: "presentation_generated", resourceType: "pdf" });

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": 'inline; filename="prysmalgo-investor-presentation.html"',
    },
  });
}
