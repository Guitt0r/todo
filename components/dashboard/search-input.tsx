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
import { useRouter, useSearchParams } from "next/navigation";

export const SearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      term: searchParams.get("term") || "",
    },
  });

  const query = Array.from(searchParams.entries()).reduce(
    (acc, [key, value]) => {
      if (key === "term") return acc;
      acc += `&${key}=${value}`;
      return acc;
    },
    ""
  );

  const onSubmit = (values: z.infer<typeof SearchSchema>) => {
    router.push(`/?term=${values.term}${query}`);
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
        <p>Start typing, to find todos that matches your request.</p>
      </span>
    </div>
  );
};
