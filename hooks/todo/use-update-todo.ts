import { z } from "zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "@/actions/todo";
import { TodoSchema } from "@/schemas";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      todo,
    }: {
      id: string;
      todo: z.infer<typeof TodoSchema>;
    }) => {
      const res = await updateTodo(id, todo);
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
