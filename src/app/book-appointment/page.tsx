'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import Link from 'next/link';

import { handleAppointmentBooking } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const services = [
  "Haircut & Styling",
  "Hair Coloring",
  "Keratin Treatment",
  "Hair Spa",
  "Bridal & Party Styling",
  "Hair Extensions",
  "Blow Dry & Straightening",
  "Nail Care",
  "Facials & Skincare",
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const appointmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  email: z.string().email('Please enter a valid email address.'),
  service: z.string().min(1, 'Please select a service.'),
  date: z.date({
    required_error: 'A date for the appointment is required.',
  }),
  time: z.string().min(1, 'Please select a time slot.'),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof appointmentSchema>;

export default function BookAppointmentPage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(handleAppointmentBooking, null);

  const form = useForm<FormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: '',
      time: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (state?.type === 'success') {
      toast({
        title: 'Appointment Requested!',
        description: state.message,
        variant: 'default',
      });
      form.reset();
    } else if (state?.type === 'error') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast, form]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-headline text-accent text-center">Book Your Appointment</CardTitle>
              <CardDescription className="text-center">
                We're excited to see you. Please fill out the form below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form action={formAction} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>
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
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service</FormLabel>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-full justify-start text-left font-normal',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage>{state?.errors?.date}</FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage>{state?.errors?.time}</FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                   <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Advance Booking Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any special requests or details for your advance booking..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>{state?.errors?.notes}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full">
                    Request Appointment
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
