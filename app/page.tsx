import { getContent } from "@/lib/data-service";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const content = await getContent();
  
  return <HomeClient content={content} />;
}
