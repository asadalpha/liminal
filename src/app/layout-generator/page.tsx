'use client';

import { SetStateAction, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

// AI Layout Generator component (dark theme, #10b981 accent)
export default function LayoutGenerator() {
  const [input, setInput] = useState('2-column dashboard with sidebar and stats');
  const [loading, setLoading] = useState(false);
  const [layoutJSON, setLayoutJSON] = useState<any>(null);

  async function generateLayout() {
    setLoading(true);

    // Simulate AI response for layout (mock example)
    setTimeout(() => {
      const exampleLayout = {
        type: 'dashboard',
        layout: [
          { type: 'sidebar', width: '20%', background: '#0b0b0b', items: ['Home', 'Analytics', 'Settings'] },
          {
            type: 'main',
            width: '80%',
            children: [
              { type: 'header', height: '60px', content: 'Dashboard Overview' },
              { type: 'stats-grid', columns: 3, cards: ['Revenue', 'Users', 'Engagement'] },
              { type: 'chart', style: 'line', color: '#10b981' },
            ],
          },
        ],
      };
      setLayoutJSON(exampleLayout);
      setLoading(false);
    }, 1600);
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-light">AI Layout Generator</h1>
          <p className="text-sm text-white/70 mt-2">
            Describe a layout idea AI will visualize a responsive structure. Minimal, dark and elegant.
          </p>
        </header>

        <Card className="bg-[#0b0b0b] border border-white/5 rounded-xl overflow-hidden mb-8">
          <CardHeader className="p-6">
            <CardTitle className="text-lg font-medium text-white/90">Describe Layout</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Textarea
              value={input}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setInput(e.target.value)}
              placeholder="Example: 3-column dashboard with sidebar and user profile section"
              className="bg-transparent border border-white/10 text-white/80 text-sm min-h-[120px]"
            />

            <Button
              onClick={generateLayout}
              disabled={loading}
              className="bg-[#10b981] text-black hover:bg-[#0fa86f] flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : null}
              {loading ? 'Generating...' : 'Generate Layout'}
            </Button>
          </CardContent>
        </Card>

        {layoutJSON && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#0b0b0b] border border-white/5 rounded-xl p-6"
          >
            <h2 className="text-lg font-medium mb-4 text-[#10b981]">Generated Layout Structure</h2>
            <pre className="bg-black/50 p-4 rounded text-xs font-mono text-[#10b981] overflow-auto whitespace-pre-wrap">
              {JSON.stringify(layoutJSON, null, 2)}
            </pre>

            <div className="mt-6">
              <h3 className="text-sm text-white/70 mb-3">Preview (Wireframe)</h3>
              <div className="flex border border-white/10 rounded-lg overflow-hidden h-[300px]">
                {/* Sidebar */}
                <div className="w-1/5 bg-white/5 flex flex-col justify-center items-center gap-2 border-r border-white/10">
                  {layoutJSON.layout[0].items.map((item: string, i: number) => (
                    <div
                      key={i}
                      className="text-white/60 text-xs hover:text-white/90 transition-colors"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main Section */}
                <div className="flex-1 p-4 space-y-3">
                  <div className="bg-white/5 h-10 w-1/2 rounded"></div>
                  <div className="grid grid-cols-3 gap-3">
                    {layoutJSON.layout[1].children[1].cards.map((card: string, i: number) => (
                      <div key={i} className="bg-white/5 h-20 rounded flex items-center justify-center text-xs text-white/70">
                        {card}
                      </div>
                    ))}
                  </div>
                  <div className="bg-gradient-to-r from-[#10b981]/40 to-transparent h-24 rounded"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}