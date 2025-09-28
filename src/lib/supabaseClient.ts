// src/lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// These environment variables should be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://llhcijkptodguvdowgmv.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsaGNpamtwdG9kZ3V2ZG93Z212Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwODI5MjUsImV4cCI6MjA3NDY1ODkyNX0.Np7t2GniOe4LKxD2Rw-MDvd9HXYjdgxVhKGXyUq4pCI';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});