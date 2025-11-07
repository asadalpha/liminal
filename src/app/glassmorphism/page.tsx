"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Shuffle } from "lucide-react";

export default function GlassNeumorphismGenerator() {
  const [mode, setMode] = useState("glass");
  const [bgColor, setBgColor] = useState("#0b0b0b");
  const [accent, setAccent] = useState("#10b981");
  const [radius, setRadius] = useState(18);
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(0.12);
  const [borderSize, setBorderSize] = useState(1);
  const [shadowSize, setShadowSize] = useState(18);
  const [inset, setInset] = useState(false);

  function cssForGlass() {
    return `background: linear-gradient(135deg, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,${Math.max(
      0.02,
      opacity - 0.04
    )}) 100%);
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: ${borderSize}px solid rgba(255,255,255,${Math.min(
      0.22,
      opacity + 0.08
    )});
box-shadow: 0 ${Math.max(4, shadowSize / 6)}px ${Math.max(
      8,
      shadowSize
    )}px rgba(0,0,0,0.6);
border-radius: ${radius}px;`;
  }

  function cssForNeumorph() {
    const distance = Math.max(6, Math.round(shadowSize / 2));
    return `background: ${bgColor};
border-radius: ${radius}px;
box-shadow: ${
      inset ? "inset" : ""
    } ${distance}px ${distance}px ${shadowSize}px rgba(0,0,0,0.3), ${
      inset ? "inset" : ""
    } -${distance}px -${distance}px ${Math.round(
      shadowSize / 2
    )}px rgba(255,255,255,${Math.min(0.9, opacity)});`;
  }

  const css = mode === "glass" ? cssForGlass() : cssForNeumorph();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-light">
            Glassmorphism / Neumorphism Generator
          </h1>
          <p className="text-sm text-white/70 mt-2">
            Generate soft UI styles with frosted glass or subtle depth, matching
            your dashboard theme.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <Card className="bg-[#0b0b0b] border border-white/5 rounded-xl p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg font-medium">Controls</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-5">
              <div className="flex gap-4">
                <Button
                  className={`flex-1 ${
                    mode === "glass"
                      ? "bg-[#10b981] text-black"
                      : "bg-transparent border border-white/10"
                  }`}
                  onClick={() => setMode("glass")}
                >
                  Glass
                </Button>
                <Button
                  className={`flex-1 ${
                    mode === "neumorph"
                      ? "bg-[#10b981] text-black"
                      : "bg-transparent border border-white/10"
                  }`}
                  onClick={() => setMode("neumorph")}
                >
                  Neumorph
                </Button>
              </div>

              <div>
                <label className="block text-xs text-white/70 mb-2">
                  Border Radius:{" "}
                  <span className="text-white/90">{radius}px</span>
                </label>
                <input
                  type="range"
                  min={4}
                  max={56}
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full accent-[#10b981]"
                />
              </div>

              <div>
                <label className="block text-xs text-white/70 mb-2">
                  Shadow Size:{" "}
                  <span className="text-white/90">{shadowSize}px</span>
                </label>
                <input
                  type="range"
                  min={4}
                  max={56}
                  value={shadowSize}
                  onChange={(e) => setShadowSize(Number(e.target.value))}
                  className="w-full accent-[#10b981]"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70">Inset Shadow</span>
                <input
                  type="checkbox"
                  checked={inset}
                  onChange={(e) => setInset(e.target.checked)}
                  className="accent-[#10b981]"
                />
              </div>

              <div className="pt-4 border-t border-white/10 mt-4 flex flex-wrap gap-3 items-center">
                <Button
                  onClick={() =>
                    setMode(mode === "glass" ? "neumorph" : "glass")
                  }
                  className="bg-[#10b981] text-black"
                >
                  Toggle Mode
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setBlur(12)}
                  className="border border-white/10 hover:bg-white/5"
                >
                  <RefreshCw className="mr-2 w-4 h-4" /> Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <div className="lg:col-span-1">
            <Card className="bg-transparent border border-white/5 rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="h-60 w-full rounded-xl flex items-center justify-center text-white"
                  style={{ cssText: css } as any}
                >
                  <div className="text-sm opacity-90">
                    {mode === "glass" ? "Glassmorphism" : "Neumorphism"}
                  </div>
                </motion.div>
                <div className="px-4 py-3 bg-[#0b0b0b] border-t border-white/5">
                  <div className="text-sm text-white/90">Preview</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CSS Output */}
          <div className="lg:col-span-1">
            <Card className="bg-[#0b0b0b] border border-white/5 rounded-xl p-6">
              <CardHeader className="p-0 mb-3">
                <CardTitle className="text-lg font-medium">
                  Generated CSS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <pre className="bg-black/40 p-3 rounded text-xs font-mono text-[#10b981] overflow-auto">
                  {css}
                </pre>
                <Button
                  onClick={() => navigator.clipboard.writeText(css)}
                  className="bg-[#10b981] text-black"
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy CSS
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
