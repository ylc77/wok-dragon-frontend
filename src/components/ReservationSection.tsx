import { ArrowRight, CalendarDays, CheckCircle2, Clock3, MapPin, Phone } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { contactInfo } from '../data/contact';
import type { ReservationForm } from '../types/reservation';
import { useLanguage } from './languageContext';

const OPENING_START_MINUTES = 12 * 60;
const OPENING_END_MINUTES = 23 * 60 + 30;
const TIME_STEP_MINUTES = 30;
const RESERVATION_DAYS = 7;
const CLOSED_WEEKDAY = 3;

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function toDateValue(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function isClosedDate(date: Date) {
  return date.getDay() === CLOSED_WEEKDAY;
}

function getDefaultReservationDate() {
  const today = new Date();
  for (let offset = 0; offset < RESERVATION_DAYS; offset += 1) {
    const candidate = addDays(today, offset);
    if (!isClosedDate(candidate)) {
      return toDateValue(candidate);
    }
  }

  return toDateValue(today);
}

function formatTimeFromMinutes(totalMinutes: number) {
  return `${pad(Math.floor(totalMinutes / 60))}:${pad(totalMinutes % 60)}`;
}

function roundUpToStep(totalMinutes: number) {
  return Math.ceil(totalMinutes / TIME_STEP_MINUTES) * TIME_STEP_MINUTES;
}

function getDefaultTime() {
  const now = new Date();
  const roundedNow = roundUpToStep(now.getHours() * 60 + now.getMinutes());
  const clamped = Math.min(Math.max(roundedNow, OPENING_START_MINUTES), OPENING_END_MINUTES);
  return formatTimeFromMinutes(clamped);
}

function createInitialForm(): ReservationForm {
  return {
    name: '',
    phone: '',
    date: getDefaultReservationDate(),
    time: getDefaultTime(),
    guests: '2',
    notes: '',
  };
}

function createTimeOptions() {
  const options: string[] = [];
  for (let minutes = OPENING_START_MINUTES; minutes <= OPENING_END_MINUTES; minutes += TIME_STEP_MINUTES) {
    options.push(formatTimeFromMinutes(minutes));
  }
  return options;
}

function createDateOptions() {
  const today = new Date();

  return Array.from({ length: RESERVATION_DAYS }, (_, index) => addDays(today, index))
    .filter((date) => !isClosedDate(date))
    .map((date) => {
      const value = toDateValue(date);

      return {
        label: formatDisplayDate(value),
        value,
      };
    });
}

function formatDisplayDate(value: string) {
  if (!value) return '';

  const [year, month, day] = value.split('-');
  return year && month && day ? `${day}/${month}/${year}` : value;
}

export function ReservationSection() {
  const { language } = useLanguage();
  const isGreek = language === 'el';
  const phone = contactInfo.phone ?? '+30 210 323 8424';
  const openingHours = contactInfo.openingHours?.length ? contactInfo.openingHours : ['Daily: 12:00 - 23:30'];
  const dateOptions = useMemo(() => createDateOptions(), []);
  const timeOptions = useMemo(() => createTimeOptions(), []);
  const [form, setForm] = useState<ReservationForm>(createInitialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const sendToApi = import.meta.env.VITE_RESERVATION_API_ENABLED === 'true';

  const text = {
    title: isGreek ? '\u039a\u03c1\u03b1\u03c4\u03ae\u03c3\u03b5\u03b9\u03c2' : 'Reservations',
    intro: isGreek
      ? '\u03a3\u03c4\u03b5\u03af\u03bb\u03c4\u03b5 \u03c4\u03bf \u03b1\u03af\u03c4\u03b7\u03bc\u03b1 \u03ba\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7\u03c2 \u03ba\u03b1\u03b9 \u03b7 \u03c4\u03b5\u03bb\u03b9\u03ba\u03ae \u03b5\u03c0\u03b9\u03b2\u03b5\u03b2\u03b1\u03af\u03c9\u03c3\u03b7 \u03b3\u03af\u03bd\u03b5\u03c4\u03b1\u03b9 \u03b1\u03c0\u03b5\u03c5\u03b8\u03b5\u03af\u03b1\u03c2 \u03b1\u03c0\u03cc \u03c4\u03bf \u03b5\u03c3\u03c4\u03b9\u03b1\u03c4\u03cc\u03c1\u03b9\u03bf.'
      : 'Send your request and final confirmation comes directly from the restaurant.',
    phone: isGreek ? '\u03a4\u03b7\u03bb\u03ad\u03c6\u03c9\u03bd\u03bf' : 'Phone',
    address: isGreek ? '\u0394\u03b9\u03b5\u03cd\u03b8\u03c5\u03bd\u03c3\u03b7' : 'Address',
    hours: isGreek ? '\u038f\u03c1\u03b5\u03c2 \u03bb\u03b5\u03b9\u03c4\u03bf\u03c5\u03c1\u03b3\u03af\u03b1\u03c2' : 'Opening hours',
    note: isGreek
      ? '\u0397 \u03c4\u03b5\u03bb\u03b9\u03ba\u03ae \u03b5\u03c0\u03b9\u03b2\u03b5\u03b2\u03b1\u03af\u03c9\u03c3\u03b7 \u03b3\u03af\u03bd\u03b5\u03c4\u03b1\u03b9 \u03b1\u03c0\u03b5\u03c5\u03b8\u03b5\u03af\u03b1\u03c2 \u03b1\u03c0\u03cc \u03c4\u03bf \u03b5\u03c3\u03c4\u03b9\u03b1\u03c4\u03cc\u03c1\u03b9\u03bf.'
      : 'Final confirmation comes directly from the restaurant.',
    headline: isGreek
      ? '\u039a\u03bb\u03b5\u03af\u03c3\u03c4\u03b5 \u03c4\u03c1\u03b1\u03c0\u03ad\u03b6\u03b9 \u03c3\u03c4\u03bf Wok Dragon'
      : 'Book with Wok Dragon',
    formTitle: isGreek ? '\u039a\u03bb\u03b5\u03af\u03c3\u03c4\u03b5 \u03c4\u03c1\u03b1\u03c0\u03ad\u03b6\u03b9' : 'Reserve a table',
    formIntro: isGreek
      ? '\u0395\u03c0\u03b9\u03bb\u03ad\u03be\u03c4\u03b5 \u03ac\u03c4\u03bf\u03bc\u03b1, \u03b7\u03bc\u03b5\u03c1\u03bf\u03bc\u03b7\u03bd\u03af\u03b1 \u03ba\u03b1\u03b9 \u03ce\u03c1\u03b1. \u039c\u03b5\u03c4\u03ac \u03b8\u03b1 \u03c3\u03b1\u03c2 \u03ba\u03b1\u03bb\u03ad\u03c3\u03bf\u03c5\u03bc\u03b5 \u03b3\u03b9\u03b1 \u03c4\u03b5\u03bb\u03b9\u03ba\u03ae \u03b5\u03c0\u03b9\u03b2\u03b5\u03b2\u03b1\u03af\u03c9\u03c3\u03b7.'
      : 'Choose party size, date, and time. The restaurant will call you to confirm.',
    formEyebrow: isGreek ? 'Wok Dragon EXPRESS' : 'Wok Dragon EXPRESS',
    diningDetails: isGreek ? '\u03a3\u03c4\u03bf\u03b9\u03c7\u03b5\u03af\u03b1 \u03b5\u03c0\u03af\u03c3\u03ba\u03b5\u03c8\u03b7\u03c2' : 'Dining details',
    contactDetails: isGreek ? '\u03a3\u03c4\u03bf\u03b9\u03c7\u03b5\u03af\u03b1 \u03b5\u03c0\u03b9\u03ba\u03bf\u03b9\u03bd\u03c9\u03bd\u03af\u03b1\u03c2' : 'Contact details',
    name: isGreek ? '\u038c\u03bd\u03bf\u03bc\u03b1' : 'Name',
    phoneField: isGreek ? '\u03a4\u03b7\u03bb\u03ad\u03c6\u03c9\u03bd\u03bf' : 'Phone',
    date: isGreek ? '\u0397\u03bc\u03b5\u03c1\u03bf\u03bc\u03b7\u03bd\u03af\u03b1' : 'Date',
    time: isGreek ? '\u038f\u03c1\u03b1' : 'Time',
    guests: isGreek ? '\u0386\u03c4\u03bf\u03bc\u03b1' : 'Guests',
    notes: isGreek ? '\u03a3\u03b7\u03bc\u03b5\u03b9\u03ce\u03c3\u03b5\u03b9\u03c2' : 'Notes',
    namePlaceholder: isGreek ? '\u03a4\u03bf \u03cc\u03bd\u03bf\u03bc\u03ac \u03c3\u03b1\u03c2' : 'Your name',
    phonePlaceholder: isGreek ? '\u0391\u03c1\u03b9\u03b8\u03bc\u03cc\u03c2 \u03c4\u03b7\u03bb\u03b5\u03c6\u03ce\u03bd\u03bf\u03c5' : 'Phone number',
    dateHelper: isGreek
      ? '\u039a\u03c1\u03b1\u03c4\u03ae\u03c3\u03b5\u03b9\u03c2 \u03ad\u03c9\u03c2 7 \u03b7\u03bc\u03ad\u03c1\u03b5\u03c2'
      : 'Reservations up to 7 days ahead',
    timeHelper: isGreek
      ? '\u0391\u03bd\u03ac 30 \u03bb\u03b5\u03c0\u03c4\u03ac, 12:00 - 23:30. \u039a\u03bb\u03b5\u03b9\u03c3\u03c4\u03ac \u03a4\u03b5\u03c4\u03ac\u03c1\u03c4\u03b7.'
      : 'Every 30 minutes, 12:00 - 23:30. Closed Wednesday.',
    notesPlaceholder: isGreek
      ? '\u03a0\u03c1\u03bf\u03c4\u03af\u03bc\u03b7\u03c3\u03b7 \u03c4\u03c1\u03b1\u03c0\u03b5\u03b6\u03b9\u03bf\u03cd, \u03b1\u03bb\u03bb\u03b5\u03c1\u03b3\u03af\u03b5\u03c2 \u03ae \u03ba\u03ac\u03c4\u03b9 \u03ac\u03bb\u03bb\u03bf \u03c7\u03c1\u03ae\u03c3\u03b9\u03bc\u03bf.'
      : 'Table preference, allergies, or anything useful.',
    requiredError: isGreek
      ? '\u03a3\u03c5\u03bc\u03c0\u03bb\u03b7\u03c1\u03ce\u03c3\u03c4\u03b5 \u03c4\u03b1 \u03c5\u03c0\u03bf\u03c7\u03c1\u03b5\u03c9\u03c4\u03b9\u03ba\u03ac \u03c0\u03b5\u03b4\u03af\u03b1 \u03c0\u03c1\u03b9\u03bd \u03c3\u03c4\u03b5\u03af\u03bb\u03b5\u03c4\u03b5 \u03c4\u03bf \u03b1\u03af\u03c4\u03b7\u03bc\u03b1.'
      : 'Please complete the required fields before sending your request.',
    sendError: isGreek
      ? '\u0394\u03b5\u03bd \u03ae\u03c4\u03b1\u03bd \u03b4\u03c5\u03bd\u03b1\u03c4\u03ae \u03b7 \u03b1\u03c0\u03bf\u03c3\u03c4\u03bf\u03bb\u03ae. \u039a\u03b1\u03bb\u03ad\u03c3\u03c4\u03b5 \u03c4\u03bf \u03b5\u03c3\u03c4\u03b9\u03b1\u03c4\u03cc\u03c1\u03b9\u03bf \u03b3\u03b9\u03b1 \u03ba\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7.'
      : 'Reservation request could not be sent. Please call the restaurant to book.',
    successTitle: isGreek ? '\u03a4\u03bf \u03b1\u03af\u03c4\u03b7\u03bc\u03b1 \u03ba\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7\u03c2 \u03c3\u03c4\u03ac\u03bb\u03b8\u03b7\u03ba\u03b5' : 'Reservation request sent',
    successBody: isGreek
      ? '\u03a4\u03bf \u03b5\u03c3\u03c4\u03b9\u03b1\u03c4\u03cc\u03c1\u03b9\u03bf \u03b8\u03b1 \u03b5\u03c0\u03b9\u03ba\u03bf\u03b9\u03bd\u03c9\u03bd\u03ae\u03c3\u03b5\u03b9 \u03bc\u03b1\u03b6\u03af \u03c3\u03b1\u03c2 \u03b3\u03b9\u03b1 \u03b5\u03c0\u03b9\u03b2\u03b5\u03b2\u03b1\u03af\u03c9\u03c3\u03b7.'
      : 'The restaurant will contact you to confirm.',
    sending: isGreek ? '\u0391\u03c0\u03bf\u03c3\u03c4\u03bf\u03bb\u03ae...' : 'Sending...',
    submit: isGreek ? '\u0391\u03c0\u03bf\u03c3\u03c4\u03bf\u03bb\u03ae \u03b1\u03b9\u03c4\u03ae\u03bc\u03b1\u03c4\u03bf\u03c2 \u03ba\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7\u03c2' : 'Send Reservation Request',
  };

  function updateField(field: keyof ReservationForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
    setError('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValidDate = dateOptions.some((option) => option.value === form.date);
    const isValidTime = timeOptions.includes(form.time);

    if (!form.name.trim() || !form.phone.trim() || !isValidDate || !isValidTime || !form.guests) {
      setError(text.requiredError);
      return;
    }

    setIsSending(true);
    setSubmitted(false);
    setError('');

    try {
      if (sendToApi) {
        const response = await fetch('/api/reservation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const result = await response.json().catch(() => ({ ok: false }));

        if (!response.ok || !result.ok) {
          throw new Error(result.error || 'Reservation request could not be sent.');
        }
      } else {
        await new Promise((resolve) => {
          window.setTimeout(resolve, 300);
        });
      }

      setSubmitted(true);
      setForm(createInitialForm());
    } catch {
      setError(text.sendError);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="reservation-section" id="reservation">
      <div className="reservation-shell">
        <aside className="reservation-info-card" aria-label={text.title}>
          <span>{text.title}</span>
          <h2>{text.headline}</h2>
          <p>{text.intro}</p>

          <ul>
            <li>
              <Phone size={20} />
              <div>
                <strong>{text.phone}</strong>
                <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
              </div>
            </li>
            <li>
              <MapPin size={20} />
              <div>
                <strong>{text.address}</strong>
                <span>{contactInfo.address}</span>
              </div>
            </li>
            <li>
              <Clock3 size={20} />
              <div>
                <strong>{text.hours}</strong>
                {openingHours.map((hours) => (
                  <span key={hours}>{hours}</span>
                ))}
              </div>
            </li>
          </ul>

          <div className="reservation-note">
            <CalendarDays size={18} />
            <span>{text.note}</span>
          </div>
        </aside>

        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="reservation-form-heading">
            <span>{text.formEyebrow}</span>
            <h2>{text.formTitle}</h2>
            <p>{text.formIntro}</p>
          </div>

          <div className="reservation-form-section-title full-field">{text.diningDetails}</div>

          <label className="guest-field booking-primary-field">
            <span>
              {text.guests} <b>*</b>
            </span>
            <select required value={form.guests} onChange={(event) => updateField('guests', event.target.value)}>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="native-date-field booking-primary-field">
            <span>
              {text.date} <b>*</b>
            </span>
            <div className="native-field-shell reservation-select-shell has-value">
              <select
                aria-label={text.date}
                className="reservation-card-select"
                required
                value={form.date}
                onChange={(event) => updateField('date', event.target.value)}
              >
                {dateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <CalendarDays size={18} />
            </div>
            <small>{text.dateHelper}</small>
          </label>
          <label className="native-date-field booking-primary-field">
            <span>
              {text.time} <b>*</b>
            </span>
            <div className="native-field-shell reservation-select-shell has-value">
              <select
                aria-label={text.time}
                className="reservation-card-select"
                required
                value={form.time}
                onChange={(event) => updateField('time', event.target.value)}
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <Clock3 size={18} />
            </div>
            <small>{text.timeHelper}</small>
          </label>

          <div className="reservation-form-section-title full-field">{text.contactDetails}</div>

          <label className="contact-field">
            <span>
              {text.name} <b>*</b>
            </span>
            <input
              autoComplete="name"
              required
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder={text.namePlaceholder}
            />
          </label>
          <label className="contact-field">
            <span>
              {text.phoneField} <b>*</b>
            </span>
            <input
              autoComplete="tel"
              required
              type="tel"
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              placeholder={text.phonePlaceholder}
            />
          </label>
          <label className="full-field">
            <span>{text.notes}</span>
            <textarea
              value={form.notes}
              onChange={(event) => updateField('notes', event.target.value)}
              placeholder={text.notesPlaceholder}
            />
          </label>

          {error && <p className="form-error">{error}</p>}
          {submitted && (
            <p className="form-success" role="status" aria-live="polite">
              <CheckCircle2 size={20} />
              <span>
                <strong>{text.successTitle}</strong>
                {text.successBody}
              </span>
            </p>
          )}

          <button className="button button-red reservation-submit full-field" type="submit" disabled={isSending}>
            {isSending ? text.sending : text.submit}
            {!isSending && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </section>
  );
}
