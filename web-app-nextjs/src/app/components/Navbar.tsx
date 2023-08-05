'use client'

import Link from "next/link";
import {Bars3Icon} from "@heroicons/react/24/solid";
import {signIn, signOut, useSession} from "next-auth/react";

const navigation = [
    {name: 'About', href: '/about', current: true},
    {name: 'Happy Hour', href: '/happyhour', current: false},
    {name: 'Pokemon', href: '/pokemon', current: false},
]

const getRightNav: React.FC = () => {
    const {data: session} = useSession()

    if (session?.user) {
        return <>
            <span>
                Hello {session.user.name}
            </span>
            <button className="btn btn-ghost" onClick={() => signOut()}>
                Logout
            </button>
        </>;
    }
    return <>
        <button className="btn btn-ghost" onClick={() => signIn()}>
            Login
        </button>
        <Link className="btn btn-ghost" href={'/auth/signup'}>
            Register
        </Link>
    </>;
}

export default function Navbar() {


    return (
        <div className="navbar bg-primary text-primary-content">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <Bars3Icon className={"h-10 w-10"}/>
                    </label>
                    <ul tabIndex={0}
                        className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navigation.map(n => {
                            return <li key={n.name}><Link href={n.href}>{n.name}</Link></li>
                        })}
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link className="btn btn-ghost normal-case text-xl" href={'/'}>Brian Hanna</Link>
            </div>
            <div className="navbar-end">
                {getRightNav({})}
            </div>
        </div>
    )
}
