import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Profile {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    created_at: string;
    updated_at: string;
    avatar: string | null;
}

interface RecentUsersProps {
    profiles: Profile[];
}

export function RecentUsers({ profiles }: RecentUsersProps) {
    return (
        <div className="grid gap-8">
            <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                    {profiles.map((profile) => (
                        <div key={profile.id} className="flex items-center gap-4">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                {profile.avatar && (
                                    <AvatarImage src={profile.avatar} alt="Avatar" />
                                )}
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    {profile.first_name} {profile.last_name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {profile.email || "No email"}
                                </p>
                            </div>

                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
