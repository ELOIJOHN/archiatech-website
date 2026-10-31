// Page de prise de rendez-vous Google Agenda (planning de rendez-vous).
// Tant que cette adresse est vide, le bouton « Réserver un créneau » n'apparaît pas.
// Surchargeable via VITE_BOOKING_URL.
export const BOOKING_URL = import.meta.env.VITE_BOOKING_URL || '';
