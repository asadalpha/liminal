"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Github, Grid, BookOpen, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function FloatingNavbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  const navItems = [
    { href: "/", icon: <Home className="w-4 h-4" />, label: "Home" },
    { href: "/dashboard", icon: <Grid className="w-4 h-4" />, label: "Tools" },
    {
      href: "https://github.com/asadalpha/liminal/",
      icon: <Github className="w-4 h-4" />,
      label: "GitHub",
      external: true,
    },
    { href: "/about", icon: <BookOpen className="w-4 h-4" />, label: "About" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-4 py-2 rounded-full
                 backdrop-blur-md border border-neutral-200/40 dark:border-white/10
                 bg-white/70 dark:bg-black/30 shadow-lg transition-colors duration-500"
    >
      {navItems.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          target={item.external ? "_blank" : "_self"}
          rel={item.external ? "noopener noreferrer" : undefined}
          className="relative group p-2 rounded-full hover:bg-neutral-200/40 dark:hover:bg-white/10 transition"
        >
          {item.icon}
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500 dark:text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.label}
          </span>
        </Link>
      ))}

      {/* Theme Toggle */}
      {/* <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="p-2 rounded-full hover:bg-neutral-200/40 dark:hover:bg-white/10 transition"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-yellow-300" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700" />
        )}
      </button> */}
    </motion.nav>
  );
}
