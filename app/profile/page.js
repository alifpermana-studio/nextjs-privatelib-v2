"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar2";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Profile() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/enter");
    },
  });
  const [userStatus, setUserStatus] = useState({
    status: false,
    name: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      setUserStatus({
        status: true,
        name: session.user.name,
      });
    }

    console.log(session);
  }, [status, session]);

  return (
    <div className="relative">
      <Navbar />
      <div className="relative mt-16">
        {status ? (
          <p className="flex">Hello, {userStatus.name}</p>
        ) : (
          <p className="flex">You are not logged in.</p>
        )}
      </div>
    </div>
  );
}
