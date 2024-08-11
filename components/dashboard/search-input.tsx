"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { CircleHelpIcon, SearchIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { SearchSchema } from "@/schemas";
import { useCreateQueryString } from "@/hooks/use-create-query-string";

export const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      term: searchParams.get("term") || "",
    },
  });

  const createQueryString = useCreateQueryString(searchParams);

  const onSubmit = (values: z.infer<typeof SearchSchema>) => {
    router.push(
      pathname +
        "?" +
        createQueryString([
          { name: "term", value: values.term },
          { name: "page", value: "1" },
        ])
    );
  };

  return (
    <div className="flex items-end space-x-2 my-2 w-full lg:w-max">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:w-max w-full rounded-md border flex items-center focus-within:ring-1 ring-ring"
        >
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem className="flex-1">
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
            className="border-l rounded-l-none shrink-0"
          >
            <SearchIcon className="text-muted-foreground" />
          </Button>
        </form>
      </Form>
      {/* <span className="text-sm underline italic flex items-center gap-x-1">
        <CircleHelpIcon className="size-3" />
        <p>Start typing, to find todos that matches your request.</p>
      </span> */}
    </div>
  );
};
