'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function DesignResources() {
  const resources = [
    { name: 'Figma Community', link: 'https://www.figma.com/community', description: 'Free Figma templates, UI kits, and design systems shared by creators.' },
    { name: 'Fontshare', link: 'https://www.fontshare.com', description: 'Free, high-quality fonts for modern web and graphic design.' },
    { name: 'Pexels', link: 'https://www.pexels.com', description: 'Free stock photos and videos from creators around the world.' },
    { name: 'Unsplash', link: 'https://unsplash.com', description: 'Beautiful, royalty-free images for creative projects.' },
    { name: 'Shadcn UI', link: 'https://ui.shadcn.com', description: 'Accessible, beautiful UI components built with Tailwind and Radix.' },
    { name: 'Google Fonts', link: 'https://fonts.google.com', description: 'A massive library of open-source fonts curated by Google.' },
    { name: 'Open Doodles', link: 'https://www.opendoodles.com', description: 'Free sketchy illustrations for personal and commercial use.' },
    { name: 'UI Gradients', link: 'https://uigradients.com', description: 'Curated collection of smooth gradients for modern design.' },
    { name: 'Coolors', link: 'https://coolors.co', description: 'Fast color palette generator to explore and export themes.' },
    { name: 'LottieFiles', link: 'https://lottiefiles.com', description: 'Free animations and JSON motion assets for UI design.' },
    { name: 'Heroicons', link: 'https://heroicons.com', description: 'Beautiful, open-source SVG icons for your projects.' },
    { name: 'Feather Icons', link: 'https://feathericons.com', description: 'Clean and minimal vector icons for web and apps.' },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      {/* === HEADER === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto mb-16 text-center"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="h-px bg-[#10b981]/50 mb-6"
        />
        <h1 className="text-5xl font-light mb-3 tracking-tight">Design Resources</h1>
        <p className="text-neutral-500 text-sm font-light">
          A curated list of free design assets, icons, fonts, and inspiration.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-4 text-xs text-[#10b981] tracking-widest uppercase font-mono"
        >
          curated for creators ✦
        </motion.div>
      </motion.div>

      {/* === RESOURCE LIST === */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.06 } },
        }}
        className="max-w-3xl mx-auto space-y-8"
      >
        {resources.map((r, i) => (
          <motion.div
            key={r.name}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ x: 6 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={r.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-b border-white/5 pb-5 hover:border-[#10b981]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-light text-white/90 group-hover:text-[#10b981] transition-colors flex items-center gap-2">
                  <span className="font-mono text-sm text-[#10b981]/70">{String(i + 1).padStart(2, '0')}.</span>
                  {r.name}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#10b981] transition-all" />
                </h2>
              </div>
              <p className="text-sm text-white/50 mt-2 max-w-2xl leading-relaxed">
                {r.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* === FOOTER === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-24 text-center"
      >
        <p className="text-[10px] font-mono text-neutral-700 tracking-widest">
          SCROLL TO EXPLORE
        </p>
      </motion.div>
    </main>
  );
}
