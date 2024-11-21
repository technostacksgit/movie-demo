import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookie = await cookies();
  const token = cookie.get("accessToken");
  if(token) {
    return redirect("/dashboard");
  } else {
    return redirect("/login");
  }
}
