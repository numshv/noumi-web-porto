"use client";

import React from 'react'
import { motion } from "framer-motion";
import WikiLink from './WikiLink';

const paragraphs = [
  <>
    I was born on 23rd April 2005, under the metropolitan sky of{" "}
    <WikiLink
      text="Jakarta"
      href="https://en.wikipedia.org/wiki/Jakarta"
      preview={{
        title: "Jakarta",
        description: "The former capital and largest city of Indonesia, located on the northwest coast of Java.",
      }}
    />{" "}
    , Indonesia. Currently in my 20s and in my third year pursuing my computer
    science major at{" "}
    <WikiLink
      text="Bandung Institute of Technology"
      href="https://en.wikipedia.org/wiki/Bandung_Institute_of_Technology"
      preview={{
        title: "Bandung Institute of Technology",
        description: "A public research university in Bandung, West Java, Indonesia. One of the most prestigious universities in Indonesia.",
      }}
    />
    .
  </>,
  <>
    I aspire to be a{" "}
    <WikiLink
      text="full-stack developer"
      href="https://en.wikipedia.org/wiki/Full-stack_developer"
      preview={{
        title: "Full-stack Developer",
        description: "A developer who works on both the front-end and back-end of web applications.",
      }}
    />{" "}
    , a really cool one to be precise. Currently, in my journey to gather all
    the necessary knowledge to become one, especially focusing on the system
    software engineering knowledge area. Somehow, for me, it just feels so fun
    to figure out how to make sure a whole software system is secure, robust,
    and fast, holistically.
  </>,
  <>
    As you can see, I am actually also really interested in designing software
    applications (like UI and UX wise). But, as much as I love designing stuff
    like this, learning the technicalities behind what humans interact with is
    more interesting to learn to. But I don't mind working as a web designer
    tho :)
  </>,
  <>
    I really like to TMI-ing! I'm a firstborn daughter from a humble family
    with 2 other younger siblings. I am an{" "}
    <WikiLink
      text="INFP"
      href="https://en.wikipedia.org/wiki/INFP"
      preview={{
        title: "INFP",
        description: "One of the 16 Myers–Briggs personality types, known as the 'Mediator'. INFPs are idealistic, empathetic, and deeply creative.",
      }}
    />{" "}
    and like to read tons of manhwa and manga. My favorite one would be{" "}
    <WikiLink
      text="Aku no Hana"
      href="https://en.wikipedia.org/wiki/The_Flowers_of_Evil_(manga)"
      preview={{
        title: "Aku no Hana",
        description: "A psychological manga by Shuzo Oshimi about guilt, alienation, and moral transgression in a small Japanese town.",
      }}
    />{" "}
    and{" "}
    <WikiLink
      text="A Stepmother's Marchen"
      href="https://otome-isekai.fandom.com/wiki/A_Stepmother%27s_M%C3%A4rchen"
      preview={{
        title: "A Stepmother's Märchen",
        description: "A Korean webtoon about a villainess reincarnated as a stepmother who tries to survive her tragic fate.",
      }}
    />
    . Other than that, I also like to read essays, especially those that{" "}
    <WikiLink
      text="Aeon"
      href="https://aeon.co"
      preview={{
        title: "Aeon",
        description: "A digital magazine of ideas publishing essays on philosophy, science, society, and the human condition.",
      }}
    />{" "}
    publishes.
  </>,
];


const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2
        },
    },
};

const paragraphVariants = {
    hidden: {opacity: 0, y: 16},
    show: {opacity: 1, y: 0, transition: {duration:0.5, ease: "easeOut" as const}}
};

export default function About() {
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
          data-text="About Me"
          style={{ fontSize: "clamp(5rem, 15vw, 14rem)", color: "#A7A29E", lineHeight: 1 }}
        >
          About Me
        </h1>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative ml-auto w-1/2 pt-48 pr-16 pb-32 flex flex-col gap-6"
      >
        {paragraphs.map((text, i) => (
          <motion.p
            key={i}
            variants={paragraphVariants}
            className="font-serif leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)" }}
          >
            {text}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}