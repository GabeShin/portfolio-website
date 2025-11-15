"use client";

import "./navbar.css";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const goToHome = () => {
    router.push("/");
  };

  if (pathname?.startsWith("/wedding")) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
    >
      <button className="my-8 mx-4">
        <h1
          onClick={goToHome}
          className="navbar-title inline-block text-transparent bg-clip-text"
        >
          I am Gabe Shin
        </h1>
      </button>
    </motion.div>
  );
}
