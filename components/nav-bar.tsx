"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSessionUser } from "@/hooks/use-session-user";
import {
  FoldersIcon,
  LogOutIcon,
  PlusIcon,
  SettingsIcon,
  User2Icon,
} from "lucide-react";
import { Button } from "./ui/button";
import { logout } from "@/actions/auth";

type Props = {};
export const NavBar = ({}: Props) => {
  const user = useSessionUser();
  return (
    <aside className="fixed top-0 w-max p-4 h-full border-r-2 flex flex-col items-center gap-y-4">
      <div>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="drop-shadow-md text-xl font-medium">
            {user && user.name && user.name[0]}
          </AvatarFallback>
        </Avatar>
      </div>
      <hr className="border-2 w-full" />
      <Button variant="secondary">
        <User2Icon />
      </Button>
      <Button variant="secondary">
        <SettingsIcon />
      </Button>
      <Button variant="secondary">
        <FoldersIcon />
      </Button>
      <Button variant="secondary">
        <PlusIcon />
      </Button>
      <Button
        onClick={() => logout()}
        variant="destructive"
        className="mt-auto"
      >
        <LogOutIcon />
      </Button>
    </aside>
  );
};
