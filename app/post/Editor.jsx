"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import parse from "html-react-parser";

export function EditorTinyMCE({ children }) {
  const editorRef = useRef(null);

  return (
    <div className="my-2">
      <Editor
        apiKey="buea7llcbeh5kl8166x27vc2yodwtd0aba31u5fpes04ecmn"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image code",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            " link image bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          file_picker_types: "image",
        }}
      />

    </div>
  );
}
