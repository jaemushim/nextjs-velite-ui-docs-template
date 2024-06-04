"use client";

import { componentsPosts, utilsPosts } from "@/.velite";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SiteAside() {
  const pathname = usePathname();

  const currentPost = pathname.split("/").pop();

  return (
    <div className="w-1/5">
      <aside className="sticky top-14 w-full py-6 pr-6 lg:py-8">
        <div className="mb-8">
          <p className="font-semibold text-lg mb-1">Components</p>
          <ul>
            {componentsPosts.map((post) => {
              const componentName = post.slug.split("/").pop();

              return (
                <li key={post.slug} className="text-sm mb-0.5">
                  <Link
                    href={"/" + post.slug}
                    className={cn(
                      "py-1 block w-1/2 text-gray-700",
                      currentPost === post.slugAsParams &&
                        "font-semibold text-gray-700 underline",
                    )}
                  >
                    {componentName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-lg mb-1">Hooks & Utils</p>
          <ul>
            {utilsPosts.map((post) => {
              const componentName = post.slug.split("/").pop();

              return (
                <li key={post.slug} className="text-sm mb-0.5">
                  <Link
                    href={"/" + post.slug}
                    className={cn(
                      "py-1 block w-1/2 text-gray-700",
                      currentPost === post.slugAsParams &&
                        "font-semibold text-gray-700 underline",
                    )}
                  >
                    {componentName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
