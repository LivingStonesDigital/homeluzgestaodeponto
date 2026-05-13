import React from "react";
import { DotmCircular14 } from "./ui/dotm-circular-14";

function Loader() {
  return (
    <div className="w-full h-screen grid place-items-center">
      <DotmCircular14
        size={32}
        dotSize={4}
        speed={1.4}
        opacityBase={0.1}
        opacityMid={0.4}
        opacityPeak={0.95}
      />
    </div>
  );
}

export default Loader;
