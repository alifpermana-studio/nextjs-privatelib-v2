"use client";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React, { useState, useEffect, useRef, Fragment } from "react";
import Image from "next/image";
import { Menu, Popover, Transition } from "@headlessui/react";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useTheme } from "next-themes";

const poppins = Poppins({ weight: ["400", "700", "800"], subsets: ["latin"] });

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = (props) => {
  const [nav, setNav] = useState(true);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    setMounted(true);

    const changeColor = () => {
      if (window.scrollY >= 100) {
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
        " fixed inset-x-0 top-0 z-50 m-0 h-auto w-full shrink duration-300 ease-in"
      }
    >
      <div
        style={{
          fontSize: "18px",
          backdropFilter: "blur(10px)",
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        className={poppins.className}
      >
        <div className=" md: lg: xl: relative top-0 m-0  flex flex-row  items-center px-8  py-0.5  text-white ">
          <Link href="/">
            <h1 style={{ color: `${textColor}` }} className="font-bold">
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
                    } relative mx-4 my-3 inline-block overflow-hidden rounded-full bg-blue-400   px-3 py-1 tracking-wide text-white backdrop-opacity-80 hover:bg-blue-300 hover:text-blue-100 focus:outline-none active:bg-blue-400 active:text-blue-100`}
                  >
                    <BiSearchAlt
                      className="inset-y-1 mr-2 inline-block pl-0"
                      size={25}
                    />
                    <p className="relative inset-y-0.5 inline-block" href="#">
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
                    <Popover.Panel className="absolute inset-x-0 top-16 w-screen max-w-7xl  -translate-x-2 px-6">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-4 text-blue-700">
                          dfsfdz
                        </div>
                        <div className="relative grid gap-8 bg-white p-4 text-blue-700">
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
                className="bg-black-700 relative mx-3 my-3 inline-block h-8 w-8 justify-center rounded-full border-2 border-purple-400 px-1 py-0 hover:bg-black"
                onClick={() => setTheme("light")}
                alt="Light Mode"
              >
                <div className="relative top-0">
                  <Image src="/moon.svg" alt="logo" height="30" width="30" />
                </div>
              </button>
            ) : (
              <button
                className="bg-black-700 relative mx-3 my-3 inline-block h-8 w-8 justify-center rounded-full border-2 border-purple-400 px-1 py-0 hover:bg-white"
                onClick={() => setTheme("dark")}
                alt="Dark Mode"
              >
                <div className="relative top-0">
                  <Image src="/sun.svg" alt="logo" height="30" width="30" />
                </div>
              </button>
            )}

            <Menu>
              <Menu.Button>
                <div className="relative mx-3 my-3 inline-block h-8 w-8 justify-center rounded-full border-2 border-purple-400 bg-gray-400 px-1 py-0 hover:bg-gray-300">
                  <div className="relative my-1 h-5 w-5">
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
                <Menu.Items className="absolute right-9 top-14 z-10 mt-1  w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div>
                    <div className="absolute -top-1.5 left-28 h-0 w-0 border-b-8 border-l-8 border-r-8 border-b-white border-l-transparent border-r-transparent"></div>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2  ",
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
                            "block px-4 py-2  ",
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
              <div className="relative mx-3 my-3 inline-block h-8 w-8 justify-center rounded-full border-2 border-purple-400 bg-gray-400 px-1 py-0 hover:bg-gray-300 md:hidden">
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
              <Menu.Items className="absolute right-20 top-12 z-10 mt-1  w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div>
                  <div className="absolute -top-1.5 left-28 h-0 w-0 border-b-8 border-l-8 border-r-8 border-b-white border-l-transparent border-r-transparent"></div>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2  ",
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
                          "block px-4 py-2  ",
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
            className="item-center relative inline-block justify-center text-center sm:hidden "
          >
            <div>
              <Menu.Button
                ref={refOne}
                className="transparent mx-1 my-1  inline-flex w-full justify-center rounded-md px-2 py-2   font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <AiOutlineMenu
                  className="mr-0 h-5 w-5 justify-center text-gray-400"
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
              <Menu.Items className="absolute -right-8 z-10 mt-2 w-screen rounded-md bg-white text-center opacity-95 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2  ",
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
                          "block px-4 py-2  ",
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
                          "block px-4 py-2  ",
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
                          "block px-4 py-2  ",
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
                          "block px-4 py-2  ",
                        )}
                      >
                        <button className="relative mx-4 my-2 inline-block overflow-hidden rounded-full bg-blue-400   px-4 py-1 tracking-wide text-white backdrop-opacity-80 hover:bg-blue-300 hover:text-blue-100 focus:outline-none active:bg-blue-400 active:text-blue-100">
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
                          className="item-center bg-black-700 relative my-2 inline-block h-auto w-auto rounded-full border-2 border-purple-400 px-1 py-0 hover:bg-black"
                          onClick={() => setTheme("light")}
                          alt="Light Mode"
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
                      ) : (
                        <button
                          className="relative my-2 inline-block h-auto w-auto rounded-full  border-2 border-purple-400 bg-gray-100 px-1 py-0 hover:bg-gray-300"
                          onClick={() => setTheme("dark")}
                          alt="Dark Mode"
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
