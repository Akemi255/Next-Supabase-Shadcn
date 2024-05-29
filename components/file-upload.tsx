"use client";

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from 'uuid';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from 'react-hot-toast';

interface UploadImageProps {
    onChange: (url: string) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onChange }) => {
    const [uploading, setUploading] = useState(false);
    const supabase = createClientComponentClient();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);


        const uniqueFilename = `${uuidv4()}-${file.name}`;

        const { data, error } = await supabase.storage.from('images').upload(uniqueFilename, file);

        if (error) {
            toast.error('Error uploading image');
            console.error('Error uploading image:', error);
            setUploading(false);
            return;
        }

        const { publicUrl } = supabase.storage.from('images').getPublicUrl(uniqueFilename).data;
        onChange(publicUrl);
        toast.success('Image uploaded successfully');
        setUploading(false);
    };

    return (
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="image">Upload Image</Label>
            <Input id="image" type="file" onChange={handleFileChange} disabled={uploading} />
            {uploading && <p>Uploading...</p>}
        </div>
    );
};

export default UploadImage;
