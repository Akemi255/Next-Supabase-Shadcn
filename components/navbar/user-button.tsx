import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
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
        .from("profiles")
        .select("*")
        .eq("id", user.id)
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
        <Popover>
            <PopoverTrigger asChild className="border-none">
                <Button variant="secondary" size="icon" className="rounded-full">
                    {profileData.avatar ? (
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={profileData.avatar} alt="Avatar" />
                        </Avatar>
                    ) : (
                        <CircleUser className="h-5 w-5" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[200px]">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">User Information</h4>
                        <p className="text-sm text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <Button onClick={signOut}>
                            Logout
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default UserButton;
