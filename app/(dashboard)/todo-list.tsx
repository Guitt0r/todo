"use client";
import { useSearchParams } from "next/navigation";
import { useFindTodos } from "@/hooks/todo/use-find-todos";
import { useGetTodos } from "@/hooks/todo/use-get-todos";

import { TodoItem } from "@/components/dashboard/todo-item";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { AddTodoButton } from "@/components/dashboard/todo-item-buttons";

type Props = {};
export const TodoList = ({}: Props) => {
  const searchParams = useSearchParams();
  const term = searchParams.get("term");
  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort") as "asc" | "desc";

  const getTodosQuery = useGetTodos({
    completedOnly: filter == "completed",
    uncompletedOnly: filter == "active",
    sort: sort,
  });
  const findTodosQuery = useFindTodos(term!, {
    completedOnly: filter == "completed",
    uncompletedOnly: filter == "active",
    sort: sort,
  });
  const todos = (term ? findTodosQuery.data : getTodosQuery.data) || [];
  const isLoading = findTodosQuery.isLoading || getTodosQuery.isLoading;

  if (isLoading)
    return (
      <div className="p-24 flex justify-center items-center">
        <Loader2Icon className="size-24 animate-spin text-muted-foreground" />
      </div>
    );
  if (!isLoading && !todos.length) {
    return (
      <div className="py-5 space-y-4">
        {term ? (
          <>
            <h1 className="text-2xl font-medium">No matches found...</h1>
            <p>Try to find something else</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-medium">
              You don`t have any todos yet...
            </h1>
            <p>Try to add new todo</p>
            <AddTodoButton variant="default">
              Add new todo <PlusIcon className="ml-2" />
            </AddTodoButton>
          </>
        )}
      </div>
    );
  }
  return (
    <section className="grid grid-cols-4 gap-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          isCompleted={todo.isCompleted}
          createdAt={todo.createdAt}
        />
      ))}
    </section>
  );
};
