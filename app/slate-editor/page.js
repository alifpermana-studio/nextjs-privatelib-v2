"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { createEditor, Transforms, Element, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

export default function SlateEditor() {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));

  /* const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;

      case "quote":
        return <BlockquoteElement {...props} />;

      case "order-list":
        return <OrderListElement {...props} />;

      default:
        return <DefaultElement {...props} />;
    }
  }, []); */

  const renderElement = useCallback((props) => {
    /* console.dir(props); */
    return <EditableElement {...props} />;
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "&") {
      // Prevent the ampersand character from being inserted.
      e.preventDefault();
      // Execute the `insertText` method when the event occurs.
      editor.insertText("and");
    }

    if (e.ctrlKey) {
      switch (e.key.toLowerCase()) {
        case "`": {
          e.preventDefault();
          // Determine whether any of the currently selected blocks are code blocks.
          const [match] = Editor.nodes(editor, {
            match: (n) => n.type === "code",
          });
          // Toggle the block type depending on whether there's already a match.
          Transforms.setNodes(
            editor,
            { type: match ? "paragraph" : "code" },
            {
              match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
            },
          );
          break;
        }

        case "q": {
          e.preventDefault();
          // Determine whether any of the currently selected blocks are code blocks.
          const [match] = Editor.nodes(editor, {
            match: (n) => n.type === "quote",
          });
          // Toggle the block type depending on whether there's already a match.
          Transforms.setNodes(
            editor,
            { type: match ? "paragraph" : "quote" },
            {
              match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
            },
          );
          break;
        }

        case "b": {
          e.preventDefault();
          CustomEditor.toggleBoldMark(editor);
          break;
        }

        case "i": {
          e.preventDefault();
          CustomEditor.toggleItalicMark(editor);
          break;
        }

        case "u": {
          e.preventDefault();
          CustomEditor.toggleUnderlineMark(editor);
          break;
        }

        case "l": {
          e.preventDefault();
          CustomEditor.toggleLineThroughMark(editor);
          break;
        }
        case ",": {
          e.preventDefault();
          CustomEditor.toggleSubscriptMark(editor);
          break;
        }
        case "'": {
          e.preventDefault();
          CustomEditor.toggleSuperscriptMark(editor);
          break;
        }
      }
    }
  };

  return (
    <div className="mx-auto mt-10 w-[1000px]">
      <div className="relative flex w-full flex-col gap-2 rounded-lg bg-darkmodev2 px-3 py-2">
        <Slate editor={editor} initialValue={initialValue}>
          <Toolbar {...editor} />
          <div className="my-1 bg-white p-[1px] opacity-30"></div>
          <Editable
            className="rounded-lg bg-darkmodev3 p-2"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={handleKeyDown}
          />
        </Slate>
        <button onClick={() => console.dir(editor)}>submit</button>
      </div>
      <ol className="list-inside list-decimal">
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li>
      </ol>
    </div>
  );
}

