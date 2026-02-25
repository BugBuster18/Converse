import {z} from 'zod'

export const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password must be at least 8 characters")
    .max(20, "Password must not exceed 20 characters"),
  fullName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});