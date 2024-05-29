import Dashboard from "@/components/dashboard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Index() {

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) {
    console.error("Error fetching books:", error);
    return <div>Error fetching books</div>;
  }

  const { data: books, error: errorBooks } = await supabase
    .from('books')
    .select('*');

  if (errorBooks) {
    console.error("Error fetching books:", error);
    return <div>Error fetching books</div>;
  }

  return (
    <>
      <div className="flex flex-1 items-center justify-center min-h-screen mt-24 ">
        <Dashboard profiles={profiles} books={books} />
      </div>
    </>
  );
}
