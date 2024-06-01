
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ResetPasswordForm from "./components/reset-password-form";

export default async function UpdatePage({ searchParams }: { searchParams: { code: string } }) {

    const { code } = searchParams
    const supabase = createClient();

    try {
        await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
        redirect("/login")
    }


    return (
        <div>
            <ResetPasswordForm />
        </div>
    );
}