import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Globe,
  ArrowRight,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
  FileText,
  ChevronDown,
  Calendar,
} from 'lucide-react';
import AboutSection from '../components/AboutSection';
import FeaturedVideoSection from '../components/FeaturedVideoSection';
import PhilosophySection from '../components/PhilosophySection';
import ServicesSection from '../components/ServicesSection';
import WorkshopScheduleSection from '../components/WorkshopScheduleSection';
import SpecialCategoryExhibitorsSection from '../components/SpecialCategoryExhibitorsSection';
import RegistrationModal from '../components/RegistrationModal';
import {
  TopScrollProgressBar,
  InfiniteMarqueeRibbon,
  LineaCaptionIn,
  LineaWaveCaption,
} from '../components/ScrollAnimationPrimitives';
import {
  EVENT_INFO,
  PARTICIPATING_PSUS,
  PAST_EXHIBITORS_LIST,
} from '../data/subconData';
import { toggleSavedWorkshop } from '../utils/subconLogic';
import { SonarGrid } from '@/components/ui/sonar-grid';

export default function Index() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  const fadeStateRef = useRef<{
    isFadingOut: boolean;
    rafId: number | null;
    timeoutId: number | null;
  }>({
    isFadingOut: false,
    rafId: null,
    timeoutId: null,
  });

  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(false);

  const [savedWorkshopIds, setSavedWorkshopIds] = useState<string[]>([
    'ws-day1-inauguration',
    'ws-day1-psu-defence',
  ]);
  const [workshopExternalQuery, setWorkshopExternalQuery] = useState<string>('');

  // Linea #hero:exit scroll parallax
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroCopyY = useTransform(heroScroll, [0, 1], [0, -110]);
  const heroMediaScale = useTransform(heroScroll, [0, 1], [1, 1.1]);

  // Linea #footer rising wordmark & SVG stroke draw
  const { scrollYProgress: footerScroll } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });
  const footerWordY = useTransform(footerScroll, [0, 1], ['55%', '0%']);
  const footerStrokeLength = useTransform(footerScroll, [0.1, 0.9], [0, 1]);

  // Vanilla JS video fade logic via refs
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '0';

    const animateOpacity = (from: number, to: number, durationMs: number) => {
      if (fadeStateRef.current.rafId !== null) {
        cancelAnimationFrame(fadeStateRef.current.rafId);
      }
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        const current = from + (to - from) * progress;
        if (videoRef.current) {
          videoRef.current.style.opacity = String(current);
        }
        if (progress < 1) {
          fadeStateRef.current.rafId = requestAnimationFrame(step);
        } else {
          fadeStateRef.current.rafId = null;
        }
      };
      fadeStateRef.current.rafId = requestAnimationFrame(step);
    };

    const handleCanPlay = () => {
      video.play().catch(() => {});
      animateOpacity(0, 1, 500);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || isNaN(video.duration)) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && !fadeStateRef.current.isFadingOut) {
        fadeStateRef.current.isFadingOut = true;
        const currentOpacity = parseFloat(video.style.opacity || '1');
        animateOpacity(currentOpacity, 0, 500);
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      fadeStateRef.current.isFadingOut = false;
      fadeStateRef.current.timeoutId = window.setTimeout(() => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        animateOpacity(0, 1, 500);
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay, { once: true });
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      if (fadeStateRef.current.rafId !== null) {
        cancelAnimationFrame(fadeStateRef.current.rafId);
      }
      if (fadeStateRef.current.timeoutId !== null) {
        clearTimeout(fadeStateRef.current.timeoutId);
      }
    };
  }, []);

  const handleToggleSaveWorkshop = (sessionId: string) => {
    setSavedWorkshopIds((prev) => toggleSavedWorkshop(prev, sessionId));
  };

  const handleInspectSpeaker = (_speakerId: string) => {
    const el = document.getElementById('exhibitors');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProcessForWorkshop = (processTitle: string) => {
    const keyword = processTitle.split(',')[0].trim();
    setWorkshopExternalQuery(keyword);
    const el = document.getElementById('workshops');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#1E2022] text-[#1E2022]">
      <TopScrollProgressBar />

      {/* SECTION 1 -- HERO BANNER IN SUBCON 2027 LOGO COLOR THEME + LINEA FLOWING ARCS */}
      <div
        ref={heroRef}
        className="min-h-screen overflow-hidden relative flex flex-col justify-between bg-[#1E2022] text-white"
      >
        <motion.div
          style={{ scale: heroMediaScale }}
          className="absolute inset-0 pointer-events-none origin-top-right"
        >
          <video
            ref={videoRef}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
            className="w-full h-full object-cover object-bottom"
            muted
            autoPlay
            playsInline
            preload="auto"
            style={{ opacity: 0 }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#1E2022]/80 via-[#1E2022]/45 to-[#1E2022]/92"
            aria-hidden="true"
          />
        </motion.div>

        {/* Linea #hero .hero__lines Flowing Elliptical SVG Arcs in SUBCON Blue (#009EE2) & Gear Orange (#EF7F1A) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <svg
            viewBox="0 0 1440 900"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <ellipse
              cx="78%"
              cy="128%"
              rx="42%"
              ry="68%"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <ellipse
              cx="78%"
              cy="128%"
              rx="42%"
              ry="68%"
              stroke="#009EE2"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="0.18 0.82"
              className="animate-linea-flow"
              vectorEffect="non-scaling-stroke"
            />
            <ellipse
              cx="50%"
              cy="168%"
              rx="78%"
              ry="94%"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <ellipse
              cx="50%"
              cy="168%"
              rx="78%"
              ry="94%"
              stroke="#EF7F1A"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="0.14 0.86"
              className="animate-linea-flow"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Interactive SonarGrid Layer over Dark Hero Backdrop */}
        <SonarGrid
          color="#009EE2"
          spacing={26}
          baseOpacity={0.32}
          ringWidth={90}
          speed={260}
          amplitude={2.2}
          pingEvery={2.4}
          interactive
          className="relative z-10 flex-1 flex flex-col justify-between pb-12"
        >
        {/* Linea #nav Floating Navigation Bar (3-Zone Top Bar Contract in SUBCON Logo Colors) */}
        <header className="relative z-30 px-4 sm:px-6 pt-5">
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[84rem] mx-auto pl-3 pr-2 py-2 rounded-full bg-white/95 backdrop-blur-xl border border-[#009EE2]/25 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)] flex items-center justify-between gap-8"
          >
            {/* Zone 1: Official SUBCON 2027 Logo */}
            <a
              href="#"
              aria-label="SUBCON 2027 — 10th Edition Home"
              className="flex items-center px-2.5 py-1 transition-transform duration-300 hover:scale-[1.02] shrink-0"
            >
              <img
                src="/assets/aistudio/subcon_2027_logo_d983b746.png"
                alt="SUBCON 2027 — 10th Edition Source For Successful Outsourcing"
                className="h-8 md:h-9 w-auto object-contain"
              />
            </a>

            {/* Zone 2: 4 Clean Single-Line Nav Links */}
            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#1E2022]"
            >
              <a
                href="#about"
                className="nav-link-underline hover:text-[#009EE2] transition-colors whitespace-nowrap shrink-0"
              >
                About
              </a>
              <a
                href="#processes"
                className="nav-link-underline hover:text-[#009EE2] transition-colors whitespace-nowrap shrink-0"
              >
                Processes
              </a>
              <a
                href="#workshops"
                className="nav-link-underline hover:text-[#009EE2] transition-colors whitespace-nowrap shrink-0"
              >
                Workshops
              </a>
              <a
                href="#exhibitors"
                className="nav-link-underline hover:text-[#009EE2] transition-colors whitespace-nowrap shrink-0"
              >
                Exhibitors
              </a>
            </nav>

            {/* Zone 3: 1 Primary Action in SUBCON Gear Orange (#EF7F1A) */}
            <button
              type="button"
              onClick={() => setIsRegistrationOpen(true)}
              className="bg-[#EF7F1A] hover:bg-[#D96D0D] text-white rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-md"
            >
              Register Pass
            </button>
          </motion.div>
        </header>

        {/* Hero Content (Mirroring SUBCON 2027 Logo Lockup & Color Theme + Linea Animations) */}
        <motion.main
          style={{ y: heroCopyY }}
          className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 text-center"
        >
          {/* Linea Waveform Caption Badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mb-6"
          >
            <LineaWaveCaption
              text={`${EVENT_INFO.edition} · ${EVENT_INFO.dates} · CODISSIA Trade Fair Complex, Coimbatore`}
              variant="paper"
            />
          </motion.div>

          {/* Bold Monumental SUBCON 2027 Title Matching Logo Palette (#009EE2 SUBCON + White/Orange 2027) */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight uppercase leading-[0.95] mb-5">
            <LineaCaptionIn
              lines={[
                <>
                  <span className="text-[#009EE2] drop-shadow-[0_6px_28px_rgba(0,158,226,0.35)]">
                    SUBCON
                  </span>{' '}
                  <span className="text-white">2027</span>
                </>,
              ]}
            />
          </h1>

          {/* SUBCON Logo-Inspired Horizontal Rule Frame for "Source For Successful Outsourcing" */}
          <div className="border-y-2 border-white/25 py-3 px-6 sm:px-10 mb-7 bg-[#1E2022]/45 backdrop-blur-md rounded-2xl">
            <div className="text-xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              <LineaCaptionIn
                delay={0.14}
                lines={[
                  <>
                    Source For Successful{' '}
                    <em className="italic font-serif-instrument font-normal text-[#EF7F1A]">
                      Outsourcing.
                    </em>
                  </>,
                ]}
              />
            </div>
          </div>

          {/* MSMEs + PSUs + Large Industries Linea Waveform Chips in SUBCON Blue & Orange */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mb-7"
          >
            <LineaWaveCaption text="MSMEs" variant="blue" />
            <span className="text-[#EF7F1A] font-extrabold text-xl">+</span>
            <LineaWaveCaption text="PSUs" variant="orange" />
            <span className="text-[#009EE2] font-extrabold text-xl">+</span>
            <LineaWaveCaption text="Large Industries" variant="paper" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="text-white/90 text-sm md:text-base font-medium tracking-wide max-w-xl mb-8"
          >
            An Event to Connect Buyers + Manufacturers · Organised by CODISSIA
          </motion.p>

          {/* CTA Buttons in SUBCON Gear Orange (#EF7F1A) & Cerulean Blue (#009EE2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={() => setIsRegistrationOpen(true)}
              className="bg-[#EF7F1A] hover:bg-[#D96D0D] text-white rounded-full px-8 py-3.5 text-sm font-bold tracking-wide shadow-[0_14px_32px_-8px_rgba(239,127,26,0.55)] flex items-center gap-2.5 cursor-pointer transition-transform duration-300 hover:scale-[1.03] group/cta"
            >
              <span>Register Visitor Pass</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('workshops')}
              className="liquid-glass liquid-glass-interactive rounded-full px-8 py-3.5 text-white text-sm font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#009EE2]" />
              <span>Workshop Schedule</span>
            </button>
          </motion.div>
        </motion.main>

        {/* Bottom Social & Scroll Prompt */}
        <div className="relative z-10 flex flex-col items-center gap-3 pb-4">
          <div className="flex justify-center gap-3">
            <a
              href="#exhibitors"
              aria-label="Instagram"
              className="linea-btn-fill rounded-full p-3.5 border border-white/20 text-white"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#workshops"
              aria-label="Twitter"
              className="linea-btn-fill rounded-full p-3.5 border border-white/20 text-white"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${EVENT_INFO.email}`}
              aria-label="Website"
              className="linea-btn-fill rounded-full p-3.5 border border-white/20 text-white"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>

          <motion.button
            type="button"
            onClick={() => scrollToSection('about')}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/75 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
          >
            <span>Scroll to explore</span>
            <ChevronDown className="w-4 h-4 text-[#009EE2]" />
          </motion.button>
        </div>
        </SonarGrid>
      </div>

      {/* LIVE MARQUEE 1: Participating PSUs */}
      <InfiniteMarqueeRibbon
        label="Participating PSUs"
        items={PARTICIPATING_PSUS}
        direction="left"
        variant="espresso"
      />

      {/* SECTION 2 -- ABOUT SECTION */}
      <AboutSection onOpenRegistration={() => setIsRegistrationOpen(true)} />

      {/* SECTION 3 -- FEATURED SHOWCASE */}
      <FeaturedVideoSection
        onExploreWorkshops={() => scrollToSection('workshops')}
      />

      {/* SECTION 4 -- PHILOSOPHY / INNOVATION x VISION */}
      <PhilosophySection />

      {/* SECTION 5 -- SERVICES / PROCESSES & SUB-ASSEMBLIES */}
      <ServicesSection
        onSelectProcessForWorkshop={handleSelectProcessForWorkshop}
      />

      {/* SECTION 6 -- WORKSHOP SCHEDULE */}
      <WorkshopScheduleSection
        savedWorkshopIds={savedWorkshopIds}
        onToggleSaveWorkshop={handleToggleSaveWorkshop}
        onInspectSpeaker={handleInspectSpeaker}
        externalSearchQuery={workshopExternalQuery}
        onClearExternalSearch={() => setWorkshopExternalQuery('')}
      />

      {/* SECTION 7 -- OUR SPECIAL CATEGORY EXHIBITORS (SUBCON 2025) */}
      <SpecialCategoryExhibitorsSection />

      {/* LIVE MARQUEE 2: Exhibitors */}
      <InfiniteMarqueeRibbon
        label="160+ Exhibitors"
        items={PAST_EXHIBITORS_LIST.slice(0, 24)}
        direction="right"
        variant="mint"
      />

      {/* LINEA #footer ARCHITECTURAL FOOTER WITH SUBCON 2027 LOGO THEME + SONAR GRID */}
      <footer
        ref={footerRef}
        className="bg-[#1E2022] text-white overflow-hidden border-t border-white/10"
      >
        <SonarGrid
          color="#009EE2"
          spacing={26}
          baseOpacity={0.3}
          ringWidth={90}
          speed={260}
          amplitude={2.2}
          pingEvery={2.4}
          interactive
          className="pt-16 pb-10 px-4 sm:px-8 lg:px-14"
        >
        <div className="max-w-[88rem] mx-auto">
          {/* Top Columns (#footer__top) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <a
                href="#"
                aria-label="SUBCON 2027 — 10th Edition"
                className="inline-flex items-center bg-white rounded-2xl px-5 py-3 shadow-lg border border-[#009EE2]/20 transition-transform duration-300 hover:scale-[1.02]"
              >
                <img
                  src="/assets/aistudio/subcon_2027_logo_d983b746.png"
                  alt="SUBCON 2027 — 10th Edition Source For Successful Outsourcing"
                  className="h-9 md:h-10 w-auto object-contain"
                />
              </a>
              <p className="text-sm text-[#9CA3AB] max-w-sm leading-relaxed">
                Source For Successful Outsourcing · Organised by CODISSIA Intec Technology Centre, Coimbatore.
              </p>
            </div>

            <div className="lg:col-span-4 space-y-2.5 text-xs sm:text-sm text-[#9CA3AB]">
              <p className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
                Venue &amp; Secretariat
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#009EE2] shrink-0" />
                <span>CODISSIA Trade Fair Complex, Coimbatore</span>
              </p>
              <p className="flex items-center gap-2.5 tabular-nums">
                <Phone className="w-4 h-4 text-[#EF7F1A] shrink-0" />
                <span>
                  {EVENT_INFO.phones[0]} · Mob: {EVENT_INFO.mobiles[0]}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#009EE2] shrink-0" />
                <a
                  href={`mailto:${EVENT_INFO.email}`}
                  className="m-link text-white"
                >
                  {EVENT_INFO.email}
                </a>
              </p>
            </div>

            <div className="lg:col-span-3 flex flex-wrap lg:justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsRegistrationOpen(true)}
                className="bg-[#EF7F1A] hover:bg-[#D96D0D] text-white rounded-full px-6 py-3 text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-md"
              >
                Register Pass
              </button>
              <a
                href={EVENT_INFO.brochurePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="linea-btn-fill rounded-full border border-white/20 px-5 py-3 text-xs font-semibold text-white flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-[#009EE2]" />
                <span>Brochure PDF</span>
              </a>
            </div>
          </div>

          {/* Linea #footer__brand Rising Monumental Wordmark + Self-Drawing SUBCON Globe/Gear SVG Mark */}
          <div className="pt-10 pb-6 flex items-end justify-between gap-6 overflow-hidden">
            <svg
              viewBox="0 0 120 84"
              fill="none"
              className="w-20 sm:w-32 md:w-40 h-auto shrink-0 mb-1"
              aria-hidden="true"
            >
              <motion.path
                d="M12 52 C 28 12, 92 12, 108 52"
                stroke="#009EE2"
                strokeWidth="6"
                strokeLinecap="round"
                style={{ pathLength: footerStrokeLength }}
              />
              <motion.path
                d="M12 42 L 108 42"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength: footerStrokeLength }}
              />
              <motion.path
                d="M22 58 C 42 78, 78 78, 98 58"
                stroke="#EF7F1A"
                strokeWidth="6"
                strokeLinecap="round"
                style={{ pathLength: footerStrokeLength }}
              />
            </svg>

            <motion.p
              style={{ y: footerWordY }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-tighter leading-[0.82] text-white select-none whitespace-nowrap"
            >
              <span className="text-[#009EE2]">SUBCON</span>{' '}
              <span className="text-[#EF7F1A]">2027</span>
            </motion.p>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#9CA3AB]">
            <p>© 2027 CODISSIA Intec Technology Centre. All rights reserved.</p>
            <p>12th – 14th May 2027 · CODISSIA Trade Fair Complex, Coimbatore</p>
          </div>
        </div>
        </SonarGrid>
      </footer>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        initialEmail=""
        savedWorkshopIds={savedWorkshopIds}
      />
    </div>
  );
}
