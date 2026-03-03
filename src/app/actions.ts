"use server";

import { z } from "zod";
import { aiStyleAdvisor, AIStyleAdvisorInput } from "@/ai/flows/ai-style-advisor-flow";

const appointmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  service: z.string().min(1, "Please select a service."),
  date: z.coerce.date({
    required_error: "A date for the appointment is required.",
  }),
  time: z.string().min(1, "Please select a time slot."),
  notes: z.string().optional(),
});

export async function handleAppointmentBooking(prevState: any, formData: FormData) {
  const validatedFields = appointmentSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    service: formData.get("service"),
    date: formData.get("date"),
    time: formData.get("time"),
    notes: formData.get("notes"),
  });

  if (!validatedFields.success) {
    return {
      type: "error" as const,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors and try again.",
    };
  }

  // In a real application, you would process the booking here.
  // For this demo, we'll just log it.
  console.log("New Appointment Booking:", validatedFields.data);

  return {
    type: "success" as const,
    message: "Your appointment request has been sent. We will confirm with you shortly.",
  };
}


export async function getStyleAdvice(input: AIStyleAdvisorInput) {
  try {
    const result = await aiStyleAdvisor(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error getting style advice:", error);
    return { success: false, error: "Failed to get style advice. Please try again." };
  }
}
