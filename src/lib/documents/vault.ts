import { getSupabaseAdmin } from "@/lib/supabase/server";
import { logAudit } from "@/lib/security/audit";
import type { DocumentCategory, InvestorDocument } from "@/types/production";

const BUCKET = "investor-documents";

export async function listDocuments(userId: string): Promise<InvestorDocument[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data } = await supabase
    .from("investor_documents")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data ?? []).map(mapDoc);
}

export async function uploadDocument(
  userId: string,
  file: { name: string; buffer: Buffer; mimeType: string },
  category: DocumentCategory,
  uploadedBy?: string
): Promise<InvestorDocument | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const path = `${userId}/${category}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file.buffer, { contentType: file.mimeType, upsert: false });

  if (uploadError) return null;

  const { data, error } = await supabase
    .from("investor_documents")
    .insert({
      user_id: userId,
      category,
      title: file.name,
      storage_path: path,
      file_size: file.buffer.length,
      mime_type: file.mimeType,
      uploaded_by: uploadedBy,
    })
    .select()
    .single();

  if (error || !data) return null;

  await logAudit({
    action: "document_uploaded",
    resourceType: "document",
    resourceId: data.id,
    metadata: { userId, category, path },
  });

  return mapDoc(data);
}

export async function getDocumentUrl(storagePath: string, expiresIn = 3600): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(storagePath, expiresIn);
  return data?.signedUrl ?? null;
}

export async function listAllDocuments(): Promise<InvestorDocument[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data } = await supabase.from("investor_documents").select("*").order("created_at", { ascending: false });
  return (data ?? []).map(mapDoc);
}

function mapDoc(row: Record<string, unknown>): InvestorDocument {
  return {
    id: row.id as string,
    title: row.title as string,
    category: row.category as DocumentCategory,
    storagePath: row.storage_path as string,
    fileSize: row.file_size as number | undefined,
    mimeType: row.mime_type as string | undefined,
    createdAt: row.created_at as string,
  };
}
