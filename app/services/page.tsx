import { getContent } from "@/lib/data-service";
import ServicesClient from "@/components/ServicesClient";

export default async function ServicesPage() {
  const { services, cta } = await getContent();

  return <ServicesClient services={services} cta={cta} />;
}
