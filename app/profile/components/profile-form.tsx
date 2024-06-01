"use client";

import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UploadImage from '@/components/file-upload';
import { Profile } from '@/interfaces/interfaces';

import * as z from 'zod';

interface Props {
    profileData: Profile;
}

const profileSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    avatar: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileSection = ({ profileData }: Props) => {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: profileData.first_name || '',
            lastName: profileData.last_name || '',
            avatar: profileData.avatar || '',
        }
    });

    const handleImageChange = (url: string) => {
        setValue('avatar', url);
    };

    const onSubmit = async (data: ProfileFormValues) => {
        try {
            const response = await axios.patch('/api/profile', {
                first_name: data.firstName,
                last_name: data.lastName,
                avatar: data.avatar
            });

            if (response.status !== 200) {
                throw new Error('Failed to update profile');
            }

            toast.success("Profile updated successfully");
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error("Failed to update profile");
        }
    };

    return (
        <Card className="sm:w-1/2 w-full">
            <CardHeader>
                <CardTitle>Update your profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                placeholder="First name"
                                {...register('firstName')}
                                disabled={isSubmitting}
                            />
                            {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                placeholder="Last name"
                                {...register('lastName')}
                                disabled={isSubmitting}
                            />
                            {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                        </div>
                        <UploadImage onChange={handleImageChange} />
                    </div>
                    <Button disabled={isSubmitting} type="submit" className="flex justify-end mt-5">
                        {isSubmitting ? "Loading..." : "Update"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default ProfileSection;
