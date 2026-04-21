"use client";

import { motion } from "framer-motion";

export default function Work() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="fixed left-8 top-24 pointer-events-none select-none"
      >
        <h1
          className="fill-title font-sans font-semibold pointer-events-auto"
          data-text="My Work"
          style={{ fontSize: "clamp(5rem, 15vw, 14rem)", color: "#A7A29E", lineHeight: 1 }}
        >
          My Work
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="pt-64 "
      >
        <p className="font-serif" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)" }}>
          Coming soon.
        </p>
      </motion.div>
    </div>
  );
}