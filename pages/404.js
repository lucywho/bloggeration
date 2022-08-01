import Link from "next/link"

export default function FourOhFour() {
    return (
        <>
            <div className="mx-auto mt-4 py-10  w-1/3 text-center">
                <div className="my-28 text-3xl">
                    Oops! There&apos;s nothing here!
                </div>
                <Link href="/">
                    <a className="text-xl font-bold p-6 capitalize hover:text-green-400 border  border-green-400 ">
                        Return to Home Page
                    </a>
                </Link>
            </div>
        </>
    )
}
