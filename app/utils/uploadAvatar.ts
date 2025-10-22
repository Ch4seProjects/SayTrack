import { getSupabaseClient } from "@/app/utils/client";
import { compressImage } from "./compressImage";

export async function uploadAvatar(userId: string, file: File) {
  const supabase = getSupabaseClient();

  const compressedFile = await compressImage(file, 512); // 512px max width

  const safeFileName = compressedFile.name.replace(/\s+/g, "_").toLowerCase();
  const filePath = `${userId}/${safeFileName}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, compressedFile, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  const publicUrl = data.publicUrl;

  return publicUrl;
}
