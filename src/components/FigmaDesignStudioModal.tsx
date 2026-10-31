import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  Copy,
  Check,
  Sparkles,
  Layers,
  Workflow,
  Play,
  FileCode2,
  Palette,
  Sliders,
  ArrowRight,
} from 'lucide-react';
import {
  FIGMA_SECTION_SPECS,
  FIGMA_PROTOTYPE_INTERACTIONS,
  FigmaSectionLayerSpec,
  FigmaPrototypeInteraction,
  generateFigmaMasterSvg,
  generateFigmaDocumentJson,
  generateFigmaVariablesJson,
  generateFigmaConsolePluginScript,
} from '../utils/figmaExportGenerator';

interface FigmaDesignStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FigmaDesignStudioModal({
  isOpen,
  onClose,
}: FigmaDesignStudioModalProps) {
  const [activeTab, setActiveTab] = useState<'canvas' | 'interactions' | 'export'>('canvas');
  const [selectedFrame, setSelectedFrame] = useState<FigmaSectionLayerSpec>(
    FIGMA_SECTION_SPECS[0]
  );
  const [selectedInteraction, setSelectedInteraction] = useState<FigmaPrototypeInteraction>(
    FIGMA_PROTOTYPE_INTERACTIONS[2]
  );
  const [showPrototypeNoodles, setShowPrototypeNoodles] = useState<boolean>(true);
  const [livePreviewTrigger, setLivePreviewTrigger] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadedNotice, setDownloadedNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerDownload = (content: string, filename: string, mimeType: string, label: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadedNotice(`Downloaded ${label} (${filename})`);
    window.setTimeout(() => setDownloadedNotice(null), 4000);
  };

  const handleCopyText = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Figma Design File & Smart-Animate Prototype Studio"
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1E1E1E] text-white border border-white/15 rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Top Figma-Style Toolbar Header */}
        <div className="bg-[#2C2C2C] border-b border-white/10 px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Official 5-dot Figma-inspired color mark */}
            <div className="w-8 h-8 rounded-xl bg-black/50 border border-white/15 flex items-center justify-center p-1.5">
              <div className="grid grid-cols-2 gap-0.5 w-full h-full">
                <span className="rounded-full bg-[#F24E1E]" />
                <span className="rounded-full bg-[#FF7262]" />
                <span className="rounded-full bg-[#A259FF]" />
                <span className="rounded-full bg-[#1ABCFE]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm md:text-base font-bold text-white tracking-tight">
                  SUBCON_2027_Master_Design_And_Animations.fig
                </h2>
                <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  Auto-Layout + Smart Animate
                </span>
              </div>
              <p className="text-xs text-white/60">
                9 Master Frames · 84 Interactive Nodes · Hero Dark Liquid-Glass + Brochure Colour Theme
              </p>
            </div>
          </div>

          {/* Center Mode Switcher Tabs (Design Canvas / Prototype Interactions / Export Files) */}
          <div
            className="flex items-center bg-[#181818] p-1 rounded-xl border border-white/10"
            role="tablist"
            aria-label="Figma Studio Modes"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'canvas'}
              onClick={() => setActiveTab('canvas')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'canvas'
                  ? 'bg-[#0D99FF] text-white shadow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Frames &amp; Prototype Canvas</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'interactions'}
              onClick={() => setActiveTab('interactions')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'interactions'
                  ? 'bg-[#0D99FF] text-white shadow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Smart-Animate &amp; Spring Specs</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'export'}
              onClick={() => setActiveTab('export')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'export'
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Figma Files</span>
            </button>
          </div>

          {/* Quick Download + Close */}
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                triggerDownload(
                  generateFigmaMasterSvg(),
                  'SUBCON_2027_Figma_Master_Canvas.svg',
                  'image/svg+xml;charset=utf-8',
                  'Figma Editable Vector SVG'
                )
              }
              className="bg-[#0D99FF] hover:bg-sky-400 text-white rounded-xl px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .SVG for Figma</span>
            </motion.button>
            <button
              type="button"
              aria-label="Close Figma Design Studio"
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 rounded-xl p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Download Status Banner */}
        <AnimatePresence>
          {downloadedNotice && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-emerald-500/20 border-b border-emerald-400/30 px-6 py-2 text-xs text-emerald-200 flex items-center justify-between"
            >
              <span className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-400" />
                {downloadedNotice} — Drag &amp; drop directly onto your Figma canvas!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Body Content Area */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6">
          {/* ================================================================= */}
          {/* TAB 1: FRAMES & PROTOTYPE NOODLE CANVAS                           */}
          {/* ================================================================= */}
          {activeTab === 'canvas' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Layers Sidebar (Figma Layers Panel) */}
              <div className="lg:col-span-4 bg-[#252525] border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                    Figma Layers &amp; Auto-Layout Frames
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPrototypeNoodles((prev) => !prev)}
                    className={`text-[11px] px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                      showPrototypeNoodles
                        ? 'bg-[#0D99FF]/25 text-sky-300 border border-[#0D99FF]/50'
                        : 'bg-white/5 text-white/50'
                    }`}
                  >
                    {showPrototypeNoodles ? '● Noodles Visible' : '○ Noodles Hidden'}
                  </button>
                </div>

                <div className="space-y-1.5">
                  {FIGMA_SECTION_SPECS.map((sec, idx) => {
                    const isSelected = sec.id === selectedFrame.id;
                    const isHero = idx === 0;
                    return (
                      <motion.button
                        key={sec.id}
                        type="button"
                        whileHover={{ x: 4 }}
                        onClick={() => setSelectedFrame(sec)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-[#0D99FF] text-white font-semibold shadow'
                            : 'bg-[#1E1E1E] hover:bg-white/10 text-white/80'
                        }`}
                      >
                        <div className="truncate flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-sm shrink-0 ${
                              isHero ? 'bg-purple-400' : 'bg-amber-400'
                            }`}
                          />
                          <span className="truncate"># {sec.frameName}</span>
                        </div>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                            isSelected ? 'bg-black/25 text-white' : 'bg-white/5 text-white/50'
                          }`}
                        >
                          ⚡ {sec.interactionsCount}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Right Selected Frame Inspector & Visual Prototype Flow */}
              <div className="lg:col-span-8 space-y-5">
                {/* Interactive Frame Blueprint Preview */}
                <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider">
                        Frame Inspector · Y={selectedFrame.yOffset}px · H={selectedFrame.height}px · W=1440px
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-white mt-0.5">
                        {selectedFrame.frameName}
                      </h3>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        selectedFrame.id === 'sec-01-hero'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40'
                          : 'bg-sky-500/20 text-sky-300 border border-sky-400/40'
                      }`}
                    >
                      {selectedFrame.themeMode}
                    </span>
                  </div>

                  {/* Visual Auto-Layout & Prototype Noodle Diagram */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div className="bg-[#222222] border border-white/10 rounded-xl p-4">
                      <p className="text-[11px] text-white/50 uppercase tracking-wider font-semibold mb-2">
                        Auto-Layout &amp; Surface Tokens
                      </p>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-white/60">Layout Mode:</span>
                          <span className="font-mono text-amber-300">
                            {selectedFrame.autoLayout.direction}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Padding:</span>
                          <span className="font-mono text-sky-300">
                            {selectedFrame.autoLayout.padding}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Item Spacing:</span>
                          <span className="font-mono text-sky-300">
                            {selectedFrame.autoLayout.itemSpacing}px
                          </span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="text-white/60 shrink-0">Fill Token:</span>
                          <span className="font-mono text-emerald-300 truncate">
                            {selectedFrame.backgroundFill}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#222222] border border-white/10 rounded-xl p-4">
                      <p className="text-[11px] text-white/50 uppercase tracking-wider font-semibold mb-2">
                        Smart-Animate &amp; Scroll Triggers
                      </p>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-white/60">Viewport Entrance:</span>
                          <span className="font-mono text-sky-300">
                            whileInView (once: false)
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Scroll Parallax:</span>
                          <span className="font-mono text-amber-300">
                            useScroll + useTransform
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Hover Physics:</span>
                          <span className="font-mono text-emerald-300">
                            Spring (260 / 22)
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Wired Interactions:</span>
                          <span className="font-mono text-white font-bold">
                            {selectedFrame.interactionsCount} Prototype Noodles
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Child Component Instances with Animated Prototype Connectors */}
                  <div>
                    <p className="text-xs font-semibold text-white/70 mb-2.5 flex items-center justify-between">
                      <span>Nested Component Instances &amp; Variants</span>
                      <span className="text-[11px] text-sky-400">
                        Hover any node to preview Smart-Animate spring response
                      </span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedFrame.childComponents.map((comp, idx) => (
                        <motion.div
                          key={comp}
                          whileHover={{ scale: 1.025, x: 4 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="bg-[#252525] hover:bg-[#2E2E2E] border border-sky-400/30 rounded-xl p-3 flex items-center justify-between gap-2 cursor-default"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-purple-400 font-bold text-xs">❖</span>
                            <span className="text-xs font-medium text-white truncate" title={comp}>
                              {comp}
                            </span>
                          </div>
                          {showPrototypeNoodles && (
                            <span className="shrink-0 inline-flex items-center gap-1 bg-[#0D99FF]/20 text-sky-300 border border-[#0D99FF]/50 rounded-full px-2 py-0.5 text-[10px] font-mono">
                              <span>⚡</span>
                              <span>0{idx + 1}</span>
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: SMART-ANIMATE & SPRING PHYSICS INSPECTOR                   */}
          {/* ================================================================= */}
          {activeTab === 'interactions' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left List of All 8 Prototype Interactions */}
              <div className="lg:col-span-5 space-y-2">
                {FIGMA_PROTOTYPE_INTERACTIONS.map((inter) => {
                  const isSelected = inter.id === selectedInteraction.id;
                  return (
                    <motion.button
                      key={inter.id}
                      type="button"
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        setSelectedInteraction(inter);
                        setLivePreviewTrigger((c) => c + 1);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0D99FF]/20 border-[#0D99FF] text-white shadow-lg'
                          : 'bg-[#252525] border-white/10 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                          {inter.trigger} → {inter.actionType}
                        </span>
                        <span className="text-[11px] font-mono text-amber-300">
                          {inter.physics.durationMs}ms
                        </span>
                      </div>
                      <p className="text-xs font-bold text-white truncate">
                        {inter.easingName}
                      </p>
                      <p className="text-[11px] text-white/60 truncate mt-0.5">
                        {inter.description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* Right Live Interactive Spring & Smart-Animate Stage */}
              <div className="lg:col-span-7 bg-[#252525] border border-white/10 rounded-2xl p-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-mono text-amber-400 uppercase">
                      Figma Prototype Interaction Spec
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">
                      {selectedInteraction.easingName}
                    </h3>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLivePreviewTrigger((c) => c + 1)}
                    className="bg-amber-400 text-slate-950 rounded-xl px-4 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Replay Smart-Animate</span>
                  </motion.button>
                </div>

                {/* Live Interactive Simulation Box */}
                <div className="bg-[#141414] border border-sky-500/30 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[190px] relative overflow-hidden">
                  <motion.div
                    key={`${selectedInteraction.id}-${livePreviewTrigger}`}
                    initial={{ opacity: 0.2, scale: 0.86, y: 24, rotateX: 12, rotateY: -12 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0 }}
                    whileHover={{ scale: 1.06, rotateX: -6, rotateY: 6 }}
                    transition={{
                      type: 'spring',
                      stiffness: selectedInteraction.physics.stiffness || 220,
                      damping: selectedInteraction.physics.damping || 20,
                    }}
                    className="bg-gradient-to-br from-[#0F2557] via-[#1E3A8A] to-[#0284C7] border-2 border-amber-400 rounded-2xl p-5 max-w-md w-full shadow-2xl cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs text-amber-300 font-mono mb-2">
                      <span>SOURCE: {selectedInteraction.sourceNode.split('/')[0]}</span>
                      <ArrowRight className="w-4 h-4" />
                      <span>TARGET</span>
                    </div>
                    <p className="text-sm font-bold text-white mb-1">
                      {selectedInteraction.description}
                    </p>
                    <p className="text-[11px] text-sky-200">
                      Hover or click &ldquo;Replay Smart-Animate&rdquo; to test this Figma spring curve
                    </p>
                  </motion.div>
                </div>

                {/* Animated Properties & Physics Parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#1A1A1A] rounded-xl p-4 border border-white/10">
                    <p className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Physics &amp; Timing</span>
                    </p>
                    <ul className="space-y-1.5 text-xs text-white/80 font-mono">
                      <li>Trigger: {selectedInteraction.trigger}</li>
                      <li>Action: {selectedInteraction.actionType}</li>
                      <li>Curve: {selectedInteraction.physics.type}</li>
                      <li>Duration: {selectedInteraction.physics.durationMs}ms</li>
                      {selectedInteraction.physics.stiffness && (
                        <li>
                          Spring: stiffness={selectedInteraction.physics.stiffness}, damping=
                          {selectedInteraction.physics.damping}
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="bg-[#1A1A1A] rounded-xl p-4 border border-white/10">
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Smart-Animate Properties</span>
                    </p>
                    <ul className="space-y-1.5 text-xs text-white/80 font-mono">
                      {selectedInteraction.animatedProperties.map((prop) => (
                        <li key={prop} className="truncate" title={prop}>
                          • {prop}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: EXPORT & 1-CLICK FIGMA IMPORT                              */}
          {/* ================================================================= */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Export Option 1: Editable Vector SVG for Direct Figma Drag & Drop */}
                <div className="bg-[#252525] border border-sky-400/40 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-sky-500/20 text-sky-300 text-[11px] font-bold px-2.5 py-1 rounded-md mb-3">
                      1. INSTANT DRAG &amp; DROP INTO FIGMA
                    </span>
                    <h3 className="text-base font-bold text-white mb-2">
                      Master Vector Artboards (.SVG)
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed mb-4">
                      Contains both the <strong>1440px Desktop Landing Page</strong> (Hero Liquid-Glass
                      + Brochure Colour Theme Sections 2–8) and the{' '}
                      <strong>Smart-Animate Prototype Spec Artboard</strong> as editable Figma Vector
                      Frames, Groups, Gradients, and Text layers.
                    </p>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      triggerDownload(
                        generateFigmaMasterSvg(),
                        'SUBCON_2027_Figma_Master_Canvas.svg',
                        'image/svg+xml;charset=utf-8',
                        'Master Figma Vector Canvas'
                      )
                    }
                    className="w-full bg-[#0D99FF] hover:bg-sky-400 text-white rounded-xl py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Editable Figma .SVG</span>
                  </motion.button>
                </div>

                {/* Export Option 2: Complete Figma Document & Prototype Reactions JSON */}
                <div className="bg-[#252525] border border-amber-400/40 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-amber-500/20 text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-md mb-3">
                      2. PROTOTYPE &amp; COMPONENT TREE
                    </span>
                    <h3 className="text-base font-bold text-white mb-2">
                      Figma Node &amp; Interaction Spec (.JSON)
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed mb-4">
                      Full Figma REST / Plugin node hierarchy containing all 9 Frames, Component
                      Sets, Auto-Layout rules, and all 8{' '}
                      <strong>Smart-Animate / Spring reaction triggers</strong> (`ON_HOVER`,
                      `ON_SCROLL`, `AFTER_TIMEOUT`).
                    </p>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      triggerDownload(
                        generateFigmaDocumentJson(),
                        'SUBCON_2027_Figma_Design_And_Interactions.figma.json',
                        'application/json;charset=utf-8',
                        'Figma Document & Interactions JSON'
                      )
                    }
                    className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <FileCode2 className="w-4 h-4" />
                    <span>Download .figma.json Spec</span>
                  </motion.button>
                </div>

                {/* Export Option 3: W3C Design Tokens / Figma Variables */}
                <div className="bg-[#252525] border border-purple-400/40 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-purple-500/20 text-purple-300 text-[11px] font-bold px-2.5 py-1 rounded-md mb-3">
                      3. FIGMA VARIABLES &amp; TOKENS STUDIO
                    </span>
                    <h3 className="text-base font-bold text-white mb-2">
                      W3C Design &amp; Motion Tokens (.JSON)
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed mb-4">
                      Import directly into <strong>Figma Variables</strong> or{' '}
                      <strong>Tokens Studio for Figma</strong> to load the Hero Liquid-Glass tokens,
                      SUBCON Brochure Colour Theme (`#0F2557`, `#0284C7`, `#F59E0B`, `#F4F8FC`), and
                      Spring physics tokens.
                    </p>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      triggerDownload(
                        generateFigmaVariablesJson(),
                        'SUBCON_2027_Figma_Variables.tokens.json',
                        'application/json;charset=utf-8',
                        'Figma Variables & Tokens JSON'
                      )
                    }
                    className="w-full bg-purple-500 hover:bg-purple-400 text-white rounded-xl py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Palette className="w-4 h-4" />
                    <span>Download .tokens.json</span>
                  </motion.button>
                </div>
              </div>

              {/* Native Figma Console Script Builder */}
              <div className="bg-[#141414] border border-white/15 rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Native Figma Console Auto-Builder Script</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                        Zero Plugins Needed
                      </span>
                    </h4>
                    <p className="text-xs text-white/60">
                      Open Figma → <strong>Plugins → Development → Open Console</strong>, paste this
                      script, and press Enter to generate all Color Styles and 1440px Auto-Layout
                      Frames automatically.
                    </p>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() =>
                      handleCopyText(generateFigmaConsolePluginScript(), 'console-script')
                    }
                    className="bg-white/10 hover:bg-white/20 text-white rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === 'console-script' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied Figma Script!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Figma Console Script</span>
                      </>
                    )}
                  </motion.button>
                </div>
                <pre className="bg-black/70 border border-white/10 rounded-xl p-3.5 text-[11px] font-mono text-sky-300 overflow-x-auto max-h-44">
                  {generateFigmaConsolePluginScript()}
                </pre>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
