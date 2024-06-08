// import { createClient } from "@supabase/supabase-js";

// // Access the environment variables
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// // Validate the environment variables
// // if (!supabaseUrl || !supabaseKey) {
// //   throw new Error("Supabase URL and Key must be provided.");
// // }

// // Create the Supabase client
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;

import { createClient } from "@supabase/supabase-js";

// Access the environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Validate the environment variables
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided.");
}

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
    return false;
  }
  return true;
};

export default supabase;
