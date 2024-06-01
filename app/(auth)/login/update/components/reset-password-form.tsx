"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { SubmitButton } from "@/app/(auth)/components/submit-button";
import { updateUser } from "@/actions/updateUser";

export default function ResetPasswordForm() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleResetPassword = async (event: any) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await updateUser(newPassword)

            if (response) {
                toast.success("Password has been reset successfully");
                router.push("/login");
            }

            if (!response) {
                toast.error("Failed to reset password");
            }
        } catch (error) {
            toast.error("Failed to reset password");
            console.log(error);

        }
    };

    return (
        <div className="flex justify-center items-center mt-20">
            <form onSubmit={handleResetPassword} className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Reset Password</CardTitle>
                        <CardDescription>
                            Enter your new password below.
                        </CardDescription>
                        <Separator />
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input
                                id="new-password"
                                name="new-password"
                                type="password"
                                placeholder="New Password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <CardFooter>
                            <SubmitButton pendingText="Loading..." type="submit" className="w-full">
                                Reset Password
                            </SubmitButton>
                        </CardFooter>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
