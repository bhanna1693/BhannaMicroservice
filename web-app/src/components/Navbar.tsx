'use client'

import {Bars3Icon} from "@heroicons/react/24/solid";
import {Link} from "react-router-dom";
import {globalActions, useGlobalState} from "../context/GlobalStateContext";

const navigation = [
    {name: 'About', href: '/about', current: true},
    {name: 'Happy Hour', href: '/happyhour', current: false},
    {name: 'Pokemon', href: '/pokemon', current: false},
]

const getRightNav = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { state, dispatch } = useGlobalState();

    const signOut = () => {
        // sign out user
        dispatch(globalActions.removeUser())
    }

    if (state.user) {
        return <>
            <span>
                Hello {state.user?.name}
            </span>
            <button className="btn btn-ghost" onClick={() => signOut()}>
                Logout
            </button>
        </>;
    }
    return <>
        <Link className="btn btn-ghost" to={'/auth/signin'}>
             Login
        </Link>
        <Link className="btn btn-ghost" to={'/auth/signup'}>
            Register
        </Link>
    </>;
}

export default function Navbar() {

    return (
        <div className="navbar bg-primary text-primary-content">
            <div className="navbar-start">
                <div className={"dropdown"}>
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <Bars3Icon className={"h-10 w-10"}/>
                    </label>
                    <ul tabIndex={0}
                        className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52">
                        {navigation.map(n => {
                            return <li key={n.name}><Link to={n.href}>{n.name}</Link></li>
                        })}
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link className="btn btn-ghost normal-case text-xl" to={'/'}>Brian Hanna</Link>
            </div>
            <div className="navbar-end">
                {getRightNav()}
            </div>
        </div>
    )
}
