import { useState, FormEvent } from 'react';
import { X, CheckCircle2, Calendar, MapPin, QrCode, BookmarkCheck } from 'lucide-react';
import {
  AttendeeRegistrationInput,
  validateAttendeeRegistration,
  generateBadgeCode,
} from '../utils/subconLogic';
import { EVENT_INFO, PROCESS_CATEGORIES, WORKSHOP_SESSIONS } from '../data/subconData';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
  savedWorkshopIds: string[];
}

export default function RegistrationModal({
  isOpen,
  onClose,
  initialEmail = '',
  savedWorkshopIds,
}: RegistrationModalProps) {
  const [formData, setFormData] = useState<AttendeeRegistrationInput>({
    fullName: '',
    email: initialEmail,
    organization: '',
    attendeeType: 'Buyer / OEM / PSU',
    primaryInterest: PROCESS_CATEGORIES[0].title,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof AttendeeRegistrationInput, string>>
  >({});
  const [badgeCode, setBadgeCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentEmail = formData.email || initialEmail;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, email: currentEmail };
    const validation = validateAttendeeRegistration(payload);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setBadgeCode(generateBadgeCode(payload.email, payload.attendeeType));
  };

  const savedSessions = WORKSHOP_SESSIONS.filter((w) =>
    savedWorkshopIds.includes(w.id)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="SUBCON 2027 Attendee Pass Registration"
      className="fixed inset-0 z-50 bg-[#1E2022]/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="rounded-3xl max-w-xl w-full p-6 md:p-8 relative bg-[#1E2022] border border-[#009EE2]/30 shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs text-[#009EE2] font-bold uppercase tracking-widest mb-1">
              {EVENT_INFO.edition} · {EVENT_INFO.dates}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {badgeCode
                ? 'Your SUBCON 2027 Attendee Pass'
                : 'Register for SUBCON 2027 Pass'}
            </h3>
          </div>
          <button
            type="button"
            aria-label="Close registration modal"
            onClick={onClose}
            className="liquid-glass rounded-full p-2 text-white/70 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {badgeCode ? (
          <div className="space-y-6">
            <div className="bg-white/5 border border-[#009EE2]/30 rounded-2xl p-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5 text-white">
                  <CheckCircle2 className="w-5 h-5 text-[#009EE2]" />
                  <span className="text-sm font-semibold">
                    Verified Delegate Pass Issued
                  </span>
                </div>
                <span className="font-mono text-xs text-white font-bold tabular-nums bg-[#EF7F1A] px-3 py-1 rounded-full">
                  {badgeCode}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 text-xs">
                <div>
                  <p className="text-white/50 mb-0.5">Delegate Name</p>
                  <p className="text-white text-sm font-semibold">{formData.fullName}</p>
                </div>
                <div>
                  <p className="text-white/50 mb-0.5">Organization</p>
                  <p className="text-white text-sm font-semibold">{formData.organization}</p>
                </div>
                <div>
                  <p className="text-white/50 mb-0.5">Category</p>
                  <p className="text-[#009EE2] font-semibold">{formData.attendeeType}</p>
                </div>
                <div>
                  <p className="text-white/50 mb-0.5">Primary Sourcing Focus</p>
                  <p className="text-white/90">{formData.primaryInterest}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#EF7F1A]" />
                  {EVENT_INFO.dates} ({EVENT_INFO.timing})
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#009EE2]" />
                  {EVENT_INFO.venue}
                </span>
              </div>
            </div>

            {savedSessions.length > 0 && (
              <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/10">
                <p className="text-xs text-[#009EE2] font-semibold flex items-center gap-1.5 mb-2">
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>
                    Included Workshop Reservations ({savedSessions.length}):
                  </span>
                </p>
                <ul className="space-y-1.5 text-xs text-white/85">
                  {savedSessions.map((s) => (
                    <li key={s.id}>
                      · {s.day} ({s.startTime}): {s.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <QrCode className="w-4 h-4 text-[#009EE2]" />
                <span>Present this badge code at CODISSIA Hall A entry desk</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#EF7F1A] hover:bg-[#D96D0D] text-white rounded-full px-6 py-2.5 text-xs font-bold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="reg-fullname"
                className="block text-xs text-white/70 mb-1.5"
              >
                Full Name *
              </label>
              <input
                id="reg-fullname"
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="e.g., Er. Rajesh Kumar"
                className="w-full liquid-glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#009EE2]"
              />
              {errors.fullName && (
                <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="reg-email"
                  className="block text-xs text-white/70 mb-1.5"
                >
                  Work Email *
                </label>
                <input
                  id="reg-email"
                  type="email"
                  value={currentEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="name@company.com"
                  className="w-full liquid-glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#009EE2]"
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="reg-org"
                  className="block text-xs text-white/70 mb-1.5"
                >
                  Company / PSU / Organization *
                </label>
                <input
                  id="reg-org"
                  type="text"
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({ ...formData, organization: e.target.value })
                  }
                  placeholder="e.g., BHEL / PRICOL / MSME Unit"
                  className="w-full liquid-glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#009EE2]"
                />
                {errors.organization && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.organization}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="reg-type"
                  className="block text-xs text-white/70 mb-1.5"
                >
                  Delegate Role
                </label>
                <select
                  id="reg-type"
                  value={formData.attendeeType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      attendeeType: e.target.value as AttendeeRegistrationInput['attendeeType'],
                    })
                  }
                  className="w-full liquid-glass rounded-xl px-4 py-2.5 text-sm text-white bg-[#272A2E] focus:outline-none"
                >
                  <option value="Buyer / OEM / PSU">Buyer / OEM / PSU</option>
                  <option value="MSME Manufacturer">MSME Manufacturer</option>
                  <option value="Trade Visitor / Engineer">
                    Trade Visitor / Engineer
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="reg-interest"
                  className="block text-xs text-white/70 mb-1.5"
                >
                  Primary Manufacturing Interest
                </label>
                <select
                  id="reg-interest"
                  value={formData.primaryInterest}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      primaryInterest: e.target.value,
                    })
                  }
                  className="w-full liquid-glass rounded-xl px-4 py-2.5 text-sm text-white bg-[#272A2E] focus:outline-none"
                >
                  {PROCESS_CATEGORIES.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="liquid-glass rounded-full px-5 py-2.5 text-xs text-white/80 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#EF7F1A] hover:bg-[#D96D0D] text-white rounded-full px-6 py-2.5 text-xs font-bold transition-colors cursor-pointer shadow-md"
              >
                Generate Delegate Pass
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
