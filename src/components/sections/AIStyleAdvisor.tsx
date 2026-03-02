"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getStyleAdvice } from "@/app/actions";
import { AIStyleAdvisorOutput } from "@/ai/flows/ai-style-advisor-flow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Wand2, Scissors, Palette, Bot } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const formSchema = z.object({
  hairType: z.string().min(1, "Please select your hair type."),
  desiredLook: z.string().min(3, "Desired look must be at least 3 characters."),
  occasion: z.string().min(3, "Occasion must be at least 3 characters."),
  currentStyle: z.string().optional(),
  concerns: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const recommendationIcons = {
  hairstyle: <Scissors className="h-8 w-8 text-primary" />,
  color: <Palette className="h-8 w-8 text-primary" />,
  treatment: <Sparkles className="h-8 w-8 text-primary" />,
};

const AIStyleAdvisor = () => {
  const [advice, setAdvice] = useState<AIStyleAdvisorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hairType: "",
      desiredLook: "",
      occasion: "",
      currentStyle: "",
      concerns: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setAdvice(null);
    const result = await getStyleAdvice(values);
    setIsLoading(false);

    if (result.success && result.data) {
      setAdvice(result.data);
    } else {
      setError(result.error || "An unknown error occurred.");
    }
  }

  return (
    <section id="ai-advisor" className="py-20 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Wand2 className="mx-auto h-10 w-10 text-primary mb-4" />
            <h2 className="text-3xl font-headline tracking-tight text-accent sm:text-4xl">
              AI Style Advisor
            </h2>
            <p className="mt-4 text-lg leading-8 text-foreground/80">
              Not sure what you want? Let our AI stylist give you personalized recommendations!
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="hairType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hair Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your hair type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="straight">Straight</SelectItem>
                              <SelectItem value="wavy">Wavy</SelectItem>
                              <SelectItem value="curly">Curly</SelectItem>
                              <SelectItem value="coily">Coily</SelectItem>
                              <SelectItem value="fine">Fine</SelectItem>
                              <SelectItem value="thick">Thick</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="occasion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occasion</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Wedding, Daily Wear" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="desiredLook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Look</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Elegant, Bold, Low-maintenance" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="concerns"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hair Concerns or Preferences</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., cover greys, avoid heat, dry scalp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center">
                    <Button type="submit" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Getting Advice...
                        </>
                      ) : (
                        "Get Style Advice"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>

              {isLoading && (
                <div className="mt-8 text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                  <p className="mt-2 text-muted-foreground">Our AI is thinking...</p>
                </div>
              )}

              {error && (
                <Alert variant="destructive" className="mt-8">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {advice && (
                <div className="mt-12">
                   <Alert className="mb-8 bg-primary/10 border-primary/20">
                    <Bot className="h-4 w-4" />
                    <AlertTitle className="font-headline text-accent">AI Stylist's Summary</AlertTitle>
                    <AlertDescription className="text-foreground/90">
                      {advice.overallAdvice}
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {advice.recommendations.map((rec, index) => (
                      <Card key={index} className="flex flex-col">
                        <CardHeader className="items-center text-center">
                          {recommendationIcons[rec.type]}
                          <CardTitle className="font-headline capitalize">{rec.type}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center flex-grow flex flex-col justify-between">
                          <div>
                            <p className="font-bold text-lg text-accent">{rec.suggestion}</p>
                            <CardDescription className="mt-2">{rec.justification}</CardDescription>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIStyleAdvisor;
