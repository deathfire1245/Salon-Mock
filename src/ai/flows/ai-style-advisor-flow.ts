'use server';
/**
 * @fileOverview An AI Style Advisor that provides personalized recommendations for hairstyles, color options, or beauty treatments.
 *
 * - aiStyleAdvisor - A function that handles the AI style advisory process.
 * - AIStyleAdvisorInput - The input type for the aiStyleAdvisor function.
 * - AIStyleAdvisorOutput - The return type for the aiStyleAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIStyleAdvisorInputSchema = z.object({
  hairType: z
    .string()
    .describe(
      'The user\'s hair type (e.g., straight, wavy, curly, coily, fine, thick, oily, dry).'
    ),
  desiredLook: z
    .string()
    .describe(
      'What kind of look the user is aiming for (e.g., elegant, casual, bold, natural, low-maintenance).'
    ),
  occasion: z
    .string()
    .describe(
      'The occasion for the style (e.g., daily wear, special event, professional setting, wedding).'
    ),
  currentStyle: z
    .string()
    .optional()
    .describe(
      'Description of the user\'s current hairstyle or color, if applicable.'
    ),
  concerns: z
    .string()
    .optional()
    .describe(
      'Any specific hair concerns or preferences the user has (e.g., hair loss, damage, want to cover greys, avoid heat styling).'
    ),
});
export type AIStyleAdvisorInput = z.infer<typeof AIStyleAdvisorInputSchema>;

const AIStyleAdvisorOutputSchema = z.object({
  overallAdvice: z
    .string()
    .describe('A general summary of the advice provided.'),
  recommendations: z
    .array(
      z.object({
        type: z
          .enum(['hairstyle', 'color', 'treatment'])
          .describe('The type of recommendation (hairstyle, color, or treatment).'),
        suggestion: z
          .string()
          .describe('The specific style, color, or treatment recommendation.'),
        justification: z
          .string()
          .describe(
            'Why this recommendation is suitable based on the user\'s input.'
          ),
      })
    )
    .describe('A list of personalized recommendations.'),
});
export type AIStyleAdvisorOutput = z.infer<typeof AIStyleAdvisorOutputSchema>;

export async function aiStyleAdvisor(
  input: AIStyleAdvisorInput
): Promise<AIStyleAdvisorOutput> {
  return aiStyleAdvisorFlow(input);
}

const aiStyleAdvisorPrompt = ai.definePrompt({
  name: 'aiStyleAdvisorPrompt',
  input: {schema: AIStyleAdvisorInputSchema},
  output: {schema: AIStyleAdvisorOutputSchema},
  prompt: `You are an AI Style Advisor for EleganceHaven Salon. Your task is to provide personalized recommendations for hairstyles, hair colors, or beauty treatments based on the client's input. Be creative, practical, and provide clear justifications for each suggestion. Ensure the output is a JSON object matching the provided schema.

Client Details:
Hair Type: {{{hairType}}}
Desired Look: {{{desiredLook}}}
Occasion: {{{occasion}}}
{{#if currentStyle}}
Current Style: {{{currentStyle}}}
{{/if}}
{{#if concerns}}
Concerns/Preferences: {{{concerns}}}
{{/if}}

Please provide 2-3 distinct recommendations, ensuring each has a type (hairstyle, color, or treatment), a specific suggestion, and a justification based on the client's details. Also, include an overall advice summary.`,
});

const aiStyleAdvisorFlow = ai.defineFlow(
  {
    name: 'aiStyleAdvisorFlow',
    inputSchema: AIStyleAdvisorInputSchema,
    outputSchema: AIStyleAdvisorOutputSchema,
  },
  async input => {
    const {output} = await aiStyleAdvisorPrompt(input);
    return output!;
  }
);
