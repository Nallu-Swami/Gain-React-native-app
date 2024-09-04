import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
    throw new Error('SUPABASE_KEY is not defined in environment variables');
}
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
