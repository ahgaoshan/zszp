"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface FamilyHistoryRecord {
  id: string;
  title: string;
  content: string | null;
  updated_at: string;
}

export async function fetchFamilyHistory(): Promise<FamilyHistoryRecord | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("family_history")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    // Table might not exist yet
    return null;
  }

  return data as FamilyHistoryRecord;
}

export async function saveFamilyHistory(
  title: string,
  content: string
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient();

  // Check if a record exists
  const { data: existing } = await supabase
    .from("family_history")
    .select("id")
    .limit(1)
    .single();

  let error;
  if (existing) {
    ({ error } = await supabase
      .from("family_history")
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq("id", existing.id));
  } else {
    ({ error } = await supabase
      .from("family_history")
      .insert({ title, content }));
  }

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/family-tree/history");
  return { success: true, error: null };
}
