'use server';

/**
 * @fileOverview This file defines a Genkit flow for tracking and visualizing a user's environmental impact.
 *
 * It includes:
 * - trackEnvironmentalImpact - An async function that calculates and returns the environmental impact data.
 * - TrackEnvironmentalImpactInput - The input type for the trackEnvironmentalImpact function.
 * - TrackEnvironmentalImpactOutput - The output type for the trackEnvironmentalImpact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrackEnvironmentalImpactInputSchema = z.object({
  foodSavedKg: z
    .number()
    .describe('The amount of food saved in kilograms.'),
  moneySaved: z.number().describe('The amount of money saved in euros.'),
});
export type TrackEnvironmentalImpactInput = z.infer<
  typeof TrackEnvironmentalImpactInputSchema
>;

const TrackEnvironmentalImpactOutputSchema = z.object({
  foodSavedKg: z
    .number()
    .describe('The amount of food saved in kilograms.'),
  moneySaved: z.number().describe('The amount of money saved in euros.'),
  co2EmissionsReducedKg: z
    .number()
    .describe('The estimated CO2 emissions reduced in kilograms.'),
});
export type TrackEnvironmentalImpactOutput = z.infer<
  typeof TrackEnvironmentalImpactOutputSchema
>;

export async function trackEnvironmentalImpact(
  input: TrackEnvironmentalImpactInput
): Promise<TrackEnvironmentalImpactOutput> {
  return trackEnvironmentalImpactFlow(input);
}

const prompt = ai.definePrompt({
  name: 'trackEnvironmentalImpactPrompt',
  input: {schema: TrackEnvironmentalImpactInputSchema},
  output: {schema: TrackEnvironmentalImpactOutputSchema},
  prompt: `You are an environmental impact calculator. You will receive the amount of food saved (in kilograms) and money saved (in euros) by a user. Your job is to calculate the estimated CO2 emissions reduced (in kilograms) based on the food saved.  Return the foodSavedKg, moneySaved, and co2EmissionsReducedKg values in the output. Assume that on average, 1 kg of food waste is equivalent to 2.5 kg of CO2 emissions.

Food saved: {{foodSavedKg}} kg
Money saved: {{moneySaved}} euros`,
});

const trackEnvironmentalImpactFlow = ai.defineFlow(
  {
    name: 'trackEnvironmentalImpactFlow',
    inputSchema: TrackEnvironmentalImpactInputSchema,
    outputSchema: TrackEnvironmentalImpactOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    output!.co2EmissionsReducedKg = input.foodSavedKg * 2.5;
    return output!;
  }
);
