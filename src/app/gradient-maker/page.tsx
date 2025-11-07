"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";

export default function GradientMakerPage() {
  const presets = [
    { name: "Sunset", colors: ["#ff7a59", "#ffb463"] },
    { name: "Ocean", colors: ["#0ea5e9", "#7dd3fc"] },
    { name: "Violet", colors: ["#8e2de2", "#ff6a88"] },
    { name: "Emerald", colors: ["#10b981", "#065f46"] },
    { name: "Fire", colors: ["#ff4d4d", "#ffb86b"] },
    { name: "Night Sky", colors: ["#0b1220", "#0f172a"] },
  ];

  const [angle, setAngle] = useState(135);
  const [colors, setColors] = useState<string[]>(["#10b981", "#0b1220"]);
  const [copied, setCopied] = useState<string | null>(null);

  function handleColorChange(index: number, value: string) {
    const c = [...colors];
    c[index] = value;
    setColors(c);
  }

  function applyPreset(presetColors: string[]) {
    setColors(presetColors.slice(0, 3));
  }

  function randomHex() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  }

  function randomize() {
    setColors([randomHex(), randomHex(), randomHex()]);
  }

  const cssGradient = `linear-gradient(${angle}deg, ${colors
    .filter(Boolean)
    .join(", ")})`;

  async function copyCSS() {
    try {
      await navigator.clipboard.writeText(`background: ${cssGradient};`);
      setCopied("css");
      setTimeout(() => setCopied(null), 1300);
    } catch {
      setCopied("css");
      setTimeout(() => setCopied(null), 1300);
    }
  }

  async function copyHexs() {
    try {
      await navigator.clipboard.writeText(colors.join(", "));
      setCopied("hex");
      setTimeout(() => setCopied(null), 1300);
    } catch {
      setCopied("hex");
      setTimeout(() => setCopied(null), 1300);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-light">Gradient Maker</h1>
          <p className="text-sm text-white/70 mt-2">
            Create subtle gradients, preview live, and copy CSS. Minimal, dark and polished.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Controls */}
          <Card className="bg-[#0b0b0b] border border-white/5 rounded-xl p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg font-medium">Controls</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-5">
              {/* Angle */}
              <div>
                <label className="block text-xs text-white/70 mb-2">
                  Angle: <span className="text-white/90">{angle}°</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full accent-[#10b981]"
                />
              </div>

              {/* Colors */}
              <div>
                <label className="block text-xs text-white/70 mb-2">Colors</label>
                <div className="flex flex-wrap gap-3">
                  {colors.map((c, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-2"
                    >
                      <input
                        aria-label={`color-${i}`}
                        type="color"
                        value={c}
                        onChange={(e) => handleColorChange(i, e.target.value)}
                        className="w-12 h-8 p-0 border-0 bg-transparent rounded cursor-pointer"
                      />
                      <input
                        value={c}
                        onChange={(e) => handleColorChange(i, e.target.value)}
                        className="bg-transparent border border-white/10 text-sm rounded px-2 py-1 w-32 focus:border-[#10b981] transition"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setColors([colors[0], colors[1], "#ffffff"])}
                  className="bg-[#10b981] text-black hover:bg-[#12d6a4]"
                >
                  Add White
                </Button>
                <Button
                  variant="ghost"
                  onClick={randomize}
                  className="border border-white/10 hover:bg-white/5"
                >
                  <RefreshCw className="mr-2 w-4 h-4" /> Random
                </Button>
              </div>

              {/* Presets */}
              <div className="pt-2">
                <div className="text-xs text-white/70 mb-2">Presets</div>
                <div className="flex flex-wrap gap-2">
                  {presets.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => applyPreset(p.colors)}
                      className="text-sm px-3 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 transition"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Copy */}
              <div className="pt-4 border-t border-white/10 mt-4 flex flex-wrap gap-3 items-center">
                <Button
                  onClick={copyCSS}
                  className="bg-[#10b981] text-black flex items-center gap-2 hover:bg-[#12d6a4]"
                >
                  <Copy className="w-4 h-4" /> Copy CSS
                </Button>
                <Button
                  variant="ghost"
                  onClick={copyHexs}
                  className="border border-white/10 hover:bg-white/5"
                >
                  Copy Hexes
                </Button>
                {copied && (
                  <div className="text-sm text-[#10b981] font-medium">Copied!</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Middle: Preview */}
          <div className="lg:col-span-1">
            <Card className="bg-transparent border border-white/5 rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="h-60 w-full rounded-xl"
                  style={{ background: cssGradient }}
                />
                <div className="px-4 py-3 bg-[#0b0b0b] border-t border-white/5">
                  <div className="text-sm text-white/90">Preview</div>
                  <div className="text-xs text-white/60 mt-2 break-all">
                    {cssGradient}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {colors.map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div
                    style={{ background: c }}
                    className="w-full h-12 rounded-md border border-white/6"
                  />
                  <div className="text-xs text-white/80 font-mono">{c}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Usage */}
          <div className="lg:col-span-1">
            <Card className="bg-[#0b0b0b] border border-white/5 rounded-xl p-6">
              <CardHeader className="p-0 mb-3">
                <CardTitle className="text-lg font-medium">Usage</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <div className="text-sm text-white/70">CSS</div>
                <pre className="bg-black/40 p-3 rounded text-xs font-mono text-[#10b981] overflow-auto">
                  background: {cssGradient};
                </pre>

                <div className="text-sm text-white/70">SCSS</div>
                <pre className="bg-black/40 p-3 rounded text-xs font-mono text-[#10b981] overflow-auto">
                  background: {cssGradient};
                </pre>

                <div className="pt-2 text-sm text-white/70">Notes</div>
                <p className="text-xs text-white/60">
                  Use this gradient as a hero background, card accent, or subtle overlay. Adjust the angle for a different flow.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 text-sm text-white/60">
          Tip: Copy the CSS and paste directly into your stylesheet. Use
          <code className="mx-1 text-white/80">background: linear-gradient(...)</code>
          anywhere a background is accepted.
        </div>
      </div>
    </main>
  );
}
