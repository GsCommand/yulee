const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-house-washing.html');
if (!fs.existsSync(file)) throw new Error('House washing page missing from public build.');
let html = fs.readFileSync(file, 'utf8');

const titleBefore = (html.match(/<title>[\s\S]*?<\/title>/i) || [])[0];
const descBefore = (html.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0];
const canonicalBefore = (html.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0];
const h1Before = (html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0];
if (!titleBefore || !descBefore || !canonicalBefore || !h1Before) throw new Error('Protected house-washing SEO fields missing.');

if (!html.includes('/home-hydroseal.css')) {
  html = html.replace('</head>', '<link rel="stylesheet" href="/home-hydroseal.css?v=4" />\n</head>');
}
html = html.replace(/<body class="([^"]*)">/i, (_m, cls) => `<body class="${cls} yulee-home house-home-match">`);
if (!html.includes('house-home-match')) html = html.replace(/<body>/i, '<body class="yulee-home house-home-match">');

const swaps = [
  [/\bys-header\b/g,'y-home-header'],
  [/\bys-nav\b/g,'y-home-nav'],
  [/\bys-shell\b/g,'y-shell'],
  [/\bys-logo\b/g,'y-home-logo'],
  [/\bys-toggle\b/g,'y-home-toggle'],
  [/\bys-menu\b/g,'y-home-menu'],
  [/\bys-group--paver\b/g,'y-home-group--paver'],
  [/\bys-group\b/g,'y-home-group'],
  [/\bys-parent\b/g,'y-home-parent'],
  [/\bys-mega\b/g,'y-home-mega'],
  [/\bys-call\b/g,'y-home-call'],
  [/\bys-quote\b/g,'y-home-quote'],
  [/\bys-hero-bg\b/g,'y-home-hero-bg'],
  [/\bys-hero-grid\b/g,'y-home-hero-grid'],
  [/\bys-glass\b/g,'y-home-glass'],
  [/\bys-proof-stack\b/g,'y-home-proof-stack'],
  [/\bys-google-badge\b/g,'y-home-google-badge'],
  [/\bys-stars\b/g,'y-home-stars'],
  [/\bys-review-link\b/g,'y-home-review-link'],
  [/\bys-proof-blue\b/g,'y-home-proof-blue'],
  [/\bys-proof\b/g,'y-home-proof'],
  [/\bys-feature-wrap\b/g,'y-home-feature-wrap'],
  [/\bys-feature-strip\b/g,'y-home-feature-strip'],
  [/\bys-feature--compact\b/g,'y-home-feature--compact'],
  [/\bys-feature\b/g,'y-home-feature']
];
for (const [re, value] of swaps) html = html.replace(re, value);
html = html.replace(/class="ys-hero(?: ys-hero--no-image)?"/g, 'class="hero y-home-hero"');

html = html.replace(/<div class="hero-actions">/g, '<div class="y-home-actions">');
html = html.replace(/class="button primary"/g, 'class="y-home-btn y-home-btn--blue"');
html = html.replace(/class="button secondary"/g, 'class="y-home-btn y-home-btn--white"');

html = html.replace('<article class="service-article">', '<article class="service-article house-home-content">');
html = html.replace('<section class="section split">', '<section class="section split house-home-process">');
html = html.replace('<section class="section faq-section">', '<section class="section faq-section house-home-faq">');
html = html.replace('<section class="cta-panel">', '<section class="cta-panel house-home-cta">');

