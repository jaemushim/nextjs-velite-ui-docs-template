import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import {Preview} from "@/components/preview";
import {Button} from "@/components/ui/button";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Preview,
  Button,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
