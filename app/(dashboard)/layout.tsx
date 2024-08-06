import { auth } from "@/auth";
import { NavBar } from "@/components/nav-bar";
import { SessionProvider } from "next-auth/react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <main>
        <NavBar />
        <div className="ml-24">{children}</div>
      </main>
    </SessionProvider>
  );
};

export default DashboardLayout;