const css = `\n<style id="house-home-match-v4">\nbody.house-home-match{background:#fff;color:#0b1220}\nbody.house-home-match .y-home-header{position:absolute}\nbody.house-home-match .y-home-hero{min-height:760px}\nbody.house-home-match .y-home-hero:after{background:linear-gradient(90deg,rgba(5,32,51,.30),rgba(5,32,51,.04))}\nbody.house-home-match .y-home-glass{max-width:690px;padding:0;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}\nbody.house-home-match .y-home-glass h1,body.house-home-match .y-home-glass .hero-text,body.house-home-match .y-home-glass .eyebrow{text-shadow:0 3px 18px rgba(0,0,0,.82)}\nbody.house-home-match .y-home-glass .eyebrow{margin:0 0 10px;color:#aee9fb;font-weight:900;text-transform:uppercase;letter-spacing:1.2px}\nbody.house-home-match .y-home-proof h3{margin:12px 0 8px;font-family:"Arial Black",Arial,sans-serif;font-size:27px;line-height:1.05;color:var(--y-navy)}\nbody.house-home-match .y-home-stars{color:#f4b400;font-size:19px;letter-spacing:2px}\nbody.house-home-match .y-home-google-badge{display:flex;align-items:center;gap:8px;font-weight:900;color:#31455a}\nbody.house-home-match .y-home-google-badge svg{width:23px;height:23px}\nbody.house-home-match .y-home-review-link{display:inline-block;margin-top:12px;color:var(--y-blue);font-weight:900}\nbody.house-home-match .y-home-feature--compact{display:flex;align-items:center;justify-content:center;min-height:110px;text-align:center}\nbody.house-home-match .y-home-feature--compact h3{margin:0;font-size:20px}\nbody.house-home-match .house-home-content{width:min(1180px,calc(100% - 40px));margin:0 auto;padding:88px 0 36px}\nbody.house-home-match .house-home-content .article-block{padding:0;margin:0 0 72px;background:transparent;border:0;box-shadow:none}\nbody.house-home-match .house-home-content .article-block:first-child{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:52px;align-items:start}\nbody.house-home-match .house-home-content .article-block:first-child h2{grid-column:1;grid-row:1 / span 3;margin:0;font-family:"Arial Black",Arial,sans-serif;font-size:clamp(36px,4vw,54px);line-height:1.02;letter-spacing:-1.1px;color:var(--y-navy)}\nbody.house-home-match .house-home-content .article-block:first-child .lead,body.house-home-match .house-home-content .article-block:first-child p{grid-column:2;margin-top:0;color:#536475;font-size:17px;line-height:1.75}\nbody.house-home-match .house-home-content .article-block:nth-child(2){padding:58px;border-radius:30px;background:#f1f5f7}\nbody.house-home-match .house-home-content .article-block:nth-child(2)>.eyebrow{display:none}\nbody.house-home-match .house-home-content .article-block:nth-child(2)>h2{text-align:center;margin:0 0 30px;font-family:"Arial Black",Arial,sans-serif;font-size:clamp(34px,4vw,50px);line-height:1.04;color:var(--y-navy)}\nbody.house-home-match .house-home-content .content-grid.three{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}\nbody.house-home-match .house-home-content .content-card{padding:28px;border:1px solid var(--y-line);border-radius:26px;background:#fff;box-shadow:0 10px 30px rgba(11,45,74,.05);transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}\nbody.house-home-match .house-home-content .content-card:hover{transform:translateY(-3px);box-shadow:0 16px 38px rgba(11,45,74,.11);border-color:rgba(57,191,234,.55)}\nbody.house-home-match .house-home-content .content-card h3{font-family:"Arial Black",Arial,sans-serif;color:var(--y-navy);font-size:24px;line-height:1.04}\nbody.house-home-match .house-home-content .content-card p{color:#536475;line-height:1.65}\nbody.house-home-match .house-home-process{width:100%;max-width:none;margin:0;padding:90px max(20px,calc((100vw - 1180px)/2));background:var(--y-navy);border-radius:0;display:grid;grid-template-columns:1fr 1fr;gap:50px;color:#dce8ee}\nbody.house-home-match .house-home-process>div{padding:0;background:transparent;border:0;box-shadow:none}\nbody.house-home-match .house-home-process h2{font-family:"Arial Black",Arial,sans-serif;font-size:clamp(34px,3.7vw,50px);line-height:1.04;color:#fff}\nbody.house-home-match .house-home-process .eyebrow{color:#83d9f2;font-weight:900;text-transform:uppercase;letter-spacing:1.2px}\nbody.house-home-match .house-home-process p,body.house-home-match .house-home-process li{color:#d7e5eb;line-height:1.7}\nbody.house-home-match .house-home-process strong{color:#fff}\nbody.house-home-match .house-home-process .steps{list-style:none;padding:0;margin:24px 0 0;counter-reset:homeStep}\nbody.house-home-match .house-home-process .steps li{counter-increment:homeStep;position:relative;padding:0 0 18px 48px;margin-bottom:18px;border-bottom:1px solid rgba(255,255,255,.13)}\nbody.house-home-match .house-home-process .steps li:before{content:counter(homeStep);position:absolute;left:0;top:1px;width:31px;height:31px;border-radius:50%;display:grid;place-items:center;background:var(--y-water);color:#fff;font-weight:950;font-size:12px}\nbody.house-home-match .house-home-faq{width:min(980px,calc(100% - 40px));margin:0 auto;padding:88px 0}\nbody.house-home-match .house-home-faq .section-heading{text-align:center;margin-bottom:30px}\nbody.house-home-match .house-home-faq h2{font-family:"Arial Black",Arial,sans-serif;font-size:clamp(34px,4vw,52px);line-height:1.04;color:var(--y-navy)}\nbody.house-home-match .house-home-faq .faq-item{margin:12px 0;padding:0 22px;border:1px solid var(--y-line);border-radius:20px;background:#fff;box-shadow:0 8px 24px rgba(11,45,74,.05)}\nbody.house-home-match .house-home-faq summary{padding:20px 0;color:var(--y-navy);font-weight:900}\nbody.house-home-match .house-home-faq .faq-item p{color:#536475;line-height:1.65}\nbody.house-home-match .house-home-cta{width:min(1180px,calc(100% - 40px));margin:0 auto 88px;border-radius:30px;background:linear-gradient(120deg,var(--y-blue),var(--y-navy));padding:52px;color:#fff}\nbody.house-home-match .house-home-cta h2,body.house-home-match .house-home-cta p{color:#fff}\n@media(max-width:900px){body.house-home-match .house-home-content .article-block:first-child,body.house-home-match .house-home-process{grid-template-columns:1fr}body.house-home-match .house-home-content .article-block:first-child h2,body.house-home-match .house-home-content .article-block:first-child .lead,body.house-home-match .house-home-content .article-block:first-child p{grid-column:auto;grid-row:auto}body.house-home-match .house-home-content .content-grid.three{grid-template-columns:1fr}}\n@media(max-width:640px){body.house-home-match .y-home-hero{min-height:auto}body.house-home-match .y-home-glass{padding:0!important}body.house-home-match .house-home-content{width:calc(100% - 24px);padding-top:58px}body.house-home-match .house-home-content .article-block:nth-child(2){padding:28px 20px}body.house-home-match .house-home-faq,body.house-home-match .house-home-cta{width:calc(100% - 24px)}body.house-home-match .house-home-cta{padding:34px 22px}}\n</style>`;

