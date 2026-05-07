import { getContent } from "@/lib/data-service";
import ContactClient from "@/components/ContactClient";

export default async function ContactPage() {
  const { contact } = await getContent();

  return <ContactClient contact={contact} />;
}
