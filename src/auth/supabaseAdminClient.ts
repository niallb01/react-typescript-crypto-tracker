import { createClient } from "@supabase/supabase-js";

const supabaseAdminUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAdminKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdminClient = createClient(supabaseAdminUrl, supabaseAdminKey);

export default supabaseAdminClient;
