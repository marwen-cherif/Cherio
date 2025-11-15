import { z } from 'zod';

// Multilingual string schema
const multilingualStringSchema = z.object({
  fr: z.string().min(1, 'French text is required'),
  en: z.string().min(1, 'English text is required'),
  ar: z.string().min(1, 'Arabic text is required'),
});

// Links schema
const linksSchema = z.object({
  amazon: z.string().url().optional().or(z.literal('')),
  etsy: z.string().url().optional().or(z.literal('')),
  vinted: z.string().url().optional().or(z.literal('')),
});

// Product form schema
export const productFormSchema = z.object({
  name: multilingualStringSchema,
  description: multilingualStringSchema,
  shortDescription: multilingualStringSchema.optional(),
  price: z.number().min(0, 'Price must be positive'),
  currency: z.string().default('EUR'),
  image: z.string().url('Must be a valid URL').min(1, 'Image URL is required'),
  images: z.array(z.string().url()).optional(),
  video: z.string().url().optional().or(z.literal('')),
  links: linksSchema,
  featured: z.boolean().default(false),
  category: z.string().optional(),
  sku: z.string().optional(),
  stock: z.number().int().min(0, 'Stock must be non-negative').default(0),
  isActive: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

