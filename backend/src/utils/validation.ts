import { z } from 'zod';

// Auth validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required').max(100),
  phone: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

// Biodata validation schemas
export const createBiodataSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  templateType: z.enum(['TRADITIONAL', 'MODERN', 'MINIMALIST']),
  formData: z.record(z.any()),
  customization: z.record(z.any()).optional()
});

export const updateBiodataSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  templateType: z.enum(['TRADITIONAL', 'MODERN', 'MINIMALIST']).optional(),
  formData: z.record(z.any()).optional(),
  customization: z.record(z.any()).optional(),
  isPublished: z.boolean().optional()
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateBiodataInput = z.infer<typeof createBiodataSchema>;
export type UpdateBiodataInput = z.infer<typeof updateBiodataSchema>;
