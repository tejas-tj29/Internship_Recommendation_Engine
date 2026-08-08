import { z } from 'zod';

export const onboardingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.coerce.number({ message: "Age must be a valid number" }).min(16, "Must be at least 16").max(100, "Invalid age"),
  college: z.string().min(2, "College name is required"),
  educationLevel: z.string().min(1, "Education level is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  sector: z.string().min(1, "Preferred sector is required"),
  relocate: z.boolean().default(false),
});

export type OnboardingData = z.infer<typeof onboardingSchema>;
