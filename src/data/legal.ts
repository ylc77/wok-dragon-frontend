import { contactInfo } from './contact';

export type LegalServiceProvider = {
  name: string;
  purpose: string;
};

export type LegalConfig = {
  businessName: string;
  legalName: string;
  businessAddress: string;
  vatNumber: string;
  gemiNumber: string;
  contactEmail: string;
  phone: string;
  country: string;
  lastUpdated: string;
  dataControllerName: string;
  dataControllerAddress: string;
  privacyRequestEmail: string;
  privacyRequestInstructions: string;
  dataProcessors: LegalServiceProvider[];
  paymentProviders: LegalServiceProvider[];
  analyticsProviders: LegalServiceProvider[];
  aiProviders: LegalServiceProvider[];
  mapProviders: LegalServiceProvider[];
  reservationNotificationProviders: LegalServiceProvider[];
  usesNecessaryStorage: boolean;
  usesAnalyticsCookies: boolean;
  usesMarketingCookies: boolean;
  usesMapEmbeds: boolean;
  cookieRetentionText: string;
  dataRetention: string;
  reservationTerms: string;
  cancellationPolicy: string;
  paymentTerms: string;
  allergenDisclaimer: string;
  menuAvailabilityDisclaimer: string;
  taxReceiptDisclaimer: string;
};

// For each restaurant handoff, update this file only with the client's legal and service details.
export const legalConfig: LegalConfig = {
  businessName: 'Wok Dragon Express',
  legalName: 'TODO: add legal company name',
  businessAddress: contactInfo.address ?? 'Mitropoleos 51, Athens 105 56, Greece',
  vatNumber: 'TODO: add VAT / AFM',
  gemiNumber: 'TODO: add GEMI number if applicable',
  contactEmail: contactInfo.email ?? 'TODO: add restaurant email',
  phone: contactInfo.phone ?? '+30 210 323 8424',
  country: 'Greece',
  lastUpdated: '7 July 2026',
  dataControllerName: 'Wok Dragon Express',
  dataControllerAddress: contactInfo.address ?? 'Mitropoleos 51, Athens 105 56, Greece',
  privacyRequestEmail: contactInfo.email ?? 'TODO: add privacy request email',
  privacyRequestInstructions:
    'Contact us by email or phone to request access, correction, or deletion of reservation-related personal information.',
  dataProcessors: [
    {
      name: 'Vercel',
      purpose: 'Website hosting, delivery, and deployment infrastructure.',
    },
  ],
  paymentProviders: [],
  analyticsProviders: [],
  aiProviders: [],
  mapProviders: [
    {
      name: 'Google Maps',
      purpose: 'Optional map display and external directions link.',
    },
  ],
  reservationNotificationProviders: [],
  usesNecessaryStorage: true,
  usesAnalyticsCookies: false,
  usesMarketingCookies: false,
  usesMapEmbeds: true,
  cookieRetentionText:
    'Language and cookie preference values may be stored in the browser until the visitor clears browser data or changes preferences.',
  dataRetention:
    'Reservation requests are kept only as long as needed to respond, manage the booking request, and handle reasonable follow-up questions.',
  reservationTerms:
    'Submitting the reservation form creates a request only. A table is confirmed only after the restaurant contacts the guest directly.',
  cancellationPolicy:
    'To cancel or change a reservation request, contact the restaurant by phone as soon as possible. Late arrivals or short-notice changes may affect table availability.',
  paymentTerms:
    'This website currently does not process online payments, deposits, or card details.',
  allergenDisclaimer:
    'Menu items may contain allergens or be prepared near allergens. Guests should contact the restaurant directly before ordering if they have allergies or dietary restrictions.',
  menuAvailabilityDisclaimer:
    'Menu items, ingredients, availability, and prices may change. Final availability and pricing are confirmed directly by the restaurant.',
  taxReceiptDisclaimer:
    'This website is an information and reservation request website. Official tax receipts or invoices are issued directly by the restaurant where applicable.',
};

export type LegalPageKey = 'privacy' | 'terms' | 'cookies' | 'cancellation';
