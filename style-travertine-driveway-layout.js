const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-travertine-sealing.html');
if (!fs.existsSync(file)) throw new Error('Travertine page missing from public build output.');

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
  if (after.title !== before.title) throw new Error('Travertine title changed during cosmetic clone.');
  if (after.description !== before.description) throw new Error('Travertine meta description changed during cosmetic clone.');
  if (after.canonical !== before.canonical) throw new Error('Travertine canonical changed during cosmetic clone.');
  if (!same(after.jsonLd, before.jsonLd)) throw new Error('Travertine JSON-LD/schema changed during cosmetic clone.');
  if (!same(after.h1, before.h1)) throw new Error('Travertine H1 changed during cosmetic clone.');
  if (!same(after.h2, before.h2)) throw new Error('Travertine H2 inventory/order changed during cosmetic clone.');
  if (!same(after.h3, before.h3)) throw new Error('Travertine H3 inventory/order changed during cosmetic clone.');
}

function sectionByHeading(source, headingHtml) {
  const headingPos = source.indexOf(headingHtml);
  if (headingPos < 0) throw new Error(`Travertine heading not found: ${headingHtml}`);
  const start = source.lastIndexOf('<section', headingPos);
  const endTag = source.indexOf('</section>', headingPos);
  if (start < 0 || endTag < 0) throw new Error(`Travertine section bounds not found for ${headingHtml}`);
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
  throw new Error('Travertine protected SEO foundation could not be frozen.');
}

if (html.includes('<body class="y-shared-top">')) {
  html = html.replace('<body class="y-shared-top">', '<body class="y-shared-top travertine-driveway-clone">');
} else if (!html.includes('travertine-driveway-clone')) {
  throw new Error('Expected shared travertine body class not found.');
}

// Clone the driveway opening section with the existing travertine H2/H3 copy untouched.
const firstHeading = '<h2>Travertine should not be treated like ordinary concrete pavers</h2>';
const firstSection = sectionByHeading(html, firstHeading);
if (!firstSection.text.includes('travertine-condition-section')) {
  const open = '<section class="article-block">';
  if (!firstSection.text.startsWith(open)) throw new Error('Unexpected travertine opening section wrapper.');
  const gridMarker = '<div class="content-grid three">';
  const gridPos = firstSection.text.indexOf(gridMarker);
  if (gridPos < 0) throw new Error('Travertine three-card grid missing from opening section.');
  const prefix = firstSection.text.slice(open.length, gridPos);
  const gridEnd = firstSection.text.lastIndexOf('</div></section>');
  if (gridEnd < 0) throw new Error('Travertine opening grid end not found.');
  const gridInner = firstSection.text.slice(gridPos + gridMarker.length, gridEnd);
  const cards = [...gridInner.matchAll(/<div class="content-card">([\s\S]*?)<\/div>/g)].map(m => m[1]);
  if (cards.length !== 3) throw new Error(`Expected three travertine opening cards, found ${cards.length}.`);
  const cardMarkup = cards.map((inner, i) => `<article class="travertine-condition-card travertine-condition-card--${i + 1}"><span class="travertine-condition-number">0${i + 1}</span><div>${inner}</div></article>`).join('');
  const replacement = `<section class="article-block travertine-condition-section"><div class="travertine-condition-grid"><div class="travertine-condition-content">${prefix}<div class="travertine-condition-stack">${cardMarkup}</div></div><figure class="travertine-condition-image"><img src="/travertine-link.png" alt="Travertine and natural stone sealing in Yulee, Florida" loading="lazy" decoding="async" /></figure></div></section>`;
  html = html.slice(0, firstSection.start) + replacement + html.slice(firstSection.end);
}

html = addClassToSectionByHeading(html, '<h2>Outdoor travertine needs breathable protection</h2>', 'travertine-secondary-band');
html = addClassToSectionByHeading(html, '<h2>Travertine Sealing Wildlight Yulee</h2>', 'travertine-wildlight-focus');
html = addClassToSectionByHeading(html, '<h2>How Yulee Travertine Sealing Works</h2>', 'travertine-process-section');
html = addClassToSectionByHeading(html, '<h2>Natural vs. enhancing travertine sealer</h2>', 'travertine-detail-pair');
html = addClassToSectionByHeading(html, '<h2>Travertine sealing cost in Yulee</h2>', 'travertine-pricing-section');
html = addClassToSectionByHeading(html, '<h2>Travertine and natural stone sealing near Yulee</h2>', 'travertine-service-areas');
html = addClassToSectionByHeading(html, '<h2>Acidic concrete cleaners can etch travertine</h2>', 'travertine-readiness-split');

