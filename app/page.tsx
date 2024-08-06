import { logout } from "@/actions/auth";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <main>
        {JSON.stringify(session)}
        <form action={logout}>
          <Button type="submit">Sign out</Button>
        </form>
      </main>
    </>
  );
}
