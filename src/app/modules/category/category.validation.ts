import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    title: z.string(),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const CategoryValidations = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
