"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useCreateQueryString } from "@/hooks/use-create-query-string";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
  currentPage: number;
  lastPage: number;
};
export const TodoPagination = ({ currentPage, lastPage }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const createQueryString = useCreateQueryString(searchParams);

  const previousPageQuery = createQueryString([
    {
      name: "page",
      value: (currentPage - 1).toString(),
    },
  ]);
  const nextPageQuery = createQueryString([
    {
      name: "page",
      value: (currentPage + 1).toString(),
    },
  ]);

  return (
    <Pagination>
      <PaginationContent className="border-y-2 w-full flex items-center justify-center">
        <PaginationItem>
          <Button className="p-0" variant="ghost" disabled={currentPage === 1}>
            <PaginationPrevious
              scroll={false}
              href={pathname + "?" + previousPageQuery}
            />
          </Button>
        </PaginationItem>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem className="size-10 flex items-center justify-center bg-background">
          {currentPage}
        </PaginationItem>
        {currentPage !== lastPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <Button
            className="p-0"
            variant="ghost"
            disabled={currentPage === lastPage}
          >
            <PaginationNext
              scroll={false}
              href={pathname + "?" + nextPageQuery}
            />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
