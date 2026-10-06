const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-travertine-sealing.html');
if (!fs.existsSync(file)) throw new Error('Travertine page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');
const styleId = 'travertine-premium-polish';
if (html.includes(`id="${styleId}"`)) process.exit(0);

const css = `
<style id="${styleId}">
body.travertine-driveway-clone{
  --trav-navy:#0b2d4a;
  --trav-blue:#0f6ea8;
  --trav-water:#39bfea;
  --trav-indigo:#596fd3;
  --trav-purple:#7d6ac8;
  --trav-ink:#0b1220;
  --trav-muted:#536475;
  --trav-line:#dce5ea;
  --trav-soft:#f4f7f9;
  --trav-aqua-soft:#eef9fd;
  --trav-indigo-soft:#f3f4ff;
  --trav-shadow:0 16px 40px rgba(11,45,74,.10);
  --trav-shadow-strong:0 24px 58px rgba(11,45,74,.15);
}

body.travertine-driveway-clone main{overflow:hidden;background:#fff}
body.travertine-driveway-clone .service-article{width:min(1180px,calc(100% - 40px));margin-inline:auto}

/* section rhythm + card language */
body.travertine-driveway-clone .service-article > section,
body.travertine-driveway-clone main > .section:not(.gallery-embed):not(.cert-section),
body.travertine-driveway-clone .faq-section,
body.travertine-driveway-clone .cta-panel{
  position:relative;
}

body.travertine-driveway-clone .article-block,
body.travertine-driveway-clone .travertine-detail-pair,
body.travertine-driveway-clone .travertine-process-section,
body.travertine-driveway-clone .travertine-pricing-section,
body.travertine-driveway-clone .travertine-service-areas,
body.travertine-driveway-clone .travertine-readiness-split,
body.travertine-driveway-clone .faq-section,
body.travertine-driveway-clone .cta-panel{
  border:1px solid var(--trav-line)!important;
  border-radius:28px!important;
  box-shadow:var(--trav-shadow)!important;
}

body.travertine-driveway-clone .article-block,
body.travertine-driveway-clone .travertine-process-section,
body.travertine-driveway-clone .travertine-pricing-section,
body.travertine-driveway-clone .travertine-service-areas{
  background:linear-gradient(145deg,#fff 0%,#fbfdfe 100%)!important;
  padding:clamp(28px,4vw,44px)!important;
  margin-top:30px!important;
}

body.travertine-driveway-clone .article-block::before,
body.travertine-driveway-clone .travertine-process-section::before,
body.travertine-driveway-clone .travertine-pricing-section::before,
body.travertine-driveway-clone .travertine-service-areas::before,
body.travertine-driveway-clone .faq-section::before,
body.travertine-driveway-clone .cta-panel::before{
  content:"";
  position:absolute;
  left:22px;
  right:22px;
  top:0;
  height:4px;
  border-radius:0 0 6px 6px;
  background:linear-gradient(90deg,var(--trav-water),var(--trav-blue));
}
body.travertine-driveway-clone .travertine-process-section::before{background:linear-gradient(90deg,var(--trav-blue),var(--trav-indigo))}
body.travertine-driveway-clone .travertine-pricing-section::before{background:linear-gradient(90deg,var(--trav-indigo),var(--trav-purple))}
body.travertine-driveway-clone .travertine-service-areas::before{background:linear-gradient(90deg,var(--trav-water),var(--trav-indigo))}
body.travertine-driveway-clone .faq-section::before{background:linear-gradient(90deg,var(--trav-blue),var(--trav-water))}
body.travertine-driveway-clone .cta-panel::before{background:linear-gradient(90deg,var(--trav-water),#79d7f4)}

/* opening image + condition cards */
body.travertine-driveway-clone .travertine-condition-section{
  border:0!important;
  box-shadow:none!important;
  padding-left:0!important;
  padding-right:0!important;
  background:#fff!important;
}
body.travertine-driveway-clone .travertine-condition-card{
  border:1px solid var(--trav-line)!important;
  box-shadow:0 10px 28px rgba(11,45,74,.07)!important;
  transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;
}
body.travertine-driveway-clone .travertine-condition-card:hover{
  transform:translateY(-3px);
  box-shadow:0 16px 36px rgba(11,45,74,.12)!important;
  border-color:rgba(57,191,234,.55)!important;
}
body.travertine-driveway-clone .travertine-condition-card--1{background:linear-gradient(135deg,#f0fbff,#fff 72%)!important}
body.travertine-driveway-clone .travertine-condition-card--1::before{background:var(--trav-water)!important}
body.travertine-driveway-clone .travertine-condition-card--2{background:linear-gradient(135deg,#f2f7fb,#fff 72%)!important}
body.travertine-driveway-clone .travertine-condition-card--2::before{background:var(--trav-blue)!important}
body.travertine-driveway-clone .travertine-condition-card--3{background:linear-gradient(135deg,#f4f4ff,#fff 72%)!important}
body.travertine-driveway-clone .travertine-condition-card--3::before{background:var(--trav-indigo)!important}
body.travertine-driveway-clone .travertine-condition-number{background:var(--trav-navy)!important;box-shadow:0 8px 18px rgba(11,45,74,.20)!important}
body.travertine-driveway-clone .travertine-condition-image{
  padding:10px!important;
  border:1px solid #d5e1e8!important;
  border-left:5px solid var(--trav-indigo)!important;
  border-radius:24px!important;
  background:linear-gradient(145deg,#f8fbfd,#eef4f8)!important;
  box-shadow:0 22px 52px rgba(11,45,74,.16)!important;
}
body.travertine-driveway-clone .travertine-condition-image::after{
  content:"";position:absolute;inset:9px;border:1px solid rgba(255,255,255,.72);border-radius:15px;pointer-events:none;
}
body.travertine-driveway-clone .travertine-condition-image img{border-radius:15px!important}

/* dark two-card band refined to match homepage */
body.travertine-driveway-clone .travertine-secondary-band{
  background:linear-gradient(135deg,#0b2d4a 0%,#164f76 58%,#315f84 100%)!important;
  gap:20px!important;
}
body.travertine-driveway-clone .travertine-secondary-band>.article-card{
  position:relative;
  border:1px solid rgba(255,255,255,.68)!important;
  border-radius:24px!important;
  box-shadow:0 18px 42px rgba(0,0,0,.15)!important;
  overflow:hidden;
}
body.travertine-driveway-clone .travertine-secondary-band>.article-card::before{
  content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--trav-water);
}
body.travertine-driveway-clone .travertine-secondary-band>.article-card:nth-child(2)::before{background:var(--trav-indigo)}

/* paired cards */
body.travertine-driveway-clone .travertine-detail-pair{
  background:#f1f5f7!important;
  padding:18px!important;
  gap:16px!important;
  margin-top:30px!important;
}
body.travertine-driveway-clone .travertine-detail-pair>.article-card{
  position:relative;
  background:#fff!important;
  border:1px solid var(--trav-line)!important;
  border-radius:22px!important;
  padding:28px!important;
  box-shadow:0 8px 24px rgba(11,45,74,.06)!important;
  overflow:hidden;
}
body.travertine-driveway-clone .travertine-detail-pair>.article-card::before{
  content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--trav-blue);
}
body.travertine-driveway-clone .travertine-detail-pair>.article-card:nth-child(2)::before{background:var(--trav-purple)}

/* process cards */
body.travertine-driveway-clone .process-grid{gap:14px!important}
body.travertine-driveway-clone .process-step{
  position:relative;
  border:1px solid var(--trav-line)!important;
  border-radius:18px!important;
  background:#fff!important;
  box-shadow:0 8px 20px rgba(11,45,74,.05)!important;
  padding:20px!important;
  overflow:hidden;
}
body.travertine-driveway-clone .process-step::before{content:"";position:absolute;left:0;top:0;right:0;height:3px;background:var(--trav-water)}
body.travertine-driveway-clone .process-step:nth-child(2)::before,
body.travertine-driveway-clone .process-step:nth-child(5)::before{background:var(--trav-blue)}
body.travertine-driveway-clone .process-step:nth-child(3)::before,
body.travertine-driveway-clone .process-step:nth-child(6)::before{background:var(--trav-indigo)}
body.travertine-driveway-clone .process-step strong{color:var(--trav-navy)!important}

/* pricing */
body.travertine-driveway-clone .price-table-wrap{border:1px solid var(--trav-line)!important;border-radius:20px!important;overflow:hidden!important;box-shadow:0 10px 26px rgba(11,45,74,.06)!important;background:#fff}
body.travertine-driveway-clone .price-table thead th{background:var(--trav-navy)!important;color:#fff!important}
body.travertine-driveway-clone .price-table tbody tr:nth-child(even){background:#f7fafc!important}
body.travertine-driveway-clone .pricing-note{padding:14px 16px;border-radius:14px;background:var(--trav-aqua-soft);border:1px solid #d6edf5;color:var(--trav-muted)!important}

/* service area links */
body.travertine-driveway-clone .location-nav{gap:12px!important}
body.travertine-driveway-clone .location-link{
  position:relative;
  border:1px solid var(--trav-line)!important;
  border-radius:18px!important;
  background:#fff!important;
  padding:20px 20px 20px 24px!important;
  box-shadow:0 8px 22px rgba(11,45,74,.05)!important;
  transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;
  overflow:hidden;
}
body.travertine-driveway-clone .location-link::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--trav-water)}
body.travertine-driveway-clone .location-link:nth-child(2)::before{background:var(--trav-blue)}
body.travertine-driveway-clone .location-link:nth-child(3)::before{background:var(--trav-indigo)}
body.travertine-driveway-clone .location-link:nth-child(4)::before{background:var(--trav-purple)}
body.travertine-driveway-clone .location-link:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(11,45,74,.10)!important;border-color:rgba(57,191,234,.48)!important}

/* readiness split */
body.travertine-driveway-clone .travertine-readiness-split{
  width:min(1180px,calc(100% - 40px))!important;
  margin:34px auto 0!important;
  background:#f1f5f7!important;
  padding:18px!important;
  gap:16px!important;
}
body.travertine-driveway-clone .travertine-readiness-split>div{
  position:relative;
  background:#fff;
  border:1px solid var(--trav-line);
  border-radius:20px;
  padding:28px;
  box-shadow:0 8px 22px rgba(11,45,74,.05);
  overflow:hidden;
}
body.travertine-driveway-clone .travertine-readiness-split>div::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--trav-water)}
body.travertine-driveway-clone .travertine-readiness-split>div:nth-child(2)::before{background:var(--trav-indigo)}

/* reviews / gallery */
body.travertine-driveway-clone .gallery-embed{width:min(1180px,calc(100% - 40px));margin-inline:auto;border:1px solid var(--trav-line);border-radius:26px;background:#fff;box-shadow:var(--trav-shadow);padding:22px!important;overflow:hidden}
body.travertine-driveway-clone .gallery-embed::before{content:"";display:block;height:4px;margin:-22px -22px 18px;background:linear-gradient(90deg,var(--trav-water),var(--trav-indigo))}

/* FAQ */
body.travertine-driveway-clone .faq-section{width:min(1180px,calc(100% - 40px));margin:36px auto 0!important;padding:clamp(28px,4vw,42px)!important;background:linear-gradient(145deg,#fff,#f8fbfd)!important}
body.travertine-driveway-clone .faq-item{border:1px solid var(--trav-line)!important;border-radius:16px!important;background:#fff!important;margin-top:10px!important;box-shadow:0 6px 18px rgba(11,45,74,.04)!important;overflow:hidden}
body.travertine-driveway-clone .faq-item summary{padding:18px 20px!important;color:var(--trav-navy)!important;font-weight:850!important}
body.travertine-driveway-clone .faq-item p{padding:0 20px 18px!important;margin:0!important;color:var(--trav-muted)!important}

/* CTA */
body.travertine-driveway-clone .cta-panel{width:min(1180px,calc(100% - 40px));margin:36px auto 0!important;padding:clamp(30px,5vw,52px)!important;background:linear-gradient(135deg,#0b2d4a,#0f6ea8)!important;color:#fff!important;box-shadow:0 24px 58px rgba(11,45,74,.20)!important}
body.travertine-driveway-clone .cta-panel h2,body.travertine-driveway-clone .cta-panel p,body.travertine-driveway-clone .cta-panel .nap,body.travertine-driveway-clone .cta-panel .nap a{color:#fff!important}
body.travertine-driveway-clone .cta-panel .eyebrow{color:#aee9fb!important}
body.travertine-driveway-clone .cta-panel .button.primary{background:var(--trav-water)!important;color:#fff!important;box-shadow:0 12px 28px rgba(57,191,234,.28)!important}

/* headings */
body.travertine-driveway-clone .service-article h2,
body.travertine-driveway-clone .faq-section h2,
body.travertine-driveway-clone .cta-panel h2{color:var(--trav-navy);letter-spacing:-.6px}
body.travertine-driveway-clone .eyebrow{color:var(--trav-blue)}

@media(max-width:900px){
  body.travertine-driveway-clone .service-article{width:min(100% - 24px,1180px)}
  body.travertine-driveway-clone .travertine-detail-pair,
  body.travertine-driveway-clone .travertine-readiness-split{grid-template-columns:1fr!important}
  body.travertine-driveway-clone .travertine-readiness-split,
  body.travertine-driveway-clone .gallery-embed,
  body.travertine-driveway-clone .faq-section,
  body.travertine-driveway-clone .cta-panel{width:calc(100% - 24px)!important}
}

@media(max-width:640px){
  body.travertine-driveway-clone .article-block,
  body.travertine-driveway-clone .travertine-process-section,
  body.travertine-driveway-clone .travertine-pricing-section,
  body.travertine-driveway-clone .travertine-service-areas,
  body.travertine-driveway-clone .faq-section,
  body.travertine-driveway-clone .cta-panel{border-radius:22px!important;padding:24px 18px!important}
  body.travertine-driveway-clone .travertine-condition-image{border-radius:20px!important}
  body.travertine-driveway-clone .travertine-detail-pair,
  body.travertine-driveway-clone .travertine-readiness-split{padding:12px!important;border-radius:22px!important}
  body.travertine-driveway-clone .travertine-secondary-band{padding-left:12px!important;padding-right:12px!important}
}
</style>`;

if (!html.includes('</head>')) throw new Error('Travertine page head closing tag not found.');
html = html.replace('</head>', `${css}\n</head>`);
fs.writeFileSync(file, html);
console.log('Applied premium homepage-inspired visual polish to travertine page.');
