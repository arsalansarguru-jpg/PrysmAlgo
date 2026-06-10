import type { UserRole } from "@/types/production";
import { ROLE_HIERARCHY } from "@/types/production";

export function hasRole(userRole: UserRole | null | undefined, required: UserRole[]): boolean {
  if (!userRole) return false;
  return required.includes(userRole);
}

export function hasMinRole(userRole: UserRole | null | undefined, minRole: UserRole): boolean {
  if (!userRole) return false;
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minRole];
}

export function roleFromMetadata(metadata: Record<string, unknown> | undefined): UserRole {
  const role = metadata?.role as string | undefined;
  const valid: UserRole[] = ["visitor", "lead", "investor", "partner", "admin", "super_admin"];
  if (role && valid.includes(role as UserRole)) return role as UserRole;
  return "visitor";
}

export const ROUTE_ROLE_MAP: Record<string, UserRole[]> = {
  "/portal": ["investor", "admin", "super_admin"],
  "/community": ["lead", "investor", "partner", "admin", "super_admin"],
  "/partners": ["partner", "admin", "super_admin"],
  "/membership": ["lead", "investor", "partner", "admin", "super_admin"],
  "/admin": ["admin", "super_admin"],
  "/data-room": ["investor", "admin", "super_admin"],
  "/executive": ["admin", "super_admin"],
  "/capital-raising": ["admin", "super_admin"],
  "/referrals": ["investor", "partner", "admin", "super_admin"],
  "/ir": ["lead", "investor", "partner", "admin", "super_admin"],
  "/partner-network": ["partner", "admin", "super_admin"],
};

export function getRequiredRoles(pathname: string): UserRole[] | null {
  for (const [route, roles] of Object.entries(ROUTE_ROLE_MAP)) {
    if (pathname === route || pathname.startsWith(`${route}/`)) return roles;
  }
  return null;
}
