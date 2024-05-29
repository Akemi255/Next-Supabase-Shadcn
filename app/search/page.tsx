import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SearchCard } from "./components/search-card";

export default async function NamePage({ searchParams }: {
    searchParams: { q: string };
}) {

    const query = searchParams.q
    const supabase = createClient();

    const { data: books, error } = await supabase
        .from('books')
        .select('*')
        .ilike('title', `%${query}%`);


    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    if (!books || books.length === 0) {
        return <div className="flex items-center justify-center min-h-screen">No books found</div>;
    }

    return (
        <div className="flex flex-wrap justify-center">
            {books.map((book) => (
                <div key={book.id} className="m-4">
                    <SearchCard book={book} user={user} />
                </div>
            ))}
        </div>
    );
}