"use client";
import { useSearchParams } from "next/navigation";
import { useGetTodos } from "@/hooks/todo/use-get-todos";

import { TodoItem } from "@/components/dashboard/todo-item";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { AddTodoButton } from "@/components/dashboard/todo-item-buttons";
import { TodoPagination } from "@/components/dashboard/todo-pagination";

type Props = {};
export const TodoList = ({}: Props) => {
  const searchParams = useSearchParams();
  const term = searchParams.get("term");
  const filter = searchParams.get("filter");
  const page = searchParams.get("page");
  const sort = searchParams.get("sort") as "asc" | "desc";

  const getTodosQuery = useGetTodos({
    completedOnly: filter == "completed",
    uncompletedOnly: filter == "active",
    sort: sort,
    term: term || "",
    page: page ? +page : 1,
  });
  const todos = getTodosQuery.data?.todos || [];
  const pagination = getTodosQuery.data?.pagination;
  const isLoading = getTodosQuery.isLoading;

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
    <div>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
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
      <TodoPagination
        currentPage={pagination?.currentPage || 1}
        lastPage={pagination?.lastPage || 1}
      />
    </div>
  );
};
