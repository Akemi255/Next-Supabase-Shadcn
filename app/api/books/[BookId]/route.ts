import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { BookId: string } }
) {
  try {
    const supabase = createClient();
    const bookId = params.BookId;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.BookId) {
      return new NextResponse("Book id is required", { status: 400 });
    }

    // Verificar si el libro ya tiene un usuario asignado
    const { data: bookData, error: bookError } = await supabase
      .from("books")
      .select("user_id")
      .eq("id", bookId)
      .single();

    if (bookError) {
      throw bookError;
    }

    if (bookData.user_id) {
      return new NextResponse("El libro ya ha sido tomado", { status: 403 });
    }

    // Actualizar el libro con el ID proporcionado
    const { error } = await supabase
      .from("books")
      .update({ user_id: userId })
      .eq("id", bookId);

    if (error) {
      throw error;
    }

    // Si la actualización se realiza correctamente, devolver una respuesta exitosa
    return new NextResponse("Book updated successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
