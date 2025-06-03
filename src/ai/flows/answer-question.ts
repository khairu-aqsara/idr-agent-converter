'use server';

/**
 * @fileOverview An AI agent that converts IDR to a list of specified currencies and displays the result in a table.
 *
 * - answerQuestion - A function that handles the currency conversion request.
 * - AnswerQuestionInput - The input type for the answerQuestion function.
 * - AnswerQuestionOutput - The return type for the answerQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQuestionInputSchema = z.object({
  question: z.string().describe('The user query, potentially asking to convert an IDR amount or for IDR exchange rates.'),
});
export type AnswerQuestionInput = z.infer<typeof AnswerQuestionInputSchema>;

const AnswerQuestionOutputSchema = z.object({
  answer: z.string().describe('The currency conversion table in Markdown format, or a message if the query is not about IDR conversion.'),
});
export type AnswerQuestionOutput = z.infer<typeof AnswerQuestionOutputSchema>;

export async function answerQuestion(input: AnswerQuestionInput): Promise<AnswerQuestionOutput> {
  return answerQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerQuestionPrompt',
  input: {schema: AnswerQuestionInputSchema},
  output: {schema: AnswerQuestionOutputSchema},
  prompt: `You are a currency converter AI. You specialize in converting Indonesian Rupiah (IDR) to a specific list of other currencies.
When the user asks to convert an amount of IDR (e.g., 'convert 100000 IDR', '150000 IDR to USD', 'how much is 50000 IDR in GBP?') or asks for general IDR exchange rates for supported currencies, you MUST respond with a Markdown table.
The table should show the conversion of the specified IDR amount into GBP, USD, MYR, AUD, and SGD.
If no specific IDR amount is mentioned in the query, use a default amount of 100,000 IDR for the conversion.

The Markdown table must include the following columns:
- Flag: The flag emoji for the target currency.
- Code: The 3-letter currency code for the target currency (e.g., USD).
- Currency Name: The full name of the target currency (e.g., US Dollar).
- Rate (1 XXX to IDR): A plausible exchange rate, formatted as how many IDR equals 1 unit of the target currency. For example, if 1 USD = 16,300 IDR, this value should be 16300.
- Amount (for X IDR): The converted amount in the target currency, based on the user's specified IDR amount (or 100,000 IDR if not specified). Show this with 2 decimal places.

To calculate the 'Amount (for X IDR)', you will divide the input IDR amount (e.g., 100,000 IDR or the amount specified by the user) by the 'Rate (1 XXX to IDR)' for that currency.
For example, if the input is 150,000 IDR and the rate for USD is 1 USD = 16,300 IDR, then the 'Amount (for 150,000 IDR)' for USD is 150,000 / 16,300 = 9.20.

Use the following plausible (but not live) exchange rates for your calculations:
- 1 GBP = 20,500 IDR
- 1 USD = 16,300 IDR
- 1 MYR = 3,500 IDR
- 1 AUD = 10,800 IDR
- 1 SGD = 12,000 IDR

First, state the base IDR amount being converted, for example: "Base Amount: 100,000 IDR".
Then, provide the Markdown table.

Example table format for a query like "convert 100000 IDR":
Base Amount: 100,000 IDR

| Flag | Code | Currency Name     | Rate (1 XXX to IDR) | Amount (for 100,000 IDR) |
| :--: | :--- | :---------------- | :------------------: | :----------------------: |
| 🇬🇧 | GBP | British Pound     | 20500                | 4.88                     |
| 🇺🇸 | USD | US Dollar         | 16300                | 6.13                     |
| 🇲🇾 | MYR | Malaysian Ringgit | 3500                 | 28.57                    |
| 🇦🇺 | AUD | Australian Dollar | 10800                | 9.26                     |
| 🇸🇬 | SGD | Singapore Dollar  | 12000                | 8.33                     |

If the user's query does not seem to be about converting IDR or asking for IDR exchange rates to the supported currencies, politely state: "I am a currency converter specializing in IDR. Please ask me to convert an IDR amount or ask for IDR exchange rates to GBP, USD, MYR, AUD, or SGD."
If the user asks to convert IDR to a currency NOT in the list (GBP, USD, MYR, AUD, SGD), respond with the standard table for the supported currencies (using the user's specified IDR amount or 100,000 IDR default) and add a note below the table: "Note: I can currently only provide conversions from IDR to GBP, USD, MYR, AUD, and SGD."

User query: {{{question}}}

Your response (ensure it includes the 'Base Amount' line and then a valid Markdown table if applicable, or the polite message):
`,
});

const answerQuestionFlow = ai.defineFlow(
  {
    name: 'answerQuestionFlow',
    inputSchema: AnswerQuestionInputSchema,
    outputSchema: AnswerQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
