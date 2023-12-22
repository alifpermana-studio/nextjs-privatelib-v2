import React from "react";

function LoremIpsum(props) {
  return (
    <div>
      <textarea
        type="text"
        className=" rounded-lg w-full my-2 p-2"
        name="description"
        rows="3"
        placeholder="Write your description in here"
        onChange={props.onChanged}
      />
    </div>
  );
}

export default LoremIpsum;
