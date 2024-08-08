"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { TodoSchema } from "@/schemas";
import { updateTodo } from "@/actions/todo";
import { FormError } from "../form-error";

type Props = {
  id: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  onSuccess: () => void;
};

export const EditTodoForm = ({
  id,
  title,
  description,
  isCompleted,
  onSuccess,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: title,
      description: description || "",
      isCompleted: isCompleted,
    },
  });

  const onSubmit = (values: z.infer<typeof TodoSchema>) => {
    startTransition(() => {
      updateTodo(id, values).then((res) => {
        setError(res.error);
        if (res.success) {
          toast.success(res.success);
          onSuccess();
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            disabled={isPending}
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="text-xl font-semibold"
                    {...field}
                    placeholder="e.g. Feed the cat, Water plants "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isPending}
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="text-base text-justify"
                    rows={10}
                    {...field}
                    placeholder="Add a description for your todo."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isPending}
            control={form.control}
            name="isCompleted"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-x-2 items-end ml-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Completed</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <Button disabled={isPending} type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
};
