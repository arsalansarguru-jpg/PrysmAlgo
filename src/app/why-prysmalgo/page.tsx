import { AuthorityRoute, getAuthorityMetadata } from "@/components/authority/authority-route";
export const metadata = getAuthorityMetadata("why-prysmalgo");
export default function Page() {
  return <AuthorityRoute slug="why-prysmalgo" />;
}
