// Intentionally no real fetch, environment credentials, or outbound provider access.
import assert from 'node:assert/strict';
import { createArchiAgentServer } from '../archiagent-server.mjs';
const server = createArchiAgentServer({
  apiKey: 'isolated-fake-key',
  allowedOrigins: ['https://localhost:18443'],
  trustedProxies: ['127.0.0.1'],
  fetchImpl: async (url, options) => {
    assert.equal(url, 'https://api.openai.com/v1/chat/completions');
    const { messages } = JSON.parse(options.body);
    assert.equal(messages[0].role, 'system');
    const content = messages.at(-1).content;
    if (content === 'TEST_PROVIDER_FAILURE') return new Response('private provider failure', { status: 500 });
    return Response.json({ choices: [{ message: { content: `Test isolé reçu : ${content}` } }] });
  },
});
server.listen(8787, '127.0.0.1');
