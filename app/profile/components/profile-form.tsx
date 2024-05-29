"use client";

import { useState } from 'react';
import axios from 'axios';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Profile } from '@/interfaces/interfaces';
import toast from 'react-hot-toast';
import UploadImage from '@/components/file-upload';

interface Props {
    profileData: Profile
}

const ProfileSection = ({ profileData }: Props) => {
    const [firstName, setFirstName] = useState(profileData.first_name || '');
    const [lastName, setLastName] = useState(profileData.last_name || '');
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(profileData.avatar || '');

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }

    const handleImageChange = (url: string) => {
        setProfileImage(url);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.patch('/api/profile', {
                first_name: firstName,
                last_name: lastName,
                avatar: profileImage
            });

            if (response.status !== 200) {
                throw new Error('Failed to update profile');
            }

            toast.success("Profile updated successfully");
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="sm:w-1/2 w-full">
            <CardHeader>
                <CardTitle>Update your profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="First name" value={firstName} onChange={handleFirstNameChange} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Last name" value={lastName} onChange={handleLastNameChange} />
                        </div>
                        <UploadImage onChange={handleImageChange} />
                    </div>
                    <Button disabled={loading} type="submit" className="flex justify-end mt-5">{loading ? "Loading..." : "Update"}</Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default ProfileSection;
