import { createContext } from 'react';

export type ConsentStatus = 'accepted' | 'rejected' | null;

export type CookieConsentValue = {
  accept: () => void;
  reject: () => void;
  reset: () => void;
  status: ConsentStatus;
};

export const CookieConsentContext = createContext<CookieConsentValue | null>(null);
