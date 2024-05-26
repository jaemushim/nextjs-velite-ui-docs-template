import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import Search from "@/components/search";
import {promises as fs} from "fs";

export async function  SiteHeader() {
  const file = await fs.readFile(process.cwd() + '/.velite/componentsPosts.json', 'utf8');


  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
