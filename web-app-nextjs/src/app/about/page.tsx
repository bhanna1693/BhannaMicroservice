import {getServerSession} from "next-auth/next"
import {redirect} from "next/navigation"
import {options} from "@/app/api/auth/[...nextauth]/options";

export default async function AboutPage() {
    // const session = await getServerSession(options)
    //
    // if (!session) {
    //     redirect('/api/auth/signin?callbackUrl=/server')
    // }

    return (
        <section className="flex flex-col gap-6">
            {JSON.stringify("")}
        </section>
    )

}
