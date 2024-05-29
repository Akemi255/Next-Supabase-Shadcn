import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { CircleUser } from "lucide-react";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";

const UserButton = async () => {

    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();
    const user = authData?.user;

    if (!user) {
        return (
            <Button asChild>
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
            </Button>
        );
    }

    const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        throw error;
    }

    const signOut = async () => {
        "use server";

        const supabase = createClient();
        await supabase.auth.signOut();
        return redirect("/login");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    {profileData.avatar ?
                        (<Avatar className="h-9 w-9">
                            <AvatarImage src={profileData.avatar} alt="Avatar" />
                        </Avatar>)
                        : (<CircleUser className="h-5 w-5" />)}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuItem>
                    {user ? (<form action={signOut}>
                        <Button>
                            Logout
                        </Button>
                    </form>) : (<Link
                        href="/login"
                        className=""
                    >
                        <Button>Login</Button>
                    </Link>)}

                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton

