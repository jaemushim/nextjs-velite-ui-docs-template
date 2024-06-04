import { MainNav } from "../ui/main-nav";
import { MobileNav } from "../ui/mobile-nav";
import { ModeToggle } from "../ui/mode-toggle";
import Search from "@/components/ui/search";
import { promises as fs } from "fs";

export async function SiteHeader() {
  const file = await fs.readFile(
    process.cwd() + "/.velite/componentsPosts.json",
    "utf8",
  );

  return (
    <header className="z-10 sticky top-0 w-full h-14 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-[1400px] items-center">
        <MainNav />
        <Search file={file} />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <ModeToggle />
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
