import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { RecentUsers } from "./components/recent-users";

export default async function UsersPage() {

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login")
    }

    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');

    if (error) {
        console.error("Error fetching books:", error);
        return <div>Error fetching books</div>;
    }

    return (
        <div className="">
            <RecentUsers profiles={profiles} />
        </div>
    );
}