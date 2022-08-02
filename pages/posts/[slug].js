import Link from "next/link"
import { client } from "../../lib/sanity"

export default function Post({ post }) {
    return (
        <>
            <div className="py-8">
                <Link as="/" href={"/"}>
                    <a className="block text-center w-fit pb-1 mx-auto border-b-2 border-gray-200 ">
                        &#8592; Back
                    </a>
                </Link>
                <h1 className="mt-10 text-center text-3xl mb-10 font-extrabold tracking-tight text-gray-200">
                    {post.title}
                </h1>

                <div className="mt-20 mx-auto text-center max-w-3xl px-10">
                    <div className="mb-10 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
                        <p className="mb-6 text-gray-400 uppercase text-sm">
                            {new Date(post.publishedAt).toDateString().slice(4)}
                        </p>
                        <p>body</p>
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
