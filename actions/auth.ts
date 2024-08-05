"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, username, password } = validatedFields.data;
  const isEmailTaken = await getUserByEmail(email);
  const isUsernameTaken = await getUserByEmail(username);
  if (isEmailTaken) {
    //return this message because of privacy reasons
    return { error: "Invalid fields!" };
  }
  if (isUsernameTaken) {
    return { error: "Username already taken" };
  }

  const hashedPassword = await bcrypt.hash(password, 7);
  await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  return { success: "User successfully created!" };
};
