"use client";

import GridComponent from "@/components/grid/GridLayout";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{
        opacity: [0, 1],
        translateY: [40, 0],
      }}
      transition={{ delay: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <GridComponent />
    </motion.div>
  );
}
