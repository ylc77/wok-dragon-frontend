import { useContext } from 'react';
import { CookieConsentContext } from './cookieConsentContext';

export function useCookieConsent() {
  const value = useContext(CookieConsentContext);
  if (!value) {
    throw new Error('useCookieConsent must be used inside CookieConsentProvider');
  }
  return value;
}
