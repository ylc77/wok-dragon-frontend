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
  websiteUrl: string;
  contactEmail: string;
  phone: string;
  country: string;
  lastUpdated: string;
  dataControllerName: string;
  dataControllerAddress: string;
  privacyContactName: string;
  privacyRequestEmail: string;
  dpoContact: string;
  privacyRequestInstructions: string;
  processingLegalBasis: string;
  dataSubjectRights: string;
  complaintAuthorityName: string;
  complaintAuthorityUrl: string;
  internationalTransfers: string;
  automatedDecisionMaking: string;
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
  allergenInformationMethod: string;
  menuAvailabilityDisclaimer: string;
  taxReceiptDisclaimer: string;
};

// For each restaurant handoff, update this file only with the client's legal and service details.
export const legalConfig: LegalConfig = {
  businessName: 'Wok Dragon Express',
  legalName: 'GUO XIULEI',
  businessAddress: contactInfo.address ?? 'Mitropoleos 51, Athens 105 56, Greece',
  vatNumber: '',
  gemiNumber: '',
  websiteUrl: 'https://www.wokdragon.gr/',
  contactEmail: contactInfo.email ?? '',
  phone: contactInfo.phone ?? '+30 210 323 8424',
  country: 'Greece',
  lastUpdated: '8 July 2026',
  dataControllerName: 'GUO XIULEI',
  dataControllerAddress: contactInfo.address ?? 'Mitropoleos 51, Athens 105 56, Greece',
  privacyContactName: 'LINCHAO YAN',
  privacyRequestEmail: contactInfo.email ?? '',
  dpoContact: '',
  privacyRequestInstructions:
    'Contact the restaurant by email or phone to request access, correction, deletion, restriction, or a copy of reservation-related personal information. We may need to verify your identity before acting on a request.',
  processingLegalBasis:
    'Reservation details are processed to take steps requested by the guest before confirming a booking and, where applicable, for the restaurant’s legitimate interests in managing reservations and responding to enquiries. Optional third-party content is loaded only with consent or a direct user request.',
  dataSubjectRights:
    'Subject to applicable law, you may request access, correction, deletion, restriction, portability, or object to certain processing. Where processing relies on consent, you may withdraw that consent at any time without affecting earlier lawful processing.',
  complaintAuthorityName: 'Hellenic Data Protection Authority',
  complaintAuthorityUrl: 'https://www.dpa.gr/en/individuals/complaint-to-the-hellenic-dpa',
  internationalTransfers:
    'Some technology providers may process limited technical data outside the European Economic Area. Where this occurs, the provider and controller must rely on an applicable legal transfer mechanism and safeguards under data-protection law.',
  automatedDecisionMaking:
    'This website does not use personal data for automated decision-making or profiling that produces legal or similarly significant effects.',
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
  reservationNotificationProviders: [
    {
      name: 'Telegram Bot API',
      purpose: 'Delivery of reservation request notifications to the restaurant after the guest submits the form.',
    },
  ],
  usesNecessaryStorage: true,
  usesAnalyticsCookies: false,
  usesMarketingCookies: false,
  usesMapEmbeds: true,
  cookieRetentionText:
    'Language and cookie preference values may be stored in the browser until the visitor clears browser data or changes preferences.',
  dataRetention:
    'Reservation request information is normally retained for up to 30 days after submission, then deleted or anonymised unless a longer period is required by law or needed to establish, exercise, or defend legal claims.',
  reservationTerms:
    'Submitting the reservation form creates a request only. A table is confirmed only after the restaurant contacts the guest directly.',
  cancellationPolicy:
    'To cancel or change a reservation, contact the restaurant by phone at least 1 hour before the reserved time. If guests arrive more than 60 minutes late without contacting the restaurant, the table may be released. Short-notice changes remain subject to availability.',
  paymentTerms:
    'This website currently does not process online payments, deposits, or card details.',
  allergenDisclaimer:
    'Menu items may contain any of the 14 allergens recognised under EU food-information rules and may be prepared in areas where cross-contact can occur. Guests with allergies or intolerances must inform the restaurant before ordering and should not rely on the website menu alone.',
  allergenInformationMethod:
    'Please ask restaurant staff for current allergen information before ordering. Allergen information can be requested directly from restaurant staff at the premises.',
  menuAvailabilityDisclaimer:
    'Menu items, ingredients, availability, and prices may change. Final availability and pricing are confirmed directly by the restaurant.',
  taxReceiptDisclaimer:
    'This website is an information and reservation request website. Official tax receipts or invoices are issued directly by the restaurant where applicable.',
};

export type LegalPageKey = 'privacy' | 'terms' | 'cookies' | 'cancellation';
