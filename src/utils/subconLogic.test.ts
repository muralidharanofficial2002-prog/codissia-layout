import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterWorkshops,
  toggleSavedWorkshop,
  getRemainingSeats,
  validateEmail,
  validateAttendeeRegistration,
  generateBadgeCode,
  filterGalleryItems,
  filterExhibitorNames,
} from './subconLogic';
import {
  FIGMA_SECTION_SPECS,
  FIGMA_PROTOTYPE_INTERACTIONS,
  generateFigmaMasterSvg,
  generateFigmaDocumentJson,
  generateFigmaVariablesJson,
  generateFigmaConsolePluginScript,
} from './figmaExportGenerator';
import { WORKSHOP_SESSIONS, VISUAL_GALLERY_ITEMS, PAST_EXHIBITORS_LIST } from '../data/subconData';

test('filterWorkshops filters by day, track, search query, and saved state', () => {
  const day1 = filterWorkshops(WORKSHOP_SESSIONS, {
    day: 'Day 1',
    track: 'All Tracks',
    searchQuery: '',
    onlySaved: false,
    savedIds: [],
  });
  assert.equal(day1.length, 3);
  assert.ok(day1.every((s) => s.day === 'Day 1'));

  const psuTrack = filterWorkshops(WORKSHOP_SESSIONS, {
    day: 'All Days',
    track: 'PSU & Defence Procurement',
    searchQuery: 'Ordnance',
    onlySaved: false,
    savedIds: [],
  });
  assert.equal(psuTrack.length, 1);
  assert.equal(psuTrack[0].id, 'ws-day1-psu-defence');

  const savedOnly = filterWorkshops(WORKSHOP_SESSIONS, {
    day: 'All Days',
    track: 'All Tracks',
    searchQuery: '',
    onlySaved: true,
    savedIds: ['ws-day2-tancam-industry40'],
  });
  assert.equal(savedOnly.length, 1);
  assert.equal(savedOnly[0].id, 'ws-day2-tancam-industry40');
});

test('toggleSavedWorkshop adds and removes workshop IDs deterministically', () => {
  const initial: string[] = [];
  const added = toggleSavedWorkshop(initial, 'ws-day1-inauguration');
  assert.deepEqual(added, ['ws-day1-inauguration']);

  const removed = toggleSavedWorkshop(added, 'ws-day1-inauguration');
  assert.deepEqual(removed, []);
});

test('getRemainingSeats decrements capacity when user saves session', () => {
  const sample = { capacity: 120, registeredCount: 94 };
  assert.equal(getRemainingSeats(sample, false), 26);
  assert.equal(getRemainingSeats(sample, true), 25);
});

test('validateEmail and validateAttendeeRegistration enforce required fields', () => {
  assert.equal(validateEmail('').valid, false);
  assert.equal(validateEmail('invalid-email').valid, false);
  assert.equal(validateEmail('procurement@bhel.in').valid, true);

  const invalidReg = validateAttendeeRegistration({
    fullName: 'A',
    email: 'bad',
    organization: '',
    attendeeType: 'Buyer / OEM / PSU',
    primaryInterest: '',
  });
  assert.equal(invalidReg.valid, false);
  assert.ok(invalidReg.errors.fullName);
  assert.ok(invalidReg.errors.email);
  assert.ok(invalidReg.errors.organization);

  const validReg = validateAttendeeRegistration({
    fullName: 'Rajesh Kumar',
    email: 'rajesh@pricol.co.in',
    organization: 'PRICOL Limited',
    attendeeType: 'Buyer / OEM / PSU',
    primaryInterest: 'Precision CNC Machining',
  });
  assert.equal(validReg.valid, true);
  const badge = generateBadgeCode('rajesh@pricol.co.in', 'Buyer / OEM / PSU');
  assert.ok(badge.startsWith('SUBCON27-BYR-'));
});

test('filterGalleryItems and filterExhibitorNames match brochure records', () => {
  const specialStalls = filterGalleryItems(VISUAL_GALLERY_ITEMS, 'Special Category Stalls', '');
  assert.equal(specialStalls.length, 3);

  const pricolSearch = filterExhibitorNames(PAST_EXHIBITORS_LIST, 'PRICOL');
  assert.ok(pricolSearch.includes('PRICOL LIMITED'));
});

test('Figma design file and Smart-Animate prototype generators produce valid specs', () => {
  assert.equal(FIGMA_SECTION_SPECS.length, 9);
  assert.equal(FIGMA_PROTOTYPE_INTERACTIONS.length, 8);

  const svg = generateFigmaMasterSvg();
  assert.ok(svg.startsWith('<?xml version="1.0"'));
  assert.ok(svg.includes('Artboard_01_Desktop_1440px'));
  assert.ok(svg.includes('Artboard_02_Interactive_Variants_And_Smart_Animate'));

  const docJson = JSON.parse(generateFigmaDocumentJson());
  assert.equal(docJson.pages.length, 3);

  const varsJson = JSON.parse(generateFigmaVariablesJson());
  assert.equal(varsJson.color.brochureColourTheme.codissiaRoyalNavy.$value, '#0F2557');

  const pluginScript = generateFigmaConsolePluginScript();
  assert.ok(pluginScript.includes('figma.createFrame()'));
});
