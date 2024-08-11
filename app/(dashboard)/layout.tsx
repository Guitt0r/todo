import { auth } from "@/auth";
import { NavBar } from "@/components/dashboard/nav-bar";
import { SessionProvider } from "next-auth/react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <main className="min-h-screen w-full flex flex-col">
        <NavBar />
        <div className="lg:ml-24 flex-1">{children}</div>
      </main>
    </SessionProvider>
  );
};

export default DashboardLayout;
