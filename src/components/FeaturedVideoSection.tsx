import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import {
  LineaBandSheet,
  LineaCaptionIn,
  LineaWaveCaption,
} from './ScrollAnimationPrimitives';

interface FeaturedVideoSectionProps {
  onExploreWorkshops: () => void;
}

const INDUSTRIAL_REEL_SCENES = [
  {
    id: 'reel-laser',
    tag: '01 · Laser Cutting',
    badge: 'Hall A · Live Machine Demo',
    title: 'CNC Fiber Laser & Sheet Metal Fabrication',
    caption: 'Sub-millimeter nitrogen-assisted fiber laser cutting live on the CODISSIA floor.',
    image: '/assets/subcon/hd_glimpse_05.jpg',
  },
  {
    id: 'reel-pricol',
    tag: '02 · Principal Pavilion',
    badge: 'Tier-1 Automotive Buyer',
    title: 'PRICOL Limited Flagship Engineering Stall',
    caption: 'Direct B2B component matchmaking for sensors, actuators, and automotive clusters.',
    image: '/assets/subcon/hd_exhibitor_pricol.jpg',
  },
  {
    id: 'reel-forging',
    tag: '03 · Foundry & Forging',
    badge: '40% of South India Castings',
    title: 'Heavy Ring Forging & Investment Casting',
    caption: 'High-tonnage closed-die forgings and non-ferrous castings for energy and rail.',
    image: '/assets/subcon/cover_forging.jpg',
  },
  {
    id: 'reel-erfolg',
    tag: '04 · Smart Automation',
    badge: 'Turnkey Sub-Assemblies',
    title: 'ERFOLG Industries Precision Pavilion',
    caption: 'Multi-axis machined assemblies and custom industrial tooling solutions.',
    image: '/assets/subcon/hd_exhibitor_erfolg.jpg',
  },
];

// Deterministic waveform bar heights replicating Linea #listen .listen__wave
const WAVE_BARS = Array.from({ length: 28 }, (_, i) => {
  const h = 0.3 + 0.7 * Math.abs(Math.sin(i * 0.65 + 1.2));
  return Math.round(h * 100);
});

