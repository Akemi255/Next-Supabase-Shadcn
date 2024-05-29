
"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Book } from "@/interfaces/interfaces";

import toast from "react-hot-toast";
import { User } from "@supabase/supabase-js";
import qs from 'query-string';
import axios from "axios";
import { useState } from "react";

interface SearchCardProps {
    book: Book;
    user: User;
}

export function SearchCard({ book, user }: SearchCardProps) {

    const [loading, setLoading] = useState(false);

    const claimBook = async (bookId: string, userId: string) => {
        try {
            setLoading(true)
            const url = qs.stringifyUrl({
                url: `/api/books/${bookId}`,
                query: {
                    userId: userId,
                },
            });

            await axios.patch(url);
            toast.success("Book claimed");

        } catch (error) {
            toast.error("Book has already been taken");
        } finally {
            setLoading(false)
        }
    }


    return (
        <Card className="sm:w-[400px] w-100%">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-lg font-bold">Author: {book.author}</div>
                <div className="text-md">Genre: {book.genre}</div>
                <div className="text-md">Published: {new Date(book.published_date).toLocaleDateString()}</div>
                <p className="text-xs text-muted-foreground">Created at: {new Date(book.created_at).toLocaleDateString()}</p>
            </CardContent>
            <div className="flex justify-center">
                <Button
                    disabled={loading}
                    className="ml-1 mb-3 py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105" onClick={() => claimBook(book.id, user.id)}
                >{loading ? 'Loading...' : 'Claim'}
                </Button>
            </div>
        </Card>
    );
}