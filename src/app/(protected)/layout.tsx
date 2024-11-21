import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/store/user-store";
import { getUserFromToken } from "@/utils/auth";
import { redirect } from "next/navigation";
import "../globals.css";
export const dynamic = 'force-dynamic'



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getUserFromToken();

  if (!user) {
    return redirect("/login");
  }

  return (
    <UserProvider
      user={{
        email: user?.email || "",
        id: user?._id.toString() || "",
      }}
    >
      <div className={`bg-background text-foreground font-sans overflow-y-auto overflow-x-hidden w-screen min-h-screen bg-bottom-pattern bg-no-repeat	bg-bottom bg-contain	`}>
      <Toaster />
      {children}
      </div>
    </UserProvider>
  );
}
