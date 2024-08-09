import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "@/actions/todo";
import { toast } from "sonner";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteTodo(id);
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
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return mutation;
};