// Move only the existing review widget into the same position used by the driveway layout.
const reviewWidget = 'elfsight-app-6c4e28f8-e9a0-49a8-b07c-0c224e121a67';
const reviewRe = new RegExp(`<section[^>]*aria-label="Recent reviews"[^>]*>[\\s\\S]*?<div class="${reviewWidget}"[^>]*><\\/div>[\\s\\S]*?<\\/section>`, 'g');
const reviewMatches = html.match(reviewRe) || [];
if (reviewMatches.length !== 1) throw new Error(`Expected one travertine Recent reviews widget, found ${reviewMatches.length}.`);
const reviewBlock = reviewMatches[0];
html = html.replace(reviewRe, '');
const wildlightMarker = '<section class="feature-band travertine-wildlight-focus">';
if (!html.includes(wildlightMarker)) throw new Error('Styled travertine Wildlight section not found for review placement.');
html = html.replace(wildlightMarker, `${reviewBlock}\n${wildlightMarker}`);

const css = `<style id="travertine-driveway-clone-style">
body.travertine-driveway-clone{--trav-accent:#6f78d9;--trav-blue:#558fd6;--trav-purple:#7d6ac8;--trav-dark:#263760;--trav-soft:#f4f4ff;--trav-line:#dddff0}
body.travertine-driveway-clone .ys-hero--no-image{background:linear-gradient(135deg,#1d2c53 0%,#435d9b 54%,#7567b7 100%)!important}
body.travertine-driveway-clone .ys-proof-blue{background:linear-gradient(135deg,#526fc0,#7567b7)!important;box-shadow:0 15px 34px rgba(111,120,217,.24)!important}
body.travertine-driveway-clone .ys-feature-wrap{filter:drop-shadow(0 14px 24px rgba(111,120,217,.11))}
body.travertine-driveway-clone .ys-feature{box-shadow:0 8px 22px rgba(83,95,168,.05)}

.travertine-condition-section{padding-top:clamp(48px,6vw,78px)!important;padding-bottom:clamp(48px,6vw,78px)!important}
.travertine-condition-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(360px,.92fr);gap:clamp(28px,4vw,48px);align-items:stretch}
.travertine-condition-content{min-width:0;display:flex;flex-direction:column}.travertine-condition-content>h2{margin-bottom:14px}.travertine-condition-content>.lead{margin-bottom:24px}
.travertine-condition-stack{display:grid;gap:14px;margin-top:2px}
.travertine-condition-card{position:relative;display:grid;grid-template-columns:48px 1fr;gap:16px;align-items:start;padding:22px 22px 21px;border:1px solid var(--trav-line);border-radius:20px;box-shadow:0 10px 26px rgba(72,82,156,.07);overflow:hidden;background:linear-gradient(135deg,#f4f4ff 0%,#fff 72%)}
.travertine-condition-card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--trav-accent)}
.travertine-condition-card--2{background:linear-gradient(135deg,#f3f7ff 0%,#fff 72%)}.travertine-condition-card--2::before{background:var(--trav-blue)}
.travertine-condition-card--3{background:linear-gradient(135deg,#f7f3ff 0%,#fff 72%)}.travertine-condition-card--3::before{background:var(--trav-purple)}
.travertine-condition-number{display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:13px;background:var(--trav-dark);color:#fff;font-size:12px;font-weight:900;letter-spacing:1px;box-shadow:0 7px 16px rgba(38,55,96,.18)}
.travertine-condition-card h3{margin:0 0 7px;color:#263760;font-size:clamp(19px,1.6vw,23px);line-height:1.12}.travertine-condition-card p{margin:0;color:#536475;line-height:1.66}
.travertine-condition-image{position:relative;margin:0;min-width:0;border:1px solid var(--trav-line);border-left:5px solid var(--trav-accent);border-radius:20px;padding:10px;background:linear-gradient(135deg,#f4f4ff 0%,#fff 72%);box-shadow:0 10px 26px rgba(38,55,96,.07),0 18px 42px rgba(111,120,217,.24);min-height:100%;overflow:hidden}
.travertine-condition-image img{display:block;width:100%;height:100%;min-height:540px;object-fit:cover;object-position:center;border-radius:13px}

.travertine-secondary-band{width:100vw!important;position:relative!important;left:50%!important;margin-left:-50vw!important;margin-right:-50vw!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px!important;padding:58px max(20px,calc((100vw - 1180px)/2))!important;background:linear-gradient(135deg,#263760 0%,#354e82 58%,#665ca6 100%)!important;border:0!important}
.travertine-secondary-band>.article-card{background:rgba(255,255,255,.97)!important;border:1px solid rgba(255,255,255,.55)!important;border-radius:24px!important;padding:28px!important;box-shadow:0 16px 40px rgba(0,0,0,.14)!important}
.travertine-secondary-band>.article-card:first-child{box-shadow:0 18px 42px rgba(85,143,214,.17)!important}.travertine-secondary-band>.article-card:nth-child(2){box-shadow:0 18px 42px rgba(125,106,200,.19)!important}

.travertine-wildlight-focus{position:relative;background:linear-gradient(145deg,#f5f5ff 0%,#fff 72%)!important;color:#0b1220!important;border:1px solid var(--trav-line)!important;border-top:4px solid var(--trav-accent)!important;border-radius:28px!important;padding:clamp(26px,4vw,38px)!important;box-shadow:0 18px 44px rgba(111,120,217,.11)!important;overflow:hidden}
.travertine-wildlight-focus::after{content:"";position:absolute;right:-90px;top:-90px;width:220px;height:220px;border-radius:50%;background:rgba(111,120,217,.09);pointer-events:none}
.travertine-wildlight-focus>.eyebrow{position:relative;z-index:1;display:inline-flex!important;padding:7px 11px!important;margin:0 0 12px!important;border-radius:999px;background:#ececff!important;color:#5f69c9!important;font-size:11px!important;font-weight:900!important;letter-spacing:1.25px!important}
.travertine-wildlight-focus>h2{position:relative;z-index:1;margin:0 0 14px!important;color:#263760!important;font-size:clamp(30px,3.15vw,44px)!important;line-height:1.04!important;letter-spacing:-1px!important}
.travertine-wildlight-focus>p{position:relative;z-index:1;max-width:980px;color:#536475!important;line-height:1.72!important}
.travertine-wildlight-focus .article-grid{position:relative;z-index:1;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:16px!important;margin-top:26px!important;padding-top:24px!important;border-top:1px solid var(--trav-line)!important}
.travertine-wildlight-focus .article-grid>div{position:relative;background:#fff!important;border:1px solid var(--trav-line)!important;border-radius:19px!important;padding:22px 22px 21px 24px!important;box-shadow:0 9px 24px rgba(83,95,168,.06)!important;overflow:hidden}
.travertine-wildlight-focus .article-grid>div::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--trav-accent)}.travertine-wildlight-focus .article-grid>div:nth-child(2)::before{background:var(--trav-purple)}
.travertine-wildlight-focus a{color:#5f69c9!important;text-decoration:none!important;border-bottom:1px solid rgba(95,105,201,.28)}

.travertine-process-section,.travertine-detail-pair,.travertine-service-areas{border:1px solid var(--trav-line)!important;border-radius:26px!important;padding:clamp(26px,4vw,38px)!important;background:linear-gradient(145deg,#fdfdff,#f6f6ff)!important;box-shadow:0 14px 34px rgba(83,95,168,.07)!important}
.travertine-process-section .process-step{border:1px solid var(--trav-line)!important;border-radius:18px!important;background:#fff!important;box-shadow:0 8px 20px rgba(83,95,168,.05)!important}.travertine-process-section .process-step strong{color:#5f69c9!important}
.travertine-detail-pair>.article-card{border-color:var(--trav-line)!important;border-radius:20px!important;box-shadow:0 9px 24px rgba(83,95,168,.06)!important}
.travertine-pricing-section{border:1px solid var(--trav-line)!important;border-radius:28px!important;padding:clamp(26px,4vw,38px)!important;background:#fff!important;box-shadow:0 18px 44px rgba(111,120,217,.11)!important}
.travertine-pricing-section .nocatee-price-content{padding:18px;border-radius:22px;background:linear-gradient(145deg,#fafaff,#f4f4ff);border:1px solid var(--trav-line)}
.travertine-pricing-section .nocatee-calculator-column{filter:drop-shadow(0 15px 28px rgba(111,120,217,.11))}
.travertine-service-areas .location-link{border-color:var(--trav-line)!important;border-radius:18px!important;background:#fff!important;box-shadow:0 7px 18px rgba(83,95,168,.05)!important}
.travertine-readiness-split{gap:18px!important}.travertine-readiness-split>div{border:1px solid var(--trav-line)!important;border-radius:24px!important;padding:26px!important;background:linear-gradient(145deg,#f7f7ff,#fff)!important;box-shadow:0 12px 28px rgba(111,120,217,.08)!important}
body.travertine-driveway-clone section[aria-label="Recent reviews"]{width:min(1180px,calc(100% - 40px))!important;margin:30px auto 42px!important;padding:14px!important;border:1px solid var(--trav-line)!important;border-radius:24px!important;background:#fff!important;min-height:260px!important;box-shadow:0 14px 34px rgba(111,120,217,.09)!important}
body.travertine-driveway-clone .faq-section{border-top:4px solid var(--trav-accent);box-shadow:0 14px 34px rgba(111,120,217,.07)}
body.travertine-driveway-clone .cta-panel{box-shadow:0 18px 44px rgba(111,120,217,.13)!important}
body.travertine-driveway-clone .cta-panel .button.primary{background:linear-gradient(135deg,#6474d4,#7567b7)!important}

@media(max-width:980px){.travertine-condition-grid{grid-template-columns:1fr}.travertine-condition-image{min-height:0}.travertine-condition-image img{height:auto;min-height:0;max-height:620px;object-fit:cover}.travertine-condition-card{grid-template-columns:44px 1fr}.travertine-secondary-band{grid-template-columns:1fr!important}}
@media(max-width:760px){.travertine-wildlight-focus .article-grid{grid-template-columns:1fr!important}.travertine-wildlight-focus{border-radius:22px!important;padding:24px 20px!important}}
@media(max-width:650px){body.travertine-driveway-clone section[aria-label="Recent reviews"]{width:calc(100% - 24px)!important}.travertine-secondary-band{padding:38px 12px!important}}
@media(max-width:560px){.travertine-condition-card{padding:18px 16px;gap:12px;border-radius:17px}.travertine-condition-number{width:38px;height:38px}.travertine-condition-image{border-radius:17px;padding:8px}.travertine-condition-image img{border-radius:11px}}
</style>`;

const oldStyle = /<style id="travertine-driveway-clone-style">[\s\S]*?<\/style>\s*/i;
if (oldStyle.test(html)) html = html.replace(oldStyle, `${css}\n`);
else html = html.replace('</head>', `${css}\n</head>`);

const protectedAfter = freezeProtected(html);
assertProtected(protectedBefore, protectedAfter);

for (const required of ['travertine-driveway-clone','travertine-condition-section','/travertine-link.png','travertine-secondary-band','travertine-wildlight-focus','travertine-process-section','travertine-pricing-section',reviewWidget]) {
  if (!html.includes(required)) throw new Error(`Travertine clone verification failed: ${required}`);
}
const reviewPos = html.indexOf(reviewWidget);
const wildlightPos = html.indexOf('Travertine Sealing Wildlight Yulee');
if (reviewPos < 0 || wildlightPos < 0 || reviewPos > wildlightPos) throw new Error('Travertine reviews were not moved before the Wildlight focus section.');

fs.writeFileSync(file, html);
console.log('Built travertine page as a driveway-layout sibling with periwinkle/purple-blue accents; H1/H2/H3, metadata, canonical and schema preserved exactly.');
