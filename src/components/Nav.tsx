"use client"
import React from 'react'
import { motion } from "framer-motion"

import type { Page } from "@/lib/types";

interface NavProps {
  curPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems : {label: String, page: Page}[] = [
  {label: "HOME", page: "home"},
  {label: "ABOUT", page: "about"},
  {label: "WORK", page: "work"},
  {label: "CONTACT", page: "contact"}
]

export default function Nav({curPage, onNavigate}: NavProps) {
  return (
    <motion.nav 
    layout 
    className='flex gap-2 items-center font-sans text-sm font-semibold tracking-widest'
    >
      {navItems.map((item, i) => (
        <>
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`transition-colors duration-200 hover:text-foreground 
              ${curPage === item.page ? "text-foreground" : "text-gray1"}`}
            >
            {item.label}
          </button>
          {i < navItems.length-1 && (
            <span key={`sep-${i}`} className='text-gray1'>/</span>
          )}
        </>
      ))}
    </motion.nav>

  )
}