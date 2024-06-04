import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ComponentPosts } from "@/.velite";
import { PostPageProps } from "@/types/type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getPostFromParams(
  params: PostPageProps["params"],
  posts: ComponentPosts[],
) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);
  return post;
}
