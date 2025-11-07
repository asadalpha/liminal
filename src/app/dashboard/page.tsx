"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import path from "path";

export default function Dashboard() {
  const router = useRouter();
  const tools = [
    { name: "Regex Tool", path: "/regex-playground" },
    { name: "PDF ↔ Image Converter", path: "/pdf-to-image" },
    { name: "Design Resources", path: "/design-resources" },
    { name: "Color Palette Generator", path: "/color-palette" },
    { name: "Gradient Maker", path: "/gradient-maker" },
    { name: "Layout Generator", path: "/layout-generator" },
    { name: "Glassmorphism", path: "/glassmorphism" },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto"
      >
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-3"
          >
            {/* <h1 className="text-6xl font-light tracking-tight text-white">
              Utilities
            </h1>
            <div className="h-px w-20 bg-white/20" />
            <p className="text-neutral-500 text-sm font-light">
              Design & Development Tools
            </p> */}
          </motion.div>
        </header>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <Card
                onClick={() => router.push(tool.path)}
                className="relative bg-transparent border border-white/5 hover:border-white/20 transition-all duration-500 rounded-none overflow-hidden group h-full"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-all duration-500" />
                <CardHeader className="p-8 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-neutral-600 tracking-widest">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-white/40 transition-all duration-500" />
                  </div>
                  <CardTitle className="text-base font-light text-white/90 group-hover:text-white transition-all duration-500 leading-tight">
                    {tool.name}
                  </CardTitle>
                </CardHeader>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-700" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
