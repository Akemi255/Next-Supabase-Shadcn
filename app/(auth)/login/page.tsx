"use client";

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

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SubmitButton } from "../components/submit-button";
import { signIn } from "@/actions/signIn";

export default function Login() {
  const supabase = createClientComponentClient();
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const email = event.target.email.value;

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.href}/update`,
      });

      if (error) {
        if (error.status === 429) {
          toast.error("Too many requests. Please try again later.");
        } else {
          toast.error("Something went wrong");
          console.error(error);
        }
      } else {
        toast.success("Password reset email sent!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      {isResettingPassword ? (
        <form onSubmit={handlePasswordReset} className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Reset Password</CardTitle>
              <CardDescription>
                Enter your email to receive a password reset link.
              </CardDescription>
              <Separator />
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <CardFooter>
                <SubmitButton pendingText="Loading..." type="submit" className="w-full" disabled={loading}>
                  {loading ? "Loading" : "Send Reset Link"}
                </SubmitButton>
              </CardFooter>
              <div className="mt-4 text-center text-sm">
                Remembered your password?{" "}
                <button
                  type="button"
                  className="underline"
                  onClick={() => setIsResettingPassword(false)}
                >
                  Go back to login
                </button>
              </div>
              <Separator />
            </CardContent>
          </Card>
        </form>
      ) : (
        <form
          action={async (formData) => {
            try {
              await signIn(formData);
            } catch (error) {
              toast.error("User or password incorrect");
            }
          }}
          method="post"
          className="w-full max-w-sm"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
              </CardDescription>
              <Separator />
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
                <SubmitButton pendingText="Loading..." type="submit" className="w-full">
                  Sign In
                </SubmitButton>
              </CardFooter>
              <div className="mt-4 text-center text-sm">
                Forgot your password?{" "}
                <button
                  type="button"
                  className="underline"
                  onClick={() => setIsResettingPassword(true)}
                >
                  Reset it
                </button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signUp" className="underline">
                  Sign up
                </Link>
              </div>
              <Separator />
            </CardContent>
          </Card>
        </form>
      )}
    </div>
  );
}
