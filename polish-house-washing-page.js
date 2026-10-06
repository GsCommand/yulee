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
