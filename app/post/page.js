'use client'


import React from 'react'
import Navbar from '../navbar/Navbar'
import { EditorTinyMCE } from './Editor'
import { PostSEO } from './PostItem'
import { useRef, useState } from 'react'
import Keyword from './Keyword'
import styles from './page.module.css'


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
        keyword:"",
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
        <div className='px-10'>
            <Navbar />
            <div className='pt-[68px]'></div>
            <div className='flex justify-center text-3xl mb-4'>Create Your Own Post</div>
            <PostSEO onChanged={handleChange} />
            <EditorTinyMCE />
            <Keyword onChanged={handleChange} />
            <button
                type="submit"
                onClick={postPage}
                className="text-white bg-indigo-500 w-full py-2 my-2 mt-4 m-auto focus:outline-none hover:bg-indigo-800 rounded-lg text-lg"
            >
                Post It
            </button>
        </div>

    )
}

export default Post