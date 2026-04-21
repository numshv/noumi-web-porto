"use client";

import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import { SiGithub, SiInstagram, SiX } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";

const contacts = [
  { icon: <MdEmail size={18} />, label: "noumisyifa@gmail.com", href: "mailto:noumisyifa@gmail.com" },
  { icon: <SiGithub size={16} />, label: "@numshv", href: "https://github.com/numshv" },
  { icon: <SlSocialLinkedin size={16} />, label: "Noumisyifa Nareswari", href: "https://www.linkedin.com/in/noumisyifa-nareswari-708a7b3a7/" },
  { icon: <SiInstagram size={16} />, label: "@numshv", href: "https://instagram.com/numshv" },
  { icon: <SiX size={16} />, label: "@Numshv", href: "https://x.com/Numshv" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Contact() {
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
          data-text="Contact"
          style={{ fontSize: "clamp(5rem, 15vw, 14rem)", color: "#A7A29E", lineHeight: 1 }}
        >
          Contact
        </h1>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="ml-auto w-1/2 pt-48 pr-16 flex flex-col gap-4"
      >
        <motion.p
          variants={itemVariants}
          className="font-sans font-semibold text-sm tracking-wide"
        >
          Let's Get in Touch.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="font-serif text-foreground/70 leading-relaxed mb-4"
          style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)" }}
        >
          If you have any inquiries, want to work together, or even just want
          to be friends and talk about stuff, you can always reach out to me
          through any of these channels.
        </motion.p>

        {contacts.map((c) => (
          <motion.a
            key={c.href}
            variants={itemVariants}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-serif hover:text-gray1 transition-colors duration-200 w-fit"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)" }}
          >
            <span className="text-foreground">{c.icon}</span>
            {c.label}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}