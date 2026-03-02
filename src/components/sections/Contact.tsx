"use client";

import { useEffect, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone } from "lucide-react";

import { handleBookingRequest } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  service: z.string().min(1, "Please select a service."),
});

type FormValues = z.infer<typeof formSchema>;

const contactInfo = [
  { icon: MapPin, text: "123 Beauty Lane, Glamour City, 12345" },
  { icon: Phone, text: "(123) 456-7890" },
  { icon: Mail, text: "contact@elegancehaven.com" },
];

const services = ["Haircut & Style", "Hair Coloring", "Manicure & Pedicure", "Facial Treatment", "Bridal Makeup"];

const ContactForm = () => {
  const { toast } = useToast();
  const [state, formAction] = useActionState(handleBookingRequest, null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", email: "", service: "" },
  });

  useEffect(() => {
    if (state?.type === "success") {
      toast({ title: "Success!", description: state.message, variant: "default" });
      form.reset();
    } else if (state?.type === "error") {
      toast({ title: "Error", description: state.message, variant: "destructive" });
    }
  }, [state, toast, form]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage>{state?.errors?.name}</FormMessage>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="(123) 456-7890" {...field} />
                </FormControl>
                <FormMessage>{state?.errors?.phone}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage>{state?.errors?.email}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Requested</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>{state?.errors?.service}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full">
          Book an Appointment
        </Button>
      </form>
    </Form>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline tracking-tight text-accent sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/80">
            We can't wait to welcome you. Book your appointment today.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-headline mb-6">Booking Request</h3>
              <ContactForm />
            </CardContent>
          </Card>
          <div className="space-y-8 lg:mt-8">
            <h3 className="text-2xl font-headline text-center lg:text-left">Contact Information</h3>
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <item.icon className="h-8 w-8 text-primary flex-shrink-0" />
                <span className="text-lg text-foreground/80">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
