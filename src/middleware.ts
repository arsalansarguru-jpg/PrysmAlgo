import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";
import { getRequiredRoles, roleFromMetadata } from "@/lib/auth/roles";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limit API routes
  if (pathname.startsWith("/api/")) {
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`api:${ip}`, pathname.startsWith("/api/admin") ? 30 : 100);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  }

  const supabaseResponse = await updateSession(request);

  const requiredRoles = getRequiredRoles(pathname);
  if (!requiredRoles) return supabaseResponse;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Dev fallback: allow admin routes with x-admin-key header
  if (!url || !key) {
    if (pathname.startsWith("/admin")) {
      const adminKey = request.headers.get("x-admin-key");
      if (adminKey && adminKey === process.env.ADMIN_API_KEY) return supabaseResponse;
    }
    // Auth not configured — allow access (demo mode)
    if (process.env.NODE_ENV === "development") return supabaseResponse;
    if (pathname.startsWith("/portal") || pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/auth/login?redirect=" + encodeURIComponent(pathname), request.url));
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll() {},
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = roleFromMetadata(user.user_metadata);
  if (!requiredRoles.includes(role)) {
    return NextResponse.redirect(new URL("/membership?upgrade=required", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/portal",
    "/portal/:path*",
    "/community",
    "/community/:path*",
    "/partners",
    "/partners/:path*",
    "/membership",
    "/membership/:path*",
    "/admin",
    "/admin/:path*",
    "/data-room",
    "/data-room/:path*",
    "/executive",
    "/executive/:path*",
    "/capital-raising",
    "/capital-raising/:path*",
    "/referrals",
    "/referrals/:path*",
    "/ir",
    "/ir/:path*",
    "/partner-network",
    "/partner-network/:path*",
    "/api/:path*",
  ],
};
