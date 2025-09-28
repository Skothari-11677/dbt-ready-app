// src/lib/data.ts

import { supabase } from './supabaseClient';

// 1. Define a TypeScript type for our FAQ data.
// This gives us autocompletion and type safety.
export type Faq = {
  id: number;
  created_at: string;
  type: string;
  title_en: string;
  body_en: string;
  title_hi: string;
  body_hi: string;
};

// 2. Create the async function to fetch the data.
export async function getFaqs(): Promise<Faq[]> {
  // The 'async' keyword means this function will return a Promise.
  // The 'Promise<Faq[]>' part tells TypeScript that this promise will resolve
  // with an array of Faq objects.

  const { data, error } = await supabase
    .from('content')      // 1. Select the 'content' table
    .select('*')          // 2. Get all columns
    .eq('type', 'faq');   // 3. Filter for rows where the 'type' is 'faq'

  // Basic error handling
  if (error) {
    console.error('Error fetching FAQs:', error);
    return []; // Return an empty array if there's an error
  }

  // If there's no error, return the data
  return data;
}