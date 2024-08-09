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

import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { type Todo } from "@prisma/client";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteTodo } from "@/hooks/todo/use-delete-todo";
import { useCompleteTodo } from "@/hooks/todo/use-complete-todo";

export const AddTodoButton = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant ?? "secondary"}>{children}</Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby=""
        className="h-[calc(100vh_-_100px)] max-w-2xl w-full"
      >
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
  todo: Omit<Todo, "userId" | "updatedAt">;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{children}</Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby=""
        className="h-[calc(100vh_-_100px)] max-w-2xl w-full"
      >
        <DialogTitle className="font-normal">
          <EditTodoForm onSuccess={() => setOpen(false)} {...todo} />
        </DialogTitle>
        <DialogFooter className="items-center sm:justify-between flex-row">
          <p className="text-muted-foreground">
            {todo.createdAt.toDateString()}
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
  const deleteTodoMutation = useDeleteTodo();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this todo item.",
    { confirmButtonLabel: "Delete", confirmButtonVariant: "destructive" }
  );

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteTodoMutation.mutate(id, {
        onSuccess: () => onSuccess && onSuccess(),
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
  id,
  isCompleted,
}: {
  id: string;
  isCompleted: boolean;
}) => {
  const completeTodoMutation = useCompleteTodo();
  return (
    <Checkbox
      checked={isCompleted}
      onCheckedChange={() => {
        completeTodoMutation.mutate({ id, isCompleted: !isCompleted }, {});
      }}
      className="size-5 shrink-0"
    />
  );
};
