import { AuthorityRoute, getAuthorityMetadata } from "@/components/authority/authority-route";
export const metadata = getAuthorityMetadata("investment-philosophy");
export default function Page() {
  return <AuthorityRoute slug="investment-philosophy" />;
}
