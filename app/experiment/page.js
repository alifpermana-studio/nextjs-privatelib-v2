"use client";

import Navbar from "@/components/Navbar2";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function Experiment() {
  const [result, setResult] = useState();
  const newArr = [];

  const submit = () => {
    const element = document.getElementById("el");
    console.dir(element);
  };

  const handleDiv = () => {
    var text = "";
    text = window.getSelection();
    console.log(text);
  };

  const handleSelect = () => {
    var text1 = "";

    text1 = window.getSelection().toString();

    console.dir(text1);
  };

  const handleKeyUp = () => {
    var text2 = "";

    text2 = window.getSelection().toString();

    console.log(text2);
  };

  return (
    <main className="relative">
      <Navbar />
      <div className="relative mt-20">
        <div className="flex flex-col">
          <div id="el">Hanya uji coba</div>
          <textarea
            onKeyUp={handleKeyUp}
            onMouseUp={handleSelect}
            className="text-black"
          />
          <div onClick={submit}>Submit</div>
          <div>{result}</div>
        </div>
      </div>
    </main>
  );
}
