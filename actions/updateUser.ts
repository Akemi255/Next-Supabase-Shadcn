"use server";

import { createClient } from "@/utils/supabase/server";

export const updateUser = async (newPassword: string) => {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.log(error);
    return false;
  }

  return true;
};
