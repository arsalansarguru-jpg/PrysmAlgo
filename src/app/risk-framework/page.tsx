import { AuthorityRoute, getAuthorityMetadata } from "@/components/authority/authority-route";
export const metadata = getAuthorityMetadata("risk-framework");
export default function Page() {
  return <AuthorityRoute slug="risk-framework" />;
}
