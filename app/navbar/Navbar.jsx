"use client";
import styles from "./Navbar.module.css";
import Link from "next/link";
import React, { useState, useEffect, useRef, Fragment } from "react";
import Image from "next/image";
import { Menu, Popover, Transition } from "@headlessui/react";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useTheme } from "next-themes";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = (props) => {
  const [nav, setNav] = useState(true);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");
  const {systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    setMounted(true);

    const changeColor = () => {
      if (window.scrollY >= 200) {
        setColor("rgba(	0, 32, 74, 0.8)");
        setTextColor("#ffffff");
      } else if (props.pages === "composePost") {
        setColor("rgba(	0, 32, 74, 0.8)");
        setTextColor("#ffffff");
      } else {
        setColor("transparent");
        setTextColor("#ffffff");
      }
    };

    window.addEventListener("scroll", changeColor);
  }, [props.pages]);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className={
        "shrink w-full fixed inset-x-0 top-0 h-auto m-0 z-50 ease-in duration-300 "
      }
    >
      <div
        style={{
          fontFamily: "Roboto",
          fontWeight: "600",
          backdropFilter: "blur(10px)",
        }}
        className=" mx-auto"
      >
        <div className=" relative flex flex-row items-center top-0 m-0  px-8 py-0.5  text-white">
          <Link href="/">
            <h1
              style={{ color: `${textColor}` }}
              className="font-bold text-4xl"
            >
              Alif Pustaka{" "}
            </h1>
          </Link>
          <div className="auto flex-1"></div>
          <ul
            style={{ color: `${textColor}` }}
            className="hidden flex-none sm:flex"
          >
            <li className="p-4 hover:text-blue-200">
              <Link href="/">Gallery</Link>
            </li>
            <li className="p-4 hover:text-blue-200">
              <Link href="/#gallery">Work</Link>
            </li>
            <li className="p-4 hover:text-blue-200">
              <Link href="/work">Blog</Link>
            </li>
            <li className="p-4 hover:text-blue-200">
              <Link href="/showcase">Showcase</Link>
            </li>
            <Popover>
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`${
                      open ? "" : "text-opacity-90"
                    } relative inline-block py-1 px-3 my-3 mx-4 text-white text-base tracking-wide rounded-full overflow-hidden bg-blue-400 hover:bg-blue-300 hover:text-blue-100 active:bg-blue-400 active:text-blue-100 backdrop-opacity-80 focus:outline-none`}
                  >
                    <BiSearchAlt
                      className="inline-block inset-y-1 pl-0 mr-2"
                      size={25}
                    />
                    <p className="relative inline-block inset-y-0.5" href="#">
                      Search...
                    </p>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute inset-x-0 top-16 px-6 -translate-x-2  w-screen max-w-7xl">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white text-blue-700 p-4">
                          dfsfdz
                        </div>
                        <div className="relative grid gap-8 bg-white text-blue-700 p-4">
                          dfsfdz
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            {currentTheme === "dark" ? (
              <button
                className="relative inline-block justify-center bg-black-700 hover:bg-black rounded-full border-purple-400 border-2 w-8 h-8 my-3 py-0 px-1 mx-3"
                onClick={() => setTheme("light")}
                alt="Light Mode"
              >
                <div className="relative top-0">
                  <Image src="/sun.svg" alt="logo" height="30" width="30" />
                </div>
              </button>
            ) : (
              <button
                className="relative inline-block justify-center bg-black-700 hover:bg-white rounded-full border-purple-400 border-2 w-8 h-8 my-3 py-0 px-1 mx-3"
                onClick={() => setTheme("dark")}
                alt="Dark Mode"
              >
                <div className="relative top-0">
                  <Image src="/moon.svg" alt="logo" height="30" width="30" />
                </div>
              </button>
            )}

            <Menu>
              <Menu.Button>
                <div className="relative inline-block justify-center bg-gray-400 rounded-full border-purple-400 border-2 w-8 h-8 hover:bg-gray-300 my-3 py-0 px-1 mx-3">
                  <div className="relative my-1 w-5 h-5">
                    <Image
                      src="/blankAvatar.svg"
                      alt="logo"
                      height="50"
                      width="50"
                    />
                  </div>
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute top-14 right-9 z-10 mt-1  w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div>
                    <div className="absolute -top-1.5 left-28 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white w-0 h-0"></div>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Google Account
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Github
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </ul>

          {/* Mobile Button */}

          {/* Mobile Menu */}
          <Menu>
            <Menu.Button>
              <div className="relative sm:hidden inline-block justify-center bg-gray-400 rounded-full border-purple-400 border-2 w-8 h-8 hover:bg-gray-300 my-3 py-0 px-1 mx-3">
                <div className="relative top-1">
                  <Image
                    src="/blankAvatar.svg"
                    alt="logo"
                    height="30"
                    width="30"
                  />
                </div>
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute top-12 right-20 z-10 mt-1  w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div>
                  <div className="absolute -top-1.5 left-28 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white w-0 h-0"></div>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Google Account
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Github
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu
            as="div"
            className="sm:hidden relative inline-block text-center justify-center item-center "
          >
            <div>
              <Menu.Button
                ref={refOne}
                className="inline-flex w-full justify-center  rounded-md transparent px-2 mx-1 my-1 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <AiOutlineMenu
                  className="mr-0 h-5 w-5 text-gray-400 justify-center"
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
              <Menu.Items className="text-center absolute -right-8 z-10 mt-2 w-screen rounded-md opacity-95 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Gallery
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Work
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-200"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Blog
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/showcase"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-200"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Showcase
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-200"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        <button className="relative inline-block py-1 px-4 my-2 mx-4 text-white text-base tracking-wide rounded-full overflow-hidden bg-blue-400 hover:bg-blue-300 hover:text-blue-100 active:bg-blue-400 active:text-blue-100 backdrop-opacity-80 focus:outline-none">
                          <p href="#">
                            <BiSearchAlt className="inline-block " size={25} />
                            Search...
                          </p>
                        </button>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) =>
                      currentTheme === "dark" ? (
                        <button
                          className="relative inline-block item-center bg-black-700 hover:bg-black rounded-full border-purple-400 border-2 w-auto h-auto my-2 py-0 px-1"
                          onClick={() => setTheme("light")}
                          alt="Light Mode"
                        >
                          <div className="relative top-1">
                            <Image
                              src="/sun.svg"
                              alt="logo"
                              height="30"
                              width="30"
                            />
                          </div>
                        </button>
                      ) : (
                        <button
                          className="relative inline-block bg-gray-100 rounded-full border-purple-400 border-2  hover:bg-gray-300 w-auto h-auto my-2 py-0 px-1"
                          onClick={() => setTheme("dark")}
                          alt="Dark Mode"
                        >
                          <div className="relative top-1">
                            <Image
                              src="/moon.svg"
                              alt="logo"
                              height="30"
                              width="30"
                            />
                          </div>
                        </button>
                      )
                    }
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
