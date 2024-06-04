import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { Preview } from "@/components/mdx/preview";
import { Button } from "@/components/elements/button";
import InfiniteScrollExample from "@/components/examples/infiniteScrollExample";
import APITable from "@/components/mdx/APITable";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Preview,
  Button,
  InfiniteScrollExample,
  APITable,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
