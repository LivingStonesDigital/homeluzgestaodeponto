import { AuthGuard } from "@/components/auth-guard";
import BottomBar from "@/components/bottom-bar";
import { ThemeProvider } from "@/providers/theme-provider";
import React from "react";

interface Props {
  children: React.ReactNode;
}

function DashboardLayout({ children }: Props) {
  return (
    <AuthGuard>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <BottomBar style={{ viewTransitionName: "bottom-bar" }} />
      </ThemeProvider>
    </AuthGuard>
  );
}

export default DashboardLayout;
