"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import {QueryClient, QueryClientProvider} from "react-query";

export function Providers({ children }: { children: ReactNode }) {
  const client = new QueryClient();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={client}>
      {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
