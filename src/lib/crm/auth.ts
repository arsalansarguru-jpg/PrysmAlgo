import { NextRequest } from "next/server";

export function verifyAdminRequest(req: NextRequest): boolean {
  const key = process.env.ADMIN_API_KEY;
  if (!key) return process.env.NODE_ENV === "development";
  const header = req.headers.get("x-admin-key") || req.headers.get("authorization")?.replace("Bearer ", "");
  return header === key;
}
