import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Maximize2, X, Handshake } from 'lucide-react';
import {
  LineaBandSheet,
  LineaCaptionIn,
  LineaReadAlong,
  LineaWaveCaption,
  LineaWindowReveal,
} from './ScrollAnimationPrimitives';
import { Marquee } from '@/components/ui/marquee';

interface SupporterItem {
  id: string;
  name: string;
  shortLabel: string;
  logoUrl: string;
}

interface SpecialExhibitorItem {
  id: string;
  categoryTitle: string;
  tierBadge: string;
  companyName: string;
  tagline: string;
  stallImageUrl: string;
  logoImageUrl: string;
}

const SUPPORTERS: SupporterItem[] = [
  {
    id: 'msme',
    name: 'Ministry of Micro, Small & Medium Enterprises',
    shortLabel: 'Ministry of MSME',
    logoUrl: './assets/subcon/supporter_msme.jpg',
  },
  {
    id: 'ppdc',
    name: 'Process and Product Development Centre',
    shortLabel: 'PPDC',
    logoUrl: './assets/subcon/supporter_ppdc.jpg',
  },
  {
    id: 'nsic',
    name: 'National Small Industries Corporation',
    shortLabel: 'NSIC',
    logoUrl: './assets/subcon/supporter_nsic.jpg',
  },
  {
    id: 'fametn',
    name: 'Facilitating MSMEs Tamil Nadu',
    shortLabel: 'FaMeTN',
    logoUrl: './assets/subcon/supporter_fametn.jpg',
  },
  {
    id: 'cdiic',
    name: 'CODISSIA Defense Innovation & Atal Incubation Centre',
    shortLabel: 'CDIIC',
    logoUrl: './assets/subcon/supporter_cdiic.jpg',
  },
  {
    id: 'niti',
    name: 'NITI Aayog — Government of India',
    shortLabel: 'NITI Aayog',
    logoUrl: './assets/subcon/supporter_niti.jpg',
  },
  {
    id: 'aim',
    name: 'Atal Innovation Mission',
    shortLabel: 'AIM',
    logoUrl: './assets/subcon/supporter_aim.jpg',
  },
];

const SPECIAL_EXHIBITORS: SpecialExhibitorItem[] = [
  {
    id: 'principal-pricol',
    categoryTitle: 'Principal Category Exhibitor',
    tierBadge: 'Principal Category',
    companyName: 'Pricol Limited',
    tagline:
      'Driver Information Systems, Sensors, Actuators & Precision Automotive Sub-Assemblies',
    stallImageUrl: './assets/subcon/hd_exhibitor_pricol.jpg',
    logoImageUrl: './assets/subcon/special_logo_pricol.jpg',
  },
  {
    id: 'gold-erfolg',
    categoryTitle: 'Gold Category Exhibitor',
    tierBadge: 'Gold Category',
    companyName: 'ERFOLG Industries',
    tagline:
      'Precision Machined Components, Industrial Sub-Assemblies & Engineering Solutions',
    stallImageUrl: './assets/subcon/hd_exhibitor_erfolg.jpg',
    logoImageUrl: './assets/subcon/special_logo_erfolg.jpg',
  },
  {
    id: 'silver-alpine',
    categoryTitle: 'Silver Category Exhibitor',
    tierBadge: 'Silver Category',
    companyName: 'Alpine Tape Pvt Ltd',
    tagline:
      'Industrial Adhesive Tapes, Custom B2B Packaging & Protective Surface Solutions (Since 2011)',
    stallImageUrl: './assets/subcon/special_stall_alpine.jpg',
    logoImageUrl: './assets/subcon/special_logo_alpine.jpg',
  },
];

