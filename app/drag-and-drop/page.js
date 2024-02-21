"use client";

import { Content, Kulim_Park } from "next/font/google";
import React, { useEffect, useState } from "react";

export default function DragAndDrop() {
  const defaultArray = {
    content: "",
    drag: false,
    height: "46",
  };
  const [totalContent, setTotalContent] = useState(0);
  const [arrayContent, setArrayContent] = useState([defaultArray]);
  const [cOffX, setCOffX] = useState();
  const [cOffY, setCOffY] = useState();
  const [dragMove, setDragMove] = useState(false);
  const [text, setText] = useState("<div></div>");

  useEffect(() => {
    const parser = new DOMParser();
    /* const html = parser.parseFromString(
      "<p>" + result.replaceAll(/\n/g, "</p><p>"),
      "text/html",
    ); */

    arrayContent.map((arr, i) => {
      const html = parser.parseFromString(
        "<p>" + arr.content.replaceAll(/\n/g, "</p><p>"),
        "text/html",
      );

      setText(html.body.innerHTML);

      document.getElementById("textarea-" + i).innerText = html.body.innerText;
    });
  }, [dragMove]);

  const newContent = () => {
    const newArr = defaultArray;

    setArrayContent((prevContent) => {
      return [...prevContent, newArr];
    });
  };

  const deleteContent = (e) => {
    const { value, id } = e.target;
    arrayContent.splice(id.replace("delete-", ""), 1);
    if (totalContent >= 0) setTotalContent(totalContent - 1);
  };

  const handleContent = (e) => {
    const { innerText, id } = e.target;
    const textarea = document.getElementById(id);
    const contentarea = document.getElementById(
      id.replace("textarea-", "content-"),
    );

    let newArr = [...arrayContent];
    newArr[id.replace("textarea-", "")].content = innerText;

    /* newArr[id.replace("textarea-", "")].height = e.target.scrollHeight; */

    /* textarea.style.height = "46px"; */

    /* let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;
    contentarea.style.height = `${scHeight + 16}px`; */

    setArrayContent(newArr);
  };

  const dragStart = (e) => {
    const textarea = document.getElementById(
      e.target.id.replace("drag-", "textarea-"),
    );

    const contentarea = document.getElementById(
      e.target.id.replace("drag-", "content-"),
    );

    const draggingarea = document.getElementById(
      e.target.id.replace("drag-", "dragging-"),
    );

    const dragged = document.getElementById("dragged-element");

    const drag = document.getElementById(e.target.id);

    setCOffX(e.clientX);
    setCOffY(e.clientY);

    console.dir(e);
    console.log([e.clientX, e.clientY]);

    contentarea.style.opacity = "0";
    contentarea.style.position = "absolute";

    /* draggingarea.style.height = "46px"; */

    /* const scHeight = textarea.scrollHeight; */

    let newArr = [...arrayContent];

    /* newArr[e.target.id.replace("drag-", "")].height = scHeight; */

    setDragMove(true);
    setArrayContent(newArr);

    e.dataTransfer.setData(
      "number",
      JSON.stringify({
        mouseMove: 1,
        id: e.target.id.replace("drag-", ""),
        /* scrollHeight: arrayContent.height, */
      }),
    );
  };

  const dragMouseMove = (e) => {
    e.preventDefault();

    const dragged = document.getElementById("dragged-element");
    const drag = document.getElementById("drag-4");

    /* console.dir(drag); */
    console.log([e.clientX, cOffX, e.clientY, cOffY]);

    /* dragged.style.top = (e.clientY - cOffY).toString() + "px";
    dragged.style.left = (e.clientX - cOffX).toString() + "px"; */

    dragged.style.display = "flex";
    dragged.style.width = "80px";

    dragged.style.top = (e.clientY - 10).toString() + "px";
    dragged.style.left = (e.clientX + 10).toString() + "px";

    /* dragged.style.transform = "translateY(" + e.clientY + "px)";
    dragged.style.transform += "translateX(" + e.clientX + "px)"; */
  };

  const dragLeave = (e) => {
    e.preventDefault();
    let newArr = [...arrayContent];
    const myTag = Number(e.currentTarget.id.replace("droparea-", ""));
    newArr[myTag].drag = false;
    setArrayContent(newArr);
  };

  const dragEnter = (e) => {
    e.preventDefault();
    let newArr = [...arrayContent];
    const myTag = Number(e.currentTarget.id.replace("droparea-", ""));
    newArr[myTag].drag = true;
    setArrayContent(newArr);
  };

  const drop = (e) => {
    e.preventDefault();

    const dragged = document.getElementById("dragged-element");

    dragged.style.display = "none";

    const myTag = Number(e.currentTarget.id.replace("droparea-", ""));

    const data = e.dataTransfer.getData("number");

    const myArray = JSON.parse(data).id;

    function array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr;
    }

    /* function heightAll(myArr) {
      myArr.map((arr, i) => {
        const mytextarea = document.getElementById("textarea-" + i);
        const mycontentarea = document.getElementById("content-" + i);

        const contentAreaHeight = Number(arr.height);

        mytextarea.style.height = `${arr.height}px`;

        mycontentarea.style.height = `${contentAreaHeight + 16}px`;
      });
    } */

    let newArr = [...arrayContent];

    if (myArray > myTag) {
      newArr[myTag].drag = false;
      const result = array_move(newArr, myArray, myTag + 1);
      /* heightAll(result); */
      setArrayContent(result);
    } else {
      newArr[myTag].drag = false;
      const result = array_move(newArr, myArray, myTag);
      /* heightAll(result); */

      setArrayContent(result);
      setDragMove(false);
    }
  };

  const dragOverElement = (e) => {
    e.preventDefault();

    let newArr = [...arrayContent];
    const myTag = Number(e.currentTarget.id.replace("droparea-", ""));
    newArr[myTag].drag = true;
    setArrayContent(newArr);
  };

  const handleDragEnd = (e) => {
    e.preventDefault();

    let newArr = [...arrayContent];

    const myTag = e.target.id.replace("drag-", "");
    const contentarea = document.getElementById(
      e.target.id.replace("drag-", "content-"),
    );

    contentarea.style.opacity = "1";
    contentarea.style.position = "relative";

    const dragged = document.getElementById("dragged-element");

    dragged.style.display = "none";

    /* contentarea.style.height = `${newArr[myTag].height + 16}px`; */
    /* contentarea.style.height = "0px"; */

    console.log("dragend");

    /* e.style.height = `${newArr[myTag].height}px`; */

    const draggingarea = document.getElementById(
      e.target.id.replace("drag-", "dragging-"),
    );

    draggingarea.style.height = "0px";

    /* setDragging(false); */
  };

  /* const mouseMove = (e) => {
    console.log("mouse: ", [e.clientX, e.clientY]);
    const dragged = document.getElementById("dragged-element");

    dragged.style.top = (e.clientY - cOffY).toString() + "px";
    dragged.style.left = (e.clientX - cOffX).toString() + "px";
  }; */

  return (
    <div className="relative">
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative flex flex-row items-center justify-center gap-4">
          <div onClick={newContent}>Add</div>
        </div>
        <div id="contentAll" className=" flex flex-col" onDrag={dragMouseMove}>
          {arrayContent.map((content, i) => (
            <div key={i} className="relative">
              <div
                id={"content-" + i}
                className=" flex flex-row items-start justify-start rounded-md bg-colorfive px-3 py-2 text-black"
              >
                <div
                  id={"drag-" + i}
                  className="cursor-move"
                  draggable="true"
                  onDragStart={dragStart}
                  onDragEnd={handleDragEnd}
                >
                  Drag
                </div>
                <div
                  className=" w-80 rounded-lg bg-lightmodev3 p-2 text-darkmode dark:bg-darkmodev3 dark:text-lightmode"
                  id={"textarea-" + i}
                  onKeyUp={handleContent}
                  contentEditable="true"
                ></div>
                <div id={"delete-" + i} onClick={deleteContent}>
                  Delete
                </div>
              </div>
              <div
                id={"dragging-" + i}
                className=" w-full rounded-md bg-colorfour transition duration-100 ease-in-out"
              ></div>
              <div
                id="dragged-element"
                className=" fixed z-10 hidden bg-colorfive transition"
              >
                Bisa jalan
              </div>

              <div
                id={"droparea-" + i}
                onDragOver={dragOverElement}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={drop}
                className={
                  content.drag
                    ? "my-2 rounded-lg bg-colorone p-8 transition duration-300"
                    : "my-2 p-1"
                }
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
