import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  Camera,
  Calendar,
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Award,
} from 'lucide-react';
import {
  SPEAKER_PROFILES,
  VISUAL_GALLERY_ITEMS,
  SpeakerProfile,
  GalleryItem,
} from '../data/subconData';
import { FloatingBrochureGeometry } from './ScrollAnimationPrimitives';

interface SpeakersGallerySectionProps {
  focusedSpeakerId: string | null;
  onSelectSpeaker: (speakerId: string) => void;
}

export default function SpeakersGallerySection({
  focusedSpeakerId,
  onSelectSpeaker,
}: SpeakersGallerySectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const [activeSpeakerId, setActiveSpeakerId] = useState<string>(SPEAKER_PROFILES[0].id);
  const [activeSpeakerPhotoIdx, setActiveSpeakerPhotoIdx] = useState<number>(0);

  const [lightboxItem, setLightboxItem] = useState<{
    image: string;
    title: string;
    subtitle: string;
  } | null>(null);

  useEffect(() => {
    if (focusedSpeakerId) {
      setActiveSpeakerId(focusedSpeakerId);
      setActiveSpeakerPhotoIdx(0);
    }
  }, [focusedSpeakerId]);

  const activeSpeaker: SpeakerProfile =
    SPEAKER_PROFILES.find((s) => s.id === activeSpeakerId) || SPEAKER_PROFILES[0];

  const activeGalleryPhoto =
    activeSpeaker.gallery[activeSpeakerPhotoIdx] || activeSpeaker.gallery[0];

  const curatedGallery: GalleryItem[] = VISUAL_GALLERY_ITEMS.slice(0, 8);

  return (
    <section
      id="speakers"
      ref={ref}
      className="relative bg-gradient-to-b from-[#F0F7FF] via-[#F4F8FC] to-white py-16 md:py-24 px-6 overflow-hidden text-slate-900"
    >
      <FloatingBrochureGeometry />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          className="mb-8"
        >
          <p className="text-sky-700 font-bold text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-sky-600 animate-ping" />
            <span>Keynotes &amp; Visual Archive</span>
          </p>
          <h2 className="text-4xl md:text-5xl text-[#0F2557] font-bold tracking-tight">
            Speakers &amp;{' '}
            <span className="font-serif-instrument italic font-normal text-sky-600">
              Visual Gallery
            </span>
          </h2>
        </motion.div>

        {/* 5 Visual Speaker Portrait Cards */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8"
          role="tablist"
          aria-label="Keynote Speakers"
        >
          {SPEAKER_PROFILES.map((speaker, idx) => {
            const isSelected = speaker.id === activeSpeaker.id;
            return (
              <motion.button
                key={speaker.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ delay: idx * 0.04 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActiveSpeakerId(speaker.id);
                  setActiveSpeakerPhotoIdx(0);
                  onSelectSpeaker(speaker.id);
                }}
                className={`group text-left rounded-2xl overflow-hidden transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F2557] text-white shadow-xl ring-2 ring-amber-400'
                    : 'bg-white text-slate-900 border border-sky-200 hover:border-sky-400 shadow-sm'
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={speaker.avatarImage}
                    alt={speaker.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute top-2 left-2 bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {speaker.sessionDay.split('·')[0].trim()}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-xs md:text-sm font-bold truncate">
                    {speaker.name}
                  </h3>
                  <p
                    className={`text-[11px] truncate ${
                      isSelected ? 'text-sky-200' : 'text-slate-500'
                    }`}
                  >
                    {speaker.organization}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Visual-First Speaker Stage (Photo Gallery + Visual Badges, Zero Long Text) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          className="bg-white border border-sky-200 shadow-xl rounded-3xl p-5 md:p-7 mb-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Main Visual Stage */}
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 shadow-md group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeGalleryPhoto.id}
                  src={activeGalleryPhoto.image}
                  alt={activeGalleryPhoto.caption}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover animate-ken-burns"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F2557]/90 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous speaker photo"
                  onClick={() =>
                    setActiveSpeakerPhotoIdx((prev) =>
                      prev === 0 ? activeSpeaker.gallery.length - 1 : prev - 1
                    )
                  }
                  className="bg-white/90 hover:bg-white rounded-full p-2 text-[#0F2557] shadow-md cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next speaker photo"
                  onClick={() =>
                    setActiveSpeakerPhotoIdx((prev) =>
                      prev === activeSpeaker.gallery.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="bg-white/90 hover:bg-white rounded-full p-2 text-[#0F2557] shadow-md cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  setLightboxItem({
                    image: activeGalleryPhoto.image,
                    title: activeSpeaker.name,
                    subtitle: activeGalleryPhoto.caption,
                  })
                }
                aria-label="Expand image"
                className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 text-[#0F2557] shadow-md cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between gap-4">
                <div>
                  <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full mb-1">
                    {activeSpeaker.categoryLabel}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold">
                    {activeSpeaker.name}
                  </h3>
                  <p className="text-xs text-sky-200">{activeSpeaker.designation}</p>
                </div>
                <span className="text-xs font-mono text-amber-300 shrink-0">
                  {activeSpeakerPhotoIdx + 1} / {activeSpeaker.gallery.length}
                </span>
              </div>
            </div>

            {/* Right: 2x2 Visual Thumbnail Grid + Session Pill */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              <div className="grid grid-cols-2 gap-2.5">
                {activeSpeaker.gallery.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    onMouseEnter={() => setActiveSpeakerPhotoIdx(idx)}
                    onClick={() => setActiveSpeakerPhotoIdx(idx)}
                    className={`rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer ${
                      idx === activeSpeakerPhotoIdx
                        ? 'border-sky-600 shadow-md'
                        : 'border-transparent opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>

              <div className="bg-[#F0F7FF] border border-sky-200 rounded-2xl p-4 space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-sky-800 font-bold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    {activeSpeaker.sessionDay}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    {activeSpeaker.hall.split('—')[0].trim()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeSpeaker.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="text-[11px] bg-white border border-sky-200 text-[#0F2557] font-semibold px-2.5 py-0.5 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 8-Photo Exhibition Glimpses Grid */}
        <div id="gallery">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl md:text-3xl text-[#0F2557] font-bold tracking-tight flex items-center gap-2">
              <Camera className="w-5 h-5 text-sky-600" />
              <span>Exhibition Glimpses</span>
            </h3>
            <span className="text-xs text-slate-500 font-semibold">Click any photo to zoom</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {curatedGallery.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: (idx % 4) * 0.04 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() =>
                  setLightboxItem({
                    image: item.image,
                    title: item.title,
                    subtitle: item.exhibitorOrHighlight,
                  })
                }
                className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 shadow-sm hover:shadow-xl group cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F2557]/90 via-transparent to-transparent" />
                <span className="absolute top-2.5 right-2.5 bg-white/90 rounded-full p-1.5 text-[#0F2557] shadow-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <p className="text-[10px] text-amber-300 font-bold uppercase flex items-center gap-1 truncate">
                    <Award className="w-3 h-3 shrink-0" />
                    <span>{item.exhibitorOrHighlight}</span>
                  </p>
                  <h4 className="text-xs font-bold truncate">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          className="fixed inset-0 z-50 bg-[#0F2557]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxItem(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-sky-200 rounded-3xl max-w-4xl w-full p-4 md:p-6 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <div>
                <h4 className="text-base md:text-lg text-[#0F2557] font-bold">
                  {lightboxItem.title}
                </h4>
                <p className="text-xs text-slate-600">{lightboxItem.subtitle}</p>
              </div>
              <button
                type="button"
                aria-label="Close preview"
                onClick={() => setLightboxItem(null)}
                className="bg-sky-50 hover:bg-sky-100 rounded-full p-2 text-[#0F2557] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden bg-slate-950 max-h-[75vh] flex items-center justify-center">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] w-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
