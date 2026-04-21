"use client"

import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import { useState } from "react";
import type { Page } from "@/lib/types";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {

  const[currentPage, setCurrentPage] = useState<Page>("home");
  const isHome = currentPage === "home";

  const handleNavigate = (page: Page) => {
    window.scrollTo({ top: 0 });
    setCurrentPage(page);
  };

  return (
    <main>
      <motion.div
        layout
        transition={{duration: 0.6, ease: [0.25, 0.1, 0.25, 1]}}
        className={
          `z-100 ${
            isHome ?
            "absolute inset-0 flex items-center justify-center"
            : "fixed top-6 left-8"
          }`
        }
      >
        <motion.div
          layout
          className="flex flex-col items-center gap-4"
        >
          {isHome && (
            <motion.div
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y:0}}
              exit={{opacity:0, y:-10}}
              transition={{duration:0.4}}
              className="text-center"
            >
              <h1 className="font-sans font-semibold text-3xl tracking-widest mb-4">
                NOUMISYIFA N. NARESWARI
              </h1>
              <p className="text-center max-w-md leading-relaxed mb-8">
                That girl who aspired to be a full-stack developer, bridging the gap between 
                human interaction and the digital world. I focus on building web 
                experiences that are as intentional as they are functional.
              </p>
            </motion.div>
          )}

          <Nav curPage={currentPage} onNavigate={handleNavigate} />

        </motion.div>

      </motion.div>
      <div className="pt-24 px-8">
        {currentPage === "about" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <About/>
          </motion.div>
        )}
        {currentPage === "work" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* work content here */}
          </motion.div>
        )}
        {currentPage === "contact" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Contact/>
          </motion.div>
        )}
      </div>
    </main>
  );
}
