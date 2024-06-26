import "@/styles/mdx.css";
import ContentLayout from "@/components/layout/content-layout";
import {PostPageProps} from "@/types/type";
import {componentsPosts} from "@/.velite";

export default async function PostPage({ params }: PostPageProps) {

  return (
    <ContentLayout posts={componentsPosts} params={params} />
  );
}
