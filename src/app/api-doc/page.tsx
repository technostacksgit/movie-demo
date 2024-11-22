import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";

export const metadata = {
  title: "API Docs",
  description: "API Docs",
};



export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}