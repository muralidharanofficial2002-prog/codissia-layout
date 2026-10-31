import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  Bookmark,
  BookmarkCheck,
  Users,
  UserCheck,
  Calendar,
} from 'lucide-react';
import { WORKSHOP_SESSIONS, WorkshopSession } from '../data/subconData';
import {
  filterWorkshops,
  getRemainingSeats,
} from '../utils/subconLogic';
import {
  LineaBandSheet,
  LineaCaptionIn,
  LineaReadAlong,
  LineaWaveCaption,
} from './ScrollAnimationPrimitives';

interface WorkshopScheduleSectionProps {
  savedWorkshopIds: string[];
  onToggleSaveWorkshop: (sessionId: string) => void;
  onInspectSpeaker: (speakerId: string) => void;
  externalSearchQuery?: string;
  onClearExternalSearch?: () => void;
}

const DAY_OPTIONS: Array<{ value: 'All Days' | 'Day 1' | 'Day 2' | 'Day 3'; label: string }> = [
  { value: 'All Days', label: 'All Days' },
  { value: 'Day 1', label: 'Day 1 · May 12' },
  { value: 'Day 2', label: 'Day 2 · May 13' },
  { value: 'Day 3', label: 'Day 3 · May 14' },
];

export default function WorkshopScheduleSection({
  savedWorkshopIds,
  onToggleSaveWorkshop,
  onInspectSpeaker,
  externalSearchQuery = '',
  onClearExternalSearch,
}: WorkshopScheduleSectionProps) {
  const [selectedDay, setSelectedDay] = useState<'All Days' | 'Day 1' | 'Day 2' | 'Day 3'>('All Days');
  const [onlySaved, setOnlySaved] = useState<boolean>(false);

  const filteredSessions = filterWorkshops(WORKSHOP_SESSIONS, {
    day: selectedDay,
    track: 'All Tracks',
    searchQuery: externalSearchQuery,
    onlySaved,
    savedIds: savedWorkshopIds,
  });

  const savedSessionObjects = WORKSHOP_SESSIONS.filter((s) =>
    savedWorkshopIds.includes(s.id)
  );

  return (
    <LineaBandSheet id="workshops" theme="paper" overlap>
      <div className="max-w-[88rem] mx-auto px-4 sm:px-8 lg:px-14">
        {/* Linea #calls / #faq Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-10 border-b border-[#1E2022]/12">
          <div className="lg:col-span-7">
            <div className="mb-4">
              <LineaWaveCaption
                text="12th – 14th May 2027 · Technical & Vendor Development Sessions"
                variant="blue"
              />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-semibold tracking-tight leading-[1.03] text-[#1E2022]">
              <LineaCaptionIn
                lines={[
                  <>
                    Workshop{' '}
                    <em className="font-serif-instrument italic font-normal text-[#EF7F1A]">
                      Schedule.
                    </em>
                  </>,
                ]}
              />
            </h2>
          </div>

          <div className="lg:col-span-5">
            <LineaReadAlong
              text="Bookmark technical seminars, defence indigenisation briefings, and PSU vendor registration sessions to build your personal SUBCON 2027 delegate itinerary."
              className="text-sm sm:text-base text-[#64686D] leading-relaxed"
            />
          </div>
        </div>

        {/* Linea #calls + #faq Split: Left Sticky Itinerary Device + Right Hairline Session Ledger */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 4 Cols: Sticky Linea Device / Pass Console in SUBCON Charcoal, Cerulean & Orange */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-[2.25rem] p-3 bg-[#1E2022] shadow-[0_28px_60px_-20px_rgba(30,32,34,0.45)] border border-[#009EE2]/25">
              <div className="rounded-[1.8rem] bg-white text-[#1E2022] p-5 sm:p-6 space-y-5">
                {/* Top Status Row */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#1E2022]">
                      Delegate Itinerary
                    </p>
                    <p className="text-xs text-[#64686D] inline-flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#009EE2]" />
                      <span>CODISSIA Seminar Hall</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOnlySaved((prev) => !prev)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      onlySaved
                        ? 'bg-[#EF7F1A] text-white shadow-sm'
                        : 'bg-[#EEF4F8] text-[#1E2022] hover:bg-[#009EE2] hover:text-white'
                    }`}
                  >
                    <BookmarkCheck className="w-3.5 h-3.5" />
                    <span>Saved ({savedWorkshopIds.length})</span>
                  </button>
                </div>

                {/* Day Filter Pills */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#64686D]">
                    Filter by Exhibition Day
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {DAY_OPTIONS.map((d) => {
                      const isActive = selectedDay === d.value;
                      return (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => {
                            setSelectedDay(d.value);
                            if (onClearExternalSearch) onClearExternalSearch();
                          }}
                          className={`px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-left transition-all cursor-pointer flex items-center justify-between ${
                            isActive
                              ? 'bg-[#009EE2] text-white shadow-sm'
                              : 'bg-[#EEF4F8] text-[#1E2022] hover:bg-[#DCEAF4]'
                          }`}
                        >
                          <span>{d.label}</span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? 'bg-[#EF7F1A]' : 'bg-[#1E2022]/25'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {externalSearchQuery && (
                  <div className="p-3.5 rounded-2xl bg-[#009EE2]/12 border border-[#009EE2] text-[#1E2022] flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#009EE2]">
                        Active Capability Filter
                      </p>
                      <p className="text-xs font-bold truncate">{externalSearchQuery}</p>
                    </div>
                    {onClearExternalSearch && (
                      <button
                        type="button"
                        onClick={onClearExternalSearch}
                        className="text-xs font-semibold underline shrink-0 cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                )}

                {/* Live Bookmarked Sessions Log (Linea .phone__log) */}
                <div className="space-y-2 pt-2 border-t border-[#1E2022]/10">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#64686D]">
                    Bookmarked Sessions ({savedSessionObjects.length})
                  </p>
                  {savedSessionObjects.length === 0 ? (
                    <p className="text-xs text-[#64686D] py-2">
                      Click &ldquo;Save&rdquo; on any workshop to add it to your pass.
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                      {savedSessionObjects.map((s) => (
                        <div
                          key={s.id}
                          className="p-2.5 rounded-xl bg-[#EEF4F8] text-[#1E2022] text-xs flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <p className="font-semibold truncate">{s.title}</p>
                            <p className="text-[11px] text-[#64686D]">
                              {s.day} · {s.startTime}
                            </p>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-[#EF7F1A] shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right 8 Cols: Linea #faq__list Hairline Session Ledger */}
          <div className="lg:col-span-8 border-t border-[#1E2022]/15">
            <AnimatePresence mode="popLayout">
              {filteredSessions.map((session: WorkshopSession, idx: number) => {
                const isSaved = savedWorkshopIds.includes(session.id);
                const remainingSeats = getRemainingSeats(session, isSaved);
                const fillPercentage = Math.min(
                  100,
                  Math.round(((session.capacity - remainingSeats) / session.capacity) * 100)
                );

                return (
                  <motion.article
                    key={session.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.45,
                      delay: (idx % 4) * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="py-6 border-b border-[#1E2022]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group"
                  >
                    {/* Left Thumbnail + Session Info */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 flex-1 min-w-0">
                      <div className="relative w-full sm:w-36 aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-[#1E2022] shrink-0">
                        <img
                          src={session.image}
                          alt={session.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="space-y-1.5 min-w-0 flex-1">
                        {/* Unboxed Clean Metadata Row */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#64686D] font-medium">
                          <span className="inline-flex items-center gap-1 font-bold text-[#1E2022]">
                            <Calendar className="w-3.5 h-3.5 text-[#009EE2]" />
                            {session.day}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 tabular-nums">
                            <Clock className="w-3.5 h-3.5 text-[#EF7F1A]" />
                            {session.startTime}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{session.track}</span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-semibold text-[#1E2022] tracking-tight leading-snug">
                          {session.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 pt-1">
                          <button
                            type="button"
                            onClick={() => onInspectSpeaker(session.speakerId)}
                            className="m-link text-xs font-semibold text-[#1E2022] inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <UserCheck className="w-3.5 h-3.5 text-[#009EE2]" />
                            <span>{session.speakerName}</span>
                          </button>

                          <span className="text-xs text-[#64686D] inline-flex items-center gap-1.5 tabular-nums">
                            <Users className="w-3.5 h-3.5" />
                            <span>{remainingSeats} seats left</span>
                            <span className="w-16 h-1.5 rounded-full bg-[#1E2022]/12 overflow-hidden inline-block ml-1">
                              <span
                                style={{ width: `${fillPercentage}%` }}
                                className="block h-full bg-[#009EE2] rounded-full"
                              />
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Linea Action Button in SUBCON Orange/Blue */}
                    <button
                      type="button"
                      onClick={() => onToggleSaveWorkshop(session.id)}
                      aria-label={`${isSaved ? 'Remove' : 'Save'} ${session.title}`}
                      className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                        isSaved
                          ? 'bg-[#EF7F1A] text-white shadow-sm'
                          : 'linea-btn-fill bg-[#EEF4F8] text-[#1E2022] border border-[#009EE2]/25'
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </>
                      )}
                    </button>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </LineaBandSheet>
  );
}
