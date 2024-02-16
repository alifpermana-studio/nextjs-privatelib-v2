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

  console.log(status);

  useEffect(() => {
    if (status === "authenticated") {
      setUserStatus({
        status: true,
        name: session.user.name,
        image: session.user.image,
      });
    } else if (status === "loading") {
      setUserStatus({
        status: true,
        name: "Loading...",
        image: "",
      });
    }

    console.log(session);
  }, [status, session]);

  return (
    <div className="relative">
      <Navbar />
      <div className="relative mx-auto flex w-full max-w-[1500px] flex-col">
        <div className="relative mt-14 flex h-[30svh] w-full flex-col items-center justify-center gap-6 md:mt-0 md:h-[110svh]">
          <div className="absolute h-[30svh] w-full md:h-[110svh]">
            <Image
              src="https://ik.imagekit.io/alifpermanastudio/assets/profile-landing-page.png"
              fill="true"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="relative h-32 w-32 md:h-[200px] md:w-[200px]">
            <Image
              src={userStatus.image}
              fill="true"
              className="rounded-full border-4 border-white shadow-lg shadow-neutral-500 md:border-8"
            />
          </div>
          <div className="relative">
            <h1 className="text-center text-xl font-bold md:text-4xl">
              Welcome back, {userStatus.name}
            </h1>
          </div>
        </div>
        <div className="relative -mt-4 flex h-[100svh] w-full flex-col items-center justify-start rounded-2xl bg-darkmode p-4 dark:bg-lightmode md:flex-row">
          <div className="w-full rounded-2xl bg-lightmode p-2 dark:bg-darkmode">
            Your Favourite
          </div>
        </div>
      </div>
    </div>
  );
}
