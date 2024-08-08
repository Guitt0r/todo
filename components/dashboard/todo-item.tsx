import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DeleteTodoButton,
  OpenTodoButton,
  ToggleCompleteButton,
} from "@/components/dashboard/todo-item-buttons";

import { cn } from "@/lib/utils";
import { Todo } from "@prisma/client";

type Props = Omit<Todo, "userId" | "createdAt">;
export const TodoItem = ({
  id,
  title,
  description,
  isCompleted,
  updatedAt,
}: Props) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex-row justify-between text-xl font-semibold pb-1 mb-4 border-b-[3px] space-x-2">
        <span
          className={cn(
            isCompleted &&
              "line-through text-muted-foreground decoration-primary",
            "break-words"
          )}
        >
          {title}
        </span>
        <ToggleCompleteButton isCompleted={isCompleted} />
      </CardHeader>
      {!!description && (
        <CardContent>
          <p
            className={cn(
              isCompleted &&
                "line-through text-muted-foreground decoration-primary",
              "line-clamp-5 text-justify"
            )}
          >
            {description}
          </p>
        </CardContent>
      )}
      <CardFooter className="gap-x-2 pb-1 mt-auto">
        <OpenTodoButton
          todo={{ id, title, description, isCompleted, updatedAt }}
        >
          See more
        </OpenTodoButton>
        <DeleteTodoButton id={id} />
      </CardFooter>
      <hr className="border my-2" />
      <div className="text-end px-6 pb-1.5 text-sm text-muted-foreground">
        {updatedAt.toDateString()}
      </div>
    </Card>
  );
};
