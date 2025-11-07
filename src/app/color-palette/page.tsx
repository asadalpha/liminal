"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Copy, RefreshCw } from "lucide-react";

// 🎨 Preset palettes by theme (extended for variety)
const THEMES: Record<string, string[][]> = {
  warm: [
    ["#FF7A59", "#FFB463", "#FFD89A", "#6B2D00"],
    ["#FF6F61", "#FF9A76", "#FFC4A3", "#3B1F11"],
    ["#E85D04", "#FA8B0C", "#FFB703", "#2B2B2B"],
    ["#FF4D4D", "#FFB86B", "#FFD166", "#6A040F"],
    ["#FCA311", "#E85D04", "#F48C06", "#6B2D00"],
  ],
  cool: [
    ["#0EA5E9", "#38BDF8", "#7DD3FC", "#06283D"],
    ["#2DD4BF", "#99F6E4", "#60A5FA", "#042A2B"],
    ["#0077B6", "#00B4D8", "#90E0EF", "#001219"],
    ["#3A0CA3", "#4361EE", "#4895EF", "#03045E"],
    ["#2A9D8F", "#264653", "#8AB6D6", "#0A1931"],
  ],
  dark: [
    ["#0B0B0B", "#121212", "#1F2937", "#374151"],
    ["#0F172A", "#111827", "#0B1220", "#0D1320"],
    ["#18181B", "#27272A", "#3F3F46", "#52525B"],
    ["#0C0C0C", "#1A1A1A", "#262626", "#404040"],
  ],
  lonely: [
    ["#2B2D42", "#8D99AE", "#EDF2F4", "#EF233C"],
    ["#1F2937", "#4B5563", "#94A3B8", "#0F172A"],
    ["#0B0F19", "#173A5E", "#7BAFD4", "#E6EEF9"],
    ["#2E294E", "#541388", "#D90368", "#FFD400"],
  ],
  serene: [
    ["#E6F6F5", "#BEE9E8", "#7DD3FC", "#0F172A"],
    ["#DFF3E3", "#B8E4C7", "#8ED2A8", "#083D2B"],
    ["#F0F7FF", "#CDE7FF", "#9FD6FF", "#1B2B34"],
    ["#C6F6D5", "#81E6D9", "#4FD1C5", "#234E52"],
  ],
  vibrant: [
    ["#FF006E", "#FFBE0B", "#8E2DE2", "#0F0C29"],
    ["#FF4D6D", "#FFB86B", "#6A00F4", "#0B0812"],
    ["#FF5DA2", "#FFB86B", "#12EDC5", "#0B0F19"],
    ["#FF2E63", "#08D9D6", "#252A34", "#EAEAEA"],
  ],
  pastel: [
    ["#FDE68A", "#FBCFE8", "#BFDBFE", "#E6F4EA"],
    ["#FFE4E6", "#FCE7F3", "#E0F2FE", "#FEF9C3"],
    ["#F8F1FF", "#E9F5FF", "#FFEFF1", "#F6FFF0"],
    ["#FFD6E0", "#FAE1DD", "#E8E8E4", "#D8E2DC"],
  ],
};

// 🌀 Helper: pick random palette from selected theme
function pickPalette(theme: string) {
  const list = THEMES[theme] || THEMES.serene;
  return list[Math.floor(Math.random() * list.length)];
}

export default function ColorPalettePage() {
  const [theme, setTheme] = useState<string>("warm");
  const [palette, setPalette] = useState<string[]>(() => pickPalette("warm"));
  const [copied, setCopied] = useState<string | null>(null);

  const handleThemeChange = (value: string) => {
    setTheme(value);
    setPalette(pickPalette(value));
  };

  const handleShuffle = () => {
    setPalette(pickPalette(theme));
  };

  const handleCopy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(hex);
      setTimeout(() => setCopied(null), 1400);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-light">Color Palette Generator</h1>
          <p className="text-sm text-white/70 mt-2">
            Pick a theme to instantly generate aesthetic 4-color palettes.
          </p>
        </header>

        {/* Main Card */}
        <Card className="bg-[#0b0b0b] border border-white/5 rounded-xl overflow-hidden">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-sm font-mono text-white/60">THEME</div>

              <Select onValueChange={handleThemeChange} defaultValue={theme}>
                <SelectTrigger className="w-44 h-10 bg-transparent border border-white/10 focus:border-[#10b981] transition">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent className="bg-[#0b0b0b] border border-white/10 text-white">
                  {Object.keys(THEMES).map((key) => (
                    <SelectItem key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleShuffle}
              className="bg-[#10b981] text-black hover:bg-[#0fa86f] flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Shuffle
            </Button>
          </CardHeader>

          <CardContent className="px-6 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={palette.join('-')}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-4 gap-4"
              >
                {palette.map((hex, i) => (
                  <motion.div
                    key={hex + i}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    className="rounded-lg overflow-hidden shadow-sm relative group"
                  >
                    <div
                      className="h-36 flex items-end justify-between px-3 py-3"
                      style={{ background: hex }}
                    >
                      <span className="text-xs font-medium bg-white/30 backdrop-blur-sm px-2 py-1 rounded text-black/80">
                        {i + 1}
                      </span>
                      <button
                        onClick={() => handleCopy(hex)}
                        className="opacity-0 group-hover:opacity-100 bg-black/40 hover:bg-black/60 rounded px-2 py-1 text-xs text-white/90 transition"
                        aria-label={`Copy ${hex}`}
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-[#0b0b0b] px-3 py-3 flex justify-center items-center">
                      <div className="text-sm font-mono text-white/90">{hex}</div>
                    </div>

                    <AnimatePresence>
                      {copied === hex && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded"
                        >
                          Copied!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-sm text-white/60">
          Tip: Use palettes in your UI kits, gradients, or hero backgrounds.
          Each shuffle gives a new random variation for your chosen theme.
        </div>
      </div>
    </main>
  );
}
