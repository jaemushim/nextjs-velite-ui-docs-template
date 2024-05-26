import {componentsPosts} from "@/.velite";
import Link from "next/link";

export function SiteAside () {

    return (
        <aside className="w-1/5 py-6 pr-6 lg:py-8">
            <ul>
                {componentsPosts.map((post) =>
                    {
                        const componentName = post.slug.split('/').pop();

                        return (
                        <li key={post.slug}>
                            <Link href={'/' + post.slug} className="capitalize">{componentName}</Link>
                        </li>
                    )}
                )}
            </ul>
        </aside>
    )
}
