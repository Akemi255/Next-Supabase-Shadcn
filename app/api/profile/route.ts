import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const supabase = createClient();
    const body = await req.json();
    const { first_name, last_name, avatar } = body;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ first_name, last_name, avatar })
      .eq("id", user.id);

    if (updateError) {
      console.log(updateError);
      return new NextResponse("Error al actualizar el perfil del usuario", {
        status: 500,
      });
    }

    return new NextResponse("Profile updated successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
