import Link from "next/link";
import React, { useState } from "react";

export default function NavigationBar() {
  const [activeNav, setActiveNav] = useState("Posts");

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
  };

  const routes = [
    {
      name: "Posts",
      path: "/posts",
    },
    {
      name: "Chat",
      path: "/chat",
    },
    {
      name: "About Me",
      path: "/about",
    },
  ];
  return (
    <>
      <div className="flex justify-start space-x-4 pl-4">
        {routes.map((route) => (
          <Link
            key={route.name}
            href={route.path}
            className={`py-1 px-4  font-medium font-sans text-sm ${
              activeNav === route.name
                ? "text-black border-b-4 border-green-500 "
                : "text-gray-500"
            }`}
            onClick={() => handleNavClick(route.name)}
          >
            {route.name}
          </Link>
        ))}
      </div>
    </>
  );
}
