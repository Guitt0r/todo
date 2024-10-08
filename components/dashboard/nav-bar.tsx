"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FoldersIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  SettingsIcon,
  User2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddTodoButton } from "@/components/dashboard/todo-item-buttons";

import { logout } from "@/actions/auth";
import { useSessionUser } from "@/hooks/use-session-user";
import { useConfirm } from "@/hooks/use-confirm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

type Props = {};
export const NavBar = ({}: Props) => {
  const user = useSessionUser();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "After logout you will have to enter your credentials again to log in.",
    { confirmButtonLabel: "Log out", confirmButtonVariant: "destructive" }
  );
  const handleLogout = async () => {
    const ok = await confirm();
    if (ok) await logout();
  };
  return (
    <>
      {/* Desktop */}
      <ConfirmationDialog />
      <aside className="hidden fixed top-0 w-max p-4 h-full border-r-2 lg:flex flex-col items-center gap-y-4">
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
        <AddTodoButton>
          <PlusIcon />
        </AddTodoButton>
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="mt-auto"
        >
          <LogOutIcon />
        </Button>
      </aside>
      {/* Mobile */}
      <div className="block lg:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="size-6 mx-4 mt-4" />
          </SheetTrigger>
          <SheetContent aria-describedby={undefined} side="left">
            <SheetTitle asChild>
              <aside className="w-max pt-5 h-full flex flex-col items-center gap-y-4">
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
                <AddTodoButton>
                  <PlusIcon />
                </AddTodoButton>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="mt-auto"
                >
                  <LogOutIcon />
                </Button>
              </aside>
            </SheetTitle>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
