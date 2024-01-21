"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef, Fragment } from "react";
import Image from "next/image";
import { Menu, Popover, Transition, Disclosure } from "@headlessui/react";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useTheme } from "next-themes";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "700", "800"], subsets: ["latin"] });

/* function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
} */

const Navbar = (props) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("dark");
  const { data: session, status, update, loading } = useSession();
  const [login, setLogin] = useState(false);
  const [signOutPopUp, setSignOutPopUp] = useState(false);

  useEffect(() => {
    setCurrentTheme(theme === "system" ? systemTheme : theme);
  }, [systemTheme, theme]);

  useEffect(() => {
    if (status === "authenticated") {
      const loginName = session.user.name;
      if (loginName.length > 10) {
        setLogin("Hello, " + session.user.name.split(" ")[0]);
      } else {
        setLogin("Hello, " + loginName);
      }
    } else if (loading) {
      setLogin("Loading...");
    } else if (status === "unauthenticated") {
      setLogin(false);
    }
  }, [session, status, loading]);

  const signInGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/profile" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/enter" });
  };

  const { push } = useRouter();

  const signOutHandle = () => {
    setSignOutPopUp(true);
    navbarClose();
  };

  // open
  const navbarBurger = () => {
    const burger = document.querySelectorAll(".navbar-burger");
    const menu = document.querySelectorAll(".navbar-menu");

    if (burger.length && menu.length) {
      menu[0].classList.toggle("hidden");
    }
  };

  // close
  const navbarClose = () => {
    const menu = document.querySelectorAll(".navbar-menu");
    const close = document.querySelectorAll(".navbar-close");
    const backdrop = document.querySelectorAll(".navbar-backdrop");

    if (close.length && backdrop.length) {
      menu[0].classList.toggle("hidden");
    }
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full shrink bg-lightmode text-darkmode   dark:bg-[#002B64]  dark:text-lightmode">
      <div className={poppins.className}>
        <nav className="relative mx-auto flex max-w-[1500px] items-center justify-between px-4 py-1 ">
          <a className="text-3xl font-bold leading-none lg:hidden" href="#">
            <Image
              src="/alif-pustaka-logo.svg"
              alt="ap-logo"
              width={50}
              height={50}
            />
          </a>
          <div
            className=" hidden cursor-pointer text-2xl font-extrabold lg:flex lg:flex-row lg:items-center"
            onClick={() => window.open("/")}
          >
            <div className="mb-2 h-full">
              <Image src="/a-logo.svg" alt="ap-logo" width={30} height={30} />
            </div>
            <p className="pr-3">lif</p>
            <div className="h-full">
              <Image src="/p-logo.svg" alt="ap-logo" width={30} height={30} />
            </div>
            <p>ustaka</p>
          </div>
          <div className="flex flex-row items-center justify-center lg:hidden">
            <MagnifyingGlassIcon
              className="ml-1 mr-2 h-8 w-8 text-colorfour hover:text-colorone  dark:text-colortwo"
              aria-hidden="true"
            />
            <button
              className="navbar-burger flex items-center p-3 text-blue-600"
              onClick={navbarBurger}
            >
              <div className="">
                <Image
                  src="/hamburger-menu-icon.svg"
                  alt="Menu"
                  width={30}
                  height={30}
                />
              </div>
            </button>
          </div>
          <div className="mx-auto hidden flex-row text-base font-semibold lg:flex">
            <Menu as="div" className="relative text-left">
              <div>
                <Menu.Button className="inline-flex w-full items-center justify-center rounded-md py-2 lg:px-2 xl:px-4">
                  <p className="hover:text-colorone">Home</p>
                </Menu.Button>
              </div>
            </Menu>
            <Menu as="div" className="relative text-left">
              <div>
                <Menu.Button className="inline-flex w-full items-center justify-center rounded-md py-2 lg:px-2 xl:px-4 ">
                  <p className="hover:text-colorone">Portofolio</p>
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 hover:text-colorone"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Duplicate
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Archive
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Move
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Menu as="div" className="relative text-left">
              <div>
                <Menu.Button className="inline-flex w-full items-center justify-center rounded-md py-2 lg:px-2 xl:px-4 ">
                  <p className="hover:text-colorone">Collection</p>
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5 hover:text-colorone"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Duplicate
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Archive
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Move
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Menu as="div" className="relative text-left">
              <div>
                <Menu.Button className="inline-flex w-full items-center justify-center rounded-md py-2 lg:px-2 xl:px-4 ">
                  <p className="hover:text-colorone">Blog</p>
                </Menu.Button>
              </div>
            </Menu>
            <Menu as="div" className="relative text-left">
              <div>
                <Menu.Button className="inline-flex w-full items-center justify-center rounded-md py-2 lg:px-2 xl:px-4 ">
                  <p className="hover:text-colorone">Contact</p>
                </Menu.Button>
              </div>
            </Menu>
          </div>
          <button
            className="ml-auto hidden items-center gap-1 rounded-3xl bg-gray-50 px-2 py-1 text-base font-bold text-gray-900 transition duration-200  hover:bg-gray-200 lg:flex lg:flex-row"
            href="#"
          >
            <MagnifyingGlassIcon
              className="mr-2 h-6 w-6 text-colortwo hover:text-colorone"
              aria-hidden="true"
            />
            <p className="mr-3">Search</p>
          </button>
          <div className="hidden lg:flex">
            {currentTheme === "dark" ? (
              <button
                className="bg-black-700 relative mx-3 my-3 inline-block h-8 w-8 justify-center rounded-full border-2 border-purple-400 px-1 py-0 hover:bg-black"
                onClick={() => setTheme("light")}
                alt="Light Mode"
              >
                <div className="relative top-0">
                  <Image src="/moon.svg" alt="logo" height={30} width={30} />
                </div>
              </button>
            ) : (
              <button
                className="bg-black-700 relative mx-3 my-3 inline-block h-8 w-8 justify-center rounded-full border-2 border-purple-400 px-1 py-0 hover:bg-white"
                onClick={() => setTheme("dark")}
                alt="Dark Mode"
              >
                <div className="relative top-0">
                  <Image src="/sun.svg" alt="logo" height={30} width={30} />
                </div>
              </button>
            )}
          </div>
          <div className="relative hidden text-left lg:flex">
            {login ? (
              <Menu as="div" className="relative hidden text-left lg:flex">
                <div>
                  <Menu.Button className="hidden rounded-xl bg-blue-500 px-2 py-2 text-sm font-bold text-white transition duration-200 hover:bg-blue-600 lg:inline-block">
                    {login}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-12 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            onClick={() => window.location.assign("/profile")}
                          >
                            Profile
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Dashboard
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Setting
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setSignOutPopUp(true)}
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Menu as="div" className="relative hidden text-left lg:flex">
                <div>
                  <Menu.Button
                    onClick={() => push("/enter")}
                    className="hidden rounded-xl bg-blue-500 px-2 py-2 text-sm font-bold text-white transition duration-200 hover:bg-blue-600 lg:inline-block"
                  >
                    Sign In
                  </Menu.Button>
                </div>
              </Menu>
            )}
          </div>
        </nav>
        <div className="navbar-menu relative z-50 hidden">
          <div
            className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
            onClick={navbarClose}
          ></div>
          <nav className="fixed bottom-0 left-0 top-0 flex h-[100svh] w-full max-w-sm flex-col overflow-y-auto border border-r border-none bg-lightmode px-6 py-6 dark:bg-darkmode">
            <div className=" flex items-center">
              <a className="mr-auto text-3xl font-bold leading-none" href="#">
                <Image
                  src="/alif-pustaka-logo.svg"
                  alt="alif-pustaka"
                  width={50}
                  height={50}
                />
              </a>
              <button className="navbar-close ml-auto" onClick={navbarClose}>
                <svg
                  className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="relative mt-8 border-yellow-300">
              <Disclosure isclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="relative flex w-full justify-between rounded  p-2 text-base font-semibold hover:bg-blue-50 hover:text-blue-600">
                      <span>Home</span>
                    </Disclosure.Button>
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="relative flex w-full justify-between rounded  p-2 text-base font-semibold hover:bg-blue-50 hover:text-blue-600">
                      <span>Portofolio</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex flex-col pl-2 text-base font-semibold text-gray-500">
                      <a className="rounded p-2 hover:bg-blue-50 hover:text-blue-600">
                        React
                      </a>
                      <a className="rounded p-2 hover:bg-blue-50 hover:text-blue-600">
                        Vue
                      </a>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="relative flex w-full justify-between rounded  p-2 text-base font-semibold hover:bg-blue-50 hover:text-blue-600">
                      <span>Collection</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex flex-col pl-2 text-base font-semibold text-gray-500">
                      <a className="rounded p-2 hover:bg-blue-50 hover:text-blue-600">
                        React
                      </a>
                      <a className="rounded p-2 hover:bg-blue-50 hover:text-blue-600">
                        Vue
                      </a>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className=" relative flex w-full justify-between rounded  p-2 text-base font-semibold hover:bg-blue-50 hover:text-blue-600">
                      <span>Blog</span>
                    </Disclosure.Button>
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className=" relative flex w-full justify-between rounded  p-2 text-base font-semibold hover:bg-blue-50 hover:text-blue-600">
                      <span>Contact</span>
                    </Disclosure.Button>
                  </>
                )}
              </Disclosure>
            </div>
            <div className="mt-auto">
              <div className="flex w-full flex-row items-center justify-center  gap-3 text-base">
                <p className="mb-2 mt-4 block  rounded-xl  text-center">
                  Switch Theme :
                </p>
                {currentTheme === "dark" ? (
                  <button
                    className="mb-2 mt-4 flex flex-row items-center gap-2 rounded-xl bg-darkmode px-4 py-2 text-center text-lightmode dark:bg-lightmode dark:text-darkmode"
                    onClick={() => setTheme("light")}
                    alt="Light Mode"
                  >
                    <div className="relative top-0">
                      <Image
                        src="/moon.svg"
                        alt="logo"
                        height={20}
                        width={20}
                      />
                    </div>
                    <p>Dark</p>
                  </button>
                ) : (
                  <button
                    className="mb-2 mt-4 flex flex-row items-center gap-2 rounded-xl bg-darkmode px-4 py-2 text-center text-lightmode dark:bg-lightmode  dark:text-darkmode"
                    onClick={() => setTheme("dark")}
                    alt="Dark Mode"
                  >
                    <div className="relative top-0">
                      <Image src="/sun.svg" alt="logo" height={20} width={20} />
                    </div>
                    <p>Light</p>
                  </button>
                )}
              </div>
              <div className="relative flex w-full lg:hidden">
                {login ? (
                  <Menu
                    as="div"
                    className="relative flex w-full flex-col lg:hidden"
                  >
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="relative inset-x-0 bottom-0 mt-2 origin-bottom-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                onClick={() =>
                                  window.location.assign("/profile")
                                }
                              >
                                Profile
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                Dashboard
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                Setting
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={signOutHandle}
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                    <div>
                      <Menu.Button className="flex w-full items-center justify-center rounded-xl bg-blue-600  px-4 py-3 text-center text-lg font-semibold text-white hover:bg-blue-700 lg:hidden">
                        {login}
                      </Menu.Button>
                    </div>
                  </Menu>
                ) : (
                  <Menu
                    as="div"
                    className="relative flex w-full flex-col lg:hidden"
                  >
                    <div>
                      <Menu.Button
                        onClick={() => window.location.assign("/enter")}
                        className="flex w-full items-center justify-center rounded-xl bg-blue-600  px-4 py-3 text-center text-lg font-semibold text-white hover:bg-blue-700 lg:hidden"
                      >
                        Sign In
                      </Menu.Button>
                    </div>
                  </Menu>
                )}
              </div>
              <p className="my-4 text-center text-xs text-gray-400">
                <span>Copyright © 2024</span>
              </p>
            </div>
          </nav>
        </div>
        {signOutPopUp ? (
          <div className="fixed flex w-full">
            <div
              className="absolute h-[100svh]  w-full bg-colorthree bg-opacity-40"
              onClick={() => setSignOutPopUp(false)}
            ></div>
            <div className="relative mx-auto my-8 flex items-center justify-center">
              <div className="mx-8 flex  max-w-lg flex-col items-center justify-center rounded-xl bg-lightmode p-8 dark:bg-darkmode">
                <p className="mt-4 text-center text-2xl font-bold">
                  Are you sure you want to sign out?
                </p>
                <p className="my-4 text-center text-xl">
                  You are also signed out from your personal access data and
                  your unsaved project will be lost.
                </p>

                <button
                  onClick={() => signOut({ callbackUrl: "/enter" })}
                  className="my-3 w-full rounded-lg bg-colorfour p-3 text-2xl font-bold text-white hover:bg-colorthree active:bg-blue-900"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
