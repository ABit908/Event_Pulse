import * as z from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional().or(z.literal("")),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date",
  }),
  capacity: z.coerce
    .number({ invalid_type_error: "Capacity must be a number" })
    .min(1, "Capacity must be at least 1"),
});

export const attendeeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  eventId: z.string().min(1, "Event ID is required"),
});