import { getContent } from "@/lib/data-service";
import AboutClient from "@/components/AboutClient";

export default async function AboutPage() {
  const { about, whyUs } = await getContent();

  return <AboutClient about={about} whyUs={whyUs} />;
}
