import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mergeContent, type ContentMap } from "@/lib/site-content";

export const siteContentQueryKey = ["site_content"] as const;

export async function fetchSiteContentRows(): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.from("site_content").select("key, data");
  if (error) throw error;
  return Object.fromEntries((data ?? []).map((row) => [row.key, row.data]));
}

/** Content for the public site: database overrides merged over the static defaults. */
export function useSiteContent(): ContentMap {
  const { data } = useQuery({
    queryKey: siteContentQueryKey,
    queryFn: fetchSiteContentRows,
    staleTime: 60_000,
    retry: false,
  });
  return mergeContent(data);
}
