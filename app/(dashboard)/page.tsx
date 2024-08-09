import { SearchInput } from "@/components/dashboard/search-input";
import { TodoList } from "./todo-list";
import { Filters } from "@/components/dashboard/filters";

export default function Home() {
  return (
    <main className="p-5">
      <h1 className="text-5xl font-bold">Todos</h1>
      <hr className="border-2 my-2" />
      <section className="my-2 flex items-center justify-between">
        <SearchInput />
        <Filters />
      </section>
      <TodoList />
    </main>
  );
}
