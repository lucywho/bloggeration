import Head from "next/head"

export default function Header() {
    return (
        <>
            <Head>
                <title>Bloggeration</title>
                <meta name="description" content="blog" />
                <link rel="icon" href="/crayon.ico" />
            </Head>

            <div className="strapline">Bloggeration</div>
        </>
    )
}
