import { cn } from "@/lib/utils";
import {HTMLAttributes, ReactNode} from "react";
import {HtmlProps} from "next/dist/shared/lib/html-context.shared-runtime";

interface Preview extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

export function Preview({ children,className, ...props }: Preview) {
    return (
        <div
            style={{
                backgroundImage:
                    "repeating-linear-gradient(45deg, oklch(1 0 0), oklch(1 0 0) 13px, oklch(0.961151 0 0) 13px, oklch(0.961151 0 0) 14px)",
                backgroundSize: "40px 40px",
                borderRadius: "8px",
                border: "1px solid oklch(0.924169 0.00108 197.138)",
            }}
            className={cn(`p-5 preview`, className)}
            {...props}
        >
            <div>{children}</div>
        </div>
    );
}
