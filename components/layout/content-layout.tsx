import { MDXContent } from "@/components/mdx/mdx-components";
import { DashboardTableOfContents } from "@/components/mdx/toc";
import { getPostFromParams } from "@/lib/utils";
import { getTableOfContents } from "@/lib/toc";
import { PostPageProps } from "@/types/type";

const ContentLayout = async ({ params, posts }: PostPageProps) => {
  const getTitle = (slug: string) => {
    return slug.split("/").pop() || "";
  };
  const post = await getPostFromParams(params, posts);
  const title = getTitle(post?.slug || "");
  const toc = await getTableOfContents(post?.raw || "");

  return (
    <article className="relative flex py-6 lg:gap-16 lg:py-8">
      <div className="w-full prose">
        <h1 className="mb-2 capitalize">{title}</h1>
        <MDXContent code={post?.body || ""} />
      </div>
      <div>
        <aside className="sticky top-16 min-w-[200px] -mt-10 pt-4">
          <DashboardTableOfContents toc={toc} />
        </aside>
      </div>
    </article>
  );
};

export default ContentLayout;
