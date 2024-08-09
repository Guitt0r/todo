import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeTodo } from "@/actions/todo";

export const useCompleteTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      isCompleted,
    }: {
      id: string;
      isCompleted: boolean;
    }) => {
      const res = await completeTodo(id, isCompleted);
      if (res.error) {
        throw new Error(res.error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return mutation;
};
