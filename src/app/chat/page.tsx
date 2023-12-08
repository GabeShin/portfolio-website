"use client";

import { motion } from "framer-motion";

export default function ChatPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{
        opacity: [0, 1],
        translateY: [20, 0],
      }}
      transition={{ delay: 0.5 }}
    >
      <h1>Chat</h1>
    </motion.div>
  );
}
