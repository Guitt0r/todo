import { findTodos } from "@/actions/todo";
import { useQuery } from "@tanstack/react-query";

export const useFindTodos = (
  term: string,
  options?: {
    completedOnly?: boolean;
    uncompletedOnly?: boolean;
    sort?: "asc" | "desc";
    limit?: number;
    page?: number;
  }
) => {
  return useQuery({
    enabled: !!term,
    queryKey: ["todos", { term }],
    queryFn: async () => {
      const res = await findTodos(term, {
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
