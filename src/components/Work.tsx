"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoSearchOutline } from "react-icons/io5";
import workData from "@/lib/work.json";
import type { WorkItem } from "@/lib/types";

const works = workData as WorkItem[];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export default function Work() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(works.map((w) => w.category)));
    return ["All", ...unique];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return works.filter((w) => {
      const matchesCategory = activeCategory === "All" || w.category === activeCategory;
      const matchesQuery =
        q === "" ||
        w.title.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        w.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

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
        className="pt-64"
      >
        <div className="flex flex-wrap items-center justify-between gap-6 pb-10">
          <nav className="flex flex-wrap items-center gap-2 font-sans text-sm font-semibold tracking-widest">
            {categories.map((cat, i) => (
              <React.Fragment key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`transition-colors duration-200 hover:text-foreground ${
                    activeCategory === cat ? "text-foreground" : "text-gray1"
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
                {i < categories.length - 1 && <span className="text-gray1">/</span>}
              </React.Fragment>
            ))}
          </nav>

          <div className="relative w-full max-w-xs">
            <IoSearchOutline
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray1"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a project, category, or tag..."
              className="w-full rounded-full border border-gray1/40 bg-transparent py-2 pl-10 pr-4 font-serif text-sm text-foreground placeholder:text-gray1 focus:border-foreground/40 focus:outline-none transition-colors duration-200"
            />
          </div>
        </div>

        <motion.div
          layout
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.a
                key={item.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3"
              >
                <div className="aspect-square overflow-hidden bg-foreground/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-sans text-sm font-semibold tracking-wide">
                    {item.title}
                  </h3>
                  <p className="font-serif text-sm leading-relaxed text-foreground/70">
                    {item.description}
                  </p>
                  <p className="self-end font-serif text-xs text-gray1">
                    {`{${item.tags.join(", ")}}`}
                  </p>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="pt-12 font-serif text-gray1">
            No projects match your search yet.
          </p>
        )}
      </motion.div>
    </div>
  );
}