import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    role: z.enum(["admin", "user"]),
});

export type UserFormValues = z.infer<typeof userSchema>;
