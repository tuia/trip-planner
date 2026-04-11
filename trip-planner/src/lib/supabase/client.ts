import { createBrowserClient } from '@supabase/ssr';

let supabaseBrowserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (!supabaseBrowserClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error(`Missing Supabase credentials: URL=${!!url}, KEY=${!!key}`);
    }

    supabaseBrowserClient = createBrowserClient(url, key);
  }
  return supabaseBrowserClient;
}
