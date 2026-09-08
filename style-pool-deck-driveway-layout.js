const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-pool-deck-paver-sealing.html');
if (!fs.existsSync(file)) throw new Error('Pool deck page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');

function freezeProtected(source) {
  return {
    title: (source.match(/<title>[\s\S]*?<\/title>/i) || [])[0] || '',
    description: (source.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0] || '',
    canonical: (source.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0] || '',
    jsonLd: source.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || [],
    h1: source.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [],
    h2: source.match(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi) || [],
    h3: source.match(/<h3\b[^>]*>[\s\S]*?<\/h3>/gi) || []
  };
}

function same(a, b) { return JSON.stringify(a) === JSON.stringify(b); }

function assertProtected(before, after) {
  if (after.title !== before.title) throw new Error('Pool deck title changed during cosmetic clone.');
  if (after.description !== before.description) throw new Error('Pool deck meta description changed during cosmetic clone.');
  if (after.canonical !== before.canonical) throw new Error('Pool deck canonical changed during cosmetic clone.');
  if (!same(after.jsonLd, before.jsonLd)) throw new Error('Pool deck JSON-LD/schema changed during cosmetic clone.');
  if (!same(after.h1, before.h1)) throw new Error('Pool deck H1 changed during cosmetic clone.');
  if (!same(after.h2, before.h2)) throw new Error('Pool deck H2 inventory/order changed during cosmetic clone.');
  if (!same(after.h3, before.h3)) throw new Error('Pool deck H3 inventory/order changed during cosmetic clone.');
}

function sectionByHeading(source, headingHtml) {
  const headingPos = source.indexOf(headingHtml);
  if (headingPos < 0) throw new Error(`Pool deck heading not found: ${headingHtml}`);
  const start = source.lastIndexOf('<section', headingPos);
  const endTag = source.indexOf('</section>', headingPos);
  if (start < 0 || endTag < 0) throw new Error(`Pool deck section bounds not found for ${headingHtml}`);
  return { start, end: endTag + '</section>'.length, text: source.slice(start, endTag + '</section>'.length) };
}

function addClassToSectionByHeading(source, headingHtml, className) {
  const section = sectionByHeading(source, headingHtml);
  if (new RegExp(`\\b${className}\\b`).test(section.text.match(/^<section[^>]*>/i)[0])) return source;
  const updated = section.text.replace(/^<section\s+class="([^"]*)"/i, `<section class="$1 ${className}"`);
  if (updated === section.text) throw new Error(`Could not add ${className} to section for ${headingHtml}`);
  return source.slice(0, section.start) + updated + source.slice(section.end);
}

const protectedBefore = freezeProtected(html);
if (!protectedBefore.title || !protectedBefore.description || !protectedBefore.canonical || protectedBefore.h1.length !== 1) {
  throw new Error('Pool deck protected SEO foundation could not be frozen.');
}

// Page modifier class for color and layout overrides.
if (html.includes('<body class="y-shared-top">')) {
  html = html.replace('<body class="y-shared-top">', '<body class="y-shared-top pool-driveway-clone">');
} else if (!html.includes('pool-driveway-clone')) {
  throw new Error('Expected shared pool deck body class not found.');
}

// Clone the driveway opening section: text left, three stacked cards, image right.
const firstHeading = '<h2>Patio Paver Sealing Yulee Requires a Different Plan Than an Open Driveway</h2>';
const firstSection = sectionByHeading(html, firstHeading);
if (!firstSection.text.includes('pool-condition-section')) {
  const open = '<section class="article-block">';
  if (!firstSection.text.startsWith(open)) throw new Error('Unexpected pool deck opening section wrapper.');
  const gridMarker = '<div class="content-grid three">';
  const gridPos = firstSection.text.indexOf(gridMarker);
  if (gridPos < 0) throw new Error('Pool deck three-card grid missing from opening section.');
  const prefix = firstSection.text.slice(open.length, gridPos);
  const gridEnd = firstSection.text.lastIndexOf('</div></section>');
  if (gridEnd < 0) throw new Error('Pool deck opening grid end not found.');
  const gridInner = firstSection.text.slice(gridPos + gridMarker.length, gridEnd);
  const cards = [...gridInner.matchAll(/<div class="content-card">([\s\S]*?)<\/div>/g)].map(m => m[1]);
  if (cards.length !== 3) throw new Error(`Expected three pool deck opening cards, found ${cards.length}.`);
  const cardMarkup = cards.map((inner, i) => `<article class="pool-condition-card pool-condition-card--${i + 1}"><span class="pool-condition-number">0${i + 1}</span><div>${inner}</div></article>`).join('');
  const replacement = `<section class="article-block pool-condition-section"><div class="pool-condition-grid"><div class="pool-condition-content">${prefix}<div class="pool-condition-stack">${cardMarkup}</div></div><figure class="pool-condition-image"><img src="/pool-deck-link.png" alt="Pool deck and patio paver sealing in Yulee, Florida" loading="lazy" decoding="async" /></figure></div></section>`;
  html = html.slice(0, firstSection.start) + replacement + html.slice(firstSection.end);
}