export default function FeaturedVideoSection({ onExploreWorkshops }: FeaturedVideoSectionProps) {
  const [activeReelIdx, setActiveReelIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveReelIdx((prev) => (prev + 1) % INDUSTRIAL_REEL_SCENES.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const currentReel = INDUSTRIAL_REEL_SCENES[activeReelIdx];

  return (
    <LineaBandSheet theme="paper" overlap>
      <div className="max-w-[88rem] mx-auto px-4 sm:px-8 lg:px-14">
        {/* Linea #listen__head Split Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.05] text-[#1E2022]">
              <LineaCaptionIn
                lines={[
                  <>
                    Every exhibition aisle,{' '}
                    <em className="font-serif-instrument italic font-normal text-[#009EE2]">
                      captured in motion.
                    </em>
                  </>,
                ]}
              />
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end sm:items-center gap-4">
            <p className="text-sm sm:text-base text-[#64686D] max-w-sm">
              Select any live pavilion feed on the right to inspect real shop-floor demonstrations and OEM stalls.
            </p>
          </div>
        </div>

        {/* Linea #listen__panels Dual-Panel Stage (Left Charcoal #1E2022 + Right SUBCON Cerulean Blue #009EE2) */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-cols-1 lg:grid-cols-12 rounded-[1.75rem] overflow-hidden shadow-[0_28px_60px_-24px_rgba(30,32,34,0.35)]"
        >
          {/* Left 7 Cols: Linea .listen__panel--voice (Charcoal Cinema Viewport + Dual-Color Waveform) */}
          <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[440px] bg-[#1E2022] text-white overflow-hidden flex flex-col justify-between p-6 sm:p-8">
            <AnimatePresence mode="sync">
              <motion.img
                key={currentReel.id}
                src={currentReel.image}
                alt={currentReel.title}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 0.72, scale: 1.0 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{
                  opacity: { duration: 0.55 },
                  scale: { duration: 4.4, ease: 'easeOut' },
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1E2022] via-[#1E2022]/35 to-[#1E2022]/60"
              aria-hidden="true"
            />

            {/* Top Bar inside Left Panel */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <LineaWaveCaption text={currentReel.badge} variant="paper" />
              <span className="text-xs font-semibold text-white/90 bg-[#1E2022]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 tabular-nums">
                0{activeReelIdx + 1} / 0{INDUSTRIAL_REEL_SCENES.length}
              </span>
            </div>

            {/* Bottom Story + Linea Animated 28-Bar Waveform (.listen__wave) in SUBCON Blue & Orange */}
            <div className="relative z-10 space-y-5 pt-16">
              <motion.div
                key={currentReel.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-[#EF7F1A] mb-1">
                  {currentReel.tag}
                </p>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  {currentReel.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1.5">
                  {currentReel.caption}
                </p>
              </motion.div>

              {/* Linea .listen__wave Bar Equalizer */}
              <div className="flex items-end gap-1.5 h-10 pt-2" aria-hidden="true">
                {WAVE_BARS.map((heightPct, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      scaleY: isPaused
                        ? 0.45
                        : [0.45, 0.95, 0.55, 1, 0.45],
                    }}
                    transition={{
                      duration: 1.8 + (i % 5) * 0.22,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.04,
                    }}
                    style={{ height: `${heightPct}%` }}
                    className={`flex-1 rounded-full origin-bottom ${
                      i % 3 === 0
                        ? 'bg-[#EF7F1A]/85'
                        : 'bg-[#009EE2]/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Linea .listen__panel--read (SUBCON Cerulean Blue #009EE2 Interactive Stage) */}
          <div
            className="lg:col-span-5 bg-[#009EE2] text-white p-6 sm:p-8 flex flex-col justify-between gap-6"
            role="tablist"
            aria-label="Showcase Scenes"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/90">
                Live Pavilion Channels
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">
                Interactive Reel
              </span>
            </div>

            {/* Staggered Linea Speech Bubbles (.m-caption) */}
            <div className="space-y-3 my-auto">
              {INDUSTRIAL_REEL_SCENES.map((scene, idx) => {
                const isSelected = idx === activeReelIdx;
                return (
                  <motion.button
                    key={scene.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    initial={{ opacity: 0, x: 32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 0.55,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ x: -4 }}
                    onMouseEnter={() => setActiveReelIdx(idx)}
                    onClick={() => setActiveReelIdx(idx)}
                    className={`w-full text-left p-4 rounded-[1.25rem_1.25rem_1.25rem_0.3125rem] transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#1E2022] text-white shadow-xl scale-[1.01]'
                        : 'bg-white/95 hover:bg-white text-[#1E2022] shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="m-caption__wave shrink-0" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                        <i />
                      </span>
                      <div className="min-w-0">
                        <p
                          className={`text-[11px] font-bold uppercase tracking-wider ${
                            isSelected ? 'text-[#009EE2]' : 'text-[#64686D]'
                          }`}
                        >
                          {scene.tag}
                        </p>
                        <p className="text-sm font-semibold truncate">{scene.title}</p>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                        isSelected
                          ? 'bg-[#EF7F1A] text-white'
                          : 'bg-[#EEF4F8] text-[#1E2022]'
                      }`}
                    >
                      {scene.badge.split('·')[0].trim()}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between gap-4 border-t border-white/25">
              <span className="text-xs font-semibold text-white/90">
                12th – 14th May 2027 · Coimbatore
              </span>
              <button
                type="button"
                onClick={onExploreWorkshops}
                className="bg-[#EF7F1A] hover:bg-[#D96D0D] text-white rounded-full px-5 py-2.5 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-md"
              >
                <span>Explore Schedule</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </LineaBandSheet>
  );
}