const Toolbar = (editor) => {
  return (
    <div className="my-auto flex flex-row gap-1">
      <button
        title="Ctrl + B"
        className=" h-6 w-6 rounded-md bg-lightmodev4 p-1 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
      >
        <svg
          id="Layer_1"
          data-name="Layer 1"
          className="mx-auto w-3 fill-darkmodev4 dark:fill-lightmodev4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 33.63 39.99"
        >
          <path
            d="M178.15,305.38a13.53,13.53,0,0,1,6.25,3.73,8.57,8.57,0,0,1,2.15,5.88,12.13,12.13,0,0,1-1,5.09,8.45,8.45,0,0,1-3,3.56,13.71,13.71,0,0,1-4.71,2,30.64,30.64,0,0,1-6.9.64H152.92v-1.93a7.77,7.77,0,0,0,1.71-.63,2.14,2.14,0,0,0,.94-.94,4.11,4.11,0,0,0,.4-1.52c.06-.61.09-1.39.09-2.33V293.72c0-.92,0-1.69-.08-2.32a3.89,3.89,0,0,0-.38-1.52,2.32,2.32,0,0,0-.94-.95,6.75,6.75,0,0,0-1.74-.66v-1.94h19.19a35.39,35.39,0,0,1,5.36.33,15.09,15.09,0,0,1,4.78,1.52,7,7,0,0,1,2.84,2.75,8.46,8.46,0,0,1,1,4.25q0,6.63-8,9.93ZM169,303.85a10.2,10.2,0,0,0,4.6-.85,5.81,5.81,0,0,0,2.54-2.41,9.12,9.12,0,0,0,.86-4.32,6.91,6.91,0,0,0-.94-3.86,5.16,5.16,0,0,0-2.66-2,13,13,0,0,0-4.31-.62c-1.37,0-2.69.05-4,.15v13.94Zm-3.89,19c1.15.06,2.48.09,4,.09a13,13,0,0,0,4.59-.69,5.37,5.37,0,0,0,2.79-2.4,9.34,9.34,0,0,0,1-4.71,10.74,10.74,0,0,0-.53-3.61,5.66,5.66,0,0,0-1.58-2.44,6.5,6.5,0,0,0-2.52-1.34,13.07,13.07,0,0,0-3.66-.43h-4.07Z"
            transform="translate(-152.92 -286.33)"
          />
        </svg>
      </button>
      <button
        title="Ctrl + I"
        className=" h-6 w-6 rounded-md bg-lightmodev4 p-1 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleItalicMark(editor);
        }}
      >
        <svg
          id="Layer_1"
          data-name="Layer 1"
          className="mx-auto w-[6px] fill-darkmodev4 dark:fill-lightmodev4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 19.39 39.99"
        >
          <path
            d="M161.12,317.8a26.88,26.88,0,0,0-.49,2.74,15.55,15.55,0,0,0-.12,1.83,2.28,2.28,0,0,0,.66,1.86,4,4,0,0,0,2.21.66l-.32,1.43H151.34l.32-1.43a4.1,4.1,0,0,0,1.67-.57,3.3,3.3,0,0,0,.94-1.1,10.06,10.06,0,0,0,.7-1.71c.22-.68.54-2,1-3.92l5-22.55c.19-.9.35-1.77.47-2.6a16.69,16.69,0,0,0,.17-2.12,2.28,2.28,0,0,0-.7-1.92,4,4,0,0,0-2.17-.63l.32-1.44h11.72l-.32,1.44a5.55,5.55,0,0,0-1.6.53,2.81,2.81,0,0,0-.87.88,7.41,7.41,0,0,0-.8,1.83c-.26.83-.6,2.18-1,4.05Z"
            transform="translate(-151.34 -286.33)"
          />
        </svg>
      </button>
      <button
        title="Ctrl + U"
        className=" h-6 w-6 rounded-md bg-lightmodev4 p-1 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleUnderlineMark(editor);
        }}
      >
        <svg
          id="Layer_1"
          data-name="Layer 1"
          className="mx-auto w-3 fill-darkmodev4 dark:fill-lightmodev4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 35.48 39.83"
        >
          <g>
            <path
              d="M174.66,303.33a26.89,26.89,0,0,0-.18-3.84,3.28,3.28,0,0,0-.73-1.69,4.13,4.13,0,0,0-2.08-1v-1.93h12.25v1.93a6.41,6.41,0,0,0-1.32.46,2.44,2.44,0,0,0-.79.57,2.27,2.27,0,0,0-.46.72,6.08,6.08,0,0,0-.26.85,7.91,7.91,0,0,0-.15,1.3c0,.57,0,1.45,0,2.64v11.19a18,18,0,0,1-.79,6,8.76,8.76,0,0,1-2.35,3.61,9.35,9.35,0,0,1-3.92,2,22,22,0,0,1-5.71.64,23,23,0,0,1-6.13-.7,10,10,0,0,1-4.07-2.12,8.67,8.67,0,0,1-2.3-3.52,16.54,16.54,0,0,1-.75-5.46V303.33a27.35,27.35,0,0,0-.17-3.84,3.37,3.37,0,0,0-.73-1.69,4.22,4.22,0,0,0-2.08-1v-1.93h14.56v1.93a6.41,6.41,0,0,0-1.32.46,2.44,2.44,0,0,0-.79.57,2.27,2.27,0,0,0-.46.72,6.08,6.08,0,0,0-.26.85,7.91,7.91,0,0,0-.15,1.3c0,.57,0,1.45,0,2.64v13a13.6,13.6,0,0,0,.47,4,4.44,4.44,0,0,0,1.7,2.42,5.77,5.77,0,0,0,3.42.88,6,6,0,0,0,3.42-.81,4.48,4.48,0,0,0,1.68-2.31,15.26,15.26,0,0,0,.53-4.67Z"
              transform="translate(-150.11 -294.86)"
            />
            <path
              d="M150.11,334.69v-4.57h35.48v4.57Z"
              transform="translate(-150.11 -294.86)"
            />
          </g>
        </svg>
      </button>
      <button
        title="Ctrl + L"
        className=" h-6 w-6 rounded-md bg-lightmodev4 p-0 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleLineThroughMark(editor);
        }}
      >
        <svg
          className="mx-auto w-5 fill-darkmodev4 dark:fill-lightmodev4"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M14.348 12H21v2h-4.613c.24.515.368 1.094.368 1.748 0 1.317-.474 2.355-1.423 3.114-.947.76-2.266 1.138-3.956 1.138-1.557 0-2.934-.293-4.132-.878v-2.874c.985.44 1.818.75 2.5.928.682.18 1.306.27 1.872.27.68 0 1.2-.13 1.562-.39.363-.26.545-.644.545-1.158 0-.285-.08-.54-.24-.763-.16-.222-.394-.437-.704-.643-.18-.12-.483-.287-.88-.49H3v-2H14.347zm-3.528-2c-.073-.077-.143-.155-.193-.235-.126-.202-.19-.44-.19-.713 0-.44.157-.795.47-1.068.313-.273.762-.41 1.348-.41.492 0 .993.064 1.502.19.51.127 1.153.35 1.93.67l1-2.405c-.753-.327-1.473-.58-2.16-.76-.69-.18-1.414-.27-2.173-.27-1.544 0-2.753.37-3.628 1.108-.874.738-1.312 1.753-1.312 3.044 0 .302.036.58.088.848h3.318z" />
          </g>
        </svg>
      </button>
      <button
        title="Subscript (Ctrl + ')"
        className=" h-6 w-6 rounded-md bg-lightmodev4 px-1 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleSubscriptMark(editor);
        }}
      >
        <svg
          className="mx-auto w-5 fill-darkmodev4 dark:fill-lightmodev4"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.7433 5.33104C4.37384 4.92053 3.74155 4.88726 3.33104 5.25671C2.92053 5.62617 2.88726 6.25846 3.25671 6.66897L7.15465 11L3.25671 15.331C2.88726 15.7416 2.92053 16.3738 3.33104 16.7433C3.74155 17.1128 4.37384 17.0795 4.7433 16.669L8.50001 12.4949L12.2567 16.669C12.6262 17.0795 13.2585 17.1128 13.669 16.7433C14.0795 16.3738 14.1128 15.7416 13.7433 15.331L9.84537 11L13.7433 6.66897C14.1128 6.25846 14.0795 5.62617 13.669 5.25671C13.2585 4.88726 12.6262 4.92053 12.2567 5.33104L8.50001 9.50516L4.7433 5.33104ZM17.3181 14.0484C17.6174 13.7595 18.1021 13.7977 18.3524 14.13C18.5536 14.3971 18.5353 14.7698 18.3088 15.0158L15.2643 18.3227C14.9955 18.6147 14.9248 19.0382 15.0842 19.4017C15.2437 19.7652 15.6031 20 16 20H20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18H18.2799L19.7802 16.3704C20.6607 15.414 20.7321 13.965 19.95 12.9267C18.9769 11.6348 17.0925 11.4862 15.929 12.6096L15.3054 13.2116C14.9081 13.5953 14.897 14.2283 15.2806 14.6256C15.6642 15.023 16.2973 15.0341 16.6946 14.6505L17.3181 14.0484Z" />
        </svg>
      </button>
      <button
        title="Superscript (Ctrl + ,)"
        className=" h-6 w-6 rounded-md bg-lightmodev4 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleSuperscriptMark(editor);
        }}
      >
        <svg
          className="mx-auto w-5 fill-darkmodev4 dark:fill-lightmodev4"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.3181 6.04842C17.6174 5.75945 18.1021 5.79767 18.3524 6.12997C18.5536 6.39707 18.5353 6.76978 18.3088 7.01579L15.2643 10.3227C14.9955 10.6147 14.9248 11.0382 15.0842 11.4017C15.2437 11.7652 15.6031 12 16 12H20C20.5523 12 21 11.5523 21 11C21 10.4477 20.5523 10 20 10H18.2799L19.7802 8.37041C20.6607 7.41399 20.7321 5.96504 19.95 4.92665C18.9769 3.63478 17.0925 3.48621 15.929 4.60962L15.3054 5.21165C14.9081 5.59526 14.897 6.22833 15.2806 6.62564C15.6642 7.02296 16.2973 7.03406 16.6946 6.65045L17.3181 6.04842ZM4.7433 8.33104C4.37384 7.92053 3.74155 7.88725 3.33104 8.25671C2.92053 8.62616 2.88726 9.25845 3.25671 9.66896L7.15465 14L3.25671 18.331C2.88726 18.7415 2.92053 19.3738 3.33104 19.7433C3.74155 20.1128 4.37384 20.0795 4.7433 19.669L8.50001 15.4948L12.2567 19.669C12.6262 20.0795 13.2585 20.1128 13.669 19.7433C14.0795 19.3738 14.1128 18.7415 13.7433 18.331L9.84537 14L13.7433 9.66896C14.1128 9.25845 14.0795 8.62616 13.669 8.25671C13.2585 7.88725 12.6262 7.92053 12.2567 8.33104L8.50001 12.5052L4.7433 8.33104Z" />
        </svg>
      </button>
      <div className="text-lightmodev4 opacity-50 dark:text-lightmodev4">|</div>
      <button
        title="Blockquote (Ctrl + Q)"
        className=" h-6 w-6 rounded-md bg-lightmodev4 p-1 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleQuoteBlock(editor);
        }}
      >
        <svg
          id="Layer_1"
          data-name="Layer 1"
          className="mx-auto w-3 fill-darkmodev4 dark:fill-lightmodev4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 79.1 62.73"
        >
          <path
            d="M113.51,262.58l-2.23-3.68q18.94-10.12,18.94-18.94a5.22,5.22,0,0,0-1.56-3.73,23.1,23.1,0,0,0-5.57-3.73q-6.12-3.12-8.75-6.63a14.24,14.24,0,0,1-2.61-8.75,16.66,16.66,0,0,1,5-12.25,16.38,16.38,0,0,1,12-5,15.37,15.37,0,0,1,12.76,6.24q4.84,6.24,4.85,16.27a37.3,37.3,0,0,1-3.18,15.15,40.43,40.43,0,0,1-9.41,13.15Q126.55,257.34,113.51,262.58Zm44,0-2.23-3.68q18.94-10,18.94-18.94,0-3.78-7.13-7.46-6.34-3.34-8.86-6.69a14.11,14.11,0,0,1-2.51-8.69,17.31,17.31,0,0,1,17.16-17.27,15.27,15.27,0,0,1,12.65,6.24q4.85,6.24,4.84,16.27,0,16.48-12.47,28.3a49.36,49.36,0,0,1-8.3,6.29A95,95,0,0,1,157.52,262.58Z"
            transform="translate(-111.28 -199.85)"
          />
        </svg>
      </button>
      <button
        title="Code Editor (Ctrl + `)"
        className=" h-6 w-8 rounded-md bg-lightmodev4 p-1 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleCodeBlock(editor);
        }}
      >
        <svg
          id="Layer_1"
          className="mx-auto w-5 fill-darkmodev4 dark:fill-lightmodev4"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 72.31 46.13"
        >
          <g>
            <path
              d="M170.26,322.56a3.77,3.77,0,0,1-.36,3,4.18,4.18,0,0,1-2.26,1.8,3.5,3.5,0,0,1-2.92-.29l-17.06-9.29a3.42,3.42,0,0,1-1.52-1.44,4.09,4.09,0,0,1-.5-1.94,3.7,3.7,0,0,1,.43-2,3.45,3.45,0,0,1,1.51-1.44l17.07-9.29a3.56,3.56,0,0,1,2.95-.29,4,4,0,0,1,2.3,1.88,3.47,3.47,0,0,1,.33,2.88,3.85,3.85,0,0,1-2,2.3l-10.8,6,10.94,5.9A3.71,3.71,0,0,1,170.26,322.56Z"
              transform="translate(-145.63 -289.88)"
            />
            <path
              d="M189.49,290.09a3.79,3.79,0,0,1,2.16,1.87,3.64,3.64,0,0,1,.29,2.81q-3.1,9.87-6.12,19.3t-6,19.29a4.29,4.29,0,0,1-1.91,2.2,3.22,3.22,0,0,1-2.77.25,3.67,3.67,0,0,1-2.2-1.83,4.16,4.16,0,0,1-.32-2.92l12.24-38.52a3.66,3.66,0,0,1,4.68-2.45Z"
              transform="translate(-145.63 -289.88)"
            />
            <path
              d="M195.18,320.26l10.94-5.9-10.8-6a3.82,3.82,0,0,1-2-2.3,3.5,3.5,0,0,1,.32-2.88,4.07,4.07,0,0,1,2.31-1.88,3.56,3.56,0,0,1,2.95.29L216,310.9a3.42,3.42,0,0,1,1.52,1.44,3.79,3.79,0,0,1,.43,2,4,4,0,0,1-.51,1.94,3.4,3.4,0,0,1-1.51,1.44L198.85,327a3.51,3.51,0,0,1-2.92.29,4.2,4.2,0,0,1-2.27-1.8,3.85,3.85,0,0,1-.36-3A3.72,3.72,0,0,1,195.18,320.26Z"
              transform="translate(-145.63 -289.88)"
            />
          </g>
        </svg>
      </button>
      <div className="text-lightmodev4 opacity-50 dark:text-lightmodev4">|</div>
      <button
        className=" h-6 w-6 rounded-md bg-lightmodev4 p-1 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleOrderListBlock(editor);
        }}
      >
        <svg
          className="mx-auto w-[14px] fill-darkmodev4 dark:fill-lightmodev4"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 94.479 94.479"
        >
          <g>
            <g>
              <path d="M92.479,6.821H26.823c-1.104,0-2,0.896-2,2V19.58c0,1.104,0.896,2,2,2h65.656c1.104,0,2-0.896,2-2V8.821 C94.479,7.717,93.584,6.821,92.479,6.821z" />
              <path d="M92.479,40.457H26.823c-1.104,0-2,0.896-2,2v10.761c0,1.104,0.896,2,2,2h65.656c1.104,0,2-0.896,2-2V42.457 C94.479,41.352,93.584,40.457,92.479,40.457z" />
              <path d="M92.479,75.109H26.823c-1.104,0-2,0.896-2,2v10.759c0,1.104,0.896,2,2,2h65.656c1.104,0,2-0.896,2-2V77.109 C94.479,76.004,93.584,75.109,92.479,75.109z" />
              <path d="M1.842,11.104c0.423,0.051,0.848-0.08,1.167-0.36l0.914-0.799v12.973c0,0.828,0.672,1.5,1.5,1.5h1.546 c0.828,0,1.5-0.672,1.5-1.5V5.567c0-0.828-0.672-1.5-1.5-1.5H5.378c-0.356,0-0.701,0.127-0.973,0.358L0.527,7.728 c-0.589,0.501-0.7,1.369-0.256,2.003l0.522,0.745C1.04,10.825,1.42,11.053,1.842,11.104z" />
              <path d="M2.546,37.5c-0.647,0.23-1.056,0.872-0.99,1.556l0.096,0.999c0.048,0.497,0.339,0.938,0.778,1.176 c0.438,0.238,0.967,0.243,1.409,0.011c1.18-0.615,1.923-0.775,2.922-0.534c0.71,0.163,1.188,0.586,1.438,1.225 c0.378,1.143,0.395,2.957-2.854,6.873l-2.506,2.996c-0.589,0.688-0.99,1.119-1.302,1.404c-0.312,0.284-0.488,0.688-0.488,1.107 v1.475c0,0.828,0.672,1.5,1.5,1.5h9.132c0.828,0,1.5-0.672,1.5-1.5V55.01c0-0.828-0.672-1.5-1.5-1.5H6.896 c0.458-0.515,1.037-1.211,1.716-2.063c2.803-3.468,5.061-6.645,4.292-10.376c-0.309-1.672-1.247-2.966-2.731-3.752 c-0.826-0.424-1.879-0.639-3.127-0.639C5.629,36.68,4.031,36.971,2.546,37.5z" />
              <path d="M10.491,79.516c0.25-0.135,0.487-0.289,0.74-0.483c1.718-1.313,1.801-3.335,1.786-3.885 c-0.001-1.878-0.712-3.318-2.166-4.401c-1.026-0.77-2.534-1.177-4.361-1.177c-1.347,0-2.787,0.212-4.057,0.596 c-0.668,0.202-1.107,0.839-1.063,1.533l0.058,0.88c0.031,0.471,0.28,0.896,0.673,1.155c0.394,0.259,0.886,0.319,1.327,0.159 c0.864-0.307,1.571-0.45,2.223-0.45c0.229,0,0.457,0.019,0.722,0.063c0.94,0.127,1.563,0.549,1.9,1.283 c0.237,0.52,0.19,1.445-0.083,1.885c-0.654,1.014-2.438,1.217-3.443,1.25c-0.81,0.024-1.453,0.688-1.453,1.498v0.658 c0,0.828,0.687,1.5,1.515,1.5c1.575,0,2.311,0.309,2.596,0.485c0.737,0.465,1.065,1.043,1.066,1.918 c0.025,0.912-0.348,1.606-1.129,2.121c-1.014,0.651-2.64,0.647-4.505,0.032c-0.438-0.146-0.918-0.082-1.302,0.175 c-0.384,0.255-0.629,0.672-0.665,1.132l-0.068,0.872C0.75,88.973,1.135,89.588,1.75,89.83c0.33,0.13,0.551,0.183,1.022,0.281 c0.857,0.196,1.84,0.302,2.842,0.302c1.493,0,4.248-0.247,5.944-1.919c1.657-1.69,1.974-4.11,1.56-5.729 C12.636,80.704,11.461,79.946,10.491,79.516z" />
            </g>
          </g>
        </svg>
      </button>
      <button
        className=" h-6 w-6 rounded-md bg-lightmodev4 p-1 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleUnorderListBlock(editor);
        }}
      >
        <svg
          version="1.0"
          className="mx-auto w-4 fill-darkmodev4 dark:fill-lightmodev4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1280.000000 1034.000000"
        >
          <g
            transform="translate(0.000000,1034.000000) scale(0.100000,-0.100000)"
            stroke="none"
          >
            <path d="M995 10329 c-382 -56 -715 -299 -879 -642 -334 -698 90 -1513 853 -1643 135 -23 342 -15 471 19 211 55 376 150 531 306 168 167 271 359 319 591 31 147 24 368 -14 515 -33 125 -116 297 -195 402 -252 335 -676 511 -1086 452z" />
            <path d="M3670 9180 l0 -820 4565 0 4565 0 0 820 0 820 -4565 0 -4565 0 0 -820z" />
            <path d="M1045 6334 c-399 -44 -745 -283 -923 -639 -75 -151 -110 -284 -119 -455 -29 -548 333 -1037 873 -1181 113 -30 365 -38 488 -14 333 62 613 258 789 551 96 159 147 335 154 533 7 159 -7 266 -49 401 -127 402 -454 696 -873 785 -72 15 -270 26 -340 19z" />
            <path d="M3670 5180 l0 -820 4565 0 4565 0 0 820 0 820 -4565 0 -4565 0 0 -820z" />
            <path d="M954 2295 c-315 -60 -592 -242 -759 -499 -69 -107 -99 -168 -135 -276 -192 -573 101 -1207 662 -1433 426 -172 894 -83 1234 236 141 131 268 347 321 542 24 92 27 116 27 290 0 174 -2 198 -26 287 -113 414 -425 727 -836 835 -81 21 -124 26 -257 29 -106 2 -184 -2 -231 -11z" />
            <path d="M3670 1160 l0 -820 4565 0 4565 0 0 820 0 820 -4565 0 -4565 0 0 -820z" />
          </g>
        </svg>
      </button>
      <button
        title="Left"
        className=" h-6 w-6 rounded-md bg-lightmodev4 p-1 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleAlignLeftBlock(editor);
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="mx-auto w-4 fill-darkmodev4 dark:fill-lightmodev4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M4 19h16v-2H4v2zm10-6H4v2h10v-2zM4 9v2h16V9H4zm10-4H4v2h10V5z" />
          </g>
        </svg>
      </button>
      <button
        title="Right"
        className=" h-6 w-6 rounded-md bg-lightmodev4 p-1 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleAlignRightBlock(editor);
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="mx-auto w-4 fill-darkmodev4 dark:fill-lightmodev4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M20 17H4v2h16v-2zm-10-2h10v-2H10v2zM4 9v2h16V9H4zm6-2h10V5H10v2z" />
          </g>
        </svg>
      </button>
      <button
        title="Justify"
        className=" h-6 w-6 rounded-md bg-lightmodev4 p-1 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleAlignJustifyBlock(editor);
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="mx-auto w-4 fill-darkmodev4 dark:fill-lightmodev4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M4 19h16v-2H4v2zm16-6H4v2h16v-2zM4 9v2h16V9H4zm16-4H4v2h16V5z" />
          </g>
        </svg>
      </button>
      <button
        title="Center"
        className=" h-6 w-6 rounded-md bg-lightmodev4 p-1 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleAlignCenterBlock(editor);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto w-4 fill-darkmodev4 dark:fill-lightmodev4"
          viewBox="0 0 24 24"
        >
          <path d="M4 19h16v-2H4v2zm13-6H7v2h10v-2zM4 9v2h16V9H4zm13-4H7v2h10V5z" />
        </svg>
      </button>
      <button
        title="W"
        className=" rounded-md bg-lightmodev4 p-1 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleWrapNodeBlock(editor);
        }}
      >
        Wrapnode
      </button>
      <button
        title="W"
        className=" rounded-md bg-lightmodev4 p-1 dark:bg-darkmodev4"
        onMouseDown={(e) => {
          e.preventDefault();
          CustomEditor.toggleUnwrapNodeBlock(editor);
        }}
      >
        unwrapNodes
      </button>
    </div>
  );
};

