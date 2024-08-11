import { getTodos } from "@/actions/todo";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetTodos = (options?: {
  completedOnly?: boolean;
  uncompletedOnly?: boolean;
  sort?: "asc" | "desc";
  limit?: number;
  page?: number;
  term?: string;
}) => {
  return useQuery({
    queryKey: [
      "todos",
      { completedOnly: options?.completedOnly },
      { uncompletedOnly: options?.uncompletedOnly },
      { sort: options?.sort },
      { term: options?.term },
      { page: options?.page },
    ],
    queryFn: async () => {
      const res = await getTodos({
        completedOnly: options?.completedOnly,
        uncompletedOnly: options?.uncompletedOnly,
        sort: options?.sort,
        limit: options?.limit,
        page: options?.page,
        term: options?.term,
      });
      return { todos: res.todos, pagination: res.pagination };
    },
    placeholderData: keepPreviousData,
  });
};
