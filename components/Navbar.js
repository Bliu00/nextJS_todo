import React from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0';

export default function Navbar(){
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return(
        <nav className="flex justify-between items-center py-4">
            <a href="./">
                <p  className="text-2xl font-bold text-grey-800 hover:opacity-30">My Todos </p>
            </a>
            <div className="flex">
                {
                    user && (
                        <>
                            <a href="user">
                                <img href="/user" className=" rounded-full w-10 h-10 mr-4 hover:opacity-50" src={user.picture} alt={user.name} />
                            </a>
                            <Link href="/api/auth/logout">
                                <a className=" rounded bg-blue-500 hover:bg-blue-600 
                                text-white py-2 px-4">   
                                    Logout
                                </a>
                            </Link>
                        </>
                    )
                }
                {
                    !user && (
                        <>
                            <Link href="/api/auth/login">
                                <a className=" rounded bg-blue-500 hover:bg-blue-600 
                                text-white py-2 px-4">   
                                    Login
                                </a>
                            </Link>
                        </>
                    )
                }
            </div>
        </nav>
    )
}