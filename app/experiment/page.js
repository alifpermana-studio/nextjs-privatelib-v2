"use client";

import Navbar from "@/components/Navbar2";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function Experiment() {
  const [result, setResult] = useState("");

  const [text, setText] = useState("<div></div>");

  useEffect(() => {
    const parser = new DOMParser();
    const html = parser.parseFromString(
      "<p>" + result.replaceAll(/\n/g, "</p><p>"),
      "text/html",
    );

    setText(html.body.innerHTML);

    console.log(text);
    document.getElementById("textearea-2").innerText = result;
  }, [result]);

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

  const handleKeyUp = (e) => {
    var text2 = "";

    text2 = window.getSelection().toString();

    setResult(e.target.innerText);
    console.dir(e.target);
  };

  return (
    <main className="relative">
      <Navbar />
      <div className="relative mt-20">
        <div className="flex flex-row">
          <div id="el">Hanya uji coba</div>

          <div className="bg-blue-400 p-2">
            <div
              id="textearea-1"
              onKeyUp={handleKeyUp}
              onMouseUp={handleSelect}
              className="w-32 rounded-lg p-2 text-white"
              contentEditable="true"
            ></div>
          </div>
          <div className="bg-red-500 p-2">
            <div
              id="textearea-2"
              onKeyUp={handleKeyUp}
              onMouseUp={handleSelect}
              className="rounded-lg p-2 text-white"
              contentEditable="true"
            ></div>
          </div>

          <div onClick={submit}>Submit</div>
          <div id="contentarea"></div>
        </div>
      </div>
    </main>
  );
}
