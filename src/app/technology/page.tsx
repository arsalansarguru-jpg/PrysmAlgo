import { AuthorityRoute, getAuthorityMetadata } from "@/components/authority/authority-route";
export const metadata = getAuthorityMetadata("technology");
export default function Page() {
  return <AuthorityRoute slug="technology" />;
}
