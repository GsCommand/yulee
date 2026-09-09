const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'index.html');
if (!fs.existsSync(file)) throw new Error('Homepage missing from public build output.');

let html = fs.readFileSync(file, 'utf8');

function freezeSeo(source) {
  return {
    title: (source.match(/<title>[\s\S]*?<\/title>/i) || [])[0] || '',
    description: (source.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0] || '',
    canonical: (source.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0] || '',
    h1: (source.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0] || '',
    jsonLd: source.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []
  };
}

const before = freezeSeo(html);
if (!before.title || !before.description || !before.canonical || !before.h1) {
  throw new Error('Could not freeze homepage SEO foundation before calculator layout change.');
}

html = html.replace(/\s*<style id="home-why-calculator-style">[\s\S]*?<\/style>\s*/i, '\n');

const pricingMarker = '<section class="section pricing-section">';
const whyMarker = '<section class="section"><div class="section-heading"><p class="eyebrow">Why HydroSeal</p><h2>A clear process, material-specific methods and published pricing</h2></div><div class="callout">';
const areasMarker = '<section id="areas" class="section">';

const pricingStart = html.indexOf(pricingMarker);
const whyStart = html.indexOf(whyMarker, pricingStart + pricingMarker.length);
const areasStart = html.indexOf(areasMarker, whyStart + whyMarker.length);
if (pricingStart < 0) throw new Error('Homepage pricing section was not found.');
if (whyStart < 0) throw new Error('Existing Why HydroSeal section was not found after pricing.');
if (areasStart < 0) throw new Error('Homepage service-area section was not found after Why HydroSeal.');

const pricingSection = html.slice(pricingStart, whyStart);
const gridMarker = '<div class="pricing-grid">';
const gridStart = pricingSection.indexOf(gridMarker);
if (gridStart < 0) throw new Error('Homepage pricing grid was not found.');

const pricingHeading = pricingSection.slice(pricingMarker.length, gridStart).trim();
if (!pricingHeading.includes('<h2>Paver sealing cost in Yulee</h2>')) {
  throw new Error('Protected homepage pricing H2 was not found in the pricing heading.');
}

const calculatorClassMarker = 'class="pricing-panel pricing-calculator"';
const calculatorClassPos = pricingSection.indexOf(calculatorClassMarker, gridStart);
if (calculatorClassPos < 0) throw new Error('Homepage calculator panel was not found inside pricing section.');
const calculatorStart = pricingSection.lastIndexOf('<article', calculatorClassPos);
const calculatorEndTag = pricingSection.indexOf('</article>', calculatorClassPos);
if (calculatorStart < 0 || calculatorEndTag < 0) throw new Error('Homepage calculator panel bounds were not found.');
let calculator = pricingSection.slice(calculatorStart, calculatorEndTag + '</article>'.length);

const calculatorIntro = '<p>Choose the approximate size, material, condition and optional services for your Yulee paver project.</p>';
if (!calculator.includes(calculatorIntro)) throw new Error('Homepage calculator intro text was not found.');
calculator = calculator.replace(calculatorIntro, '');

const whySection = html.slice(whyStart, areasStart);
const whyHeadingOpen = '<div class="section-heading">';
const whyHeadingStart = whySection.indexOf(whyHeadingOpen);
const whyHeadingEndTag = whySection.indexOf('</div>', whyHeadingStart);
const calloutOpen = '<div class="callout">';
const calloutStart = whySection.indexOf(calloutOpen, whyHeadingEndTag);
const calloutEndTag = whySection.indexOf('</div>', calloutStart);
if (whyHeadingStart < 0 || whyHeadingEndTag < 0 || calloutStart < 0 || calloutEndTag < 0) {
  throw new Error('Could not safely extract Why HydroSeal heading/callout content.');
}

const whyHeadingInner = whySection.slice(whyHeadingStart + whyHeadingOpen.length, whyHeadingEndTag);
const whyCalloutInner = whySection.slice(calloutStart + calloutOpen.length, calloutEndTag);
if (!whyHeadingInner.includes('<p class="eyebrow">Why HydroSeal</p>') ||
    !whyHeadingInner.includes('<h2>A clear process, material-specific methods and published pricing</h2>')) {
  throw new Error('Why HydroSeal heading content changed unexpectedly.');
}

const whyPanel = `<article class="pricing-panel home-why-panel" aria-labelledby="home-why-title"><div class="home-why-heading">${whyHeadingInner.replace('<h2>', '<h2 id="home-why-title">')}</div><div class="callout home-why-points">${whyCalloutInner}</div></article>`;
const newPricingSection = `<section class="section pricing-section home-why-calculator-section">${pricingHeading}<div class="pricing-grid home-why-calculator-grid">${whyPanel}${calculator}</div></section>`;

