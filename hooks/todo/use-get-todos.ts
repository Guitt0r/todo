import { getTodos } from "@/actions/todo";
import { useQuery } from "@tanstack/react-query";

export const useGetTodos = (options?: {
  completedOnly?: boolean;
  uncompletedOnly?: boolean;
  sort?: "asc" | "desc";
  limit?: number;
  page?: number;
}) => {
  return useQuery({
    queryKey: [
      "todos",
      { completedOnly: options?.completedOnly },
      { uncompletedOnly: options?.uncompletedOnly },
      { sort: options?.sort },
    ],
    queryFn: async () => {
      const res = await getTodos({
        completedOnly: options?.completedOnly,
        uncompletedOnly: options?.uncompletedOnly,
        sort: options?.sort,
        limit: options?.limit,
        page: options?.page,
      });
      return res.todos;
    },
  });
};