// Give existing sections the same visual roles as their driveway counterparts without changing copy/headings.
html = addClassToSectionByHeading(html, '<h2>Pool Deck Paver Sealing Wildlight Yulee</h2>', 'pool-wildlight-focus');
html = addClassToSectionByHeading(html, '<h2>Pool deck sealing requires wet-area planning</h2>', 'pool-secondary-band');
html = addClassToSectionByHeading(html, '<h2>Pool Deck Paver Sanding and Sealing Yulee</h2>', 'pool-process-section');
html = addClassToSectionByHeading(html, '<h2>Pool deck paver sealing cost in Yulee</h2>', 'pool-pricing-section');
html = addClassToSectionByHeading(html, '<h2>Pool deck and patio paver sealing near Yulee</h2>', 'pool-service-areas');
html = addClassToSectionByHeading(html, '<h2>Do not rush a brand-new pool deck into sealer</h2>', 'pool-readiness-split');

// Community-research block keeps all indexed headings/copy but adopts the stacked-card design language.
const researchMarker = '<section class="article-block" data-yulee-community-research="2026-09-07">';
if (html.includes(researchMarker)) {
  html = html.replace(researchMarker, '<section class="article-block pool-community-section" data-yulee-community-research="2026-09-07">');
}

// Move only the existing Elfsight review widget to the driveway-equivalent position before Wildlight.
const reviewWidget = 'elfsight-app-6c4e28f8-e9a0-49a8-b07c-0c224e121a67';
const reviewRe = new RegExp(`<section[^>]*aria-label="Recent reviews"[^>]*>[\\s\\S]*?<div class="${reviewWidget}"[^>]*><\\/div>[\\s\\S]*?<\\/section>`, 'g');
const reviewMatches = html.match(reviewRe) || [];
if (reviewMatches.length !== 1) throw new Error(`Expected one pool deck Recent reviews widget, found ${reviewMatches.length}.`);
const reviewBlock = reviewMatches[0];
html = html.replace(reviewRe, '');
const wildlightMarker = '<section class="feature-band pool-wildlight-focus">';
if (!html.includes(wildlightMarker)) throw new Error('Styled pool deck Wildlight section not found for review placement.');
html = html.replace(wildlightMarker, `${reviewBlock}\n${wildlightMarker}`);

