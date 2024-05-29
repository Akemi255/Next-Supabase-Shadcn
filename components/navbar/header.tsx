import { ModeToggle } from "./mode-toggle";
import UserButton from "./user-button";
import { MobileMenu } from "./mobile-menu";
import { Nav } from "./nav";
import SearchInput from "./search-input";

export function Header() {

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-30">
            <Nav />
            <MobileMenu />
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <SearchInput />
                <ModeToggle />
                <UserButton />
            </div>
        </header>
    );
}
