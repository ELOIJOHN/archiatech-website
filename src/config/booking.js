// Page de prise de rendez-vous Google Agenda (planning de rendez-vous).
// Compte archiatechx@gmail.com, page « Audit gratuit ArchiAtech » (30 min, lundi au vendredi 9 h-17 h, Google Meet).
// Si l'adresse est vidée, le lien de réservation disparaît du site.
// Surchargeable via VITE_BOOKING_URL.
export const BOOKING_URL = import.meta.env.VITE_BOOKING_URL ||
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3mKJRy4zk84XacxT7H6vudFq8jbG3mzDDQSDA5Pg4Y8v7VzQ9BhzIMuvILrvRA_eQTYzZ0_8jM';
