import { TodoItem } from "@/components/dashboard/todo-item";
import { SearchInput } from "@/components/dashboard/search-input";
import { getTodos } from "@/actions/todo";

export default async function Home() {
  const { todos } = await getTodos();
  return (
    <main className="p-5">
      <h1 className="text-5xl font-bold">Todos</h1>
      <hr className="border-2 my-2" />
      <SearchInput />
      <section className="grid grid-cols-4 gap-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            isCompleted={todo.isCompleted}
            updatedAt={todo.updatedAt}
          />
        ))}
      </section>
    </main>
  );
}
