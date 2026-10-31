import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Shield, Cpu } from 'lucide-react';
import {
  AnimatedCounter,
  LineaBandSheet,
  LineaCaptionIn,
  LineaReadAlong,
  LineaWaveCaption,
} from './ScrollAnimationPrimitives';

const LINEA_TUNE_METRICS = [
  {
    title: 'Exhibitor Approval Rating',
    subtitle: 'Verified post-fair survey of SUBCON exhibitors',
    value: '98.4%',
    fillPct: 0.94,
    accent: 'text-[#009EE2]',
  },
  {
    title: 'Rated Very Good & Above',
    subtitle: 'Quality of PSU & OEM buyer delegations',
    value: '86.1%',
    fillPct: 0.86,
    accent: 'text-[#EF7F1A]',
  },
  {
    title: 'Industrial Exhibition Stalls',
    subtitle: 'Precision MSMEs across CODISSIA Hall A & B',
    value: '250+',
    fillPct: 0.91,
    accent: 'text-[#009EE2]',
  },
  {
    title: 'Annual Sourcing Pipeline',
    subtitle: 'Direct RFQs and subcontracting orders generated',
    value: '₹50 Cr+',
    fillPct: 0.96,
    accent: 'text-[#EF7F1A]',
  },
];

export default function PhilosophySection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Replicates Linea #tune scroll-scrubbed scale modulation
  const stageScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.92, 1, 0.98]);

  return (
    <LineaBandSheet id="philosophy" theme="espresso" overlap>
      <div ref={ref} className="max-w-[88rem] mx-auto px-4 sm:px-8 lg:px-14">
        {/* Linea #tune__stage Monumental Interactive Viewport in SUBCON Charcoal & Cerulean/Orange */}
        <motion.div
          style={{ scale: stageScale }}
          className="rounded-[1.75rem] bg-[#272A2E]/80 backdrop-blur-md text-white p-6 sm:p-10 lg:p-12 border border-white/12 shadow-2xl"
        >
          {/* Linea .tune__meta Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/12 text-xs sm:text-sm text-[#9CA3AB]">
            <span className="inline-flex items-center gap-2.5 font-semibold text-white">
              <i className="w-2.5 h-2.5 rounded-full bg-[#009EE2] inline-block" />
              <span>SUBCON 2027 · Industrial Sourcing Architecture</span>
            </span>
            <span>Click or hover the stage below to switch between Buyer Audit &amp; 5-Axis CNC</span>
          </div>

          {/* Monumental Display Headline + Interactive Dual-Lens Stage */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.96] text-white">
                <LineaCaptionIn
                  lines={[
                    <>Innovation</>,
                    <>
                      <em className="font-serif-instrument italic font-normal text-[#009EE2]">
                        meets
                      </em>{' '}
                      <span className="text-[#EF7F1A]">Vision.</span>
                    </>,
                  ]}
                />
              </h2>

              <LineaReadAlong
                text="Every component on the shop floor starts with a conversation between an OEM engineer and a precision subcontractor. Switch the live lens to inspect both sides of the SUBCON ecosystem."
                className="text-sm sm:text-base text-[#9CA3AB] leading-relaxed"
              />

              {/* Linea .tune__seg Interactive Segmented Toggle in SUBCON Blue & Orange */}
              <div className="inline-grid grid-cols-2 p-1.5 rounded-full bg-[#1E2022] border border-white/12 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setIsImageHovered(false)}
                  className={`px-5 py-2.5 rounded-full transition-colors cursor-pointer ${
                    !isImageHovered
                      ? 'bg-[#009EE2] text-white font-bold shadow-md'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  01. Buyer Quality Audit
                </button>
                <button
                  type="button"
                  onClick={() => setIsImageHovered(true)}
                  className={`px-5 py-2.5 rounded-full transition-colors cursor-pointer ${
                    isImageHovered
                      ? 'bg-[#EF7F1A] text-white font-bold shadow-md'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  02. 5-Axis CNC Craft
                </button>
              </div>
            </div>

            {/* Right 7 Cols: Dual-Image Interactive Window */}
            <div className="lg:col-span-7">
              <div
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
                onClick={() => setIsImageHovered((prev) => !prev)}
                className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden bg-[#1E2022] cursor-pointer group border border-white/10"
              >
                <img
                  src="./assets/subcon/hd_factory_engineers.jpg"
                  alt="Shop-Floor Quality Audit"
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    isImageHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                  }`}
                />
                <img
                  src="./assets/subcon/cover_cnc_sparks.jpg"
                  alt="5-Axis CNC Execution"
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    isImageHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1E2022]/90 via-transparent to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
                  <LineaWaveCaption
                    text={
                      isImageHovered
                        ? 'Sub-Micron 5-Axis Impeller & Gear Machining'
                        : 'Direct PSU & OEM Shop-Floor Quality Inspection'
                    }
                    variant="paper"
                  />
                  <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-[#1E2022]/90 text-[#EF7F1A] border border-white/15">
                    Coimbatore Cluster
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Linea #tune__body Split: Left Companion Cards + Right Hairline Slider Settings Ledger */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left 5 Cols: 2 Organic Companion Cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-[1.5rem] overflow-hidden bg-[#272A2E] border border-[#009EE2]/25 p-5 flex items-center gap-4">
              <img
                src="./assets/subcon/glimpse_02.jpg"
                alt="Defence and Central PSU Buyers"
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-2xl object-cover shrink-0"
              />
              <div>
                <div className="inline-flex items-center gap-1.5 text-[#009EE2] text-xs font-bold mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Strategic Procurement Buyers</span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  HAL · BEL · BEML · BHEL · Railways
                </h3>
                <p className="text-xs text-[#9CA3AB] mt-1">
                  Direct vendor empanelment and indigenisation desks.
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] overflow-hidden bg-[#272A2E] border border-[#EF7F1A]/25 p-5 flex items-center gap-4">
              <img
                src="./assets/subcon/process_machining.jpg"
                alt="Make in India Precision Manufacturers"
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-2xl object-cover shrink-0"
              />
              <div>
                <div className="inline-flex items-center gap-1.5 text-[#EF7F1A] text-xs font-bold mb-1">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Make in India Supply Chain</span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Indigenous Tier-1 MSME Capabilities
                </h3>
                <p className="text-xs text-[#9CA3AB] mt-1">
                  Export-grade castings, forgings, and CNC sub-assemblies.
                </p>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Linea #tune__settings Hairline Ledger with SUBCON Blue-to-Orange Sliders */}
          <div className="lg:col-span-7 border-t border-white/15">
            {LINEA_TUNE_METRICS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: idx * 0.07, duration: 0.5 }}
                className="py-5 border-b border-white/15 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
              >
                <div className="sm:col-span-6">
                  <h4 className="text-base sm:text-lg font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#9CA3AB] mt-0.5">{item.subtitle}</p>
                </div>

                {/* Linea .tune__slider with animated SUBCON Blue & Orange fill & thumb */}
                <div className="sm:col-span-3 flex items-center">
                  <div className="relative w-full h-1.5 rounded-full bg-white/15">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: item.fillPct }}
                      viewport={{ once: false }}
                      transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute inset-0 rounded-full origin-left ${
                        idx % 2 === 0 ? 'bg-[#009EE2]' : 'bg-[#EF7F1A]'
                      }`}
                    />
                    <motion.span
                      initial={{ left: '0%' }}
                      whileInView={{ left: `${item.fillPct * 100}%` }}
                      viewport={{ once: false }}
                      transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-md border-2 border-[#1E2022]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 sm:text-right">
                  <span className={`text-3xl sm:text-4xl font-bold tabular-nums tracking-tight ${item.accent}`}>
                    <AnimatedCounter value={item.value} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </LineaBandSheet>
  );
}
