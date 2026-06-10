import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { submitKyc } from "@/lib/kyc/service";
import { getPlatformUserId } from "@/lib/auth/user";
import { getSupabaseAdmin } from "@/lib/supabase/server";

async function getAuthUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createServerClient(url, key, {
    cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} },
  });
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export async function POST(req: NextRequest) {
  const authUserId = await getAuthUserId();
  if (!authUserId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = await getPlatformUserId(authUserId);
  const form = await req.formData();
  const supabase = getSupabaseAdmin();
  const paths: Record<string, string | undefined> = {};

  for (const field of ["identity", "passport", "pan", "address"]) {
    const file = form.get(field) as File | null;
    if (!file || file.size === 0) continue;

    const buffer = Buffer.from(await file.arrayBuffer());
    const path = `${userId}/kyc/${field}-${Date.now()}-${file.name}`;

    if (supabase) {
      await supabase.storage.from("investor-documents").upload(path, buffer, {
        contentType: file.type,
      });
      paths[field] = path;
    }
  }

  const submission = await submitKyc(userId, paths);
  return NextResponse.json({ submission });
}
