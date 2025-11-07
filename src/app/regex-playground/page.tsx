'use client'
import React, { JSX, useMemo, useState } from 'react'

type Flags = {
  g: boolean
  i: boolean
  m: boolean
  s: boolean
  u: boolean
  y: boolean
}

type Preset = {
  name: string
  pattern: string
  flags?: Partial<Flags>
}

type MatchInfo = {
  match: string
  index: number
  groups: string[] | null
}

export default function RegexPlayground(): JSX.Element {
  const [pattern, setPattern] = useState<string>('\\b(\\w+)\\b')
  const [flags, setFlags] = useState<Flags>({ g: true, i: false, m: false, s: false, u: false, y: false })
  const [input, setInput] = useState<string>('This is a sample sentence. Hello world! 123')
  const [error, setError] = useState<string | null>(null)

  const presets: Preset[] = [
    { name: 'Words', pattern: '\\b(\\w+)\\b', flags: { g: true } },
    { name: 'Emails', pattern: '[\\w.-]+@[\\w.-]+\\.\\w{2,}', flags: { g: true, i: true } },
    { name: 'URLs', pattern: 'https?://\\S+', flags: { g: true, i: true } },
    { name: 'Dates (YYYY-MM-DD)', pattern: '\\b\\d{4}-\\d{2}-\\d{2}\\b', flags: { g: true } },
    { name: 'Repeated chars', pattern: '(.)\\1+', flags: { g: true } }
  ]

  const flagsStr = useMemo(() => Object.entries(flags).filter(([_, v]) => v).map(([k]) => k).join(''), [flags])

  const regexp = useMemo(() => {
    try {
      setError(null)
      return new RegExp(pattern, flagsStr)
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message)
      return null
    }
  }, [pattern, flagsStr])

  const matches: MatchInfo[] = useMemo(() => {
    if (!regexp) return []
    const out: MatchInfo[] = []
    if (!flags.g) {
      const m = regexp.exec(input)
      if (m) out.push({ match: m[0], index: m.index, groups: m.slice(1) })
    } else {
      const r = new RegExp(pattern, flagsStr)
      let m: RegExpExecArray | null
      while ((m = r.exec(input)) !== null) {
        out.push({ match: m[0], index: m.index, groups: m.slice(1) })
        if (m.index === r.lastIndex) r.lastIndex++
      }
    }
    return out
  }, [regexp, input, pattern, flagsStr, flags.g])

  const highlighted = useMemo(() => {
    if (!regexp || matches.length === 0) return escapeHtml(input)
    const parts: string[] = []
    let lastIndex = 0
    for (const m of matches) {
      const before = input.slice(lastIndex, m.index)
      parts.push(escapeHtml(before))
      parts.push(`<mark style="background: rgba(255,255,255,0.15); color: white; padding: 2px 4px; border: 1px solid rgba(255,255,255,0.2);">${escapeHtml(m.match)}</mark>`)
      lastIndex = m.index + m.match.length
    }
    parts.push(escapeHtml(input.slice(lastIndex)))
    return parts.join('')
  }, [matches, input, regexp])

  function escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  function toggleFlag(k: keyof Flags): void {
    setFlags(prev => ({ ...prev, [k]: !prev[k] }))
  }

  function applyPreset(p: Preset): void {
    setPattern(p.pattern)
    if (p.flags) setFlags(prev => ({ ...prev, ...p.flags }))
  }

  async function copyPattern(): Promise<void> {
    try {
      await navigator.clipboard.writeText(`/${pattern}/${flagsStr}`)
      alert('Pattern copied to clipboard')
    } catch {
      alert('Could not copy')
    }
  }

  function clear(): void {
    setPattern('')
    setInput('')
    setFlags({ g: true, i: false, m: false, s: false, u: false, y: false })
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-5xl font-light tracking-tight mb-3">Regex Playground</h1>
              <div className="h-px w-16 bg-white/20 mb-3" />
              <p className="text-sm text-neutral-500 font-light">Test and visualize regular expressions in real time</p>
            </div>
            <div className="flex gap-3 mt-2">
              <button 
                onClick={copyPattern} 
                className="px-4 py-2 text-xs font-mono tracking-wider border border-white/10 hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300"
              >
                COPY
              </button>
              <button 
                onClick={clear} 
                className="px-4 py-2 text-xs font-mono tracking-wider border border-white/10 hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300"
              >
                CLEAR
              </button>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="space-y-8">
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-neutral-600 mb-3">PATTERN</label>
              <input 
                value={pattern} 
                onChange={e => setPattern(e.target.value)} 
                className="w-full bg-transparent border border-white/10 focus:border-white/30 p-4 text-sm font-mono outline-none transition-all duration-300" 
                placeholder="Enter regex pattern" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-widest text-neutral-600 mb-3">FLAGS</label>
              <div className="flex flex-wrap gap-6 items-center">
                {Object.keys(flags).map(k => (
                  <label key={k} className="flex items-center gap-2 text-xs cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={flags[k as keyof Flags]} 
                      onChange={() => toggleFlag(k as keyof Flags)}
                      className="w-3 h-3 bg-transparent border border-white/20 checked:bg-white/20 appearance-none cursor-pointer"
                    />
                    <span className="font-mono text-neutral-400 group-hover:text-white transition-colors duration-300">{k}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4 text-xs text-neutral-600 font-mono">
                Active: <span className="text-white/60">{flagsStr || '(none)'}</span>
              </div>
            </div>

            {error && (
              <div className="text-xs text-white/60 border border-white/10 p-3 font-mono">
                Error: {error}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-mono tracking-widest text-neutral-600 mb-3">TEST STRING</label>
              <textarea 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                rows={8} 
                className="w-full bg-transparent border border-white/10 focus:border-white/30 p-4 text-sm font-mono outline-none resize-none transition-all duration-300" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-widest text-neutral-600 mb-3">PRESETS</label>
              <div className="flex gap-2 flex-wrap">
                {presets.map(p => (
                  <button 
                    key={p.name} 
                    onClick={() => applyPreset(p)} 
                    className="px-3 py-2 text-xs font-mono border border-white/10 hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-neutral-600 mb-3">
                MATCHES ({matches.length})
              </label>
              <div className="border border-white/10 p-4 min-h-[200px] max-h-80 overflow-auto">
                {matches.length === 0 ? (
                  <div className="text-xs text-neutral-600 font-mono">No matches found</div>
                ) : (
                  <div className="space-y-4">
                    {matches.map((m, idx) => (
                      <div key={idx} className="pb-4 border-b border-white/5 last:border-0">
                        <div className="text-xs font-mono mb-2">
                          <span className="text-neutral-600">{String(idx + 1).padStart(2, '0')}</span>
                          <span className="mx-2 text-white/40">—</span>
                          <code className="text-white/80">{m.match}</code>
                          <span className="ml-3 text-neutral-600">@{m.index}</span>
                        </div>
                        {m.groups && m.groups.length > 0 && (
                          <div className="text-xs text-neutral-600 font-mono mt-2 pl-4 border-l border-white/10">
                            {m.groups.map((g, i) => (
                              <div key={i}>
                                Group {i + 1}: <code className="text-white/60">{g ?? '<null>'}</code>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-widest text-neutral-600 mb-3">VISUALIZATION</label>
              <div className="border border-white/10 p-4 min-h-[200px] bg-white/[0.01]">
                <div className="whitespace-pre-wrap text-sm font-mono text-white/70" dangerouslySetInnerHTML={{ __html: highlighted }} />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-widest text-neutral-600 mb-3">SUMMARY</label>
              <div className="text-xs font-mono space-y-2 text-neutral-600">
                <div>Pattern: <code className="text-white/60">/{pattern}/{flagsStr}</code></div>
                <div>Matches: <span className="text-white/60">{matches.length}</span></div>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-16 pt-8 border-t border-white/5 text-[10px] font-mono text-neutral-700 tracking-wider">
          USE CAPTURE GROUPS (PARENTHESES) TO INSPECT GROUPS · TOGGLE 'G' FLAG FOR GLOBAL MATCHING
        </footer>
      </div>
    </div>
  )
}