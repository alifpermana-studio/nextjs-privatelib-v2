"use client";

import { useState } from "react";

export function PostSEO(props) {
  return (
    <>
      <input
        type="text"
        className=" rounded-lg w-full text-lg my-2 p-2"
        name="title"
        placeholder="Write title post in here"
        onChange={props.onChanged}
      />
      <textarea
        type="text"
        className=" rounded-lg w-full my-2 p-2"
        name="description"
        rows="3"
        placeholder="Write your description in here"
        onChange={props.onChanged}
      />
    </>
  );
}