html = html.slice(0, pricingStart) + newPricingSection + '\n\n      ' + html.slice(areasStart);

const css = `<style id="home-why-calculator-style">
.home-why-calculator-section{padding-top:clamp(48px,6vw,78px)!important;padding-bottom:clamp(48px,6vw,78px)!important}
.pricing-section>.section-heading{max-width:860px!important;margin:0 auto 30px!important;text-align:center!important}
.home-why-calculator-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:clamp(24px,4vw,42px)!important;align-items:stretch!important}
.home-why-panel{position:relative!important;overflow:hidden!important;height:100%!important;padding:clamp(28px,4vw,38px)!important;border:1px solid #d7e6ef!important;border-left:5px solid #39bfea!important;border-radius:28px!important;background:linear-gradient(145deg,#f2faff 0%,#ffffff 76%)!important;box-shadow:0 18px 46px rgba(11,45,74,.10),0 16px 36px rgba(57,191,234,.10)!important}
.home-why-panel::after{content:"";position:absolute;right:-95px;top:-95px;width:230px;height:230px;border-radius:50%;background:rgba(57,191,234,.08);pointer-events:none}
.home-why-heading{position:relative;z-index:1}
.home-why-heading .eyebrow{display:inline-flex!important;align-items:center!important;margin:0 0 12px!important;padding:7px 11px!important;border-radius:999px!important;background:#e8f7fc!important;color:#0f6ea8!important;font-size:11px!important;font-weight:900!important;letter-spacing:1.4px!important;text-transform:uppercase!important}
.home-why-heading h2{margin:0!important;color:#0b2d4a!important;font-size:clamp(30px,3vw,43px)!important;line-height:1.05!important;letter-spacing:-1px!important}
.home-why-points{position:relative;z-index:1;margin:26px 0 0!important;padding:0!important;border:0!important}
.home-why-points p{margin:0!important;padding:16px 0!important;color:#536475!important;font-size:15px!important;line-height:1.66!important;border-top:1px solid #dce8ef!important}
.home-why-points p:first-child{border-top:0!important;padding-top:0!important}
.home-why-points strong{color:#0b3658!important;font-weight:900!important}
.pricing-section .pricing-calculator{position:relative!important;top:auto!important;align-self:stretch!important;height:100%!important;padding:clamp(24px,3vw,32px)!important;border:1px solid #d7e6ef!important;border-radius:28px!important;background:#fff!important;box-shadow:0 18px 46px rgba(11,45,74,.10)!important}
.pricing-section .pricing-calculator>.section-heading{margin-bottom:18px!important;text-align:left!important}
.pricing-section .pricing-calculator>.section-heading h3{margin:0!important;color:#0b2d4a!important}
@media(max-width:900px){.home-why-calculator-grid{grid-template-columns:1fr!important}.home-why-panel,.pricing-section .pricing-calculator{height:auto!important}.home-why-panel{border-radius:22px!important}}
@media(max-width:600px){.pricing-section{padding-left:12px!important;padding-right:12px!important}.home-why-panel,.pricing-section .pricing-calculator{padding:22px 18px!important;border-radius:20px!important}}
</style>`;

html = html.replace('</head>', `${css}\n</head>`);

const after = freezeSeo(html);
if (after.title !== before.title) throw new Error('Homepage title changed during Why HydroSeal move.');
if (after.description !== before.description) throw new Error('Homepage meta description changed during Why HydroSeal move.');
if (after.canonical !== before.canonical) throw new Error('Homepage canonical changed during Why HydroSeal move.');
if (after.h1 !== before.h1) throw new Error('Homepage H1 changed during Why HydroSeal move.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Homepage JSON-LD/schema changed during Why HydroSeal move.');

for (const required of [
  'Why HydroSeal',
  'A clear process, material-specific methods and published pricing',
  'Up-front pricing.',
  'Material-specific work.',
  'Honest evaluation.',
  'Qualified service.',
  'Calculate your estimated project range',
  'data-calculator'
]) {
  if (!html.includes(required)) throw new Error(`Required homepage content missing after move: ${required}`);
}

for (const removed of [
  'Service and starting-price guide',
  'Concrete or brick pavers — clean, re-sand, seal',
  'Walls, columns, planters or fire pits',
  'Choose the approximate size, material, condition and optional services for your Yulee paver project.'
]) {
  if (html.includes(removed)) throw new Error(`Removed homepage content is still visible: ${removed}`);
}

const whyPos = html.indexOf('home-why-panel');
const calcPos = html.indexOf('pricing-panel pricing-calculator');
if (whyPos < 0 || calcPos < 0 || whyPos > calcPos) throw new Error('Why HydroSeal panel is not positioned left/before the calculator.');

fs.writeFileSync(file, html);
console.log('Removed calculator intro and equalized homepage Why HydroSeal and calculator panels.');
