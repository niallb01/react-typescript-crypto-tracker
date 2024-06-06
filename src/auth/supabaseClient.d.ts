// declare module "../auth/supabaseClient" {
//   import { SupabaseClient } from "@supabase/supabase-js";
//   const supabase: SupabaseClient;
//   export default supabase;
// }

import { SupabaseClient } from "@supabase/supabase-js";

declare module "@auth/supabaseClient" {
  const supabase: SupabaseClient;
  export default supabase;
}
