import { componentsPosts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {getTableOfContents} from "@/lib/toc";
import {DashboardTableOfContents} from "@/components/toc";
interface PostPageProps {
  params: {
    slug: string[];
  };
}

function getTitle (slug:string) { return slug.split('/').pop() || ''}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = componentsPosts.find((post) => post.slugAsParams === slug);
  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  const title = getTitle(post.slug);
  ogSearchParams.set("title", title);

  return {
    title: title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return componentsPosts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

async function getDocFromParams({ params }: any) {
  const slug = params.slug?.join("/") || ""
  const doc = componentsPosts.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    return null
  }

  return doc
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);
  const title = getTitle(post?.slug || '');

  const toc = await getTableOfContents(post?.raw ||'');

  return (
    <article className="relative py-6 lg:gap-16 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="prose">
        <h1 className="mb-2 capitalize">{title}</h1>
        <hr className="my-4" />
        <MDXContent code={post?.body ||''} />
      </div>
      <div>
        <aside className="sticky top-16 -mt-10 pt-4">
          <DashboardTableOfContents toc={toc} />
        </aside>
      </div>
    </article>
  );
}
