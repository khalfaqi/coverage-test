import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

export const googleCallbackSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1),
  auth_system: z.literal('google')
});

export const authSuccessSchema = z.object({
  status: z.literal('success'),
  userid: z.string(),
  auth_token: z.string()
});

export const authFailureSchema = z.object({
  status: z.literal('failed'),
  status_code: z.number(),
  error_message: z.string(),
  data: z.array(z.any())
});

export type LoginRequest = z.infer<typeof loginSchema>;
export type GoogleCallbackRequest = z.infer<typeof googleCallbackSchema>;
export type AuthSuccessResponse = z.infer<typeof authSuccessSchema>;
export type AuthFailureResponse = z.infer<typeof authFailureSchema>;
