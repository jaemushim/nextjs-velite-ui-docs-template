import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Tag } from "./tag";

interface PostItemProps {
  slug: string;
  description?: string;
}

export function PostItem({
  slug,
  description,
}: PostItemProps) {
  return (
    <article className="flex flex-col gap-2 border-border border-b py-3">
      <div>
        <h2 className="text-2xl font-bold">
          타이틀
        </h2>
      </div>
      <div className="max-w-none text-muted-foreground">{description}</div>
     ㅋㅋㅋ
    </article>
  );
}
