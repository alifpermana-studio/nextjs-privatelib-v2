import React from "react";

function Keyword(props) {
  return (
    <>
      <input
        type="text"
        className=" rounded-lg w-full my-2 p-2"
        name="permalink"
        placeholder="Write your custom permalink in here"
        onChange={props.onChanged}
      />
      <input
        type="text"
        className=" rounded-lg w-full my-2 p-2 "
        name="keyword"
        placeholder="Write your keyword post in here"
        onChange={props.onChanged}
      />
    </>
  );
}

export default Keyword;
