import { SearchInput } from "@/components/dashboard/search-input";
import { TodoList } from "./todo-list";
import { Filters } from "@/components/dashboard/filters";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="p-5">
      <h1 className="text-5xl font-bold">Todos</h1>
      <hr className="border-2 my-2" />
      <Suspense>
        <section className="my-2 flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-2">
          <SearchInput />
          <Filters />
        </section>
        <hr className="lg:hidden border-2 my-4" />
        <TodoList />
      </Suspense>
    </main>
  );
}
