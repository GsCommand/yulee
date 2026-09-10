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
const oldGrid = '<div class="article-grid"><div><h3>Patio Paver Sealing Wildlight</h3><p>Patio pavers are inspected for staining, low joints, previous sealer, drainage and shaded areas before cleaning and sealing.</p></div><div><h3>Paver Lanai Sealing Wildlight</h3><p>Screened lanais can dry more slowly than open hardscape. We account for airflow, shade and moisture before applying breathable sealer.</p></div></div>';

if (!html.includes(oldGrid)) {
  throw new Error('Pool deck Wildlight two-card block not found; refusing partial replacement.');
}

const replacement = `<div class="article-grid pool-wildlight-wide-grid">
  <figure class="pool-wildlight-wide-photo">
    <img src="${imageSrc}" alt="Sealed pool deck and patio pavers in Yulee and Wildlight, Florida" loading="lazy" decoding="async" />
    <figcaption class="pool-wildlight-wide-caption">
      <div class="pool-wildlight-wide-caption-card">
        <h3>Patio Paver Sealing Wildlight</h3>
        <p>Patio pavers are inspected for staining, low joints, previous sealer, drainage and shaded areas before cleaning and sealing.</p>
      </div>
      <div class="pool-wildlight-wide-caption-card">
        <h3>Paver Lanai Sealing Wildlight</h3>
        <p>Screened lanais can dry more slowly than open hardscape. We account for airflow, shade and moisture before applying breathable sealer.</p>
      </div>
    </figcaption>
  </figure>
</div>`;

html = html.replace(oldGrid, replacement);
html = html.replace(/<style id="pool-wildlight-card-image-style">[\s\S]*?<\/style>/i, '');

const css = `<style id="pool-wildlight-card-image-style">
.pool-wildlight-focus .article-grid.pool-wildlight-wide-grid{display:block!important;margin-top:26px!important;padding-top:24px!important;border-top:1px solid var(--pool-line)!important}
.pool-wildlight-wide-photo{position:relative;width:100%;height:440px;margin:0;overflow:hidden;border:1px solid var(--pool-line);border-radius:22px;background:#eef9f7;box-shadow:0 14px 32px rgba(15,111,129,.13)}
.pool-wildlight-wide-photo img{display:block;width:100%;height:100%;object-fit:cover;object-position:center}
.pool-wildlight-wide-caption{position:absolute;inset:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));align-items:end;gap:18px;padding:26px;background:linear-gradient(180deg,rgba(6,36,48,0) 40%,rgba(6,36,48,.68) 100%)}
.pool-wildlight-wide-caption-card{min-width:0;background:rgba(11,54,88,.80);border:1px solid rgba(255,255,255,.28);border-radius:16px;padding:16px 18px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.pool-wildlight-focus .pool-wildlight-wide-caption-card h3{margin:0 0 7px!important;color:#fff!important}
.pool-wildlight-wide-caption-card p{margin:0!important;color:rgba(255,255,255,.92)!important;line-height:1.55!important}
@media(max-width:760px){.pool-wildlight-wide-photo{height:520px}.pool-wildlight-wide-caption{grid-template-columns:1fr;padding:16px;gap:10px}.pool-wildlight-wide-caption-card{padding:13px 15px}}
</style>`;
html = html.replace('</head>', `${css}\n</head>`);

const after = snapshot(html);
if (after.title !== before.title) throw new Error('Pool deck title changed while expanding Wildlight image.');
if (after.description !== before.description) throw new Error('Pool deck meta description changed while expanding Wildlight image.');
if (after.canonical !== before.canonical) throw new Error('Pool deck canonical changed while expanding Wildlight image.');
if (JSON.stringify(after.h1) !== JSON.stringify(before.h1)) throw new Error('Pool deck H1 changed while expanding Wildlight image.');
if (JSON.stringify(after.h2) !== JSON.stringify(before.h2)) throw new Error('Pool deck H2 inventory/order changed while expanding Wildlight image.');
if (JSON.stringify(after.h3) !== JSON.stringify(before.h3)) throw new Error('Pool deck H3 inventory/order changed while expanding Wildlight image.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Pool deck JSON-LD/schema changed while expanding Wildlight image.');

const imageCount = (html.match(/src="\/yulee-pool-sealing\.png"/g) || []).length;
if (imageCount !== 1) throw new Error(`Expected exactly one Wildlight pool image, found ${imageCount}.`);
if (!html.includes('pool-wildlight-wide-photo')) throw new Error('Wide Wildlight pool image container missing.');

fs.writeFileSync(file, html);
console.log('Expanded yulee-pool-sealing.png across the full left-and-right Wildlight card area while preserving both headings and copy.');
