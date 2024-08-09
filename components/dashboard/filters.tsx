"use client";

import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

type TodoFilter = "active" | "completed" | null;
type Props = {};

export const Filters = ({}: Props) => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") as TodoFilter | null;
  const sortParam = searchParams.get("sort");

  const [todoFilter, setTodoFilter] = useState<TodoFilter | null>(filter);
  const [sort, setSort] = useState<string>(sortParam || "desc");

  const handleCompletedCheck = () => {
    debugger;
    switch (todoFilter) {
      case "active":
        return setTodoFilter("completed");
      case "completed":
        return setTodoFilter(null);
      case null:
        return setTodoFilter("completed");
      default:
        break;
    }
  };

  const handleActiveCheck = () => {
    switch (todoFilter) {
      case "active":
        return setTodoFilter(null);
      case "completed":
        return setTodoFilter("active");
      case null:
        return setTodoFilter("active");
      default:
        break;
    }
  };
  const query = Array.from(searchParams.entries()).reduce(
    (acc, [key, value]) => {
      if (key === "sort" || key === "filter") return acc;
      acc += `${key}=${value}&`;
      return acc;
    },
    "?"
  );

  return (
    <div className="flex items-center gap-x-4">
      <div className="flex items-end gap-x-1">
        <Label htmlFor="completed">Completed only </Label>
        <Checkbox
          onCheckedChange={handleCompletedCheck}
          checked={todoFilter === "completed"}
          id="completed"
        />
      </div>
      <div className="flex items-end gap-x-1">
        <Label htmlFor="active">Active only</Label>
        <Checkbox
          onCheckedChange={handleActiveCheck}
          checked={todoFilter === "active"}
          id="active"
        />
      </div>
      <div className="flex items-center gap-x-2">
        <Label htmlFor="sort">Sort</Label>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger
            id="sort"
            className="px-2 focus:ring-0 focus:ring-offset-0"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="desc">Newest first</SelectItem>
            <SelectItem value="asc">Oldest first</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button size="sm">
        <Link href={`/${query}sort=${sort}&filter=${todoFilter || ""}`}>
          Apply filters
        </Link>
      </Button>
    </div>
  );
};
