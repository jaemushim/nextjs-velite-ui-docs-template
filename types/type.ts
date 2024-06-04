import {ComponentPosts} from "@/.velite";

export interface PostPageProps {
    params: {
        slug: string[];
    };
    posts: ComponentPosts[];
}
