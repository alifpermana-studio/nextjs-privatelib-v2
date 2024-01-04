'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '../navbarv2/Navbar'
import styles from './page.module.css'
import { useSession } from 'next-auth/react'

export default function UploadForm() {
    const { data: session, status, update, loading } = useSession()

    if (status === "authenticated") {
        return (
            <div className={styles.tesKhusus}>
                <Navbar />
                <div className='mt-20'>
                    <p>Signed in as {session.user.email}</p>
                </div>
            </div>
        )
    }

    console.log(status);

    return (
        <div className={styles.tesKhusus}>
            <Navbar />
            <div className='mt-20'>
                <p>You are not logged in.</p>
                <a href="/api/auth/signin">Sign in</a>
            </div>
        </div>
    )
}



