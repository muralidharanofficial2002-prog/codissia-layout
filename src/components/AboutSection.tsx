import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  MapPin,
  Calendar,
  ArrowUpRight,
  Factory,
  ShieldCheck,
  ArrowLeftRight,
} from 'lucide-react';
import { EVENT_INFO } from '../data/subconData';
import {
  LineaBandSheet,
  LineaCaptionIn,
  LineaReadAlong,
  LineaWaveCaption,
  LineaWindowReveal,
} from './ScrollAnimationPrimitives';
import { SonarGrid } from '@/components/ui/sonar-grid';

interface AboutSectionProps {
  onOpenRegistration: () => void;
}

const SETUP_PILLARS = [
  {
    num: '01',
    icon: Factory,
    metric: '125+ MSMEs',
    title: 'Precision Subcontracting & Tier-1 Manufacturers',
    description:
      'Coimbatore foundry, 5-axis CNC machining, sheet metal, and automation clusters ready for high-precision industrial outsourcing.',
    tags: ['Foundry & Casting', '5-Axis CNC', 'Sheet Metal & Fabrication'],
    bgClass: 'bg-white text-[#1E2022] border border-[#009EE2]/20',
    numColor: 'text-[#009EE2]',
    tagClass: 'bg-[#EEF4F8] text-[#1E2022]',
    waveVariant: 'blue' as const,
    waveText: 'Hall A & B · Live Machine Stalls',
    isDark: false,
  },
  {
    num: '02',
    icon: ArrowLeftRight,
    metric: '10th Edition',
    title: 'Direct Bridge Connecting Buyers & Manufacturers',
    description:
      'Three days of structured vendor development meets, technical workshops, and live component sourcing at CODISSIA Trade Fair Complex.',
    tags: ['12 – 14 May 2027', '10 AM – 5 PM IST', 'Coimbatore'],
    bgClass: 'bg-[#009EE2] text-white',
    numColor: 'text-white',
    tagClass: 'bg-white/15 text-white',
    waveVariant: 'orange' as const,
    waveText: 'Organised by CODISSIA Intec Technology Centre',
    isDark: false,
  },
  {
    num: '03',
    icon: ShieldCheck,
    metric: '16+ PSUs & OEMs',
    title: 'Central Public Sector & Defence Procurement Desks',
    description:
      'Meet nodal indigenisation officers from HAL, BEL, BEML, BHEL, Southern Railways, Mazagon Dock, and Cochrane directly on the floor.',
    tags: ['Defence Indigenisation', 'Railway Vendor Desk', 'Aerospace & Energy'],
    bgClass: 'bg-[#1E2022] text-white border border-[#EF7F1A]/30',
    numColor: 'text-[#EF7F1A]',
    tagClass: 'bg-[#2C3035] text-white border border-white/12',
    waveVariant: 'orange' as const,
    waveText: 'Make in India Vendor Registration',
    isDark: true,
  },
];

