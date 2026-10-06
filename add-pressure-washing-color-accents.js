const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'pressure-washing.html');
if (!fs.existsSync(file)) throw new Error('Pressure washing page missing from public build.');
let html = fs.readFileSync(file, 'utf8');

const styleId = 'pressure-washing-color-accents-v1';
if (html.includes(`id="${styleId}"`)) process.exit(0);

const css = `
<style id="${styleId}">
body{
  --pw-navy:#0b2d4a;
  --pw-blue:#0f6ea8;
  --pw-aqua:#39bfea;
  --pw-teal:#2bb7a9;
  --pw-indigo:#596fd3;
  --pw-line:#dbe6ec;
  --pw-soft:#f7fbfd;
  --pw-shadow:0 14px 34px rgba(11,45,74,.09);
}

/* Main bordered sections */
.service-article>.article-block,
.service-article>.article-grid,
.faq-section,
.cta-panel,
.section.split,
.gallery-embed{
  position:relative;
}

.service-article>.article-block{
  border:1px solid #d9e7ed;
  border-top:4px solid var(--pw-aqua);
  border-radius:28px;
  background:linear-gradient(145deg,#fff 0%,#fbfdfe 100%);
  box-shadow:var(--pw-shadow);
  padding:clamp(28px,4vw,44px);
  margin-top:30px;
}
.service-article>.article-block:nth-of-type(3){border-top-color:var(--pw-indigo)}
.service-article>.article-block:nth-of-type(5){border-top-color:var(--pw-teal)}

/* Three intro cards */
.content-grid.three .content-card{
  position:relative;
  overflow:hidden;
  border:1px solid var(--pw-line);
  border-radius:22px;
  background:#fff;
  box-shadow:0 8px 22px rgba(11,45,74,.06);
  transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;
}
.content-grid.three .content-card::before{
  content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--pw-aqua);
}
.content-grid.three .content-card:nth-child(2)::before{background:var(--pw-blue)}
.content-grid.three .content-card:nth-child(3)::before{background:var(--pw-indigo)}
.content-grid.three .content-card:nth-child(1){background:linear-gradient(135deg,#effbff,#fff 74%)}
.content-grid.three .content-card:nth-child(2){background:linear-gradient(135deg,#f1f7fb,#fff 74%)}
.content-grid.three .content-card:nth-child(3){background:linear-gradient(135deg,#f4f5ff,#fff 74%)}
.content-grid.three .content-card:hover{transform:translateY(-3px);box-shadow:0 15px 34px rgba(11,45,74,.11);border-color:rgba(57,191,234,.5)}

/* Two-card rows */
.service-article>.article-grid{
  gap:18px;
  padding:18px;
  border:1px solid #dce7ed;
  border-radius:28px;
  background:#f2f6f8;
  box-shadow:0 12px 30px rgba(11,45,74,.07);
  margin-top:30px;
}
.service-article>.article-grid>.article-card{
  position:relative;
  overflow:hidden;
  background:#fff;
  border:1px solid var(--pw-line);
  border-radius:22px;
  box-shadow:0 8px 22px rgba(11,45,74,.05);
}
.service-article>.article-grid>.article-card::before{
  content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--pw-blue);
}
.service-article>.article-grid>.article-card:nth-child(2)::before{background:var(--pw-teal)}
.service-article>.article-grid:nth-of-type(4)>.article-card:first-child::before{background:var(--pw-indigo)}
.service-article>.article-grid:nth-of-type(4)>.article-card:nth-child(2)::before{background:var(--pw-aqua)}

/* Process */
.process-grid{gap:14px}
.process-step{
  position:relative;
  overflow:hidden;
  border:1px solid var(--pw-line);
  border-radius:18px;
  background:#fff;
  box-shadow:0 7px 18px rgba(11,45,74,.05);
  transition:transform .2s ease,box-shadow .2s ease;
}
.process-step::before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:var(--pw-aqua)}
.process-step:nth-child(2)::before,.process-step:nth-child(5)::before{background:var(--pw-blue)}
.process-step:nth-child(3)::before,.process-step:nth-child(6)::before{background:var(--pw-indigo)}
.process-step:nth-child(4)::before{background:var(--pw-teal)}
.process-step:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(11,45,74,.10)}
.process-step strong{color:var(--pw-navy)}

/* Service areas */
.location-nav{gap:12px}
.location-link{
  position:relative;
  overflow:hidden;
  border:1px solid var(--pw-line)!important;
  border-radius:18px!important;
  background:#fff!important;
  box-shadow:0 8px 20px rgba(11,45,74,.05)!important;
  transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;
}
.location-link::before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--pw-aqua)}
.location-link:nth-child(2)::before{background:var(--pw-blue)}
.location-link:nth-child(3)::before{background:var(--pw-indigo)}
.location-link:nth-child(4)::before{background:var(--pw-teal)}
.location-link:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(11,45,74,.10)!important;border-color:rgba(57,191,234,.55)!important}

/* Pressure vs soft-wash split */
.section.split{
  width:min(1180px,calc(100% - 40px));
  margin:34px auto 0;
  padding:18px;
  gap:16px;
  border:1px solid #dce7ed;
  border-radius:28px;
  background:#f1f5f7;
  box-shadow:var(--pw-shadow);
}
.section.split>div{
  position:relative;
  overflow:hidden;
  border:1px solid var(--pw-line);
  border-radius:20px;
  background:#fff;
  padding:28px;
  box-shadow:0 8px 20px rgba(11,45,74,.05);
}
.section.split>div::before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--pw-blue)}
.section.split>div:nth-child(2)::before{background:var(--pw-teal)}

/* Reviews */
.gallery-embed{
  width:min(1180px,calc(100% - 40px));
  margin-inline:auto;
  border:1px solid var(--pw-line);
  border-top:4px solid var(--pw-indigo);
  border-radius:26px;
  background:#fff;
  box-shadow:var(--pw-shadow);
  padding:22px!important;
  overflow:hidden;
}

/* FAQ */
.faq-section{
  width:min(1180px,calc(100% - 40px));
  margin:36px auto 0!important;
  padding:clamp(28px,4vw,42px)!important;
  border:1px solid var(--pw-line);
  border-top:4px solid var(--pw-aqua);
  border-radius:28px;
  background:linear-gradient(145deg,#fff,#f8fbfd);
  box-shadow:var(--pw-shadow);
}
.faq-item{
  border:1px solid var(--pw-line)!important;
  border-radius:16px!important;
  background:#fff!important;
  box-shadow:0 6px 18px rgba(11,45,74,.04)!important;
  overflow:hidden;
}
.faq-item:nth-of-type(2){border-left:4px solid var(--pw-blue)!important}
.faq-item:nth-of-type(3){border-left:4px solid var(--pw-indigo)!important}
.faq-item:nth-of-type(4){border-left:4px solid var(--pw-teal)!important}

/* CTA */
.cta-panel{
  width:min(1180px,calc(100% - 40px));
  margin:36px auto 0!important;
  padding:clamp(30px,5vw,52px)!important;
  border:1px solid rgba(255,255,255,.18)!important;
  border-top:5px solid #79d7f4!important;
  border-radius:28px!important;
  background:linear-gradient(135deg,#0b2d4a,#0f6ea8)!important;
  color:#fff!important;
  box-shadow:0 24px 58px rgba(11,45,74,.18)!important;
}
.cta-panel h2,.cta-panel p,.cta-panel a{color:#fff!important}

@media(max-width:720px){
  .service-article>.article-block{padding:24px 20px}
  .section.split,.gallery-embed,.faq-section,.cta-panel{width:calc(100% - 24px)}
}
</style>`;

html = html.replace('</head>', `${css}\n</head>`);
fs.writeFileSync(file, html);
console.log('Added professional blue/aqua/teal/indigo border accents to pressure washing page.');
