"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { getImpact } from "@/app/actions";
import { type TrackEnvironmentalImpactOutput } from "@/ai/flows/track-environmental-impact";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Loader2 } from "lucide-react";
import { AnimatedCounter } from "./animated-counter";

const formSchema = z.object({
  foodSavedKg: z.coerce.number().min(0, "Must be a positive number"),
  moneySaved: z.coerce.number().min(0, "Must be a positive number"),
});

type FormValues = z.infer<typeof formSchema>;

export function ImpactTracker() {
  const [result, setResult] = useState<TrackEnvironmentalImpactOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodSavedKg: 10,
      moneySaved: 25,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    const actionResult = await getImpact(values);

    if (actionResult.success && actionResult.data) {
      setResult(actionResult.data);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: actionResult.error || "An unknown error occurred.",
      });
    }
    setIsLoading(false);
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-2xl bg-card">
      <CardContent className="p-0 md:grid md:grid-cols-2">
        <div className="p-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="font-headline text-2xl">See Your Impact</CardTitle>
            <CardDescription>Enter your savings to see the difference you make.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="foodSavedKg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Saved (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moneySaved"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Money Saved (€)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full font-headline bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  "Calculate Impact"
                )}
              </Button>
            </form>
          </Form>
        </div>
        <div className="bg-accent text-accent-foreground p-8 flex flex-col justify-center items-center rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
          {result ? (
            <div className="text-center">
              <p className="text-lg">You've helped reduce CO2 emissions by:</p>
              <div className="font-bold text-6xl my-4 flex items-center justify-center gap-4">
                <Leaf className="w-16 h-16" />
                <AnimatedCounter target={result.co2EmissionsReducedKg} />
              </div>
              <p className="text-4xl font-headline">kg CO₂e</p>
              <p className="mt-4 text-sm opacity-80">Based on saving {result.foodSavedKg}kg of food.</p>
            </div>
          ) : (
             <div className="text-center">
                <Leaf className="w-16 h-16 mx-auto opacity-50 mb-4" />
                <h3 className="font-headline text-2xl mb-2">Your results will appear here</h3>
                <p className="opacity-70 max-w-xs">Every kilogram of food saved makes a significant difference to our planet.</p>
             </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
