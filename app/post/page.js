"use client";

import React from "react";
import Navbar from "@/components/Navbar2";
import { EditorTinyMCE } from "./Editor";
import { PostSEO } from "./PostItem";
import { useRef, useState } from "react";
import Keyword from "./Keyword";
import MainPic from "./MainPic";

function Post() {
  const editorRef = useRef(null);

  const postPage = () => {
    if (editorRef.current) {
      /* setFullPost({
              title: title,
              content: parse(editorRef.current.getContent()).props.children,
              email: email,
            }); */
      /* console.log(parse(editorRef.current.getContent()).props.children); */
      console.log("");
    }
  };

  const [postItem, setPostItem] = useState({
    title: "",
    permalink: "",
    desc: "",
    keyword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPostItem((prevValue) => {
      if (name === "title") {
        return {
          title: value,
          permalink: prevValue.permalink,
          desc: prevValue.desc,
          keyword: prevValue.keyword,
        };
      } else if (name === "permalink") {
        return {
          title: prevValue.title,
          permalink: value,
          desc: prevValue.desc,
          keyword: prevValue.keyword,
        };
      } else if (name === "description") {
        return {
          title: prevValue.title,
          permalink: prevValue.permalink,
          desc: value,
          keyword: prevValue.keyword,
        };
      } else if (name === "keyword") {
        return {
          title: prevValue.title,
          permalink: prevValue.permalink,
          desc: prevValue.desc,
          keyword: value,
        };
      }
    });
  };

  console.log(postItem);

  return (
    <div className="px-10">
      <Navbar />
      <div className="pt-[68px]"></div>
      <div className="mb-4 flex justify-center text-3xl">
        Create Your Own Post
      </div>
      <PostSEO onChanged={handleChange} />
      <EditorTinyMCE />
      <Keyword onChanged={handleChange} />
      <MainPic />
      <button
        type="submit"
        onClick={postPage}
        className="m-auto my-2 mt-4 w-full rounded-lg bg-indigo-500 py-2 text-lg text-white hover:bg-indigo-800 focus:outline-none"
      >
        Post It
      </button>
    </div>
  );
}

export default Post;
