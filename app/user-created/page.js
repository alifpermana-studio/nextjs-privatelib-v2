"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar2";
import { useSession } from "next-auth/react";

export default function UploadForm() {
  const { data: session, status, update, loading } = useSession();

  const handleClick = (e) => {
    e.preventDefault();

    if (checkCharacter(myString)) {
      console.log(checkCharacter(myString));
    } else {
      console.log(checkCharacter(myString));
    }

    console.log(myString);
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="relative mx-auto mt-16 max-w-[1500px] p-10">
        <div className="mx-auto flex w-auto flex-col items-center justify-center rounded-xl bg-colorone p-1 dark:bg-colortwo dark:text-black">
          <h1 className="pb-4 pt-4 text-center text-2xl font-bold">
            Sign Up Successfuly.
          </h1>
          <p className="text-center text-lg">One last step you need to do.</p>
          <p className="pb-6 text-center text-lg">
            Please verify your account through the link has been sent to your
            email.
          </p>
          <p className="text-center">
            Log in here if your account has been verified.
          </p>
          <a
            className="my-2 rounded-lg bg-blue-500 px-4 py-2 text-xl font-bold text-white"
            href="/enter"
          >
            Login
          </a>
          <div className="flex flex-row flex-wrap items-center justify-center gap-4 pb-3 pt-6">
            <h1 className="text-center">Not receive any link?</h1>
            <a className="text-center text-blue-700" href="#">
              Resend link
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
