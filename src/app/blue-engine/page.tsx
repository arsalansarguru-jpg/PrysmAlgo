import { AuthorityRoute, getAuthorityMetadata } from "@/components/authority/authority-route";
export const metadata = getAuthorityMetadata("blue-engine");
export default function Page() {
  return <AuthorityRoute slug="blue-engine" />;
}
