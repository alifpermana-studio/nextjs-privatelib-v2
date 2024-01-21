"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar2";
import Image from "next/image";
import Link from "next/link";
import { Poppins, JetBrains_Mono, Amiri } from "next/font/google";
import localFont from "next/font/local";
import styles from "./styles.module.css";

const poppins = Poppins({ weight: ["400", "700", "800"], subsets: ["latin"] });
const jetBrains = JetBrains_Mono({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});
const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const kalnia = localFont({
  src: [
    {
      path: "../../public/fonts/Kalnia/Kalnia-VariableFont_wdth,wght.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/Kalnia/Kalnia-VariableFont_wdth,wght.ttf",
      weight: "700",
    },
  ],
  variable: "--font-poppins",
});

function ColorGuide() {
  const [copyContent, setCopyContent] = useState();

  const setCopy = (e) => {
    navigator.clipboard.writeText(e.target.value);
    copyContent(true);
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="relative mx-auto mt-16 flex max-w-[1500px] flex-col items-center justify-center overflow-y-auto   p-1">
        <div className="w-60 p-4">
          <Image src="/alif-pustaka-logo.svg" width={400} height={400} />
        </div>
        <h1 className="text-center text-4xl font-extrabold">
          Alif Pustaka Theme Guide
        </h1>
        <div className="mx-auto my-10 flex w-full flex-col">
          <h1 className="my-3 text-center text-2xl font-bold">
            Background Color
          </h1>
          <div className=" mx-auto flex w-full flex-row items-center justify-center gap-3 px-4">
            <div className="w-full max-w-sm rounded-lg bg-white p-6">
              <input
                type="submit"
                value="#001531"
                onClick={(e) => navigator.clipboard.writeText(e.target.value)}
                className="mx-auto w-full max-w-sm cursor-pointer rounded-md bg-darkmode p-4 font-bold text-white  shadow-lg shadow-gray-400"
              />
            </div>
            <div className="flex w-full max-w-sm items-center rounded-lg bg-white p-6">
              <input
                type="submit"
                value="#FAFAFA"
                onClick={(e) => navigator.clipboard.writeText(e.target.value)}
                className="mx-auto w-full max-w-sm cursor-pointer rounded-md bg-lightmode p-4 font-bold text-black shadow-lg shadow-gray-400"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto my-10 flex w-full flex-col">
          <h1 className="my-3 text-center text-2xl font-bold">
            Triadic Theme Color
          </h1>
          <div className=" mx-auto flex w-full flex-col items-center justify-center gap-3 px-4 lg:flex-row">
            <div className="relative w-full max-w-sm rounded-lg bg-white p-6">
              <div className="text relative -mb-6">
                <input
                  type="submit"
                  value="#EA0008"
                  onClick={(e) => navigator.clipboard.writeText(e.target.value)}
                  style={{ backgroundColor: "#EA0008" }}
                  className={styles.input}
                />
                <button className={styles.tooltiptext}></button>
              </div>
              <h1 className="mx-auto mb-1 mt-4 text-center text-lg font-bold text-black">
                Monochromatic:
              </h1>
              <div className="text relative -mb-6">
                <input
                  type="submit"
                  value="#FF383E"
                  onClick={(e) => navigator.clipboard.writeText(e.target.value)}
                  style={{ backgroundColor: "#ff383e" }}
                  className={styles.input}
                />
                <button className={styles.tooltiptext}></button>
              </div>
            </div>
            <div className="w-full max-w-sm rounded-lg bg-white p-6">
              <div className="text relative -mb-6">
                <input
                  type="submit"
                  value="#0008EA"
                  onClick={(e) => navigator.clipboard.writeText(e.target.value)}
                  style={{ backgroundColor: "#0008EA" }}
                  className={styles.input}
                />
                <button className={styles.tooltiptext}></button>
              </div>
              <h1 className="mx-auto mb-1 mt-4 text-center text-lg font-bold text-black">
                Monochromatic:
              </h1>
              <div className="text relative -mb-6">
                <input
                  type="submit"
                  value="#383EFF"
                  onClick={(e) => navigator.clipboard.writeText(e.target.value)}
                  style={{ backgroundColor: "#383eff" }}
                  className={styles.input}
                />
                <button className={styles.tooltiptext}></button>
              </div>
            </div>
            <div className="w-full max-w-sm items-center rounded-lg bg-white p-6">
              <div className="text relative -mb-6">
                <input
                  type="submit"
                  value="#07D100"
                  onClick={(e) => navigator.clipboard.writeText(e.target.value)}
                  style={{ backgroundColor: "#07d100" }}
                  className={styles.input}
                />
                <button className={styles.tooltiptext}></button>
              </div>
              <h1 className="mx-auto mb-1 mt-4 text-center text-lg font-bold text-black">
                Monochromatic:
              </h1>
              <div className="text relative -mb-6">
                <input
                  type="submit"
                  value="#3EFF38"
                  onClick={(e) => navigator.clipboard.writeText(e.target.value)}
                  style={{ backgroundColor: "#3eff38" }}
                  className={styles.input}
                />
                <button className={styles.tooltiptext}></button>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto my-10 flex w-full flex-col">
          <h1 className="text-center text-2xl font-bold">Font Family</h1>
          <div className=" mx-auto flex w-full flex-col items-center justify-center gap-3 px-4 lg:flex-row">
            <div className="mx-auto flex w-full max-w-sm rounded-md bg-lightmode p-4 shadow-lg shadow-gray-400 dark:shadow-none">
              <a
                href="#"
                className={
                  kalnia.className +
                  "  mx-auto  text-center text-2xl font-normal text-black hover:font-bold "
                }
              >
                Kalnia
              </a>
            </div>
            <div className="mx-auto flex w-full max-w-sm rounded-md bg-lightmode p-4 shadow-lg shadow-gray-400 dark:shadow-none">
              <a
                href="#"
                className={
                  poppins.className +
                  "  mx-auto  text-center text-2xl font-normal text-black hover:font-bold "
                }
              >
                Papaa
              </a>
            </div>
            <div className="mx-auto flex w-full max-w-sm rounded-md bg-lightmode p-4 shadow-lg shadow-gray-400 dark:shadow-none">
              <a
                href="#"
                className={
                  jetBrains.className +
                  "... mx-auto  truncate  text-center text-2xl font-normal text-black hover:font-bold "
                }
              >
                JetBrains MonoNL
              </a>
            </div>
            <div className="mx-auto flex w-full max-w-sm rounded-md bg-lightmode p-4 shadow-lg shadow-gray-400 dark:shadow-none">
              <a
                href="#"
                className={
                  amiri.className +
                  "  mx-auto  text-center text-2xl text-black hover:font-bold"
                }
              >
                أميري
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorGuide;
