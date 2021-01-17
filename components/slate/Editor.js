// @refresh reset
import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import ReactDom from "react-dom";
import Head from "next/head";
import { createEditor, Editor, Element as SlateElement, Range } from "slate";
import { Slate, Editable, withReact, useSlate, ReactEditor } from "slate-react";
import tw from "tailwind-styled-components";
import dynamic from "next/dynamic";

const HoverButton = tw.button`
  h-6
  px-2
  m-1
  text-sm
  text-gray-700
  transition-colors
  duration-150
  bg-gray-100
  rounded-md
  focus:outline-none
  hover:bg-gray-300
`;

const SlateEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(
    (props) => (
      <>
        <Element {...props} />
      </>
    ),
    []
  );
  const renderLeaf = useCallback(
    (props) => (
      <>
        <Leaf {...props} />
      </>
    ),
    []
  );
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "Selamat datang di CatatKitab. Ahlan wa sahlan." }],
    },
  ]);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <HoveringToolbar />
      <Editable
        // renderElement={renderElement}
        // renderLeaf={renderLeaf}
        placeholder=""
        autoFocus
        className="border border-gray-100 p-2"
      />
    </Slate>
  );
};

const HoveringToolbar = () => {
  const ref = useRef();
  const editor = useSlate();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) return;

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection).trim() === ""
    ) {
      // console.log("selection", selection);
      // console.log("isFocused", ReactEditor.isFocused(editor));
      // if (Range) console.log("isCollapsed", Range.isCollapsed(selection));
      // console.log("isStringEmpty", Editor.string(editor, selection).trim());
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    // el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`; // above
    el.style.top = `${rect.bottom + window.pageYOffset}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  function handleBtnClick(e, value) {
    e.preventDefault();
    setTab(value);
  }

  return (
    <Portal>
      <div
        ref={ref}
        className="absolute z-1 border rounded-md opacity-1 -top-full -left-full mt-1"
        onMouseDown_={(e) => e.preventDefault()}
      >
        <div className="bg-gray-200">
          <HoverButton onMouseDown={(e) => handleBtnClick(e, "tarjim")}>
            Tarjim
          </HoverButton>
          <HoverButton onMouseDown={(e) => handleBtnClick(e, "irab")}>
            I'rab
          </HoverButton>
          <HoverButton onMouseDown={(e) => handleBtnClick(e, "tashrif")}>
            Tashrif
          </HoverButton>
          <HoverButton onMouseDown={(e) => handleBtnClick(e, "note")}>
            Note
          </HoverButton>
        </div>
        {tab && (
          <div className="bg-white py-2 px-5">
            <input
              type="text"
              className="p-2"
              value={tab}
              onChange={() => {}}
              autoFocus
              // onMouseDown={(e) => e.preventDefault()}
            />
          </div>
        )}
      </div>
    </Portal>
  );
};

const Portal = ({ children }) => {
  if (typeof window === "undefined") return null;
  return ReactDom.createPortal(children, document.body);
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
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

  return <span {...attributes}>{children}</span>;
};

export default SlateEditor;
