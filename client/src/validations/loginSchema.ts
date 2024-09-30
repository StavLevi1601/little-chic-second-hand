import { z } from 'zod';

export const loginSchema = z.object({
  id: z.string().optional(),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
