"use client"

import { signOut } from "next-auth/react"
import { Button } from "primereact/button"


export default function NavBar() {

    return (
        <>
            <div className="flex justify-content-end">
                <Button label="Logout" onClick={() => signOut()} />
            </div>
        </>
    )
}