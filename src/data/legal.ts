import { contactInfo } from './contact';

export const legalConfig = {
  businessName: 'Wok Dragon Express',
  businessAddress: contactInfo.address ?? 'Mitropoleos 51, Athens 105 56, Greece',
  contactEmail: contactInfo.email ?? 'TODO: add restaurant email',
  phone: contactInfo.phone ?? '+30 210 323 8424',
  country: 'Greece',
  dataProcessors: ['Vercel', 'Google Maps', 'Telegram Bot API if reservation notifications are enabled'],
  dataRetention: 'Reservation requests are kept only as long as needed to respond and manage the booking request.',
  lastUpdated: '5 July 2026',
};

export type LegalPageKey = 'privacy' | 'terms' | 'cookies' | 'cancellation';
