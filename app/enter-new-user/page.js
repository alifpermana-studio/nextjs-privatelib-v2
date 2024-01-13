"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import Navbar from "@/components/Navbar2";

export default function Enter() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [credentialsForm, setCredentialsForm] = useState(false);
  const credentialsUser = useRef(null);
  const recaptcha = useRef(null);
  const [recaptchaLoad, setRecaptchaLoad] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPassConfirm, setErrorPassConfirm] = useState(false);
  const [errorPassLength, setErrorPassLength] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const errorAllert = useRef(null);

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

  function checkCharacter(myString) {
    return /[\{\}\[\]\#\&\%\(\)\*\!\`^~<>,"'\/]/.test(myString);
  }

  function checkWhitespace(myString) {
    return /\s/.test(myString);
  }

  function checkAtSign(myString) {
    return /@/.test(myString);
  }

  useEffect(() => {
    if (checkWhitespace(formData.password)) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }

    if (checkAtSign(formData.email)) {
      setErrorEmail(false);
    } else {
      if (formData.email.length > 0) {
        setErrorEmail(true);
      }
    }

    if (formData.password.length < 8 && formData.password.length > 0) {
      setErrorPassLength(true);
    } else {
      setErrorPassLength(false);
    }

    if (checkCharacter(formData.userName)) {
      setErrorUsername(true);
    } else {
      setErrorUsername(false);
    }

    if (formData.password !== formData.passwordConfirm) {
      setErrorPassConfirm(true);
    } else {
      setErrorPassConfirm(false);
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captchaValue = recaptcha.current.getValue();

    if (
      !errorPassConfirm &&
      !errorPassword &&
      !errorUsername &&
      !errorPassLength
    ) {
      if (captchaValue) {
        try {
          const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ formData }),
            "content-type": "application/json",
          });

          const { message, status } = await res.json();

          if (status !== 201 && status !== 500) {
            setErrorMessage(message);
            openAllert();
          }

          console.log([message, status]);

          if (!res.ok) {
            const response = await res.json();
            setErrorMessage(response.message);
          } else {
            router.refresh();
            router.push("/user-created");
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const openAllert = () => {
    const goToAllert = errorAllert.current;
    window.scrollTo({
      top: goToAllert.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const createUser = async () => {
    await setCredentialsForm(true);
    const goToForm = credentialsUser.current;
    window.scrollTo({
      top: goToForm.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="relative mt-16 flex overflow-y-auto">
        <div className="mx-auto mt-5 flex flex-col items-center justify-center  gap-8 px-10">
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
              onClick={createUser}
              className=" flex w-full cursor-pointer flex-row gap-4 rounded-lg border-2 border-gray-700 px-10 py-3 text-center hover:bg-colorone hover:bg-opacity-80 active:bg-opacity-100 dark:border-colortwo"
            >
              <svg
                className="my-auto fill-[#000] dark:fill-[#fff]"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 64 64"
                id="email"
              >
                <path d="M53.42 53.32H10.58a8.51 8.51 0 0 1-8.5-8.5V19.18a8.51 8.51 0 0 1 8.5-8.5h42.84a8.51 8.51 0 0 1 8.5 8.5v25.64a8.51 8.51 0 0 1-8.5 8.5ZM10.58 13.68a5.5 5.5 0 0 0-5.5 5.5v25.64a5.5 5.5 0 0 0 5.5 5.5h42.84a5.5 5.5 0 0 0 5.5-5.5V19.18a5.5 5.5 0 0 0-5.5-5.5Z"></path>
                <path d="M32 38.08a8.51 8.51 0 0 1-5.13-1.71L3.52 18.71a1.5 1.5 0 1 1 1.81-2.39L28.68 34a5.55 5.55 0 0 0 6.64 0l23.35-17.68a1.5 1.5 0 1 1 1.81 2.39L37.13 36.37A8.51 8.51 0 0 1 32 38.08Z"></path>
                <path d="M4.17 49.14a1.5 1.5 0 0 1-1-2.62l18.4-16.41a1.5 1.5 0 0 1 2 2.24L5.17 48.76a1.46 1.46 0 0 1-1 .38zm55.66 0a1.46 1.46 0 0 1-1-.38l-18.4-16.41a1.5 1.5 0 1 1 2-2.24l18.39 16.41a1.5 1.5 0 0 1-1 2.62z"></path>
              </svg>
              <h1 className="m-auto text-lg"> Continue with Email</h1>
            </div>
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
            <div className=" flex w-full cursor-pointer flex-row gap-4 rounded-lg border-2 border-gray-700 px-10 py-3 text-center hover:bg-colorone hover:bg-opacity-80 active:bg-opacity-100 dark:border-colortwo">
              <svg
                className="my-auto fill-[#000] dark:fill-[#fff]"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 50 50"
              >
                <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
              </svg>
              <h2 className="m-auto text-lg"> Continue with Twitter</h2>
            </div>
            <div className=" flex w-full cursor-pointer flex-row gap-4 rounded-lg border-2 border-gray-700 px-10 py-3 text-center hover:bg-colorone hover:bg-opacity-80 active:bg-opacity-100 dark:border-colortwo">
              <svg
                className="my-auto fill-[#000] dark:fill-[#fff]"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#039be5"
                  d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                ></path>
                <path
                  fill="#fff"
                  d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                ></path>
              </svg>
              <h2 className="m-auto text-lg"> Continue with Facebook</h2>
            </div>
          </div>
          <div
            className={
              credentialsForm
                ? "mt-4 flex flex-col items-center justify-center gap-5 border-b-[1px] border-t-2 border-darkmode dark:border-lightmode md:w-[600px]"
                : "hidden"
            }
          >
            <h1
              ref={credentialsUser}
              className="-mt-[14px] bg-lightmode px-4 text-lg dark:bg-darkmode"
            >
              Create Account
            </h1>
            <h1
              ref={errorAllert}
              className={
                errorMessage
                  ? "rounded-lg bg-red-600 px-10 py-2 text-lg text-white"
                  : "hidden"
              }
            >
              {errorMessage}
            </h1>
            <form
              onSubmit={handleSubmit}
              method="post"
              className="flex w-full flex-col gap-2"
            >
              <label className="pt-3 font-bold">
                Your Name <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.name}
                className="rounded-md border-2 border-darkmode bg-lightmode px-2 py-2 dark:border-colortwo dark:bg-darkmode dark:hover:border-colorone"
              />
              <label className="pt-3 font-bold">
                Username <span className="text-red-600">*</span>
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.userName}
                className="rounded-md border-2 border-darkmode bg-lightmode px-2 py-2 dark:border-colortwo dark:bg-darkmode dark:hover:border-colorone"
              />
              {errorUsername ? (
                <h1 className="rounded-lg px-10 pb-2 text-lg text-red-600">
                  Username can not contain any special character.
                </h1>
              ) : (
                <></>
              )}
              <label className="pt-3 font-bold">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.email}
                className="rounded-md border-2 border-darkmode bg-lightmode px-2 py-2 dark:border-colortwo dark:bg-darkmode dark:hover:border-colorone"
              />
              {errorEmail ? (
                <h1 className="rounded-lg px-10 pb-2 text-lg text-red-600">
                  Email is not valid.
                </h1>
              ) : (
                <></>
              )}
              <label className="pt-3 font-bold">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                required={true}
                value={formData.password}
                className="rounded-md border-2 border-darkmode bg-lightmode px-2 py-2 dark:border-colortwo dark:bg-darkmode dark:hover:border-colorone"
                placeholder=""
              />
              {errorPassword ? (
                <h1 className="rounded-lg px-10 text-lg text-red-600">
                  Password can not contain any whitespace.
                </h1>
              ) : (
                <></>
              )}
              {errorPassLength ? (
                <h1 className="rounded-lg px-10 pb-2 text-lg text-red-600">
                  Password need 8 character at least.
                </h1>
              ) : (
                <></>
              )}
              <label className="pt-3 font-bold">
                Password Confirmation <span className="text-red-600">*</span>
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                onChange={handleChange}
                required={true}
                value={formData.passwordConfirm}
                className="rounded-md border-2 border-darkmode bg-lightmode px-2 py-2 dark:border-colortwo dark:bg-darkmode dark:hover:border-colorone"
                placeholder=""
              />
              {errorPassConfirm ? (
                <h1 className="rounded-lg px-10 pb-2 text-lg text-red-600 ">
                  Password does not match.
                </h1>
              ) : (
                <></>
              )}
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}
                ref={recaptcha}
                className="mt-4"
              />
              <input
                type="submit"
                value="Sign In"
                className="mt-6 cursor-pointer rounded-md bg-blue-500 py-2 text-lg font-bold text-white hover:bg-blue-400 active:bg-blue-600"
              />
            </form>

            <p className="mb-10 mt-4 px-12 text-center italic">
              By signing in, you are agreeing to our privacy policy, terms of
              use and code of conduct.
            </p>
          </div>

          <div className="mb-20 flex flex-row gap-2">
            <h1>Already have an account?</h1>
            <a className="text-colorfour dark:text-colorfour" href="/enter">
              Log in.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
