import type { Language } from '../components/languageContext';
import type { MenuCategory } from '../types/menu';

const greekPattern = /[\u0370-\u03ff]/;
const latinPattern = /[A-Za-z]/;
const brokenTextPattern = /[\u3400-\u9fff\ufffd]/;

const categoryLabelsEl: Record<string, string> = {
  'menu-for-1': '\u039c\u03b5\u03bd\u03bf\u03cd \u03b3\u03b9\u03b1 1',
  'menu-for-2': '\u039c\u03b5\u03bd\u03bf\u03cd \u03b3\u03b9\u03b1 2',
  soups: '\u03a3\u03bf\u03cd\u03c0\u03b5\u03c2',
  salads: '\u03a3\u03b1\u03bb\u03ac\u03c4\u03b5\u03c2',
  appetizers: '\u039f\u03c1\u03b5\u03ba\u03c4\u03b9\u03ba\u03ac',
  'soup-noodles': '\u03a3\u03bf\u03cd\u03c0\u03b5\u03c2 \u03bc\u03b5 noodles',
  'fried-noodles': '\u03a4\u03b7\u03b3\u03b1\u03bd\u03b7\u03c4\u03ac noodles',
  'fried-rice': '\u03a4\u03b7\u03b3\u03b1\u03bd\u03b7\u03c4\u03cc \u03c1\u03cd\u03b6\u03b9',
  duck: '\u03a0\u03ac\u03c0\u03b9\u03b1',
  beef: '\u039c\u03bf\u03c3\u03c7\u03ac\u03c1\u03b9',
  chicken: '\u039a\u03bf\u03c4\u03cc\u03c0\u03bf\u03c5\u03bb\u03bf',
  pork: '\u03a7\u03bf\u03b9\u03c1\u03b9\u03bd\u03cc',
  seafood: '\u0398\u03b1\u03bb\u03b1\u03c3\u03c3\u03b9\u03bd\u03ac',
  claypots: 'Claypots',
  'dishes-with-rice': '\u03a0\u03b9\u03ac\u03c4\u03b1 \u03bc\u03b5 \u03c1\u03cd\u03b6\u03b9',
  vegetables: '\u039b\u03b1\u03c7\u03b1\u03bd\u03b9\u03ba\u03ac',
  'kid-s-meals': '\u03a0\u03b1\u03b9\u03b4\u03b9\u03ba\u03ac \u03c0\u03b9\u03ac\u03c4\u03b1',
  sweets: '\u0393\u03bb\u03c5\u03ba\u03ac',
  'soft-drinks': '\u0391\u03bd\u03b1\u03c8\u03c5\u03ba\u03c4\u03b9\u03ba\u03ac',
  'hot-tea': '\u0396\u03b5\u03c3\u03c4\u03cc \u03c4\u03c3\u03ac\u03b9',
  beers: '\u039c\u03c0\u03cd\u03c1\u03b5\u03c2',
  wines: '\u039a\u03c1\u03b1\u03c3\u03b9\u03ac',
  drinks: '\u03a0\u03bf\u03c4\u03ac',
};

function hasBrokenText(value?: string) {
  return Boolean(value && brokenTextPattern.test(value));
}

function normalizeSpaces(value: string) {
  return value.replace(/\s{2,}/g, ' ').trim();
}

function removePdfTail(value: string) {
  if (/^(menu|menu for|menoy|\u03bc\u03b5\u03bd\u03bf\u03cd|\u03bc\u03b5\u03bd\u03bf\u03cd \u03b3\u03b9\u03b1)\s+\d/i.test(value)) {
    return value;
  }
  return value.replace(/\s+1$/, '');
}

export function cleanEnglish(value?: string) {
  if (!value) return '';

  const withoutNotes = value.split(' *')[0].trim();
  const parts = withoutNotes
    .split('/')
    .map((part) => normalizeSpaces(part))
    .filter(Boolean);

  if (parts.length > 1) {
    const usefulParts = parts.filter((part) => latinPattern.test(part) && !greekPattern.test(part) && !hasBrokenText(part));
    if (usefulParts.length) return removePdfTail(usefulParts.join(' / '));
  }

  return removePdfTail(
    normalizeSpaces(
    withoutNotes
      .replace(/[\u0370-\u03ff]+/g, '')
      .replace(/[\u3400-\u9fff\ufffd]+/g, '')
      .replace(/\?+/g, ''),
    ),
  );
}

export function cleanGreek(value?: string) {
  if (!value || hasBrokenText(value)) return '';

  const withoutNotes = value.split(' *')[0].trim();
  const parts = withoutNotes
    .split('/')
    .map((part) => normalizeSpaces(part))
    .filter(Boolean);

  if (parts.length > 1) {
    const greekPart = parts.find((part) => greekPattern.test(part) && !hasBrokenText(part));
    return greekPart ? removePdfTail(greekPart) : '';
  }

  return greekPattern.test(withoutNotes) ? removePdfTail(withoutNotes) : '';
}

export function getCategoryLabel(category: MenuCategory, language: Language) {
  if (language === 'el') {
    return categoryLabelsEl[category.id] || cleanGreek(category.nameEl) || cleanEnglish(category.nameEn);
  }

  if (language === 'zh') {
    return cleanEnglish(category.nameEn) || cleanEnglish(category.nameEl) || category.nameEn;
  }

  return cleanEnglish(category.nameEn) || cleanEnglish(category.nameEl) || category.nameEn;
}

export function formatMenuPrice(value: string) {
  const number = value.match(/\d+(?:[,.]\d+)?/)?.[0] ?? value.trim();
  return `${number.replace('.', ',')} \u20ac`;
}
