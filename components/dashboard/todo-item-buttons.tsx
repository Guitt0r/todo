"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EditTodoForm } from "@/components/dashboard/edit-todo-form";
import { CreateTodoForm } from "@/components/dashboard//create-todo-form";

import { toast } from "sonner";
import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { type Todo } from "@prisma/client";
import { deleteTodo } from "@/actions/todo";

export const AddTodoButton = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">{children}</Button>
      </DialogTrigger>
      <DialogContent className="h-[calc(100vh_-_100px)] max-w-2xl w-full">
        <DialogTitle className="font-normal">
          <CreateTodoForm onSuccess={() => setOpen(false)} />
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export const OpenTodoButton = ({
  todo,
  children,
}: {
  todo: Omit<Todo, "userId" | "createdAt">;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{children}</Button>
      </DialogTrigger>
      <DialogContent className="h-[calc(100vh_-_100px)] max-w-2xl w-full">
        <DialogTitle className="font-normal">
          <EditTodoForm onSuccess={() => setOpen(false)} {...todo} />
        </DialogTitle>
        <DialogFooter className="items-center sm:justify-between flex-row">
          <p className="text-muted-foreground">
            {todo.updatedAt.toDateString()}
          </p>
          <DeleteTodoButton id={todo.id} onSuccess={() => setOpen(false)} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteTodoButton = ({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) => {
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this todo item.",
    { confirmButtonLabel: "Delete", confirmButtonVariant: "destructive" }
  );

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      return deleteTodo(id).then((res) => {
        !!onSuccess && onSuccess();
        res.success && toast.success(res.success);
      });
    }
  };
  return (
    <>
      <ConfirmationDialog />
      <Button
        onClick={handleDelete}
        className="ml-auto"
        size="icon"
        variant="destructive"
      >
        <Trash2Icon />
      </Button>
    </>
  );
};

export const ToggleCompleteButton = ({
  isCompleted,
}: {
  isCompleted: boolean;
}) => (
  <Checkbox
    checked={isCompleted}
    onCheckedChange={() => {}}
    className="size-5 shrink-0"
  />
);
