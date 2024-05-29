"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

export function MobileMenu() {

    const pathname = usePathname();

    const routes = [
        { href: "/", label: "Home", active: pathname === "/" },
        { href: "/books", label: "Books", active: pathname === "/books" },
        { href: "/users", label: "Users", active: pathname === "/users" },
        { href: "/profile", label: "Profile", active: pathname === "/profile" },
    ];

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
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
            </SheetContent>
        </Sheet>
    );
}
