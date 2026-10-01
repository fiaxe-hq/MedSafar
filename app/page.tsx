import { global } from "@/content/countries";
import { CountryPage } from "@/components/CountryPage";

export default function Home() {
  return <CountryPage content={global} />;
}
