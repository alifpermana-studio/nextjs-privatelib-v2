"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import React, { useState, useEffect, useRef, Fragment } from "react";
import Image from "next/image";
import { Menu, Popover, Transition, Disclosure } from "@headlessui/react";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useTheme } from "next-themes";
import styles from "./page.module.css";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = (props) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme]=useState("dark")

  /* const currentTheme = theme === "system" ? systemTheme : theme; */

  useEffect(() => {
    setCurrentTheme(theme === "system" ? systemTheme : theme)
  }, [systemTheme,theme]);

  /*   const navbarBurger=(e)=>{
    console.log(e.target);
  }
  const navbarClose=(e)=>{
    console.log(e);
  }
  const navbarBackdrop=(e)=>{
    console.log(e);
  }
  const navbarMenu=(e)=>{
    console.log(e);
  } */

  // Burger menus

  // open
  const navbarBurger = () => {
    const burger = document.querySelectorAll(".navbar-burger");
    const menu = document.querySelectorAll(".navbar-menu");

    console.log(menu);

    if (burger.length && menu.length) {
      menu[0].classList.toggle("hidden");
    }
  };

  // close
  const navbarClose = () => {
    const menu = document.querySelectorAll(".navbar-menu");
    const close = document.querySelectorAll(".navbar-close");
    const backdrop = document.querySelectorAll(".navbar-backdrop");

    console.log(menu);

    if (close.length && backdrop.length) {
      menu[0].classList.toggle("hidden");
    }
  };

  /* 
  console.log(theme); */

  return (
    <div className="shrink w-full fixed inset-x-0 top-0 text-darkmode bg-lightmode z-50   dark:bg-[#002B64]  dark:text-lightmode">
      <nav className="relative px-4 py-1 flex justify-between items-center mx-auto max-w-[1500px] ">
        <a className="text-3xl font-bold leading-none lg:hidden" href="#">
          <Image
            src="/alif-pustaka-logo.svg"
            alt="ap-logo"
            width={50}
            height={50}
          />
        </a>
        <div className="hidden text-2xl lg:flex lg:flex-row lg:items-center font-extrabold">
          <div className="h-full">
            <Image src="/a-logo.svg" alt="ap-logo" width={30} height={30} />
          </div>

          <p className="pr-3">lif</p>
          <div className="h-full">
            <Image src="/p-logo.svg" alt="ap-logo" width={30} height={30} />
          </div>
          <p>ustaka</p>
        </div>
        <div className="flex flex-row justify-center items-center lg:hidden">
          <MagnifyingGlassIcon
            className="mr-2 ml-1 h-8 w-8 text-colorfour dark:text-colortwo  hover:text-colorone"
            aria-hidden="true"
          />
          <button
            className="navbar-burger flex items-center text-blue-600 p-3"
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
        <div className="hidden lg:flex flex-row mx-auto text-base font-semibold">
          <Menu as="div" className="relative text-left">
            <div>
              <Menu.Button className="inline-flex w-full items-center justify-center rounded-md px-4 py-2">
                <p className="hover:text-colorone">Home</p>
              </Menu.Button>
            </div>
          </Menu>
          <Menu as="div" className="relative text-left">
            <div>
              <Menu.Button className="inline-flex w-full items-center justify-center rounded-md px-4 py-2 ">
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
                          active ? "bg-violet-500 text-white" : "text-gray-900"
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
                          active ? "bg-violet-500 text-white" : "text-gray-900"
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
                          active ? "bg-violet-500 text-white" : "text-gray-900"
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
                          active ? "bg-violet-500 text-white" : "text-gray-900"
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
                          active ? "bg-violet-500 text-white" : "text-gray-900"
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
              <Menu.Button className="inline-flex w-full items-center justify-center rounded-md px-4 py-2 ">
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
              <Menu.Items className="relative right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
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
                          active ? "bg-violet-500 text-white" : "text-gray-900"
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
                          active ? "bg-violet-500 text-white" : "text-gray-900"
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
                          active ? "bg-violet-500 text-white" : "text-gray-900"
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
                          active ? "bg-violet-500 text-white" : "text-gray-900"
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
              <Menu.Button className="inline-flex w-full items-center justify-center rounded-md px-4 py-2 ">
                <p className="hover:text-colorone">Blog</p>
              </Menu.Button>
            </div>
          </Menu>
          <Menu as="div" className="relative text-left">
            <div>
              <Menu.Button className="inline-flex w-full items-center justify-center rounded-md px-4 py-2 ">
                <p className="hover:text-colorone">Contact</p>
              </Menu.Button>
            </div>
          </Menu>
        </div>
        <button
          className="hidden lg:flex lg:flex-row ml-auto items-center gap-1 py-1 px-2 bg-gray-50 hover:bg-gray-200 text-base text-gray-900 font-bold  rounded-3xl transition duration-200"
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
              className="relative inline-block justify-center bg-black-700 hover:bg-black rounded-full border-purple-400 border-2 w-8 h-8 my-3 py-0 px-1 mx-3"
              onClick={() => setTheme("light")}
              alt="Light Mode"
            >
              <div className="relative top-0">
                <Image src="/moon.svg" alt="logo" height={30} width={30} />
              </div>
            </button>
          ) : (
            <button
              className="relative inline-block justify-center bg-black-700 hover:bg-white rounded-full border-purple-400 border-2 w-8 h-8 my-3 py-0 px-1 mx-3"
              onClick={() => setTheme("dark")}
              alt="Dark Mode"
            >
              <div className="relative top-0">
                <Image src="/sun.svg" alt="logo" height={30} width={30} />
              </div>
            </button>
          )}
        </div>
        <a
          className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
          href="#"
        >
          Sign up
        </a>
      </nav>
      <div className="navbar-menu relative z-50 hidden">
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
          onClick={navbarClose}
        ></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-lightmode dark:bg-darkmode border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-3xl font-bold leading-none" href="#">
              <Image
                src="/alif-pustaka-logo.svg"
                alt="alif-pustaka"
                width={50}
                height={50}
              />
            </a>
            <button className="navbar-close" onClick={navbarClose}>
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
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
          <div>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between p-2  text-base font-semibold hover:bg-blue-50 hover:text-blue-600 rounded">
                    <span>Home</span>
                  </Disclosure.Button>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between p-2  text-base font-semibold hover:bg-blue-50 hover:text-blue-600 rounded">
                    <span>Portofolio</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="flex flex-col pl-2 text-base font-semibold text-gray-500">
                    <a className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded">
                      React
                    </a>
                    <a className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded">
                      Vue
                    </a>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between p-2  text-base font-semibold hover:bg-blue-50 hover:text-blue-600 rounded">
                    <span>Collection</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="flex flex-col pl-2 text-base font-semibold text-gray-500">
                    <a className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded">
                      React
                    </a>
                    <a className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded">
                      Vue
                    </a>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between p-2  text-base font-semibold hover:bg-blue-50 hover:text-blue-600 rounded">
                    <span>Blog</span>
                  </Disclosure.Button>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between p-2  text-base font-semibold hover:bg-blue-50 hover:text-blue-600 rounded">
                    <span>Contact</span>
                  </Disclosure.Button>
                </>
              )}
            </Disclosure>
          </div>
          <div className="mt-auto">
            <div className="flex flex-row w-full justify-center items-center  gap-3 text-base">
              <p className="block mt-4 mb-2  text-center  rounded-xl">
                Switch Theme :
              </p>
              {currentTheme === "dark" ? (
                <button
                  className="flex flex-row items-center px-4 py-2 mt-4 mb-2 gap-2 text-center text-lightmode bg-darkmode dark:text-darkmode dark:bg-lightmode rounded-xl"
                  onClick={() => setTheme("light")}
                  alt="Light Mode"
                >
                  <div className="relative top-0">
                    <Image src="/moon.svg" alt="logo" height={20} width={20} />
                  </div>
                  <p>Dark</p>
                </button>
              ) : (
                <button
                  className="flex flex-row items-center px-4 py-2 mt-4 mb-2 gap-2 text-center text-lightmode bg-darkmode dark:text-darkmode dark:bg-lightmode  rounded-xl"
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
            <div className="pt-2">
              <a
                className="block px-4 py-3 mb-2  text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"
                href="#"
              >
                Sign Up
              </a>
            </div>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2023</span>
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
