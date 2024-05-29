import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { BookCard } from "./components/card";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: books, error } = await supabase
    .from('books')
    .select('*');

  if (error) {
    console.error("Error fetching books:", error);
    return <div>Error fetching books</div>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {books.map((book) => (
          <div key={book.id} className="m-4">
            <BookCard book={book} user={user} />
          </div>
        ))}
      </div>
    </>
  );
}