function StickySetupCard({
  pillar,
  index,
  onOpenRegistration,
}: {
  pillar: (typeof SETUP_PILLARS)[number];
  index: number;
  onOpenRegistration: () => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 25%', 'end start'],
  });

  // Replicates Linea #setup scroll-scrubbed scale down as next card stacks over it
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, index < SETUP_PILLARS.length - 1 ? 0.94 : 1]
  );

  const Icon = pillar.icon;

  const content = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
      {/* Giant Linea Editorial Step Numeral in SUBCON Brand Hue */}
      <div className="lg:col-span-3 flex items-baseline justify-between lg:block">
        <span
          className={`text-6xl sm:text-7xl lg:text-[6.5rem] font-extrabold leading-[0.82] tracking-tighter tabular-nums select-none ${pillar.numColor}`}
        >
          {pillar.num}
        </span>
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mt-3 opacity-85">
          <Icon className="w-4 h-4" />
          <span>{pillar.metric}</span>
        </span>
      </div>

      {/* Center Editorial Narrative */}
      <div className="lg:col-span-5 space-y-3">
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.15] text-balance">
          {pillar.title}
        </h3>
        <p className="text-sm sm:text-base opacity-85 leading-relaxed">
          {pillar.description}
        </p>
      </div>

      {/* Right Interactive UI / Waveform Metadata Stack (Linea .setup__ui) */}
      <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-4">
        <LineaWaveCaption text={pillar.waveText} variant={pillar.waveVariant} />

        <div className="flex flex-wrap lg:justify-end gap-2">
          {pillar.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full ${pillar.tagClass}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {index === 2 && (
          <button
            type="button"
            onClick={onOpenRegistration}
            className="mt-1 bg-[#EF7F1A] hover:bg-[#D96D0D] text-white rounded-full px-6 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-colors"
          >
            <span>Register Visitor Pass</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        top: `calc(5.5rem + ${index * 1.25}rem)`,
      }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky rounded-[1.75rem] overflow-hidden shadow-[0_24px_50px_-24px_rgba(30,32,34,0.3)] origin-top ${pillar.bgClass}`}
    >
      {pillar.isDark ? (
        <SonarGrid
          color="#EF7F1A"
          baseOpacity={0.28}
          spacing={24}
          className="p-6 sm:p-8 lg:p-11"
        >
          {content}
        </SonarGrid>
      ) : (
        <div className="p-6 sm:p-8 lg:p-11">{content}</div>
      )}
    </motion.div>
  );
}

export default function AboutSection({ onOpenRegistration }: AboutSectionProps) {
  return (
    <LineaBandSheet id="about" theme="sand" overlap>
      <div className="max-w-[88rem] mx-auto px-4 sm:px-8 lg:px-14">
        {/* Linea #setup__head 2-Column Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-10 border-b border-[#1E2022]/12">
          <div className="lg:col-span-7">
            <div className="mb-4">
              <LineaWaveCaption
                text="About SUBCON 2027 · 10th Edition Flagship Fair"
                variant="paper"
              />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-semibold tracking-tight leading-[1.03] text-[#1E2022]">
              <LineaCaptionIn
                lines={[
                  <>
                    Pioneering{' '}
                    <em className="font-serif-instrument italic font-normal text-[#009EE2]">
                      industrial sourcing
                    </em>
                  </>,
                  <>
                    for minds that{' '}
                    <em className="font-serif-instrument italic font-normal text-[#EF7F1A]">
                      build and scale.
                    </em>
                  </>,
                ]}
              />
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <LineaReadAlong
              text="Organised by CODISSIA at the Trade Fair Complex in Coimbatore, SUBCON 2027 unites precision MSME manufacturers, central defence PSUs, and large engineering enterprises under one architectural roof."
              className="text-base sm:text-lg text-[#64686D] leading-relaxed font-medium"
            />
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#1E2022]/80 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#009EE2]" />
                {EVENT_INFO.venue}
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#EF7F1A]" />
                {EVENT_INFO.dates}
              </span>
            </div>
          </div>
        </div>

        {/* Linea #setup__steps Sticky Scroll-Stacking Cards in White, SUBCON Blue (#009EE2) & Charcoal/Orange */}
        <div className="mt-10 md:mt-14 space-y-5">
          {SETUP_PILLARS.map((pillar, idx) => (
            <StickySetupCard
              key={pillar.num}
              pillar={pillar}
              index={idx}
              onOpenRegistration={onOpenRegistration}
            />
          ))}
        </div>

        {/* Linea #start__window Expanding Clip-Path Venue Showcase */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8">
            <LineaWindowReveal
              imageUrl="/assets/subcon/codissia_complex.jpg"
              imageAlt="CODISSIA Trade Fair Complex, Coimbatore"
              className="h-full min-h-[340px] sm:min-h-[400px]"
            >
              <div className="p-6 sm:p-10 h-full min-h-[340px] sm:min-h-[400px] flex flex-col justify-between text-white">
                <div className="flex flex-wrap items-center gap-2.5">
                  <LineaWaveCaption
                    text={`${EVENT_INFO.venue} · Hall A & B`}
                    variant="paper"
                  />
                </div>

                <div className="max-w-xl space-y-3 pt-16">
                  <p className="text-xs uppercase tracking-widest text-[#009EE2] font-bold">
                    12th – 14th May 2027 · 10:00 AM – 5:00 PM IST
                  </p>
                  <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
                    250+ Industrial Subcontracting Stalls Across Two Exhibition Halls
                  </h3>
                </div>
              </div>
            </LineaWindowReveal>
          </div>

          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              onClick={onOpenRegistration}
              className="relative h-full min-h-[340px] sm:min-h-[400px] rounded-[1.75rem] overflow-hidden bg-[#1E2022] text-white p-6 sm:p-8 flex flex-col justify-between cursor-pointer group border border-[#009EE2]/25"
            >
              <img
                src="/assets/subcon/inauguration_2025.jpg"
                alt="SUBCON Inauguration and PSU Buyer-Seller Meet"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1E2022] via-[#1E2022]/55 to-transparent"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <LineaWaveCaption text="Make in India · Vendor Desk" variant="blue" />
              </div>

              <div className="relative z-10 space-y-4">
                <div>
                  <p className="text-xs font-medium text-[#9CA3AB] mb-1">
                    Complimentary Trade Visitor Entry
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
                    PSU &amp; OEM B2B Matchmaking Forum
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenRegistration();
                  }}
                  className="w-full rounded-full bg-[#EF7F1A] hover:bg-[#D96D0D] text-white py-3.5 px-6 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
                >
                  <span>Reserve Visitor Pass</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </LineaBandSheet>
  );
}
