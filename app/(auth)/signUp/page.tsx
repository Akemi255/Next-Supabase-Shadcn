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

import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { SubmitButton } from "../components/submit-button";

import { signUp } from "@/actions/signUp";
import toast from "react-hot-toast";

export default function SignUp() {

    return (
        <div className="flex justify-center items-center mt-20">
            <form action={async (formData) => {
                try {
                    const response = await signUp(formData);

                    toast.success("Check email to continue sign in process")

                } catch (error: unknown) {
                    toast.error("User or password incorrect");
                }
            }} method="post" className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your email and password to create an account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <CardFooter>
                            <SubmitButton pendingText="Loading..." formAction={signUp} type="submit" className="w-full">Sign Up</SubmitButton>
                        </CardFooter>
                        <div className="mt-4 text-center text-sm">
                            Have an account?{" "}
                            <Link href="/login" className="underline">
                                Login
                            </Link>
                        </div>
                        <Separator />
                    </CardContent>
                </Card>
            </form>
        </div >
    );
}