const css = `<style id="pool-driveway-clone-style">
body.pool-driveway-clone{--pool-accent:#27b7ad;--pool-blue:#39bfea;--pool-dark:#0b4558;--pool-soft:#effbf9;--pool-line:#d3e9e7}
body.pool-driveway-clone .ys-hero--no-image{background:linear-gradient(135deg,#0a394f 0%,#0f6f81 52%,#28a8a5 100%)!important}
body.pool-driveway-clone .ys-proof-blue{background:linear-gradient(135deg,#168f88,#0f6ea8)!important;box-shadow:0 15px 34px rgba(39,183,173,.23)!important}
body.pool-driveway-clone .ys-feature-wrap{filter:drop-shadow(0 14px 24px rgba(39,183,173,.10))}
body.pool-driveway-clone .ys-feature{box-shadow:0 8px 22px rgba(25,130,137,.05)}

.pool-condition-section{padding-top:clamp(48px,6vw,78px)!important;padding-bottom:clamp(48px,6vw,78px)!important}
.pool-condition-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(360px,.92fr);gap:clamp(28px,4vw,48px);align-items:stretch}
.pool-condition-content{min-width:0;display:flex;flex-direction:column}.pool-condition-content>h2{margin-bottom:14px}.pool-condition-content>.lead{margin-bottom:24px}
.pool-condition-stack{display:grid;gap:14px;margin-top:2px}
.pool-condition-card{position:relative;display:grid;grid-template-columns:48px 1fr;gap:16px;align-items:start;padding:22px 22px 21px;border:1px solid var(--pool-line);border-radius:20px;box-shadow:0 10px 26px rgba(15,111,129,.07);overflow:hidden;background:linear-gradient(135deg,#f0fcfa 0%,#fff 72%)}
.pool-condition-card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--pool-accent)}
.pool-condition-card--2{background:linear-gradient(135deg,#eff9ff 0%,#fff 72%)}.pool-condition-card--2::before{background:var(--pool-blue)}
.pool-condition-card--3{background:linear-gradient(135deg,#f2fbfb 0%,#fff 72%)}.pool-condition-card--3::before{background:#4c8ea0}
.pool-condition-number{display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:13px;background:var(--pool-dark);color:#fff;font-size:12px;font-weight:900;letter-spacing:1px;box-shadow:0 7px 16px rgba(11,69,88,.18)}
.pool-condition-card h3{margin:0 0 7px;color:#0b2d4a;font-size:clamp(19px,1.6vw,23px);line-height:1.12}.pool-condition-card p{margin:0;color:#536475;line-height:1.66}
.pool-condition-image{position:relative;margin:0;min-width:0;border:1px solid var(--pool-line);border-left:5px solid var(--pool-accent);border-radius:20px;padding:10px;background:linear-gradient(135deg,#effbf9 0%,#fff 72%);box-shadow:0 10px 26px rgba(11,69,88,.07),0 18px 42px rgba(39,183,173,.24);min-height:100%;overflow:hidden}
.pool-condition-image img{display:block;width:100%;height:100%;min-height:540px;object-fit:cover;object-position:center;border-radius:13px}

.pool-wildlight-focus{position:relative;background:linear-gradient(145deg,#f0fcfa 0%,#fff 72%)!important;color:#0b1220!important;border:1px solid var(--pool-line)!important;border-top:4px solid var(--pool-accent)!important;border-radius:28px!important;padding:clamp(26px,4vw,38px)!important;box-shadow:0 18px 44px rgba(39,183,173,.11)!important;overflow:hidden}
.pool-wildlight-focus::after{content:"";position:absolute;right:-90px;top:-90px;width:220px;height:220px;border-radius:50%;background:rgba(39,183,173,.09);pointer-events:none}
.pool-wildlight-focus>.eyebrow{position:relative;z-index:1;display:inline-flex!important;padding:7px 11px!important;margin:0 0 12px!important;border-radius:999px;background:#e5f8f5!important;color:#168f88!important;font-size:11px!important;font-weight:900!important;letter-spacing:1.25px!important}
.pool-wildlight-focus>h2{position:relative;z-index:1;margin:0 0 14px!important;color:#0b2d4a!important;font-size:clamp(30px,3.15vw,44px)!important;line-height:1.04!important;letter-spacing:-1px!important}
.pool-wildlight-focus>p{position:relative;z-index:1;max-width:980px;color:#536475!important;line-height:1.72!important}
.pool-wildlight-focus .article-grid{position:relative;z-index:1;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:16px!important;margin-top:26px!important;padding-top:24px!important;border-top:1px solid var(--pool-line)!important}
.pool-wildlight-focus .article-grid>div{position:relative;background:#fff!important;border:1px solid var(--pool-line)!important;border-radius:19px!important;padding:22px 22px 21px 24px!important;box-shadow:0 9px 24px rgba(15,111,129,.06)!important;overflow:hidden}
.pool-wildlight-focus .article-grid>div::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--pool-accent)}.pool-wildlight-focus .article-grid>div:nth-child(2)::before{background:var(--pool-blue)}
.pool-wildlight-focus a{color:#168f88!important;text-decoration:none!important;border-bottom:1px solid rgba(22,143,136,.28)}

.pool-secondary-band{width:100vw!important;position:relative!important;left:50%!important;margin-left:-50vw!important;margin-right:-50vw!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px!important;padding:58px max(20px,calc((100vw - 1180px)/2))!important;background:linear-gradient(135deg,#0b4d5b 0%,#0b3658 68%,#0f6e7a 100%)!important;border:0!important}
.pool-secondary-band>.article-card{background:rgba(255,255,255,.97)!important;border:1px solid rgba(255,255,255,.55)!important;border-radius:24px!important;padding:28px!important;box-shadow:0 16px 40px rgba(0,0,0,.14)!important}
.pool-secondary-band>.article-card:first-child{box-shadow:0 18px 42px rgba(39,183,173,.18)!important}.pool-secondary-band>.article-card:nth-child(2){box-shadow:0 18px 42px rgba(57,191,234,.16)!important}

.pool-process-section,.pool-community-section,.pool-service-areas{border:1px solid var(--pool-line)!important;border-radius:26px!important;padding:clamp(26px,4vw,38px)!important;background:linear-gradient(145deg,#fbfefe,#f4fbfa)!important;box-shadow:0 14px 34px rgba(15,111,129,.07)!important}
.pool-process-section .process-step{border:1px solid var(--pool-line)!important;border-radius:18px!important;background:#fff!important;box-shadow:0 8px 20px rgba(15,111,129,.05)!important}
.pool-process-section .process-step strong{color:#168f88!important}
.pool-community-section .content-card{border-color:var(--pool-line)!important;border-radius:20px!important;box-shadow:0 8px 22px rgba(15,111,129,.05)!important}
.pool-pricing-section{border:1px solid var(--pool-line)!important;border-radius:28px!important;padding:clamp(26px,4vw,38px)!important;background:#fff!important;box-shadow:0 18px 44px rgba(39,183,173,.10)!important}
.pool-pricing-section .hydroseal-pool-slider-card{border-color:var(--pool-line)!important;box-shadow:0 18px 42px rgba(39,183,173,.15)!important}
.pool-service-areas .location-link{border-color:var(--pool-line)!important;border-radius:18px!important;background:#fff!important;box-shadow:0 7px 18px rgba(15,111,129,.05)!important}
.pool-readiness-split{gap:18px!important}.pool-readiness-split>div{border:1px solid var(--pool-line)!important;border-radius:24px!important;padding:26px!important;background:linear-gradient(145deg,#f5fcfb,#fff)!important;box-shadow:0 12px 28px rgba(39,183,173,.08)!important}
body.pool-driveway-clone section[aria-label="Recent reviews"]{width:min(1180px,calc(100% - 40px))!important;margin:30px auto 42px!important;padding:14px!important;border:1px solid var(--pool-line)!important;border-radius:24px!important;background:#fff!important;min-height:260px!important;box-shadow:0 14px 34px rgba(39,183,173,.08)!important}
body.pool-driveway-clone .faq-section{border-top:4px solid var(--pool-accent);box-shadow:0 14px 34px rgba(39,183,173,.07)}
body.pool-driveway-clone .cta-panel{box-shadow:0 18px 44px rgba(39,183,173,.12)!important}
body.pool-driveway-clone .cta-panel .button.primary{background:linear-gradient(135deg,#27b7ad,#1598b0)!important}

@media(max-width:980px){.pool-condition-grid{grid-template-columns:1fr}.pool-condition-image{min-height:0}.pool-condition-image img{height:auto;min-height:0;max-height:620px;object-fit:cover}.pool-condition-card{grid-template-columns:44px 1fr}.pool-secondary-band{grid-template-columns:1fr!important}}
@media(max-width:760px){.pool-wildlight-focus .article-grid{grid-template-columns:1fr!important}.pool-wildlight-focus{border-radius:22px!important;padding:24px 20px!important}}
@media(max-width:650px){body.pool-driveway-clone section[aria-label="Recent reviews"]{width:calc(100% - 24px)!important}.pool-secondary-band{padding:38px 12px!important}}
@media(max-width:560px){.pool-condition-card{padding:18px 16px;gap:12px;border-radius:17px}.pool-condition-number{width:38px;height:38px}.pool-condition-image{border-radius:17px;padding:8px}.pool-condition-image img{border-radius:11px}}
</style>`;

const oldStyle = /<style id="pool-driveway-clone-style">[\s\S]*?<\/style>\s*/i;
if (oldStyle.test(html)) html = html.replace(oldStyle, `${css}\n`);
else html = html.replace('</head>', `${css}\n</head>`);

const protectedAfter = freezeProtected(html);
assertProtected(protectedBefore, protectedAfter);

for (const required of ['pool-driveway-clone','pool-condition-section','/pool-deck-link.png','pool-wildlight-focus','pool-secondary-band','pool-process-section','pool-pricing-section',reviewWidget]) {
  if (!html.includes(required)) throw new Error(`Pool deck clone verification failed: ${required}`);
}
const reviewPos = html.indexOf(reviewWidget);
const wildlightPos = html.indexOf('Pool Deck Paver Sealing Wildlight Yulee');
if (reviewPos < 0 || wildlightPos < 0 || reviewPos > wildlightPos) throw new Error('Pool deck reviews were not moved before the Wildlight focus section.');

fs.writeFileSync(file, html);
console.log('Built pool deck page as a driveway-layout sibling with teal/aqua-blue accents; H1/H2/H3, metadata, canonical and schema preserved exactly.');
