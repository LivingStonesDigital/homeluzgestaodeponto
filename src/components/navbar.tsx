import { Bell } from "lucide-react";
import React from "react";

function Navbar() {
  return (
    <header className="bg-white dark:bg-slate-950 sticky top-0 w-full z-50 shadow ">
      <div className="flex justify-between items-center px-6 h-16 w-full max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container flex items-center justify-center">
            <img
              alt="Employee Profile"
              className="w-full h-full object-cover"
              data-alt="Professional portrait of a middle-aged man with short hair in a bright office environment, smiling confidently"
              src="https://github.com/origin-space.png"
            />
          </div>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-transform duration-150 active:scale-95 text-black/50  ">
          <Bell className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
