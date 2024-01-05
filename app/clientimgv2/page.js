'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '../navbarv2/Navbar'
import styles from './page.module.css'
import { useSession } from 'next-auth/react'

export default function UploadForm() {
    const { data: session, status, update, loading } = useSession()
    const [userStatus, setUserStatus]=useState({
        status:false,
        name:"",
    })

    console.log(session);

    useEffect(()=>{
        if (status === "authenticated") {
            setUserStatus({
                status:true,
                name:session.user.name,
            })
        }
        console.log(session);
    },[status, session])    

    return (
        <div className="relative">
            <Navbar />
            <div className='relative mt-16'>
                <p className={(status)?"flex":"hidden"}>Hello, {userStatus.name}</p>
                <p className={(status)?"hidden":"flex"}>You are not logged in.</p>
            </div>
        </div>
    )
}



