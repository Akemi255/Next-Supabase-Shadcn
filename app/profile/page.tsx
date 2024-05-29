import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ProfileSection from "./components/profile-form";

export default async function ProfilePage() {

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login")
    }

    const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        throw error;
    }

    return (
        <div className="flex justify-center mt-24">
            <ProfileSection profileData={profileData} />
        </div>
    );
}