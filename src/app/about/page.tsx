"use client";

import { motion } from "framer-motion";
import { BookOpen, Info, Palette, Cpu, Sparkles } from "lucide-react";

export default function DocsPage() {
  const sections = [
    {
      icon: <Info className="w-5 h-5 text-sky-500 dark:text-emerald-400" />,
      title: "Overview",
      desc: "Liminal is a curated set of minimal, elegant tools designed for creators, designers, and developers built to enhance productivity while maintaining aesthetic simplicity.",
    },
    {
      icon: <Palette className="w-5 h-5 text-sky-500 dark:text-emerald-400" />,
      title: "Design Philosophy",
      desc: "Each tool focuses on clarity, minimal UI, and seamless transitions. No clutter, just creation built around focus, flow, and beauty in motion.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-sky-500 dark:text-emerald-400" />,
      title: "Technology Stack",
      desc: "Built with Next.js, TailwindCSS, and Framer Motion. The system leverages React Server Components, shadcn UI, and the next-themes library for light/dark adaptability.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-sky-500 dark:text-emerald-400" />,
      title: "Open Source",
      desc: "Liminal is open for contribution. Explore the GitHub repository, suggest features, or create your own utilities collaboration drives innovation.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-700 px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="flex justify-center mb-6">
          <BookOpen className="w-8 h-8 text-sky-500 dark:text-emerald-400" />
        </div>

        <h1 className="text-5xl md:text-6xl font-light mb-4">Linimal Space</h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-base max-w-2xl mx-auto leading-relaxed">
          Learn about the tools, philosophy, and framework powering Liminal.
          This is your quick reference to understand, extend, and contribute to
          the ecosystem.
        </p>
      </motion.div>

      <section className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * i, duration: 0.6 }}
            className="rounded-xl border border-neutral-200/40 dark:border-white/10 bg-white/60 dark:bg-[#0b0b0b]/50 backdrop-blur-md p-6 text-left shadow-sm hover:shadow-md transition-all duration-500"
          >
            <div className="flex items-center gap-3 mb-3">
              {s.icon}
              <h3 className="text-lg font-medium">{s.title}</h3>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </section>

      <footer className="mt-20 text-center text-sm text-neutral-500 dark:text-neutral-400">
        Built with 💚 by asad, Open Source under MIT License.
      </footer>
    </main>
  );
}
