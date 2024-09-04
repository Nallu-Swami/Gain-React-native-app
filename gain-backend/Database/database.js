import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
config();
//Connection code for Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
    throw new Error("Invalid Enviornment Process key");
}

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
