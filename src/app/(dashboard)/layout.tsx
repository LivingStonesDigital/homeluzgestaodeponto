import { AuthGuard } from "@/components/auth-guard";
import BottomBar from "@/components/bottom-bar";
import Navbar from "@/components/navbar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

function DashboardLayout({ children }: Props) {
  return (
    <AuthGuard>
      <Navbar />
      {/* <PageTransition> */}
        {children}
      {/* </PageTransition> */}
      <BottomBar/>
    </AuthGuard>
  );
}

export default DashboardLayout;
