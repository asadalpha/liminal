"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, FileUp } from "lucide-react";

// NOTE: Install before using
// npm install pdfjs-dist

export default function PdfToImagePage() {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<{ pageIndex: number; dataUrl: string }[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setLoading(true);
    setPages([]);

    // dynamic import to avoid SSR crash
    const pdfjsLib = await import("pdfjs-dist");
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });

    try {
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      const result = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport } as any).promise;
        const dataUrl = canvas.toDataURL("image/png");
        result.push({ pageIndex: i - 1, dataUrl });
      }

      setPages(result);
    } catch (err) {
      console.error(err);
      alert("Failed to read PDF. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  function handleFileSelect() {
    inputRef.current?.click();
  }

  function downloadImage(url: string, name: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-light">PDF → Image Converter</h1>
          <p className="text-sm text-white/70 mt-2">
            Convert PDFs to images locally. Private, fast, and beautifully minimal.
          </p>
        </header>

        {/* Main Card */}
        <Card className="bg-[#0b0b0b] border border-white/5 rounded-xl p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-lg font-medium">Upload & Convert</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            <div className="flex flex-wrap gap-4 items-center">
              <input
                type="file"
                ref={inputRef}
                accept="application/pdf"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />

              <Button
                onClick={handleFileSelect}
                className="bg-[#10b981] text-black hover:bg-[#12d6a4] flex items-center gap-2"
              >
                <FileUp className="w-4 h-4" /> Upload PDF
              </Button>

              <Button
                onClick={() => handleFiles(inputRef.current?.files ?? null)}
                disabled={loading}
                variant="ghost"
                className="border border-white/10 hover:bg-white/5"
              >
                Convert
              </Button>

              {loading && <p className="text-sm text-white/70">Converting PDF...</p>}
            </div>

            {/* Output Grid */}
            {pages.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {pages.map((p) => (
                  <div
                    key={p.pageIndex}
                    className="rounded-lg overflow-hidden bg-black/30 border border-white/10 p-3"
                  >
                    <img
                      src={p.dataUrl}
                      alt={`page-${p.pageIndex + 1}`}
                      className="rounded-md mb-3"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/70">
                        Page {p.pageIndex + 1}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            downloadImage(p.dataUrl, `page-${p.pageIndex + 1}.png`)
                          }
                          className="bg-[#10b981] text-black hover:bg-[#12d6a4] flex items-center gap-2"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigator.clipboard.writeText(p.dataUrl)}
                          className="border border-white/10 hover:bg-white/5"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Notes */}
        <div className="mt-8 text-sm text-white/60">
          <strong>Note:</strong> All conversions happen in your browser. No files are uploaded.
        </div>
      </div>
    </main>
  );
}
