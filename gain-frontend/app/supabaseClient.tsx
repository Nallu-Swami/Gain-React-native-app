import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lwvuhloupadzwizsznbn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3dnVobG91cGFkendpenN6bmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0MjkyNTgsImV4cCI6MjA0MTAwNTI1OH0.2frBZAYNUwRlYXXOuOJekBUapcuTQeaTPEm2DWD-mVg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
