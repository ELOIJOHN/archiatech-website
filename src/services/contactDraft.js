export const CONTACT_EMAIL = 'contact@archiatech.com';

export function prepareContactDraft({ fullName, email, company = '', message }) {
  const name = fullName.trim();
  const address = email.trim();
  const organization = company.trim();
  const text = message.trim();
  if (!name || name.length > 120 || !text || text.length > 4000 || organization.length > 160 ||
      address.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address) || /[\r\n]/.test(name + organization)) {
    throw new Error('Vérifiez votre nom, votre adresse email et votre message.');
  }
  const subject = `[ArchiAtech] Demande de contact — ${name}`;
  const body = `Nom : ${name}\nEmail : ${address}\nSociété : ${organization || 'Non renseignée'}\n\n${text}`;
  const gmail = new URL('https://mail.google.com/mail/');
  gmail.search = new URLSearchParams({ view: 'cm', fs: '1', to: CONTACT_EMAIL, su: subject, body }).toString();
  return {
    body, gmailUrl: gmail.href,
    mailtoUrl: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}
