import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url({ message: "VITE_API_BASE_URL must be a valid URL" }),
});

// Validate `import.meta.env`
const envParse = envSchema.safeParse(import.meta.env);

if (!envParse.success) {
  console.error("Invalid environment variables:", envParse.error.format());
  throw new Error("Invalid environment variables");
}

export const env = envParse.data;
