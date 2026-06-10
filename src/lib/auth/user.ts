import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function getPlatformUserId(authUserId: string): Promise<string> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return authUserId;

  const { data } = await supabase
    .from("platform_users")
    .select("id")
    .eq("auth_user_id", authUserId)
    .maybeSingle();

  return data?.id ?? authUserId;
}
