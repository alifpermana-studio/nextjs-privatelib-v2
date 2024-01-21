"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar2";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function Enter() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [fieldError, setFieldError] = useState();
  const [showPass, setShowPass] = useState(false);
  const [warningPopUp, setWarningPopUp] = useState(false);
  const fieldErrorRef = useRef(false);

  if (status === "authenticated") {
    redirect("/profile");
  }

  const signInGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/profile" });
    } catch (err) {
      console.log(err);
    }
  };

  const signInGithub = async () => {
    try {
      await signIn("github", { callbackUrl: "/profile" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      const { message, status } = await res.json();

      if (status !== 201) {
        if (message === "Unverified") {
          setWarningPopUp(true);
        }
        setFieldError(message);
        openAllert();
      }

      if (message === "Verified") {
        await signIn("credentials", {
          callbackUrl: "/profile",
          email: formData.email,
          password: formData.password,
        });

        /* const res = await testAuth.json(); */
        /* console.log(testAuth); */
      }

      if (!res.ok) {
        throw new Error(await message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openAllert = () => {
    const goToAllert = fieldErrorRef.current;
    window.scrollTo({
      top: goToAllert.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  /*  const showHidePass = () => {
    setShowPass(!showPass)
  }; */

  return (
    <div className="relative">
      <Navbar />
      <div className="relative mt-16  flex overflow-y-auto p-1">
        {warningPopUp ? (
          <div className="fixed z-10 flex w-full">
            <div
              className="absolute h-screen w-screen bg-gray-400 opacity-30"
              onClick={() => setWarningPopUp(false)}
            ></div>
            <div className="w-full p-8">
              <div className="relative mx-auto my-4 flex max-w-2xl flex-col items-center justify-center rounded-lg bg-colorthree p-8 dark:bg-colortwo">
                <h1 className="py-4 text-center text-2xl font-bold text-red-800">
                  Your account not verified.
                </h1>
                <h1 className="py-4 text-center text-lg text-black">
                  Please verify your account by clicking the link has been sent
                  to your email.
                </h1>
                <div className="flex flex-row gap-3 py-3">
                  <p className="text-center text-black">
                    Never got any verification link?
                  </p>
                  <a className="text-center text-blue-600" href="#">
                    Resend Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className=" mx-auto mt-5 flex flex-col items-center justify-center gap-8 px-10 py-5">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/alif-pustaka-logo.svg"
              width={100}
              height={100}
              alt="ap-logo"
            />
            <h1 className="text-center text-2xl font-bold">
              Join the Alif Pustaka Community
            </h1>
            <h2 className="text-center">
              Alif Pustaka Community is a community of 2 amazing developers
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <div
              onClick={signInGoogle}
              className=" flex w-full cursor-pointer flex-row gap-4 rounded-lg border-2 border-gray-700 px-10 py-3 text-center hover:bg-colorone hover:bg-opacity-80 active:bg-opacity-100 dark:border-colortwo"
            >
              <svg
                className="my-auto"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <h2 className="m-auto text-lg"> Continue with Google</h2>
            </div>
            <div
              onClick={signInGithub}
              className="flex w-full cursor-pointer flex-row gap-4 rounded-lg border-2 border-gray-700 px-10 py-3 text-center hover:bg-colorone hover:bg-opacity-80 active:bg-opacity-100 dark:border-colortwo"
            >
              <svg
                className=" my-auto fill-[#000] dark:fill-[#fff]"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 30 30"
              >
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
              </svg>
              <h2 className="m-auto text-lg"> Continue with Github</h2>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center justify-center gap-5 border-b-[1px] border-t-2 border-darkmode dark:border-lightmode md:w-[600px]">
            <h1 className="-mt-[14px] bg-lightmode px-4 text-2xl dark:bg-darkmode">
              OR
            </h1>
            <h1
              ref={fieldErrorRef}
              className={
                fieldError
                  ? "rounded-lg bg-red-600 px-10 py-2 text-lg text-white"
                  : "hidden"
              }
            >
              {fieldError}
            </h1>

            <form
              onSubmit={handleSubmit}
              method="post"
              className="flex w-full flex-col gap-2"
            >
              <label className=" font-bold">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                onChange={handleChange}
                value={formData.email}
                className="rounded-md border-2 border-darkmode bg-lightmode px-2 py-2 dark:border-colortwo dark:bg-darkmode dark:hover:border-colorone"
              />
              <label className="pt-3 font-bold">Password</label>
              <div className="relative flex flex-row items-center justify-end rounded-md border-2 border-darkmode dark:border-colortwo dark:hover:border-colorone">
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  onChange={handleChange}
                  value={formData.password}
                  className="w-full rounded-md bg-lightmode px-2 py-2 dark:bg-darkmode"
                  placeholder=""
                />
                <span
                  type="text"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute mx-2 cursor-pointer border-none bg-lightmode dark:bg-darkmode "
                >
                  {showPass ? <span>Hide</span> : <span>Show</span>}
                </span>
              </div>
              <div className="my-2 flex w-full flex-row gap-2">
                <input
                  className="my-auto h-5 w-5 rounded-lg border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-colortwo"
                  type="checkbox"
                  id="user-remember-me"
                />
                <label htmlFor="user-remember-me">Remember me</label>
                <a className="ml-auto" href="#">
                  Forgot Passoword?
                </a>
              </div>
              <input
                type="submit"
                value="Sign In"
                className="mt-6 cursor-pointer rounded-md bg-blue-500 py-2 text-lg font-bold text-white hover:bg-blue-400 active:bg-blue-600"
              />
            </form>
            <p className="mb-10 px-12 text-center italic">
              By signing in, you are agreeing to our privacy policy, terms of
              use and code of conduct.
            </p>
          </div>
          <div className="mb-20 flex flex-row gap-2">
            <h1>New to Alif Pustaka Community?</h1>
            <a
              className="text-colorfour dark:text-colorfour"
              href="/enter-new-user"
            >
              Create account.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