const EditableElement = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  console.dir(children);
  switch (element.type) {
    case "quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "order-list":
      return (
        <ol style={style} className="list-inside list-decimal" {...attributes}>
          {children}
        </ol>
      );
    case "unorder-list":
      return (
        <ul style={style} className="list-inside list-disc" {...attributes}>
          {children}
        </ul>
      );
    case "code":
      return (
        <code style={style} {...attributes}>
          {children}
        </code>
      );
    case "paragraph":
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.linethrough) {
    children = <s>{children}</s>;
  }

  if (leaf.superscript) {
    children = <sup>{children}</sup>;
  }

  if (leaf.subscript) {
    children = <sub>{children}</sub>;
  }

  return <span {...attributes}>{children}</span>;
};

const CustomEditor = {
  isBoldMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isItalicMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },

  isUnderlineMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.underline === true : false;
  },

  isLineThroughMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.linethrough === true : false;
  },

  isSubscriptMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.subscript === true : false;
  },

  isSuperscriptMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.superscript === true : false;
  },

  //This function, we check is editor have type "code" or not.
  //If its have, then return false, otherwise return true
  isParagraphBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "paragraph",
    });

    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  isQuoteBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "quote",
    });

    return !!match;
  },

  isOrderListActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "order-list",
    });

    return !!match;
  },

  isUnorderListActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "unorder-list",
    });

    return !!match;
  },

  isListItemActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "list-item",
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
  },

  toggleUnderlineMark(editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "underline");
    } else {
      Editor.addMark(editor, "underline", true);
    }
  },

  toggleLineThroughMark(editor) {
    const isActive = CustomEditor.isLineThroughMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "linethrough");
    } else {
      Editor.addMark(editor, "linethrough", true);
    }
  },

  toggleSuperscriptMark(editor) {
    const isActive = CustomEditor.isSuperscriptMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "superscript");
    } else {
      Editor.addMark(editor, "superscript", true);
    }
  },

  toggleSubscriptMark(editor) {
    const isActive = CustomEditor.isSubscriptMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "subscript");
    } else {
      Editor.addMark(editor, "subscript", true);
    }
  },

  //This setNode function submit specific node structure and value to element.
  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? "paragraph" : "code" },
      {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      },
    );
  },

  toggleAlignCenterBlock(editor) {
    Transforms.setNodes(
      editor,
      { align: "center" },
      {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      },
    );
  },

  toggleAlignLeftBlock(editor) {
    Transforms.setNodes(
      editor,
      { align: "left" },
      {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      },
    );
  },

  toggleAlignRightBlock(editor) {
    Transforms.setNodes(
      editor,
      { align: "right" },
      {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      },
    );
  },

  toggleAlignJustifyBlock(editor) {
    Transforms.setNodes(
      editor,
      { align: "justify" },
      {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      },
    );
  },

  toggleAlignLeftBlock(editor) {
    Transforms.setNodes(
      editor,
      { align: "left" },
      {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      },
    );
  },

  toggleQuoteBlock(editor) {
    const isActive = CustomEditor.isQuoteBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? "paragraph" : "quote" },
      {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      },
    );
  },

  toggleOrderListBlock(editor) {
    //First, loop editor on each children for <li/> tag, and return as element
    //Second, loop editor on single element for <ol/> tag
    const isOrderActive = CustomEditor.isOrderListActive(editor);
    const LIST_TYPES = ["unorder-list", "order-list"];

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        Element.isElement(n) &&
        !Editor.isEditor(n) &&
        LIST_TYPES.includes(n.type),
      split: true,
    });

    Transforms.setNodes(editor, {
      type: isOrderActive ? "paragraph" : "list-item",
    });

    if (!isOrderActive) {
      Transforms.wrapNodes(editor, {
        type: "order-list",
        children: [],
      });
    }
  },

  toggleUnorderListBlock(editor) {
    //First, loop editor on each children for <li/> tag, and return as element
    //Second, loop editor on single element for <ul/> tag
    const isUnorderActive = CustomEditor.isUnorderListActive(editor);
    const LIST_TYPES = ["order-list", "unorder-list"];

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        Element.isElement(n) &&
        !Editor.isEditor(n) &&
        LIST_TYPES.includes(n.type),
      split: true,
    });

    Transforms.setNodes(editor, {
      type: isUnorderActive ? "paragraph" : "list-item",
    });

    if (!isUnorderActive) {
      Transforms.wrapNodes(editor, {
        type: "unorder-list",
        children: [],
      });
    }
  },
};
