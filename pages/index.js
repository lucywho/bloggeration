import { client } from "lib/sanity"

export default function Home({ posts }) {
    return (
        <div className="py-8">
            <h1 className="mt-10 text-center text-3xl mb-10 font-extrabold tracking-tight">
                Welcome to my blog
            </h1>

            <div className="mt-20 mx-auto text-center max-w-3xl px-10">
                {posts.map((post, index) => (
                    <div
                        key={index}
                        className="mb-10 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col"
                    >
                        <p className="mb-6 text-gray-400 uppercase text-sm">
                            {new Date(post.publishedAt).toDateString().slice(4)}
                        </p>
                        <h3 className="text-3xl font-semibold text-gray-900">
                            {post.title}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const posts =
        await client.fetch(`*[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      publishedAt,
      'slug': slug.current,
    }`)

    return {
        props: { posts },
    }
}
