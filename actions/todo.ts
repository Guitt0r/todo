"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/user";
import { TodoSchema } from "@/schemas";
import { Todo } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createTodo = async (values: z.infer<typeof TodoSchema>) => {
  const sessionUser = await currentUser();
  const validatedFields = TodoSchema.safeParse(values);
  if (!sessionUser || !sessionUser.id) {
    return { error: "Not authorized!" };
  }
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { title, description, isCompleted } = validatedFields.data;

  await db.todo.create({
    data: {
      title,
      description,
      isCompleted,
      userId: sessionUser.id,
    },
  });
  return { success: "Todo created!" };
};

export const updateTodo = async (id: string, values: Partial<Todo>) => {
  const sessionUser = await currentUser();
  const validatedFields = TodoSchema.safeParse(values);
  if (!sessionUser || !sessionUser.id) {
    return { error: "Not authorized!" };
  }
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { title, description, isCompleted } = validatedFields.data;

  await db.todo.updateMany({
    where: {
      AND: [{ id }, { userId: sessionUser.id }],
    },
    data: {
      title,
      description,
      isCompleted,
    },
  });
  return { success: "Todo updated!" };
};

export const deleteTodo = async (id: string) => {
  const sessionUser = await currentUser();
  if (!sessionUser || !sessionUser.id) {
    return { error: "Not authorized!" };
  }

  await db.todo.deleteMany({
    where: {
      AND: [{ id }, { userId: sessionUser.id }],
    },
  });
  return { success: "Todo deleted successfully!" };
};

export const getTodoById = async (id: string) => {
  const sessionUser = await currentUser();
  if (!sessionUser || !sessionUser.id) {
    return { error: "Not authorized!" };
  }

  const todo = await db.todo.findFirst({
    where: {
      AND: [{ id }, { userId: sessionUser.id }],
    },
  });
  if (!todo) return { error: "Not found" };
  return { todo };
};

export const getTodos = async (options?: {
  completedOnly?: boolean;
  uncompletedOnly?: boolean;
  sort?: "asc" | "desc";
  limit?: number;
  page?: number;
}) => {
  const sessionUser = await currentUser();
  if (!sessionUser || !sessionUser.id) {
    return redirect("/auth/login");
  }

  const limit = options?.limit || 10;
  const page = options?.page || 1;

  const todos = await db.todo.findMany({
    take: limit,
    skip: (page - 1) * limit,
    where: {
      userId: sessionUser.id,
      ...(options?.completedOnly && { isCompleted: true }),
      ...(options?.uncompletedOnly && { isCompleted: false }),
    },
    orderBy: {
      updatedAt: options?.sort || "desc",
    },
  });
  return { todos };
};

export const findTodos = async (
  term: string,
  options?: {
    completedOnly?: boolean;
    uncompletedOnly?: boolean;
    sort?: "asc" | "desc";
    limit?: number;
    page?: number;
  }
) => {
  const sessionUser = await currentUser();
  if (!sessionUser || !sessionUser.id) {
    return null;
  }

  const limit = options?.limit || 10;
  const page = options?.page || 1;

  const todos = await db.todo.findMany({
    take: limit,
    skip: (page - 1) * limit,
    where: {
      OR: [{ title: { contains: term } }, { description: { contains: term } }],
      ...(options?.completedOnly && { isCompleted: true }),
      ...(options?.uncompletedOnly && { isCompleted: false }),
    },
    orderBy: {
      updatedAt: options?.sort || "desc",
    },
  });
  return todos;
};
