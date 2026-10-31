import { useEffect, useRef, useState, ReactNode } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
} from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { SonarGrid } from '@/components/ui/sonar-grid';

/**
 * 1. Top Scroll Progress Bar + SUBCON Logo-Themed Back-to-Top Control
 */
export function TopScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const [scrollPercent, setScrollPercent] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setScrollPercent(Math.round(v * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Fixed Top SUBCON Dual-Tone (Cerulean Blue -> Gear Orange) Progress Hairline */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left bg-gradient-to-r from-[#009EE2] via-[#009EE2] to-[#EF7F1A]"
        aria-hidden="true"
      />

      {/* Floating Bottom-Right SUBCON Scroll Progress & Back-to-Top Button */}
      <AnimatePresence>
        {scrollPercent > 6 && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            aria-label="Scroll back to top of SUBCON 2027"
            className="fixed bottom-6 right-6 z-40 bg-[#1E2022] text-white border border-white/15 rounded-full pl-4 pr-2 py-2 shadow-2xl flex items-center gap-2.5 cursor-pointer group"
          >
            <span className="text-xs font-semibold text-white tabular-nums">
              {scrollPercent}%
            </span>
            <span className="w-7 h-7 rounded-full bg-[#EF7F1A] text-white flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * 2. Animated Counter that counts up smoothly whenever scrolled into view
 */
interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState<string>(value);

  useEffect(() => {
    const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;

    if (!isInView) {
      setDisplayValue(`${prefix}${(0).toFixed(decimals)}${suffix}`);
      return;
    }

    let rafId: number;
    const duration = 1100;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (target * eased).toFixed(decimals);
      setDisplayValue(`${prefix}${current}${suffix}`);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

/**
 * 3. Linea Waveform Caption Chip (.m-caption / .m-caption-2 with 4 animated SUBCON wave bars)
 */
interface LineaWaveCaptionProps {
  text: string;
  variant?: 'paper' | 'mint' | 'espresso' | 'blue' | 'orange';
  className?: string;
}

export function LineaWaveCaption({
  text,
  variant = 'paper',
  className = '',
}: LineaWaveCaptionProps) {
  if (variant === 'mint' || variant === 'orange') {
    return (
      <span className={`m-caption-2 ${className}`}>
        <span className="m-caption__wave" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="truncate">{text}</span>
      </span>
    );
  }

  if (variant === 'blue') {
    return (
      <span
        className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-[1.25rem_1.25rem_0.3125rem_1.25rem] bg-[#009EE2] text-white text-xs md:text-sm font-semibold shadow-xl ${className}`}
      >
        <span className="m-caption__wave" aria-hidden="true">
          <i style={{ background: '#ffffff' }} />
          <i style={{ background: '#EF7F1A' }} />
          <i style={{ background: '#ffffff' }} />
          <i style={{ background: '#EF7F1A' }} />
        </span>
        <span className="truncate">{text}</span>
      </span>
    );
  }

  if (variant === 'espresso') {
    return (
      <span
        className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-[1.25rem_1.25rem_1.25rem_0.3125rem] bg-[#1E2022] text-white text-xs md:text-sm font-medium shadow-xl border border-white/15 ${className}`}
      >
        <span className="m-caption__wave" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="truncate">{text}</span>
      </span>
    );
  }

  return (
    <span className={`m-caption ${className}`}>
      <span className="m-caption__wave" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="truncate">{text}</span>
    </span>
  );
}

/**
 * 4. Linea Rising Section Band Sheet (Replicates Linea's `bandRise` clip-path animation in SUBCON Logo Colors)
 */
interface LineaBandSheetProps {
  children: ReactNode;
  id?: string;
  theme?: 'paper' | 'sand' | 'espresso' | 'roast';
  className?: string;
  overlap?: boolean;
}

export function LineaBandSheet({
  children,
  id,
  theme = 'paper',
  className = '',
  overlap = true,
}: LineaBandSheetProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 18%'],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      'inset(0% 3.2% 0% 3.2% round 88px 88px 0px 0px)',
      'inset(0% 0% 0% 0% round 52px 52px 0px 0px)',
    ]
  );

  const themeClasses = {
    paper: 'bg-[#F8FAFC] text-[#1E2022]',
    sand: 'bg-[#EEF4F8] text-[#1E2022]',
    espresso: 'bg-[#1E2022] text-[#F8FAFC]',
    roast: 'bg-[#25282C] text-[#F8FAFC]',
  }[theme];

  const isDark = theme === 'espresso' || theme === 'roast';
  const paddingClasses = overlap
    ? 'pt-16 md:pt-24 pb-24 md:pb-32'
    : 'py-16 md:py-24';

  return (
    <section
      id={id}
      ref={ref}
      className={`relative isolation-isolate ${overlap ? '-mt-10 md:-mt-14' : ''} ${className}`}
    >
      <motion.div
        style={{ clipPath }}
        className={`pointer-events-none absolute inset-x-0 top-0 -bottom-14 z-0 ${themeClasses} shadow-[0_-24px_60px_rgba(30,32,34,0.16)]`}
        aria-hidden="true"
      />
      {isDark ? (
        <SonarGrid
          color={theme === 'espresso' ? '#009EE2' : '#EF7F1A'}
          spacing={26}
          baseOpacity={0.32}
          ringWidth={90}
          speed={260}
          amplitude={2.2}
          pingEvery={2.4}
          interactive
          className={`relative z-10 text-[#F8FAFC] ${paddingClasses}`}
        >
          {children}
        </SonarGrid>
      ) : (
        <div className={`relative z-10 text-[#1E2022] ${paddingClasses}`}>
          {children}
        </div>
      )}
    </section>
  );
}

/**
 * 5. Linea Masked Split-Line Reveal (`effects.captionIn` from Linea demo)
 */
interface LineaCaptionInProps {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}

export function LineaCaptionIn({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
}: LineaCaptionInProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  return (
    <span ref={containerRef} className={`block ${className}`}>
      {lines.map((line, idx) => (
        <span
          key={idx}
          className={`block overflow-hidden py-1 -my-1 ${lineClassName}`}
        >
          <motion.span
            initial={{ y: '105%', opacity: 0 }}
            animate={
              isInView
                ? { y: '0%', opacity: 1 }
                : { y: '105%', opacity: 0 }
            }
            transition={{
              duration: 0.85,
              delay: delay + idx * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="block will-change-transform"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * 6. Linea Scroll-Scrubbed Word Illumination (`effects.readAlong` + `transcribe` bar)
 */
interface LineaReadAlongProps {
  text: string;
  className?: string;
  mode?: 'fade' | 'transcribe';
}

export function LineaReadAlong({
  text,
  className = '',
  mode = 'fade',
}: LineaReadAlongProps) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 96%', 'end 64%'],
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={`flex flex-wrap gap-x-[0.28em] gap-y-1 ${className}`}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = Math.min(1, start + 1.8 / words.length);
        return (
          <LineaReadAlongWord
            key={`${word}-${index}`}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            mode={mode}
          />
        );
      })}
    </p>
  );
}

function LineaReadAlongWord({
  word,
  progress,
  range,
  mode,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
  mode: 'fade' | 'transcribe';
}) {
  const opacity = useTransform(progress, range, [0.45, 1]);
  const barScale = useTransform(progress, [range[0], (range[0] + range[1]) / 2, range[1]], [0, 1, 0]);

  return (
    <span className="relative inline-block">
      <motion.span style={{ opacity }} className="inline-block">
        {word}
      </motion.span>
      {mode === 'transcribe' && (
        <motion.span
          style={{ scaleY: barScale, opacity: barScale }}
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[58%] rounded bg-[repeating-linear-gradient(90deg,#009EE2_0_4px,transparent_4px_8px)]"
          aria-hidden="true"
        />
      )}
    </span>
  );
}

/**
 * 7. Linea Expanding Window Clip-Path & Zoom-Out Reveal (`#start .start__window`)
 */
interface LineaWindowRevealProps {
  children: ReactNode;
  imageUrl: string;
  imageAlt: string;
  className?: string;
  onClick?: () => void;
}

export function LineaWindowReveal({
  children,
  imageUrl,
  imageAlt,
  className = '',
  onClick,
}: LineaWindowRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 95%', 'start 22%'],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      'inset(9% 12% 9% 12% round 64px)',
      'inset(0% 0% 0% 0% round 28px)',
    ]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.26, 1]);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`relative overflow-hidden ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      <motion.div
        style={{ clipPath }}
        className="relative w-full h-full overflow-hidden rounded-[1.75rem] bg-[#1E2022]"
      >
        <motion.img
          style={{ scale }}
          src={imageUrl}
          alt={imageAlt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1E2022]/90 via-[#1E2022]/40 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1E2022]/90 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div className="relative z-10 w-full h-full">{children}</div>
      </motion.div>
    </div>
  );
}

/**
 * 8. Linea Flowing Architectural SVG Arcs in SUBCON Blue (#009EE2) & Gear Orange (#EF7F1A)
 */
export function LineaFlowingArcs({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.7], [0.15, 1]);
  const baseStroke = variant === 'dark' ? 'rgba(248, 250, 252, 0.2)' : 'rgba(30, 32, 34, 0.14)';

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 420"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M-60 340 C 320 80, 680 420, 1060 160 C 1240 40, 1380 210, 1520 110"
          stroke={baseStroke}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M-60 340 C 320 80, 680 420, 1060 160 C 1240 40, 1380 210, 1520 110"
          stroke="#009EE2"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength }}
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M-40 120 C 380 360, 820 -20, 1500 290"
          stroke="#EF7F1A"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength }}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/**
 * 9. Infinite Horizontal Marquee Ticker Strip (SUBCON Charcoal, Cerulean Blue & Gear Orange)
 */
interface InfiniteMarqueeRibbonProps {
  items: string[];
  label: string;
  direction?: 'left' | 'right';
  variant?: 'navy' | 'amber' | 'espresso' | 'mint';
}

export function InfiniteMarqueeRibbon({
  items,
  label,
  direction = 'left',
  variant = 'espresso',
}: InfiniteMarqueeRibbonProps) {
  const doubled = [...items, ...items];
  const isDark = variant === 'espresso' || variant === 'navy';

  return (
    <div
      className={`relative z-20 overflow-hidden py-3.5 border-y ${
        isDark
          ? 'bg-[#1E2022] border-white/12 text-[#F8FAFC]'
          : 'bg-[#EEF4F8] border-[#009EE2]/20 text-[#1E2022]'
      }`}
    >
      <div className="flex items-center">
        <div
          className={`hidden sm:flex items-center gap-2.5 px-5 py-1 z-10 font-bold text-xs uppercase tracking-widest shrink-0 border-r ${
            isDark
              ? 'bg-[#1E2022] text-[#009EE2] border-white/15'
              : 'bg-[#EEF4F8] text-[#009EE2] border-[#1E2022]/15'
          }`}
        >
          <span className="m-caption__wave" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>{label}</span>
        </div>

        <div className="overflow-hidden flex-1">
          <div
            className={
              direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
            }
          >
            {doubled.map((item, idx) => (
              <span
                key={`${item}-${idx}`}
                className={`inline-flex items-center gap-3 px-4 py-1 mx-2 text-xs font-semibold whitespace-nowrap ${
                  isDark ? 'text-white/90' : 'text-[#1E2022]/90'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    idx % 2 === 0 ? 'bg-[#009EE2]' : 'bg-[#EF7F1A]'
                  }`}
                  aria-hidden="true"
                />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FloatingBrochureGeometry() {
  return <LineaFlowingArcs variant="light" />;
}
