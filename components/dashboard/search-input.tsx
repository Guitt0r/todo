"use client";

import { z } from "zod";
import { CircleHelpIcon, SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SearchSchema } from "@/schemas";

type Props = {};
export const SearchInput = ({}: Props) => {
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      term: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SearchSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex items-end space-x-2 my-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-max rounded-md border flex items-center focus-within:ring-1 ring-ring"
        >
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="border-0 rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Search"
                    type="search"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            size="sm"
            type="submit"
            variant="ghost"
            className="border-l rounded-l-none"
          >
            <SearchIcon className="text-muted-foreground" />
          </Button>
        </form>
      </Form>
      <span className="text-sm underline italic flex items-center gap-x-1">
        <CircleHelpIcon className="size-3" />
        <p>Minimum 3 characters to search</p>
      </span>
    </div>
  );
};
