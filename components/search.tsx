"use client"

import Fuse from "fuse.js";
import {useCallback, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandInput, CommandItem,
    CommandList,
} from "@/components/command";
import {CircleIcon} from "lucide-react";
import {useRouter} from "next/navigation";

const Search = ({file}:{file :string}) => {
    const router = useRouter();
    const data = JSON.parse(file);


    const [open, setOpen] = useState(false);
    const [input, setInput] = useState<any>([]);
    const [search, setSearch] = useState('')

    const handleSearch = (value:string) => {

        const fuse = new Fuse(data, {
            keys: ["slug", "raw", "slugAsParams"],
        });

        const results = fuse.search(value);
        const items = results.map((result) => result.item);
        setInput(items);
    };

    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e:any) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    const runCommand = useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    return (
        <div>
            <Button
                variant="outline"
                className={cn(
                    "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
                )}
                onClick={() => setOpen(true)}
            >
                <span className="hidden lg:inline-flex">검색어를 입력하세요.</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
               <Command>
                   <CommandInput onValueChange={handleSearch} placeholder="Type a command or search..." />


                   <CommandList>
                       <CommandEmpty>No results found.</CommandEmpty>
                           {input?.map((post: any, index: any) => (
                               <CommandItem className="cursor-pointer" value={post.slugAsParams} key={Math.random()}
                                            onSelect={() => {
                                                runCommand(() => router.push('/' + post.slug))
                                            }}>
                                   <div className="cursor-pointer mr-2 flex h-4 w-4 items-center justify-center">
                                       <CircleIcon className="h-3 w-3" />
                                   </div>
                                   {post.slugAsParams}
                               </CommandItem>
                           ))}

                   </CommandList>
               </Command>
            </CommandDialog>
        </div>
    );
};

export default Search;
