import { ArrowRight, CalendarDays, CheckCircle2, Clock3, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { contactInfo } from '../data/contact';
import type { ReservationForm } from '../types/reservation';
import { useLanguage } from './languageContext';

const initialForm: ReservationForm = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  notes: '',
};

const today = new Date().toISOString().slice(0, 10);

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
  const [form, setForm] = useState<ReservationForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const sendToApi = import.meta.env.VITE_RESERVATION_API_ENABLED === 'true';

  const text = {
    title: isGreek ? 'Κρατήσεις' : 'Reservations',
    intro: isGreek
      ? 'Στείλτε το αίτημά σας και η τελική επιβεβαίωση θα γίνει απευθείας από το εστιατόριο.'
      : 'Send your request and final confirmation comes directly from the restaurant.',
    phone: isGreek ? 'Τηλέφωνο' : 'Phone',
    address: isGreek ? 'Διεύθυνση' : 'Address',
    hours: isGreek ? 'Ώρες λειτουργίας' : 'Opening hours',
    note: isGreek
      ? 'Η τελική επιβεβαίωση γίνεται απευθείας από το εστιατόριο.'
      : 'Final confirmation comes directly from the restaurant.',
    formTitle: isGreek ? 'Στοιχεία κράτησης' : 'Booking details',
    formIntro: isGreek
      ? 'Συμπληρώστε τα στοιχεία σας και θα επικοινωνήσουμε μαζί σας για επιβεβαίωση.'
      : 'Fill in your details and we will contact you to confirm availability.',
    formEyebrow: isGreek ? 'Αίτημα κράτησης' : 'Reservation Details',
    name: isGreek ? 'Όνομα' : 'Name',
    phoneField: isGreek ? 'Τηλέφωνο' : 'Phone',
    date: isGreek ? 'Ημερομηνία' : 'Date',
    time: isGreek ? 'Ώρα' : 'Time',
    guests: isGreek ? 'Άτομα' : 'Guests',
    notes: isGreek ? 'Σημειώσεις' : 'Notes',
    namePlaceholder: isGreek ? 'Το όνομά σας' : 'Your name',
    phonePlaceholder: isGreek ? 'Αριθμός τηλεφώνου' : 'Phone number',
    datePlaceholder: isGreek ? 'Επιλέξτε ημερομηνία' : 'Select date',
    timePlaceholder: isGreek ? 'Επιλέξτε ώρα' : 'Select time',
    dateHelper: isGreek ? 'Μορφή εμφάνισης: ΗΗ/ΜΜ/ΕΕΕΕ' : 'Shown as DD/MM/YYYY',
    timeHelper: isGreek ? 'Ωράριο: 12:00 - 23:30' : 'Opening hours: 12:00 - 23:30',
    notesPlaceholder: isGreek
      ? 'Προτίμηση τραπεζιού, αλλεργίες ή κάτι άλλο χρήσιμο.'
      : 'Table preference, allergies, or anything useful.',
    requiredError: isGreek
      ? 'Συμπληρώστε τα υποχρεωτικά πεδία πριν στείλετε το αίτημα.'
      : 'Please complete the required fields before sending your request.',
    sendError: isGreek
      ? 'Δεν ήταν δυνατή η αποστολή. Καλέστε το εστιατόριο για κράτηση.'
      : 'Reservation request could not be sent. Please call the restaurant to book.',
    successTitle: isGreek ? 'Το αίτημα κράτησης στάλθηκε' : 'Reservation request sent',
    successBody: isGreek
      ? 'Το εστιατόριο θα επικοινωνήσει μαζί σας για επιβεβαίωση.'
      : 'The restaurant will contact you to confirm.',
    sending: isGreek ? 'Αποστολή...' : 'Sending...',
    submit: isGreek ? 'Αποστολή αιτήματος κράτησης' : 'Send Reservation Request',
  };

  function updateField(field: keyof ReservationForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
    setError('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.date || !form.time || !form.guests) {
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
      setForm(initialForm);
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
          <h2>{isGreek ? 'Κλείστε τραπέζι στο Wok Dragon' : 'Book with Wok Dragon'}</h2>
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

          <label>
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
          <label>
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
          <label className="native-date-field">
            <span>
              {text.date} <b>*</b>
            </span>
            <div className={`native-field-shell ${form.date ? 'has-value' : ''}`}>
              <input
                aria-label={text.date}
                className="native-field-input"
                min={today}
                required
                type="date"
                value={form.date}
                onChange={(event) => updateField('date', event.target.value)}
              />
              <span className="native-field-display">{formatDisplayDate(form.date) || text.datePlaceholder}</span>
              <CalendarDays size={18} />
            </div>
            <small>{text.dateHelper}</small>
          </label>
          <label className="native-date-field">
            <span>
              {text.time} <b>*</b>
            </span>
            <div className={`native-field-shell ${form.time ? 'has-value' : ''}`}>
              <input
                aria-label={text.time}
                className="native-field-input"
                max="23:30"
                min="12:00"
                required
                step="900"
                type="time"
                value={form.time}
                onChange={(event) => updateField('time', event.target.value)}
              />
              <span className="native-field-display">{form.time || text.timePlaceholder}</span>
              <Clock3 size={18} />
            </div>
            <small>{text.timeHelper}</small>
          </label>
          <label className="guest-field">
            <span>
              {text.guests} <b>*</b>
            </span>
            <select required value={form.guests} onChange={(event) => updateField('guests', event.target.value)}>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
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
