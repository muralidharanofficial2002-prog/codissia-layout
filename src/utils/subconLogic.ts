import { WorkshopSession, GalleryItem } from '../data/subconData';

export interface WorkshopFilterCriteria {
  day: 'All Days' | 'Day 1' | 'Day 2' | 'Day 3';
  track: string;
  searchQuery: string;
  onlySaved: boolean;
  savedIds: string[];
}

export function filterWorkshops(
  sessions: WorkshopSession[],
  criteria: WorkshopFilterCriteria
): WorkshopSession[] {
  const normalizedQuery = criteria.searchQuery.trim().toLowerCase();

  return sessions.filter((session) => {
    if (criteria.onlySaved && !criteria.savedIds.includes(session.id)) {
      return false;
    }
    if (criteria.day !== 'All Days' && session.day !== criteria.day) {
      return false;
    }
    if (criteria.track !== 'All Tracks' && session.track !== criteria.track) {
      return false;
    }
    if (normalizedQuery.length > 0) {
      const haystacks = [
        session.title,
        session.speakerName,
        session.organization,
        session.description,
        session.hall,
        session.track,
        ...session.keyTakeaways,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystacks.includes(normalizedQuery)) {
        return false;
      }
    }
    return true;
  });
}

export function toggleSavedWorkshop(savedIds: string[], sessionId: string): string[] {
  if (!sessionId.trim()) return savedIds;
  if (savedIds.includes(sessionId)) {
    return savedIds.filter((id) => id !== sessionId);
  }
  return [...savedIds, sessionId];
}

export function getRemainingSeats(session: Pick<WorkshopSession, 'capacity' | 'registeredCount'>, isSavedByUser: boolean): number {
  const effectiveRegistered = session.registeredCount + (isSavedByUser ? 1 : 0);
  return Math.max(0, session.capacity - effectiveRegistered);
}

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your email address.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid work or personal email address.' };
  }
  return { valid: true };
}

export interface AttendeeRegistrationInput {
  fullName: string;
  email: string;
  organization: string;
  attendeeType: 'Buyer / OEM / PSU' | 'MSME Manufacturer' | 'Trade Visitor / Engineer';
  primaryInterest: string;
}

export function validateAttendeeRegistration(input: AttendeeRegistrationInput): {
  valid: boolean;
  errors: Partial<Record<keyof AttendeeRegistrationInput, string>>;
} {
  const errors: Partial<Record<keyof AttendeeRegistrationInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required (at least 2 characters).';
  }
  const emailCheck = validateEmail(input.email);
  if (!emailCheck.valid) {
    errors.email = emailCheck.error;
  }
  if (!input.organization || input.organization.trim().length < 2) {
    errors.organization = 'Company or organization name is required.';
  }
  if (!input.primaryInterest || !input.primaryInterest.trim()) {
    errors.primaryInterest = 'Please select a primary manufacturing or sourcing interest.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateBadgeCode(email: string, attendeeType: string): string {
  const cleanEmail = email.trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < cleanEmail.length; i++) {
    hash = (hash * 31 + cleanEmail.charCodeAt(i)) % 10000;
  }
  const prefix =
    attendeeType.startsWith('Buyer')
      ? 'BYR'
      : attendeeType.startsWith('MSME')
      ? 'MFG'
      : 'VIS';
  const codeNum = String(hash).padStart(4, '0');
  return `SUBCON27-${prefix}-${codeNum}`;
}

export function filterGalleryItems(
  items: GalleryItem[],
  category: string,
  searchQuery: string
): GalleryItem[] {
  const q = searchQuery.trim().toLowerCase();
  return items.filter((item) => {
    if (category !== 'All Glimpses' && item.category !== category) {
      return false;
    }
    if (q.length > 0) {
      const text = `${item.title} ${item.subtitle} ${item.exhibitorOrHighlight} ${item.category}`.toLowerCase();
      return text.includes(q);
    }
    return true;
  });
}

export function filterExhibitorNames(exhibitors: string[], searchQuery: string): string[] {
  const q = searchQuery.trim().toLowerCase();
  if (!q) return exhibitors;
  return exhibitors.filter((name) => name.toLowerCase().includes(q));
}
