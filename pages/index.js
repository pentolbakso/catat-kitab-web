import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import ReactDom from "react-dom";
import Head from "next/head";
import { createEditor, Editor, Element as SlateElement, Range } from "slate";
import { Slate, Editable, withReact, useSlate, ReactEditor } from "slate-react";
import tw from "tailwind-styled-components";
import dynamic from "next/dynamic";

const ToolbarButton = tw.button`
  h-8
  px-4
  m-1
  text-sm
  text-gray-700
  transition-colors
  duration-150
  bg-gray-100
  rounded-md
  focus:outline-none
  hover:bg-gray-200
`;

const DynamicSlateEditor = dynamic(() => import("../components/slate/Editor"), {
  ssr: false,
});

const Home = () => {
  return (
    <div>
      <Head>
        <title>Catat Kitab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <h1 className="text-xl text-center my-5">Welcome to CatatKitab</h1>
        <div className="p-5 bg-gray-50 rounded-md mx-10 shadow-sm">
          <div className="flex justify-end mb-2">
            <ToolbarButton onClick={() => {}}>Keyboard</ToolbarButton>
          </div>
          <div className="text-right text-xl">
            <DynamicSlateEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
