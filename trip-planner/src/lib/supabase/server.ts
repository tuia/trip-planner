// TODO: Uncomment and activate once Supabase credentials are set in .env.local
// Server-side client requires the Next.js cookies() helper from 'next/headers'.
// import { createServerClient } from '@supabase/ssr';
// import { cookies } from 'next/headers';

// export function createSupabaseServerClient() {
//   const cookieStore = cookies();
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     { cookies: { getAll: () => cookieStore.getAll() } }
//   );
// }

export const createSupabaseServerClient = null; // placeholder