export default function SpecialCategoryExhibitorsSection() {
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<{
    title: string;
    subtitle: string;
    imageUrl: string;
  } | null>(null);

  const principalExhibitor = SPECIAL_EXHIBITORS[0];
  const podiumExhibitors = SPECIAL_EXHIBITORS.slice(1);

  return (
    <LineaBandSheet id="exhibitors" theme="roast" overlap>
      <div className="max-w-[88rem] mx-auto px-4 sm:px-8 lg:px-14">
        {/* Linea #voices Editorial Header in SUBCON Logo Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-10 border-b border-white/12">
          <div className="lg:col-span-7">
            <div className="mb-4">
              <LineaWaveCaption
                text="Special Category Showcase · SUBCON 2025"
                variant="orange"
              />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold tracking-tight leading-[1.04] text-white">
              <LineaCaptionIn
                lines={[
                  <>Our Special Category</>,
                  <>
                    <span className="text-[#009EE2]">Exhibitors</span>{' '}
                    <em className="font-serif-instrument italic font-normal text-[#EF7F1A]">
                      — SUBCON 2025
                    </em>
                  </>,
                ]}
              />
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-4">
            <LineaReadAlong
              text="Recognising the flagship Principal, Gold, and Silver category exhibitors alongside the 7 official Government of India and Tamil Nadu agencies supporting SUBCON."
              className="text-sm sm:text-base text-[#9CA3AB] leading-relaxed"
            />

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setSelectedLightboxImage({
                    title: 'Our Special Category Exhibitors - SUBCON 2025',
                    subtitle: 'Official Brochure Showcase Sheet',
                    imageUrl: './assets/aistudio/subcon-09_1d27bd94.jpg',
                  })
                }
                className="linea-btn-fill bg-white text-[#1E2022] rounded-full px-5 py-3 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#009EE2]" />
                <span>Inspect Brochure Sheet</span>
              </button>

              <div className="linea-logo-pedestal p-1.5">
                <img
                  src="./assets/subcon/special_connect_badge.jpg"
                  alt="An Event to Connect Buyers + Manufacturers"
                  className="h-12 md:h-14 w-auto object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Institutional & Government Backing Gallery (Ice-Stone Sheet #EEF4F8) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-14 rounded-[1.75rem] bg-[#EEF4F8] text-[#1E2022] p-6 sm:p-8 lg:p-10 shadow-xl border border-[#009EE2]/20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-[#1E2022]/12">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#009EE2] text-white flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div>
                <p className="text-xs font-semibold text-[#64686D]">
                  Institutional &amp; Government Backing
                </p>
                <h3 className="text-lg sm:text-xl font-semibold text-[#1E2022] tracking-tight">
                  Supported By · Official Ministries &amp; Agencies
                </h3>
              </div>
            </div>

            <span className="text-xs font-bold text-[#EF7F1A]">
              7 Official Government Agencies &amp; 2 Strategic Partners
            </span>
          </div>

          {/* Marquee Animation for Official Government Supporters Small Rectangle Boxes */}
          <Marquee pauseOnHover speed={24} className="mt-0 sm:mt-0 mb-6">
            {SUPPORTERS.map((supporter) => (
              <div
                key={supporter.id}
                className="mx-2.5 w-44 sm:w-48 rounded-2xl bg-white border border-[#009EE2]/20 px-4 py-3.5 flex flex-col items-center justify-between text-center shadow-sm hover:border-[#009EE2] hover:shadow-md transition-all group shrink-0"
              >
                <div className="h-14 flex items-center justify-center p-1">
                  <img
                    src={supporter.logoUrl}
                    alt={supporter.name}
                    className="max-h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs font-semibold text-[#1E2022] mt-2 truncate w-full">
                  {supporter.shortLabel}
                </span>
              </div>
            ))}
          </Marquee>

          {/* Conference Partner & E-Magazine Partner */}
          <div className="pt-6 border-t border-[#1E2022]/12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#009EE2]/18 p-4 sm:p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#009EE2]">
                  Conference Partner
                </p>
                <p className="text-lg font-semibold text-[#1E2022] mt-0.5">
                  Texas Ventures
                </p>
              </div>
              <div className="bg-white rounded-xl px-4 py-2 border border-[#1E2022]/10 shrink-0">
                <img
                  src="./assets/subcon/partner_texas.jpg"
                  alt="Texas Ventures — Conference Partner"
                  className="h-9 w-auto object-contain"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-[#EF7F1A]/25 p-4 sm:p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#EF7F1A]">
                  E-Magazine Partner
                </p>
                <p className="text-lg font-semibold text-[#1E2022] mt-0.5">
                  Industry 4.0
                </p>
              </div>
              <div className="bg-white rounded-xl px-4 py-2 border border-[#1E2022]/10 shrink-0">
                <img
                  src="./assets/subcon/partner_industry40.jpg"
                  alt="Industry 4.0 — E-Magazine Partner"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* TIER 1: Principal Category Exhibitor (Pricol Limited) using Linea #start__window Expanding Reveal */}
        <div className="mt-8">
          <LineaWindowReveal
            imageUrl={principalExhibitor.stallImageUrl}
            imageAlt={`${principalExhibitor.companyName} — ${principalExhibitor.categoryTitle} Stall at SUBCON 2025`}
            onClick={() =>
              setSelectedLightboxImage({
                title: `${principalExhibitor.categoryTitle} — ${principalExhibitor.companyName}`,
                subtitle: principalExhibitor.tagline,
                imageUrl: principalExhibitor.stallImageUrl,
              })
            }
            className="min-h-[380px] sm:min-h-[450px]"
          >
            <div className="p-6 sm:p-10 lg:p-12 min-h-[380px] sm:min-h-[450px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7 space-y-4">
                <LineaWaveCaption
                  text={principalExhibitor.categoryTitle}
                  variant="blue"
                />
                <h3 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
                  {principalExhibitor.companyName}
                </h3>
                <p className="text-sm sm:text-base text-white/85 max-w-xl leading-relaxed">
                  {principalExhibitor.tagline}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full bg-[#EF7F1A] text-white shadow-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Principal Stall Photo</span>
                </span>
              </div>

              <div className="lg:col-span-5 flex lg:justify-end">
                <div className="linea-logo-pedestal p-6 w-full max-w-sm flex flex-col items-center justify-center min-h-[140px]">
                  <img
                    src={principalExhibitor.logoImageUrl}
                    alt={`${principalExhibitor.companyName} Official Logo`}
                    className="max-h-24 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </LineaWindowReveal>
        </div>

        {/* TIER 2 & 3: Gold (ERFOLG Industries) & Silver (Alpine Tape) in Linea #voices Asymmetric Columns */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {podiumExhibitors.map((exhibitor, index) => (
            <motion.article
              key={exhibitor.id}
              initial={{ opacity: 0, y: index === 0 ? 28 : 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -5 }}
              className="rounded-[1.75rem] bg-white text-[#1E2022] p-6 sm:p-7 shadow-xl flex flex-col justify-between gap-6 border border-[#009EE2]/20"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-[#1E2022]">
                    <Handshake
                      className={`w-4 h-4 ${
                        index === 0 ? 'text-[#EF7F1A]' : 'text-[#009EE2]'
                      }`}
                    />
                    <span>{exhibitor.categoryTitle}</span>
                  </span>
                  <span
                    className={`text-xs font-bold px-3.5 py-1 rounded-full ${
                      index === 0
                        ? 'bg-[#EF7F1A] text-white'
                        : 'bg-[#009EE2] text-white'
                    }`}
                  >
                    {exhibitor.tierBadge}
                  </span>
                </div>

                {/* Stall Image with Rounded Frame */}
                <div
                  onClick={() =>
                    setSelectedLightboxImage({
                      title: `${exhibitor.categoryTitle} — ${exhibitor.companyName}`,
                      subtitle: exhibitor.tagline,
                      imageUrl: exhibitor.stallImageUrl,
                    })
                  }
                  className="group relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#1E2022] cursor-pointer"
                >
                  <img
                    src={exhibitor.stallImageUrl}
                    alt={`${exhibitor.companyName} — ${exhibitor.categoryTitle} Stall at SUBCON 2025`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2022]/85 via-transparent to-transparent flex items-end justify-between p-4">
                    <span className="text-white text-xs font-semibold">
                      {exhibitor.companyName} Pavilion
                    </span>
                    <span className="bg-white text-[#1E2022] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <Maximize2 className="w-3 h-3 text-[#009EE2]" />
                      <span>Inspect</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Brand Logo & Description */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-2 border-t border-[#1E2022]/10">
                <div className="sm:col-span-5 bg-[#F8FAFC] rounded-2xl border border-[#009EE2]/18 p-3.5 flex items-center justify-center min-h-[96px]">
                  <img
                    src={exhibitor.logoImageUrl}
                    alt={`${exhibitor.companyName} Official Logo`}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>

                <div className="sm:col-span-7">
                  <h4 className="text-xl font-semibold text-[#1E2022] tracking-tight">
                    {exhibitor.companyName}
                  </h4>
                  <p className="text-xs text-[#64686D] mt-1 leading-relaxed">
                    {exhibitor.tagline}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Inspecting Stalls or Full Brochure Sheet */}
      <AnimatePresence>
        {selectedLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLightboxImage(null)}
            className="fixed inset-0 z-50 bg-[#1E2022]/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-[1.75rem] bg-white text-[#1E2022] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="px-6 py-4 bg-[#1E2022] text-white flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm md:text-base font-semibold">
                    {selectedLightboxImage.title}
                  </h3>
                  <p className="text-xs text-[#9CA3AB]">{selectedLightboxImage.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLightboxImage(null)}
                  className="rounded-full bg-[#EF7F1A] hover:bg-[#D96D0D] p-2 text-white transition-colors cursor-pointer"
                  aria-label="Close preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 md:p-6 overflow-y-auto flex items-center justify-center bg-[#272A2E]">
                <img
                  src={selectedLightboxImage.imageUrl}
                  alt={selectedLightboxImage.title}
                  className="max-h-[72vh] w-auto object-contain rounded-xl shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LineaBandSheet>
  );
}
