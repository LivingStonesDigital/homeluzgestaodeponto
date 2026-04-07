"use client";
import React from "react";
import { Toaster } from "sonner";
import { Provider as JotaiProvider } from "jotai";

interface Props {
  children: React.ReactNode;
}

function ClientProvider({ children }: Props) {
  return (
    <>
      <JotaiProvider>
        <Toaster richColors position="top-center" />
        {children}
      </JotaiProvider>
    </>
  );
}

export default ClientProvider;
