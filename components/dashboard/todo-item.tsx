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

type Props = Omit<Todo, "userId" | "updatedAt">;
export const TodoItem = ({
  id,
  title,
  description,
  isCompleted,
  createdAt,
}: Props) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex-row justify-between text-xl font-semibold pb-1 mb-4 border-b-[3px] space-x-2">
        <span
          className={cn(
            "max-w-[90%] break-words line-clamp-3",
            isCompleted &&
              "line-through text-muted-foreground decoration-primary"
          )}
        >
          {title}
        </span>
        <ToggleCompleteButton id={id} isCompleted={isCompleted} />
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
          todo={{ id, title, description, isCompleted, createdAt }}
        >
          See more
        </OpenTodoButton>
        <DeleteTodoButton id={id} />
      </CardFooter>
      <hr className="border my-2" />
      <div className="text-end px-6 pb-1.5 text-sm text-muted-foreground">
        {createdAt.toDateString()}
      </div>
    </Card>
  );
};
