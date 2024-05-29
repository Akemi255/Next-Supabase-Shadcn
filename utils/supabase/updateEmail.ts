import { createClient } from "@/utils/supabase/server";

export const updateEmail = async () => {
  try {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, email")
      .eq("id", user.id)
      .single();

    if (profileError) {
      throw profileError;
    }

    const { data: updateData, error: updateError } = await supabase
      .from("profiles")
      .update({ email: user.email })
      .eq("id", user.id);

    if (updateError) {
      throw updateError;
    }

    return true;
  } catch (error) {
    console.error("Error updating email:");
  }
};
