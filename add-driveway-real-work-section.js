const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-driveway-paver-sealing.html');
if (!fs.existsSync(file)) throw new Error('Driveway page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');

function protectedFields(source) {
  const first = (re, label) => {
    const match = source.match(re);
    if (!match) throw new Error(`Missing protected ${label}`);
    return match[0];
  };
  return {
    title: first(/<title>[\s\S]*?<\/title>/i, 'title'),
    canonical: first(/<link\s+rel="canonical"[^>]*>/i, 'canonical'),
    h1: first(/<h1>[\s\S]*?<\/h1>/i, 'h1'),
    jsonld: (source.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []).join('\n')
  };
}

const before = protectedFields(html);

// Idempotent: remove any earlier version before inserting the current section.
html = html
  .replace(/<style id="driveway-real-work-style">[\s\S]*?<\/style>\s*/g, '')
  .replace(/<section class="driveway-real-work"[\s\S]*?<\/section>\s*/g, '');

// Give the existing project gallery a stable target for the View Our Work button.
html = html.replace(
  '<section class="section gallery-embed" aria-label="Recent paver sealing work">',
  '<section class="section gallery-embed" id="recent-paver-work" aria-label="Recent paver sealing work">'
);

const section = `<section class="driveway-real-work" aria-labelledby="driveway-real-work-title">
  <div class="driveway-real-work__inner">
    <div class="driveway-real-work__content">
      <p class="driveway-real-work__eyebrow">REAL HYDROSEAL WORK</p>
      <h2 id="driveway-real-work-title">The difference is in the preparation.</h2>
      <p class="driveway-real-work__lead">Sealer cannot hide poor cleaning, wet pavers, contaminated joints, or failed coating underneath.</p>
      <ul class="driveway-real-work__list">
        <li>Professional deep cleaning</li>
        <li>Stain treatment where practical</li>
        <li>Joint-sand restoration</li>
        <li>Two-coat sealer application</li>
      </ul>
      <a class="driveway-real-work__button" href="#recent-paver-work">VIEW OUR WORK</a>
    </div>
    <figure class="driveway-real-work__image">
      <img src="/driveway-paver-resealed.webp" alt="Freshly cleaned and resealed driveway pavers by HydroSeal" loading="lazy" decoding="async" />
    </figure>
  </div>
</section>`;

const anchor = '<section class="feature-band driveway-wildlight-focus">';
const anchorCount = html.split(anchor).length - 1;
if (anchorCount !== 1) throw new Error(`Expected exactly one Wildlight focus anchor, found ${anchorCount}.`);
html = html.replace(anchor, `${section}\n${anchor}`);

const style = `<style id="driveway-real-work-style">
.driveway-real-work{width:100vw;margin:46px 0 46px;position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;background:#0b3658;color:#fff}
.driveway-real-work__inner{width:min(1280px,calc(100% - 40px));margin:0 auto;display:grid;grid-template-columns:minmax(0,.78fr) minmax(520px,1.22fr);gap:clamp(32px,4.5vw,64px);align-items:center;padding:64px 0}
.driveway-real-work__content{min-width:0;max-width:500px}
.driveway-real-work__eyebrow{margin:0 0 14px!important;color:#8edcff!important;font-size:11px!important;font-weight:900!important;letter-spacing:2.1px!important;text-transform:uppercase}
.driveway-real-work__content h2{margin:0 0 16px!important;color:#fff!important;font-family:"Arial Black",Arial,sans-serif!important;font-size:clamp(34px,4.2vw,54px)!important;line-height:1.02!important;letter-spacing:-1.1px!important}
.driveway-real-work__lead{margin:0 0 23px!important;color:#d9e8f2!important;font-size:15px!important;line-height:1.7!important;max-width:500px}
.driveway-real-work__list{list-style:none!important;margin:0 0 28px!important;padding:0!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px 22px}
.driveway-real-work__list li{position:relative;margin:0!important;padding:0 0 0 18px!important;color:#fff!important;font-size:14px!important;line-height:1.48!important}
.driveway-real-work__list li::before{content:"✓";position:absolute;left:0;top:0;color:#39bfea;font-weight:900}
.driveway-real-work__button{display:inline-flex;align-items:center;justify-content:center;padding:15px 21px;border-radius:999px;background:#39bfea;color:#fff!important;text-decoration:none!important;font-size:12px;font-weight:950;letter-spacing:1px;text-transform:uppercase;box-shadow:0 11px 28px rgba(57,191,234,.3)}
.driveway-real-work__button:hover,.driveway-real-work__button:focus-visible{background:#55c9ee;color:#fff!important;transform:translateY(-1px)}
.driveway-real-work__image{margin:0;min-width:0;overflow:hidden;border-radius:24px;background:#0f456d;box-shadow:0 18px 48px rgba(0,0,0,.22);padding:14px;display:flex;align-items:center;justify-content:center}
.driveway-real-work__image img{display:block;width:100%;height:520px;object-fit:contain;object-position:center;border-radius:18px;background:#0f456d}
@media(max-width:1050px){.driveway-real-work__inner{grid-template-columns:minmax(0,.82fr) minmax(460px,1.18fr)}.driveway-real-work__image img{height:470px}}
@media(max-width:900px){.driveway-real-work__inner{grid-template-columns:1fr;gap:30px;padding:48px 0}.driveway-real-work__content{max-width:none}.driveway-real-work__image{width:100%}.driveway-real-work__image img{height:auto;max-height:640px;object-fit:contain}.driveway-real-work__list{grid-template-columns:1fr 1fr}}
@media(max-width:620px){.driveway-real-work{margin-top:34px;margin-bottom:34px}.driveway-real-work__inner{width:calc(100% - 24px);padding:38px 0}.driveway-real-work__content h2{font-size:34px!important}.driveway-real-work__list{grid-template-columns:1fr}.driveway-real-work__image{border-radius:18px;padding:8px}.driveway-real-work__image img{border-radius:12px;max-height:none}}
</style>`;

if (!html.includes('</head>')) throw new Error('Missing </head> in driveway page.');
html = html.replace('</head>', `${style}\n</head>`);

if (!html.includes('src="/driveway-paver-resealed.webp"')) throw new Error('Driveway real-work image was not inserted.');
if (!html.includes('object-fit:contain')) throw new Error('Driveway real-work image must preserve the full before/after graphic.');
if (!html.includes('The difference is in the preparation.')) throw new Error('Driveway real-work heading was not inserted.');
const sectionPos = html.indexOf('class="driveway-real-work"');
const wildlightPos = html.indexOf('class="feature-band driveway-wildlight-focus"');
if (sectionPos < 0 || wildlightPos < 0 || sectionPos > wildlightPos) throw new Error('Driveway real-work section is not above Wildlight focus.');

const after = protectedFields(html);
for (const key of ['title', 'canonical', 'h1', 'jsonld']) {
  if (before[key] !== after[key]) throw new Error(`Protected ${key} changed while adding driveway real-work section.`);
}

fs.writeFileSync(file, html);
console.log('Added full-width driveway preparation proof section with uncropped before/after image above Wildlight focus.');
