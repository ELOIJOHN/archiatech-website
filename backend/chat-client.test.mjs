import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareMessages } from '../src/services/llmService.js';
test('long conversations preserve newest user within count and UTF-8 byte limits', () => {
  const history = Array.from({ length: 41 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: '🎾'.repeat(1000), extra: 'drop' }));
  history.at(-1).content = 'Dernière question';
  const selected = prepareMessages(history);
  assert.ok(selected.length <= 20 && selected.length > 1);
  assert.ok(Buffer.byteLength(JSON.stringify({ messages: selected })) <= 16384);
  assert.deepEqual(selected.at(-1), { role: 'user', content: 'Dernière question' });
  assert.ok(selected.every(m => m.content.length <= 2000 && !('extra' in m)));
});
test('oversized provider answer in history cannot poison the next request', () => {
  const selected = prepareMessages([{ role: 'assistant', content: 'a'.repeat(16000) }, { role: 'user', content: 'Suite' }]);
  assert.equal(selected[0].content.length, 2000);
  assert.equal(selected.at(-1).content, 'Suite');
});
