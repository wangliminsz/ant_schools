import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.supa_url
// const supabaseKey = import.meta.env.supa_key
const supabaseUrl = process.env.VUE_APP_supa_url;
const supabaseKey = process.env.VUE_APP_supa_key;

export const supabase = createClient(supabaseUrl, supabaseKey);
