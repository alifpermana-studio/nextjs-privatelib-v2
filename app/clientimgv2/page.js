"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar2";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";

export default function UploadForm() {
  const { data: session, status, update, loading } = useSession();
  const [userStatus, setUserStatus] = useState({
    status: false,
    name: "",
  });
  const [myString, setMyString] = useState();
  const [errorEmail, setErrorEmail] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setUserStatus({
        status: true,
        name: session.user.name,
      });
    }
    /* console.log(session); */
    function checkAtSign(myString) {
      return /@/.test(myString);
    }

    if (!checkAtSign(myString)) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    console.log(errorEmail);
  }, [status, session, errorEmail, myString]);

  function checkCharacter(myString) {
    return /[\{\}\[\]\#\&\%\(\)\*\!\`^~<>,"'\/]/.test(myString);
  }

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
      <div className="relative mt-16">
        <p className={status ? "flex" : "hidden"}>Hello, {userStatus.name}</p>
        <p className={status ? "hidden" : "flex"}>You are not logged in.</p>
      </div>
      <form onSubmit={handleClick}>
        <input type="text" onChange={(e) => setMyString(e.target.value)} />
        <input type="submit" value="Submit" onClick={handleClick} />
      </form>
    </div>
  );
}
