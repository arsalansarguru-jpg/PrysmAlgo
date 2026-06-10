import { NextRequest, NextResponse } from "next/server";
import { listDocuments, getDocumentUrl } from "@/lib/documents/vault";
import { getPlatformUserId } from "@/lib/auth/user";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {},
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export async function GET(req: NextRequest) {
  const authUserId = await getUserId();
  if (!authUserId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = await getPlatformUserId(authUserId);

  const docId = req.nextUrl.searchParams.get("download");
  if (docId) {
    const docs = await listDocuments(userId);
    const doc = docs.find((d) => d.id === docId);
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const url = await getDocumentUrl(doc.storagePath);
    return NextResponse.json({ url });
  }

  const documents = await listDocuments(userId);
  return NextResponse.json({ documents });
}
