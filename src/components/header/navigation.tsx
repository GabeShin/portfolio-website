import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NavigationBar() {
  const pathname = usePathname();

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

  const [activeNav, setActiveNav] = useState("");

  useEffect(() => {
    setActiveNav(
      routes.find((route) => route.path === pathname)?.name || "Posts"
    );
  }, [pathname, routes]);

  return (
    <div className="flex justify-start space-x-4 pl-4">
      {routes.map((route) => (
        <Link
          key={route.name}
          href={route.path}
          className={`py-1 px-4 font-medium font-sans text-sm ${
            activeNav === route.name
              ? "text-black border-b-4 border-green-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveNav(route.name)}
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
}
