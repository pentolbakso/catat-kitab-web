// @refresh reset
import Head from "next/head";
import { useState, useMemo, useCallback } from "react";
import { createEditor, Element as SlateElement } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const Home = () => {
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
      children: [{ text: "" }],
    },
  ]);

  return (
    <div>
      <Head>
        <title>Catat Kitab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <h1 className="text-xl text-center my-5">Welcome to CatatKitab</h1>
        <div className="p-5 bg-gray-50 rounded-md mx-10 shadow-sm">
          <div className="text-right text-xl">
            <Slate
              editor={editor}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            >
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder=""
                autoFocus
                spellCheck
                className="border border-gray-100 p-2"
              />
            </Slate>
          </div>
        </div>
      </div>
    </div>
  );
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

export default Home;
