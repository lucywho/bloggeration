import Link from "next/link"
import { client } from "../../lib/sanity"
import { PortableText } from "@portabletext/react"

export default function Post({ post }) {
    return (
        <>
            <div className="py-8">
                <Link as="/" href={"/"}>
                    <a className="block text-center w-fit pb-1 px-1 mx-auto border-b-2 border-gray-200 font-bold flex-row justify-center">
                        &lt; &lt; Back
                    </a>
                </Link>

                <h1 className="text-center text-gray-200 pt-10">
                    {post.title}
                </h1>

                <div className="mt-10 mx-auto text-center max-w-3xl px-10">
                    <div className="mb-10 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
                        <p className="mb-6 text-gray-600 uppercase text-sm">
                            {new Date(post.publishedAt).toDateString().slice(4)}
                        </p>
                        <div className="text-blue-900 text-left">
                            <PortableText value={post.body} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticProps({ params }) {
    const posts = await client.fetch(
        `*[_type == "post" && slug.current == $slug] {
    _id,
    title,
    publishedAt,
    body,
    'slug': slug.current,
  }`,
        { slug: params.slug }
    )

    return {
        props: { post: posts[0] },
    }
}

export async function getStaticPaths() {
    const posts = await client.fetch(
        `*[_type == "post"]{ 'slug': slug.current }`
    )
    return {
        paths:
            posts?.map((post) => ({
                params: {
                    slug: post.slug,
                },
            })) || [],
        fallback: false,
    }
}