html = html.replace('</head>', `${css}\n</head>`);

const titleAfter = (html.match(/<title>[\s\S]*?<\/title>/i) || [])[0];
const descAfter = (html.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0];
const canonicalAfter = (html.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0];
const h1After = (html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0];
if (titleAfter !== titleBefore || descAfter !== descBefore || canonicalAfter !== canonicalBefore || h1After !== h1Before) throw new Error('House washing SEO foundation changed during homepage match.');
if (/Roof Washing|yulee-roof-washing\.html/i.test(html)) throw new Error('Roof Washing resurfaced in house-washing output.');

fs.writeFileSync(file, html);
console.log('Removed dark hero glass overlay while preserving homepage navigation and layout.');

// House-washing redesign: a dedicated image panel keeps the service visible.
let redesigned = fs.readFileSync(file, 'utf8');
const imagePath = '/images/yulee-house-soft-washing-hero.webp';
redesigned = redesigned.replace(/<img class="y-home-hero-bg"[^>]*>/, '')
 .replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="https://www.yuleepaversealing.com${imagePath}" />`);
const proofMatch = redesigned.match(/<div class="y-home-proof-stack">[\s\S]*?<\/article><div class="y-home-proof-blue">[\s\S]*?<\/div><\/div>/);
if (!proofMatch) throw new Error('House washing review card missing');
const proof = proofMatch[0].replace('5-STAR RATED PAVER RESTORATION.', 'TRUSTED BY LOCAL HOMEOWNERS.');
redesigned = redesigned.replace(proofMatch[0], `<figure class="house-hero-photo"><img src="${imagePath}" alt="Illustration of a clean Florida stucco home with landscaped front yard" width="1536" height="1024" fetchpriority="high" decoding="async" /><figcaption>Illustrative house-washing image</figcaption></figure>`);
redesigned = redesigned.replace('<p class="eyebrow">House washing</p>', '<p class="eyebrow">Yulee · Wildlight · Nassau County</p>')
 .replace('<h1>Yulee House Washing</h1>', '<h1>Yulee House Washing</h1><p class="house-hero-promise">A cleaner home.<br>A gentler approach.</p>');
redesigned = redesigned.replace('<section class="section faq-section house-home-faq">', `<section class="house-review-section"><div><p class="eyebrow">Customer confidence</p><h2>Care for your home starts with the right method.</h2><p>Tell us about your exterior finish, shaded areas and visible buildup. We review the surfaces and agree on the work before cleaning begins.</p><a class="y-home-btn y-home-btn--blue" href="https://hydrosealpavers.com/get-a-quote">Request your house wash quote</a></div>${proof}</section><section class="section faq-section house-home-faq">`);
const redesignCss = `<style id="house-washing-redesign-v5">
body.house-home-match .y-home-header{position:relative;top:auto;padding-top:18px}
body.house-home-match .y-home-nav{background:#fff;border:1px solid #dce7ed;box-shadow:0 12px 34px rgba(11,45,74,.08)}
body.house-home-match .y-home-hero{min-height:0!important;background:linear-gradient(130deg,#f4fbfd,#eaf3f8);color:#0b2d4a;padding:0}
body.house-home-match .y-home-hero:after{display:none}
body.house-home-match .y-home-hero-grid{grid-template-columns:minmax(0,.9fr) minmax(0,1.15fr);gap:44px;padding-top:58px;padding-bottom:70px;align-items:center}
body.house-home-match .y-home-glass h1{color:#0b2d4a!important;font-size:clamp(40px,4.4vw,64px);line-height:1.02;text-shadow:none!important;letter-spacing:-1.8px}
body.house-home-match .y-home-glass .eyebrow{color:#0f6ea8!important;text-shadow:none!important;font-size:12px}
body.house-home-match .y-home-glass .hero-text{color:#526779!important;font-size:17px;line-height:1.7;text-shadow:none!important}
body.house-home-match .house-hero-promise{font-weight:850;font-size:clamp(24px,2.5vw,36px);line-height:1.15;letter-spacing:-.7px;color:#147c95;margin:20px 0}
body.house-home-match .house-hero-photo{margin:0;min-width:0;position:relative}
body.house-home-match .house-hero-photo img{display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:contain;border-radius:30px;box-shadow:16px 22px 0 #d4ebf2,0 22px 55px rgba(11,45,74,.17)}
body.house-home-match .house-hero-photo figcaption{margin-top:28px;color:#627b87;font-size:11px;text-align:right}
body.house-home-match .y-home-feature-wrap{margin-top:-22px}
body.house-home-match .y-home-feature-strip{box-shadow:0 16px 38px rgba(15,110,168,.12)}
body.house-home-match .y-home-feature{border-top:4px solid #39bfea}
body.house-home-match .y-home-feature:nth-child(2){border-top-color:#0f6ea8}
body.house-home-match .y-home-feature:nth-child(3){border-top-color:#2bb7a9}
body.house-home-match .y-home-feature:nth-child(4){border-top-color:#596fd3}
body.house-home-match .house-home-content .article-block:first-child{gap:38px}
body.house-home-match .house-home-content .content-card{border-top:4px solid #39bfea;box-shadow:0 16px 35px rgba(15,110,168,.10)}
body.house-home-match .house-home-content .content-card:nth-child(2){border-top-color:#2bb7a9}
body.house-home-match .house-home-content .content-card:nth-child(3){border-top-color:#596fd3}
body.house-home-match .house-home-process{width:min(1180px,calc(100% - 40px));padding:48px;margin:0 auto;border-radius:30px;box-shadow:0 20px 48px rgba(11,45,74,.14)}
body.house-home-match .house-review-section{width:min(1180px,calc(100% - 40px));margin:70px auto 0;display:grid;grid-template-columns:1fr .8fr;gap:60px;align-items:center}
body.house-home-match .house-review-section h2{font-family:'Arial Black',Arial,sans-serif;font-size:clamp(30px,3vw,44px);line-height:1.08;color:#0b2d4a}
body.house-home-match .house-review-section p{line-height:1.7;color:#526779}
body.house-home-match .house-review-section .y-home-proof-stack{margin:0}
body.house-home-match .y-home-proof-blue{white-space:normal;line-height:1.5}
@media(max-width:900px){body.house-home-match .y-home-hero-grid{grid-template-columns:1fr;padding-top:38px;gap:30px}body.house-home-match .house-hero-photo{max-width:720px}body.house-home-match .house-review-section{grid-template-columns:1fr;gap:28px}body.house-home-match .house-home-process{padding:30px}}
@media(max-width:640px){body.house-home-match .y-home-header{padding-top:10px}body.house-home-match .y-home-hero-grid{padding-bottom:48px}body.house-home-match .house-hero-photo img{border-radius:22px;box-shadow:8px 12px 0 #d4ebf2}body.house-home-match .house-hero-photo figcaption{margin-top:17px}body.house-home-match .house-home-process,body.house-home-match .house-review-section{width:calc(100% - 24px)}body.house-home-match .house-home-process{padding:26px 22px}}
</style>`;
redesigned = redesigned.replace('</head>',redesignCss+'</head>');
fs.writeFileSync(file,redesigned);
console.log('Redesigned house washing page with dedicated generated hero image and service-focused sections.');


// Match the final homepage hero composition, retaining house-washing content.
const homepage = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');
let housePage = fs.readFileSync(file, 'utf8');
const homeHero = homepage.match(/<section class="hero y-home-hero">[\s\S]*?<\/section>/);
const homeHeroStyles = homepage.match(/<style id="yulee-home-hydroseal-v2">[\s\S]*?<\/style>/);
if (!homeHero || !homeHeroStyles) throw new Error('Homepage hero layout missing');
let matchedHero = homeHero[0]
 .replace('/yulee-sealing-pavers-header.png', '/images/yulee-house-soft-washing-hero.webp')
 .replace('Resealed paver driveway in Yulee, Florida', 'Illustration of a clean Florida stucco home')
 .replace('Professional paver sealing in Yulee, Wildlight &amp; Nassau County', 'House washing in Yulee, Wildlight &amp; Nassau County')
 .replace('Paver Sealing Yulee FL', 'Yulee House Washing')
 .replace('WE BRING YOUR<br>PAVERS BACK.', 'A CLEANER HOME.<br>A FRESH START.')
 .replace('Cleaned. Resanded. Sealed. Built for Florida.', 'Soft washing. Exterior care. Built for Florida.')
 .replace(/<p class="hero-text">[\s\S]*?<\/p>/, '<p class="hero-text">Soft washing for stucco, siding, trim, soffits, fascia and exterior organic buildup caused by Florida humidity, shade and irrigation.</p>')
 .replace('5-STAR RATED PAVER RESTORATION.', 'TRUSTED BY LOCAL HOMEOWNERS.')
 .replace('Homeowners hire HydroSeal when faded, dirty pavers need more than a quick pressure wash.', 'See what Northeast Florida homeowners say about their experience with HydroSeal.')
 .replace('Trident Master Certified', 'Surface-specific soft washing')
 .replaceAll('href="#calculator"', 'href="https://hydrosealpavers.com/get-a-quote"');
housePage = housePage.replace(/<section class="hero y-home-hero">[\s\S]*?<\/section>/, matchedHero)
 .replace(/<section class="house-review-section">[\s\S]*?<\/section>/, '');
housePage = housePage.replace('</head>', homeHeroStyles[0] + `<style id="house-homepage-layout-v6">
body.house-home-match .y-home-header{position:absolute;top:18px;left:0;right:0;padding-top:0}
body.house-home-match .hero.y-home-hero{min-height:760px!important;background:#0b2d4a;padding:0}
body.house-home-match .y-home-hero-grid{grid-template-columns:minmax(0,1.18fr) minmax(300px,.62fr);gap:34px;padding-top:150px;padding-bottom:96px}
body.house-home-match .y-home-hero-bg{width:100%;height:100%;object-fit:cover;object-position:center}
body.house-home-match .y-home-glass{max-width:690px;padding:34px 34px 30px!important;border-radius:30px!important;background:rgba(8,35,57,.48)!important;border:1px solid rgba(255,255,255,.18)!important;backdrop-filter:blur(14px)!important;-webkit-backdrop-filter:blur(14px)!important;box-shadow:0 22px 60px rgba(4,21,34,.20)!important}
body.house-home-match .y-home-glass h1{color:#fff!important;font-size:clamp(48px,5.1vw,72px);line-height:.95;text-shadow:0 2px 12px rgba(0,0,0,.35)!important;letter-spacing:-2px}
body.house-home-match .y-home-glass .hero-text{font-size:14px;line-height:1.45;color:rgba(255,255,255,.92)!important;text-shadow:none!important}
body.house-home-match .y-home-proof-stack{max-width:372px;justify-self:end;margin-top:24px}
body.house-home-match .y-home-proof-blue{white-space:normal;line-height:1.35!important}
body.house-home-match .y-home-feature-wrap{margin-left:auto!important;margin-right:auto!important}
body.house-home-match .y-home-feature-strip{grid-template-columns:repeat(4,minmax(0,1fr))}
body.house-home-match .y-home-feature{display:flex;align-items:center;justify-content:center;text-align:center}
body.house-home-match .y-home-feature h3{margin:0;text-align:center}
@media(max-width:640px){body.house-home-match .y-home-feature-strip{grid-template-columns:repeat(2,minmax(0,1fr))}}
body.house-home-match .house-home-process{width:100%;max-width:none;margin:0;padding:90px max(20px,calc((100vw - 1180px)/2));border-radius:0;box-shadow:none}
@media(max-width:900px){body.house-home-match .y-home-hero-grid{grid-template-columns:1fr;padding-top:130px;padding-bottom:65px}body.house-home-match .y-home-proof-stack{justify-self:start;max-width:100%;margin-top:0}body.house-home-match .house-home-process{padding:48px 24px}}
@media(max-width:640px){body.house-home-match .hero.y-home-hero{min-height:0!important}body.house-home-match .y-home-header{top:10px}body.house-home-match .y-home-hero-grid{padding-top:110px;gap:22px}body.house-home-match .y-home-glass{padding:26px 22px!important}body.house-home-match .y-home-glass h1{font-size:42px}}
</style></head>`);
fs.writeFileSync(file, housePage);
console.log('Matched house-washing hero image and page layout to homepage.');
