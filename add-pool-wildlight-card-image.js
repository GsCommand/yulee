const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-pool-deck-paver-sealing.html');
if (!fs.existsSync(file)) throw new Error('Pool deck page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');

function snapshot(source) {
  return {
    title: (source.match(/<title>[\s\S]*?<\/title>/i) || [])[0] || '',
    description: (source.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0] || '',
    canonical: (source.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0] || '',
    h1: source.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [],
    h2: source.match(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi) || [],
    h3: source.match(/<h3\b[^>]*>[\s\S]*?<\/h3>/gi) || [],
    jsonLd: source.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []
  };
}

const before = snapshot(html);
const imageSrc = '/yulee-pool-sealing.png';
const lanaiHeading = '<h3>Paver Lanai Sealing Wildlight</h3>';
const lanaiCopy = 'Screened lanais can dry more slowly than open hardscape. We account for airflow, shade and moisture before applying breathable sealer.';
const sourceGrid = '<div class="article-grid"><div><h3>Patio Paver Sealing Wildlight</h3><p>Patio pavers are inspected for staining, low joints, previous sealer, drainage and shaded areas before cleaning and sealing.</p></div><div><h3>Paver Lanai Sealing Wildlight</h3><p>Screened lanais can dry more slowly than open hardscape. We account for airflow, shade and moisture before applying breathable sealer.</p></div></div>';
const replacementGrid = '<div class="article-grid pool-wildlight-single-grid"><div class="pool-wildlight-image-card"><h3>Patio Paver Sealing Wildlight</h3><p>Patio pavers are inspected for staining, low joints, previous sealer, drainage and shaded areas before cleaning and sealing.</p><figure class="pool-wildlight-card-photo"><img src="/yulee-pool-sealing.png" alt="Sealed pool deck and patio pavers in Yulee and Wildlight, Florida" loading="lazy" decoding="async" /></figure></div></div>';

const lanaiHeadingCount = before.h3.filter((heading) => heading === lanaiHeading).length;
if (lanaiHeadingCount !== 1) throw new Error(`Expected exactly one Wildlight lanai heading before removal, found ${lanaiHeadingCount}.`);
if (!html.includes(sourceGrid)) throw new Error('Expected Wildlight patio/lanai two-card grid not found; refusing partial layout change.');

html = html.replace(sourceGrid, replacementGrid);

const css = `<style id="pool-wildlight-card-image-style">
.pool-wildlight-focus .article-grid.pool-wildlight-single-grid{grid-template-columns:minmax(0,1fr)!important}
.pool-wildlight-focus .pool-wildlight-image-card{grid-column:1 / -1;display:flex;flex-direction:column;width:100%}
.pool-wildlight-card-photo{width:100%;margin:18px 0 0;overflow:hidden;border:1px solid var(--pool-line);border-radius:15px;background:#eef9f7;box-shadow:0 10px 24px rgba(15,111,129,.10)}
.pool-wildlight-card-photo img{display:block;width:100%;height:auto;object-fit:cover;object-position:center}
</style>`;

html = html.replace(/<style id="pool-wildlight-card-image-style">[\s\S]*?<\/style>/i, '');
html = html.replace('</head>', `${css}\n</head>`);

const after = snapshot(html);
if (after.title !== before.title) throw new Error('Pool deck title changed while expanding Wildlight patio card.');
if (after.description !== before.description) throw new Error('Pool deck meta description changed while expanding Wildlight patio card.');
if (after.canonical !== before.canonical) throw new Error('Pool deck canonical changed while expanding Wildlight patio card.');
if (JSON.stringify(after.h1) !== JSON.stringify(before.h1)) throw new Error('Pool deck H1 changed while expanding Wildlight patio card.');
if (JSON.stringify(after.h2) !== JSON.stringify(before.h2)) throw new Error('Pool deck H2 inventory/order changed while expanding Wildlight patio card.');
const expectedH3 = before.h3.filter((heading) => heading !== lanaiHeading);
if (JSON.stringify(after.h3) !== JSON.stringify(expectedH3)) throw new Error('Pool deck H3 inventory/order changed beyond the intended Wildlight lanai heading removal.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Pool deck JSON-LD/schema changed while expanding Wildlight patio card.');

const imageCount = (html.match(/src="\/yulee-pool-sealing\.png"/g) || []).length;
if (imageCount !== 1) throw new Error(`Expected exactly one Wildlight pool image, found ${imageCount}.`);
if (html.includes(lanaiHeading) || html.includes(lanaiCopy)) throw new Error('Wildlight lanai section was not fully removed.');
if (!html.includes('pool-wildlight-single-grid')) throw new Error('Full-width Wildlight patio grid class missing.');

fs.writeFileSync(file, html);
console.log('Removed the Wildlight lanai card and expanded the Patio Paver Sealing Wildlight image card to the full grid width.');
