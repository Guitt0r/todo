"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import { FormError } from "@/components/form-error";

import { TodoSchema } from "@/schemas";
import { useCreateTodo } from "@/hooks/todo/use-create-todo";

type Props = {
  onSuccess: () => void;
};

export const CreateTodoForm = ({ onSuccess }: Props) => {
  const [error, setError] = useState<string | undefined>();
  const createTodoMutation = useCreateTodo();
  const isPending = createTodoMutation.isPending;

  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: "",
      description: "",
      isCompleted: false,
    },
  });

  const onSubmit = (values: z.infer<typeof TodoSchema>) => {
    const validatedFields = TodoSchema.safeParse(values);
    validatedFields.success &&
      createTodoMutation.mutate(validatedFields.data, {
        onSuccess: onSuccess,
        onError: (e) => setError(e.message),
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
          Create
        </Button>
      </form>
    </Form>
  );
};
