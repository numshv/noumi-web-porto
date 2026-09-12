"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { ImageOff } from "lucide-react";
import { IoSearchOutline } from "react-icons/io5";
import workData from "@/lib/work.json";
import type { WorkItem } from "@/lib/types";

const works = workData as WorkItem[];

const START_TOP = 96; 
const START_LEFT = 32; 
const START_COLOR = "#A7A29E";

const DOCKED_SIZE = 32;
const DOCKED_GAP = 20; 
const ROW_STICKY_TOP = 150; 
const DOCKED_COLOR = "#1B1A19";

const ELEMENT_DURATION = 0.45;
const NAV_TO_SEARCH_GAP = 0.02;

const NAV_DELAY = ELEMENT_DURATION;
const SEARCH_DELAY = NAV_DELAY + NAV_TO_SEARCH_GAP;
const SEARCH_END = SEARCH_DELAY + ELEMENT_DURATION; // when search bar is fully settled
const INITIAL_GRID_DELAY = SEARCH_END + NAV_TO_SEARCH_GAP; // first card's delay, first load only
const CARD_STAGGER = 0.15;

const navVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: ELEMENT_DURATION, ease: "easeOut" as const, delay: NAV_DELAY },
  },
};

const searchVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: ELEMENT_DURATION, ease: "easeOut" as const, delay: SEARCH_DELAY },
  },
};

function WorkImage({ src, alt }: { src: string | null; alt: string }) {
  const [failed, setFailed] = useState(!src);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ImageOff size={64} strokeWidth={2} color="#8F8C89" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

export default function Work() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  // flips to true once the very first intro sequence (title -> nav ->
  // search -> initial card cascade) has fully played out. Before that,
  // cards wait for INITIAL_GRID_DELAY; after that, filtering/search
  // interactions bring cards in immediately with just a small stagger.
  const [initialSequenceDone, setInitialSequenceDone] = useState(false);

  useEffect(() => {
    const totalIntro = INITIAL_GRID_DELAY + works.length * CARD_STAGGER;
    const t = setTimeout(() => setInitialSequenceDone(true), totalIntro * 1000);
    return () => clearTimeout(t);
  }, []);

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16 },
      show: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: ELEMENT_DURATION,
          ease: "easeOut" as const,
          delay: initialSequenceDone ? index * CARD_STAGGER : INITIAL_GRID_DELAY + index * CARD_STAGGER,
        },
      }),
      exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
    }),
    [initialSequenceDone]
  );

  const titleRef = useRef<HTMLHeadingElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const [startSize, setStartSize] = useState(160);
  const [dockedLeft, setDockedLeft] = useState(START_LEFT);
  const [rowStartTop, setRowStartTop] = useState(400);
  const [collapseRange, setCollapseRange] = useState(1);
  const [headerHeight, setHeaderHeight] = useState(0);

  // measure the title's real rendered size and the row's real document
  // position, so every calculation below is based on actual layout, not
  // guessed numbers
  useLayoutEffect(() => {
    const measure = () => {
      if (!titleRef.current || !rowRef.current) return;

      const computedSize = parseFloat(window.getComputedStyle(titleRef.current).fontSize);
      if (computedSize) setStartSize(computedSize);

      const rowRect = rowRef.current.getBoundingClientRect();
      setDockedLeft(rowRect.left);

      const rowDocTop = rowRect.top + window.scrollY;
      setRowStartTop(rowDocTop);
      setCollapseRange(Math.max(rowDocTop - ROW_STICKY_TOP, 40));
      setHeaderHeight(ROW_STICKY_TOP + rowRect.height + 16);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, collapseRange], [0, 1], { clamp: true });

  // one-time fade-in on load (unchanged from before), multiplied with the
  // scroll-driven fade so the very first frame looks identical to before
  const mountProgress = useMotionValue(0);
  useEffect(() => {
    const controls = animate(mountProgress, 1, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [mountProgress]);

  const titleOpacity = useTransform([mountProgress, progress], (values) => {
    const [m, p] = values as number[];
    return m * (0.3 + p * 0.7);
  });

  // backdrop only appears as you scroll — stays fully invisible at rest,
  // exactly like before
  const backdropOpacity = progress;

  const titleFontSizeValue = useTransform(
    progress,
    (p) => startSize + (DOCKED_SIZE - startSize) * p
  );

  // the title moves on its own path from its original spot towards the
  // docked spot, but is never allowed to sit lower than "gap above the
  // filter row's current (still-moving) top" — so instead of the two
  // drifting out of sync mid-scroll, the title lands on the row exactly
  // when the row reaches it, and rides along with it from then on
  const titleTopValue = useTransform(progress, (p) => {
    const fontSize = startSize + (DOCKED_SIZE - startSize) * p;
    const rowLiveTop = rowStartTop - p * collapseRange;
    const rowAnchoredTop = rowLiveTop - DOCKED_GAP - fontSize;

    const finalDockedTop = ROW_STICKY_TOP - DOCKED_GAP - DOCKED_SIZE;
    const naturalTop = START_TOP + (finalDockedTop - START_TOP) * p;

    return Math.min(naturalTop, rowAnchoredTop);
  });

  const titleLeftValue = useTransform(
    progress,
    (p) => START_LEFT + (dockedLeft - START_LEFT) * p
  );
  const titleColor = useTransform(progress, [0, 1], [START_COLOR, DOCKED_COLOR]);

  const titleTop = useMotionTemplate`${titleTopValue}px`;
  const titleLeft = useMotionTemplate`${titleLeftValue}px`;
  const titleFontSize = useMotionTemplate`${titleFontSizeValue}px`;

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
      {/* solid backdrop behind the title + filter/search row, fades in as you scroll */}
      <motion.div
        style={{ opacity: backdropOpacity, height: headerHeight }}
        className="pointer-events-none fixed inset-x-0 top-0 z-30 bg-background"
      />

      <motion.div
        style={{ top: titleTop, left: titleLeft, opacity: titleOpacity }}
        className="pointer-events-none fixed z-50 select-none"
      >
        <motion.h1
          ref={titleRef}
          className="fill-title font-sans font-semibold pointer-events-auto"
          data-text="My Work"
          style={{ fontSize: titleFontSize, color: titleColor, lineHeight: 1 }}
        >
          My Work
        </motion.h1>
      </motion.div>

      <div className="pt-64">
        <div
          ref={rowRef}
          style={{ top: ROW_STICKY_TOP }}
          className="sticky z-40 flex flex-wrap items-center justify-between gap-6 bg-background pb-2"
        >
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-2 font-sans text-sm font-semibold tracking-widest"
          >
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
          </motion.nav>

          <motion.div
            variants={searchVariants}
            initial="hidden"
            animate="show"
            className="relative w-full max-w-xs"
          >
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
          </motion.div>
        </div>

        <motion.div
          layout
          className="relative z-10 grid grid-cols-1 gap-x-8 gap-y-12 pt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.a
                key={item.id}
                layout
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3"
              >
                <div className="aspect-[4/3] overflow-hidden bg-foreground/5">
                  <WorkImage src={item.image} alt={item.title} />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-sans font-semibold tracking-wide uppercase">
                    {item.title}
                  </h3>
                  <p className="font-serif text leading-relaxed text-justify mb-2">
                    {item.description}
                  </p>
                  <p className="self-end font-serif text-sm">
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
      </div>
    </div>
  );
}