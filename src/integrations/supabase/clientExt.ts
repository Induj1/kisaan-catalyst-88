
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const SUPABASE_URL = "https://cdfndnpqlpifhndfffxd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkZm5kbnBxbHBpZmhuZGZmZnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNDU2NDYsImV4cCI6MjA1ODgyMTY0Nn0.2tbKswGGcMqWtwnxQA5by9BfbquVpRiRPY3aX2WLwL0";

// Import the supabase client like this:
// import { supabaseExt } from "@/integrations/supabase/clientExt";

export const supabaseExt = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
