import { useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Layers, Cpu, Sparkles } from 'lucide-react';
import {
  PROCESS_CATEGORIES,
  PARTS_CATEGORIES,
} from '../data/subconData';
import {
  LineaBandSheet,
  LineaCaptionIn,
  LineaReadAlong,
  LineaWaveCaption,
} from './ScrollAnimationPrimitives';
import IntroAnimation, { MorphCardItem } from '@/components/ui/scroll-morph-hero';

interface ServicesSectionProps {
  onSelectProcessForWorkshop: (processTitle: string) => void;
}

export default function ServicesSection({ onSelectProcessForWorkshop }: ServicesSectionProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end start'],
  });

  // Replicates Linea #rooms .rooms__lines scroll-linked SVG path drawing in SUBCON Blue & Orange
  const lineProgressA = useTransform(scrollYProgress, [0.05, 0.75], [0, 1]);
  const lineProgressB = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  const [activeTab, setActiveTab] = useState<'morph' | 'processes' | 'parts'>('morph');

  // Build 20 manufacturing discipline items combining the 7 Core Processes + 13 Key OEM Sub-Assemblies
  const morphDisciplineItems: MorphCardItem[] = useMemo(() => {
    const processItems: MorphCardItem[] = PROCESS_CATEGORIES.map((proc) => ({
      id: proc.id,
      src: proc.image,
      title: proc.title,
      subtitle: proc.subtitle,
      badge: proc.number,
      tag: 'Core Process',
      accentColor: '#009EE2',
    }));

    const partItems: MorphCardItem[] = PARTS_CATEGORIES.slice(0, 13).map((part, idx) => ({
      id: part.id,
      src: part.image,
      title: part.title,
      subtitle: part.sector,
      badge: String(idx + 8).padStart(2, '0'),
      tag: 'OEM Sub-Assembly',
      accentColor: '#EF7F1A',
    }));

    return [...processItems, ...partItems];
  }, []);

  return (
    <LineaBandSheet id="processes" theme="sand" overlap>
      <div ref={trackRef} className="max-w-[88rem] mx-auto px-4 sm:px-8 lg:px-14">
        {/* Linea #rooms__head Split Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-10 border-b border-[#1E2022]/12">
          <div className="lg:col-span-7">
            <div className="mb-4">
              <LineaWaveCaption
                text="Capabilities · Processes & Sub-Assemblies"
                variant="paper"
              />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold tracking-tight leading-[1.04] text-[#1E2022]">
              <LineaCaptionIn
                lines={[
                  <>
                    Built for every{' '}
                    <em className="font-serif-instrument italic font-normal text-[#009EE2]">
                      manufacturing discipline.
                    </em>
                  </>,
                ]}
              />
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-4">
            <LineaReadAlong
              text="Interact with the 3D Scroll-Morph Discipline Stage below, or switch between the 7 Core Subcontracting Processes and 8 Key OEM Sub-Assemblies."
              className="text-sm sm:text-base text-[#64686D] leading-relaxed"
            />

            {/* Clean Segmented Control in SUBCON Logo Colors */}
            <div
              className="inline-flex flex-wrap p-1.5 rounded-full bg-white border border-[#009EE2]/20 text-xs font-semibold self-start lg:self-end shadow-sm gap-1"
              role="tablist"
              aria-label="Capability Visual Tabs"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'morph'}
                onClick={() => setActiveTab('morph')}
                className={`px-4 py-2 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'morph'
                    ? 'bg-[#1E2022] text-white font-bold shadow-sm'
                    : 'text-[#64686D] hover:text-[#1E2022]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#009EE2]" />
                <span>3D Morph Stage</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'processes'}
                onClick={() => setActiveTab('processes')}
                className={`px-4 py-2 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'processes'
                    ? 'bg-[#009EE2] text-white font-bold shadow-sm'
                    : 'text-[#64686D] hover:text-[#1E2022]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>7 Core Processes</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'parts'}
                onClick={() => setActiveTab('parts')}
                className={`px-4 py-2 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'parts'
                    ? 'bg-[#EF7F1A] text-white font-bold shadow-sm'
                    : 'text-[#64686D] hover:text-[#1E2022]'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>8 Key Parts</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Scroll-Morph Hero Animation for "Built for every manufacturing discipline" */}
        <div className="mt-10 mb-12">
          <IntroAnimation
            items={morphDisciplineItems}
            title="Built for Every Manufacturing Discipline."
            subtitle="SCROLL INSIDE STAGE OR USE PRESET CONTROLS TO MORPH & ROTATE"
            activeTitle="20 Subcontracting & OEM Capabilities"
            activeSubtitle="Hover any card in the orbital arc to flip its 3D engineering spec, or click a card to filter related technical workshops below."
            onSelectItem={(item) => {
              if (item.title) {
                onSelectProcessForWorkshop(item.title);
              }
            }}
          />
        </div>

        {/* Linea #rooms__now Indicator Pill */}
        <div className="mt-8 mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1E2022] text-white/90 text-xs font-semibold shadow-md">
            <i className="w-2 h-2 rounded-full bg-[#EF7F1A] inline-block" />
            <span>
              {activeTab === 'parts'
                ? 'Showing 8 OEM Component & Sub-Assembly Categories'
                : 'Showing 7 Core Subcontracting Processes · Click any card to filter workshops'}
            </span>
          </div>
        </div>

        {/* Linea #rooms__track with Continuous Flowing SVG Lines (.rooms__lines) in SUBCON Blue & Orange */}
        <div className="relative">
          <svg
            viewBox="0 0 1440 260"
            fill="none"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-44 z-0 overflow-visible"
            aria-hidden="true"
          >
            <motion.path
              d="M-40 180 C 260 20, 560 240, 880 90 C 1120 -10, 1300 200, 1480 70"
              stroke="#009EE2"
              strokeWidth="3.5"
              strokeLinecap="round"
              style={{ pathLength: lineProgressA }}
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d="M-40 80 C 310 240, 640 10, 980 190 C 1190 260, 1340 40, 1480 150"
              stroke="#EF7F1A"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: lineProgressB }}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {activeTab !== 'parts' ? (
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
              {PROCESS_CATEGORIES.map((proc, index) => {
                const spanClass =
                  index === 0 || index === 1
                    ? 'lg:col-span-6 aspect-[16/10]'
                    : index === 2 || index === 3 || index === 4
                      ? 'lg:col-span-4 aspect-[4/4.2]'
                      : 'lg:col-span-6 aspect-[16/9.5]';

                return (
                  <motion.article
                    key={proc.id}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                      duration: 0.65,
                      delay: (index % 3) * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -6 }}
                    onClick={() => onSelectProcessForWorkshop(proc.title)}
                    className={`${spanClass} relative overflow-hidden rounded-[1.75rem] bg-[#1E2022] text-white cursor-pointer group shadow-[0_22px_45px_-22px_rgba(30,32,34,0.45)]`}
                  >
                    <img
                      src={proc.image}
                      alt={proc.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1E2022]/45 via-transparent to-[#1E2022]/90"
                      aria-hidden="true"
                    />

                    {/* Top Linea .rooms__label Pill */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#1E2022]/85 backdrop-blur-md text-white text-xs font-semibold border border-white/15">
                        <span className="text-[#009EE2] font-bold">{proc.number}.</span> {proc.title}
                      </span>
                      <span className="w-9 h-9 rounded-full bg-white text-[#1E2022] flex items-center justify-center transition-transform duration-300 group-hover:bg-[#EF7F1A] group-hover:text-white group-hover:rotate-45">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Bottom Linea .rooms__talk Staggered Speech Bubbles */}
                    <div className="absolute inset-x-4 bottom-4 z-10 flex flex-col gap-2 items-start">
                      <div className="m-caption text-xs">
                        <span className="m-caption__wave" aria-hidden="true">
                          <i />
                          <i />
                          <i />
                          <i />
                        </span>
                        <span className="truncate">
                          {proc.capabilities[0]?.split('(')[0].trim()}
                        </span>
                      </div>

                      {proc.capabilities[1] && (
                        <div className="m-caption-2 text-xs self-end">
                          <span className="m-caption__wave" aria-hidden="true">
                            <i />
                            <i />
                            <i />
                            <i />
                          </span>
                          <span className="truncate">
                            {proc.capabilities[1]?.split('(')[0].trim()}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PARTS_CATEGORIES.slice(0, 8).map((part, index) => (
                <motion.article
                  key={part.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: (index % 4) * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -5 }}
                  className="rounded-[1.75rem] overflow-hidden bg-white border border-[#009EE2]/20 shadow-md flex flex-col justify-between group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1E2022]">
                    <img
                      src={part.image}
                      alt={part.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1E2022]/85 backdrop-blur-md text-white text-[11px] font-semibold">
                      <span className="text-[#009EE2] font-bold">0{index + 1}</span> · OEM Sub-Assembly
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold text-[#1E2022] tracking-tight">
                        {part.title}
                      </h4>
                      <p className="text-xs text-[#64686D] mt-1">{part.sector}</p>
                    </div>

                    <div className="pt-3 border-t border-[#1E2022]/10 flex items-center justify-between text-xs font-semibold text-[#1E2022]">
                      <span>Export &amp; PSU Ready</span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          index % 2 === 0 ? 'bg-[#009EE2]' : 'bg-[#EF7F1A]'
                        }`}
                      />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </LineaBandSheet>
  );
}
