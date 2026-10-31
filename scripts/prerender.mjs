// Génère, après `vite build`, un fichier HTML par page (balises <title>, description,
// canonical, Open Graph propres à chaque URL + texte de repli pour les robots),
// ainsi que sitemap.xml et 404.html. GitHub Pages sert alors chaque URL avec un vrai code 200.
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, SITE_URL } from '../src/data/site-pages.js';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const must = (html, regex, label) => {
  if (!regex.test(html)) throw new Error(`prerender : motif introuvable dans index.html (${label})`);
};

// Image de partage propre à la page (public/images/og/<slug>.jpg, voir generate-og.py),
// sinon l'image par défaut déjà présente dans index.html.
async function ogImage(page) {
  const slug = page.path.split('/').filter(Boolean).pop();
  if (!slug) return null;
  const file = path.join(dist, 'images/og', `${slug}.jpg`);
  try { await access(file); return `${SITE_URL}/images/og/${slug}.jpg`; } catch { return null; }
}

function render(page, image) {
  const url = `${SITE_URL}${page.path}`;
  let html = template;
  const swaps = [
    [/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`, 'title'],
    [/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(page.description)}" />`, 'description'],
    [/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, 'canonical'],
    [/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, 'og:url'],
    [/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(page.title)}" />`, 'og:title'],
    [/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(page.description)}" />`, 'og:description'],
    [/<meta property="twitter:url" content="[^"]*" \/>/, `<meta property="twitter:url" content="${url}" />`, 'twitter:url'],
    [/<meta property="twitter:title" content="[^"]*" \/>/, `<meta property="twitter:title" content="${esc(page.title)}" />`, 'twitter:title'],
    [/<meta property="twitter:description" content="[^"]*" \/>/, `<meta property="twitter:description" content="${esc(page.description)}" />`, 'twitter:description'],
  ];
  if (image) {
    swaps.push(
      [/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${image}" />`, 'og:image'],
      [/<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${esc(page.h1)} - ArchiAtech Digital Solutions" />`, 'og:image:alt'],
      [/<meta property="twitter:image" content="[^"]*" \/>/, `<meta property="twitter:image" content="${image}" />`, 'twitter:image'],
    );
  }
  for (const [regex, replacement, label] of swaps) {
    must(html, regex, label);
    html = html.replace(regex, () => replacement);
  }
  // Balisage FAQPage (données structurées) pour les pages qui ont une FAQ.
  if (page.faq && page.faq.length) {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    };
    html = html.replace('</head>', () => `  <script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n  </head>`);
  }
  // Texte de repli pour les robots : React le remplace dès que la page s'affiche.
  must(html, /<div id="root"><\/div>/, 'root');
  html = html.replace(
    '<div id="root"></div>',
    () => `<div id="root"><h1>${esc(page.h1)}</h1><p>${esc(page.summary)}</p></div>`,
  );
  return html;
}

for (const page of pages) {
  const dir = path.join(dist, page.path);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), render(page, await ogImage(page)));
}

// Page 404 (URL inconnue) : même application, marquée noindex.
const notFound = template
  .replace(/<title>[^<]*<\/title>/, () => '<title>Page introuvable | ArchiAtech</title>')
  .replace('</head>', () => '  <meta name="robots" content="noindex" />\n  </head>');
await writeFile(path.join(dist, '404.html'), notFound);

const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join('\n');
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

console.log(`prerender : ${pages.length} pages + 404.html + sitemap.xml générés`);
