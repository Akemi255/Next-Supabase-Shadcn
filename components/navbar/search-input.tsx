"use client"
import { Search } from "lucide-react";
import { Input } from "../ui/input";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {

    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    if (typeof searchQuery !== "string") {
        return;
    }

    const onSearch = (event: any) => {
        event.preventDefault();
        const encodedSearchQuery = encodeURIComponent(searchQuery);
        router.push(`/search?q=${encodedSearchQuery}`);
    };

    return (
        <form onSubmit={onSearch} className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    type="search"
                    placeholder="Search Books..."
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
            </div>
        </form>
    );
}