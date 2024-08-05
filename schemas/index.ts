import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z.string().min(1, { message: "Please provide a passoword" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  username: z.string().min(1, { message: "{Please provide an username" }),
  password: z.string().min(1, { message: "Please provide a passoword" }),
});
