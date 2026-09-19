import { supabase } from "@/integrations/supabase/client";

const BUCKET = "site-images";
/** Ten years, in seconds — share links effectively never expire. */
const LINK_LIFETIME = 60 * 60 * 24 * 3650;

/** Uploads a picture to the site image library and returns a long-lived URL. */
export async function uploadSiteImage(file: File): Promise<string> {
  const extension = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: "31536000", upsert: false, contentType: file.type || undefined });
  if (uploadError) throw uploadError;

  const { data, error: signError } = await supabase.storage.from(BUCKET).createSignedUrl(path, LINK_LIFETIME);
  if (signError) throw signError;
  return data.signedUrl;
}
