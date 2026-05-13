"use client";

import React from "react";
import { DirectionalTransition } from "@/components/directional-transition";

function page() {
  return (
    <DirectionalTransition>
      <div>page</div>
    </DirectionalTransition>
  );
}

export default page;