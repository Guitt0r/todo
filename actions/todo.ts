"use server";

import { signOut } from "@/auth";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/user";
import { TodoSchema } from "@/schemas";
import { Todo } from "@prisma/client";
import { z } from "zod";

export const createTodo = async (values: z.infer<typeof TodoSchema>) => {
  try {
    const sessionUser = await currentUser();
    const validatedFields = TodoSchema.safeParse(values);
    if (!sessionUser || !sessionUser.id) {
      return await signOut();
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
  } catch (e) {
    console.log(e);
    return { error: "Something wend wrong" };
  }
};

export const updateTodo = async (
  id: string,
  values: z.infer<typeof TodoSchema>
) => {
  try {
    const sessionUser = await currentUser();
    const validatedFields = TodoSchema.safeParse(values);
    if (!sessionUser || !sessionUser.id) {
      return await signOut();
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
  } catch (e) {
    console.log(e);
    return { error: "Something wend wrong" };
  }
};

export const completeTodo = async (id: string, isCompleted: boolean) => {
  try {
    const sessionUser = await currentUser();
    if (!sessionUser || !sessionUser.id) {
      return await signOut();
    }

    await db.todo.updateMany({
      where: {
        AND: [{ id }, { userId: sessionUser.id }],
      },
      data: {
        isCompleted,
      },
    });
    return { success: "Todo updated!" };
  } catch (e) {
    console.log(e);
    return { error: "Something wend wrong" };
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const sessionUser = await currentUser();
    if (!sessionUser || !sessionUser.id) {
      return await signOut();
    }

    await db.todo.deleteMany({
      where: {
        AND: [{ id }, { userId: sessionUser.id }],
      },
    });
    return { success: "Todo deleted successfully!" };
  } catch (e) {
    console.log(e);
    return { error: "Something wend wrong" };
  }
};

export const getTodoById = async (id: string) => {
  try {
    const sessionUser = await currentUser();
    if (!sessionUser || !sessionUser.id) {
      return await signOut();
    }

    const todo = await db.todo.findFirst({
      where: {
        AND: [{ id }, { userId: sessionUser.id }],
      },
    });
    if (!todo) return { error: "Not found" };
    return { todo };
  } catch (e) {
    console.log(e);
    return { error: "Something wend wrong" };
  }
};

export const getTodos = async (options?: {
  completedOnly?: boolean;
  uncompletedOnly?: boolean;
  sort?: "asc" | "desc";
  limit?: number;
  page?: number;
  term?: string;
}) => {
  try {
    const sessionUser = await currentUser();
    if (!sessionUser || !sessionUser.id) {
      return await signOut();
    }

    const limit = options?.limit || 12;
    const page = options?.page || 1;
    const todos = await db.todo.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        userId: sessionUser.id,
        ...(options?.term && {
          OR: [
            { title: { contains: options.term } },
            { description: { contains: options.term } },
          ],
        }),
        ...(options?.completedOnly && { isCompleted: true }),
        ...(options?.uncompletedOnly && { isCompleted: false }),
      },
      orderBy: {
        createdAt: options?.sort || "desc",
      },
    });
    const total = await db.todo.count({
      where: {
        userId: sessionUser.id,
        ...(options?.term && {
          OR: [
            { title: { contains: options.term } },
            { description: { contains: options.term } },
          ],
        }),
        ...(options?.completedOnly && { isCompleted: true }),
        ...(options?.uncompletedOnly && { isCompleted: false }),
      },
    });
    return {
      todos,
      pagination: {
        currentPage: page,
        lastPage: Math.ceil(total / limit),
        perPage: limit,
      },
    };
  } catch (e) {
    console.log(e);
    return { error: "Something wend wrong" };
  }
};
