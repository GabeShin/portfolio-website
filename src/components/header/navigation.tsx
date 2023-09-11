import React, { useState } from "react";

export default function NavigationBar() {
  const [activeNav, setActiveNav] = useState("Posts");

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
  };

  return (
    <>
      <div className="flex justify-start space-x-4 pl-4">
        {["Posts", "Chat", "About Me"].map((navItem) => (
          <button
            key={navItem}
            className={`py-1 px-4  font-medium font-sans text-sm ${
              activeNav === navItem
                ? "text-black border-b-4 border-green-500 "
                : "text-gray-500"
            }`}
            onClick={() => handleNavClick(navItem)}
          >
            {navItem}
          </button>
        ))}
      </div>
    </>
  );
}
