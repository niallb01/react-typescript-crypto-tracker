// import { createClient } from "@supabase/supabase-js";

// // Create a single supabase client for interacting with your database
// const supabase = createClient(
//   process.env.REACT_APP_SUPABASE_URL as any,
//   process.env.REACT_APP_SUPABASE_ANON_KEY as any
// );

// export default supabase;

import { createClient } from "@supabase/supabase-js";

// Access the environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Validate the environment variables
// if (!supabaseUrl || !supabaseKey) {
//   throw new Error("Supabase URL and Key must be provided.");
// }

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
