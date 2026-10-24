const form = document.querySelector('#chat');
const button = form.querySelector('button');
const status = document.querySelector('#status');
const reply = document.querySelector('#reply');
let pending = false;
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (pending) return;
  pending = true;
  button.disabled = true;
  status.textContent = 'Réponse en cours…';
  reply.textContent = '';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch('/api/archiagent', {
      method: 'POST', credentials: 'omit', redirect: 'error', signal: controller.signal,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + document.querySelector('#token').value },
      body: JSON.stringify({ messages: [{ role: 'user', content: document.querySelector('#message').value.trim() }] }),
    });
    if (!response.ok) {
      const messages = { 401: 'Code d’accès incorrect.', 429: 'Limite atteinte. Réessayez dans une minute.', 400: 'Vérifiez votre question.' };
      throw new Error(messages[response.status] || 'Le fournisseur IA est indisponible. Réessayez plus tard.');
    }
    const data = await response.json();
    if (typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('Réponse invalide.');
    reply.textContent = data.reply;
    status.textContent = 'Réponse reçue du backend.';
  } catch (error) {
    status.textContent = error.name === 'AbortError' ? 'Délai dépassé. Réessayez plus tard.' : error.message;
  } finally {
    clearTimeout(timer);
    pending = false;
    button.disabled = false;
  }
});
