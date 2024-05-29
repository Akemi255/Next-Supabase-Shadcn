"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
    const pathname = usePathname();

    const routes = [
        { href: "/", label: "Home", active: pathname === "/" },
        { href: "/books", label: "Books", active: pathname === "/books" },
        { href: "/users", label: "Users", active: pathname === "/users" },
        { href: "/profile", label: "Profile", active: pathname === "/profile" },
    ];

    return (
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-muted-foreground transition-colors hover:text-foreground",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}
