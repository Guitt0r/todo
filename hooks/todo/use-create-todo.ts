import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoSchema } from "@/schemas";
import { createTodo } from "@/actions/todo";
import { toast } from "sonner";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (todo: z.infer<typeof TodoSchema>) => {
      const res = await createTodo(todo);
      if (res.error) {
        throw new Error(res.error);
      }
      if (res.success) {
        toast.success(res.success);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return mutation;
};
