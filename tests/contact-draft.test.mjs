import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareContactDraft, CONTACT_EMAIL } from '../src/services/contactDraft.js';
const valid = { fullName: ' Léa & Co ', email: ' lea@example.com ', company: '', message: ' Bonjour 🎾\nMon projet ' };
test('draft retains French text, addresses and line breaks without sending', () => {
  const d = prepareContactDraft(valid); const url = new URL(d.gmailUrl);
  assert.equal(url.origin, 'https://mail.google.com');
  assert.equal(url.searchParams.get('to'), CONTACT_EMAIL);
  assert.equal(url.searchParams.get('body'), d.body);
  assert.match(d.body, /Léa & Co/); assert.match(d.body, /Bonjour 🎾\nMon projet/);
  assert.match(d.body, /Non renseignée/);
  assert.equal(new URL(d.mailtoUrl).searchParams.get('body'), d.body);
});
test('visitor text cannot inject recipients or URL parameters', () => {
  const d = prepareContactDraft({ ...valid, fullName: 'Test &to=evil@example.com', message: 'x&bcc=evil@example.com#fragment' });
  for (const link of [d.gmailUrl, d.mailtoUrl]) {
    const url = new URL(link); assert.equal(url.searchParams.get('bcc'), null); assert.equal(url.hash, '');
  }
  assert.equal(new URL(d.gmailUrl).searchParams.get('to'), CONTACT_EMAIL);
});
test('blank, invalid and oversized data are rejected', () => {
  for (const override of [{fullName:'   '},{message:'  '},{email:'not-an-email'},{email:'a@b.c\nBcc:x@y.z'},{fullName:'a\nb'},{message:'a'.repeat(4001)},{fullName:'a'.repeat(121)},{company:'a'.repeat(161)}]) {
    assert.throws(() => prepareContactDraft({ ...valid, ...override }));
  }
});
