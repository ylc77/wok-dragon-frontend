import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { CookieConsentContext } from './cookieConsentContext';
import type { ConsentStatus } from './cookieConsentContext';

const STORAGE_KEY = 'wok-dragon-cookie-consent';

function readStoredConsent(): ConsentStatus {
  if (typeof window === 'undefined') return null;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'accepted' || stored === 'rejected' ? stored : null;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>(readStoredConsent);

  function saveConsent(nextStatus: Exclude<ConsentStatus, null>) {
    setStatus(nextStatus);
    window.localStorage.setItem(STORAGE_KEY, nextStatus);
  }

  function reset() {
    setStatus(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  const value = useMemo(
    () => ({
      accept: () => saveConsent('accepted'),
      reject: () => saveConsent('rejected'),
      reset,
      status,
    }),
    [status],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}
