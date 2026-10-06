const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'pressure-washing.html');
if (!fs.existsSync(file)) throw new Error('Pressure washing page missing from public build.');
let html = fs.readFileSync(file, 'utf8');

const titleBefore = (html.match(/<title>[\s\S]*?<\/title>/i) || [])[0];
const descBefore = (html.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0];
const canonicalBefore = (html.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0];
const h1Before = (html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0];
if (!titleBefore || !descBefore || !canonicalBefore || !h1Before) throw new Error('Protected pressure-washing SEO fields missing.');

html = html.replace(/<body class="([^"]*)">/i, (_m, cls) => `<body class="${cls} pressure-travertine-clone">`);
if (!html.includes('pressure-travertine-clone')) html = html.replace(/<body>/i, '<body class="pressure-travertine-clone">');

html = html.replace('<article class="service-article">', '<article class="service-article pressure-trav-content">');
html = html.replace('<section class="section split">', '<section class="section split pressure-readiness-split">');
html = html.replace('<section class="section faq-section">', '<section class="section faq-section pressure-faq">');
html = html.replace('<section class="cta-panel">', '<section class="cta-panel pressure-cta">');

const css = `
<style id="pressure-travertine-clone-style">
body.pressure-travertine-clone{
 --pw-navy:#0b2d4a;--pw-blue:#0f6ea8;--pw-water:#39bfea;--pw-indigo:#596fd3;--pw-purple:#7d6ac8;
 --pw-ink:#0b1220;--pw-muted:#536475;--pw-line:#dce5ea;--pw-soft:#f4f7f9;
 --pw-shadow:0 16px 40px rgba(11,45,74,.10);--pw-shadow-strong:0 24px 58px rgba(11,45,74,.15);
 background:#fff;color:var(--pw-ink)
}
body.pressure-travertine-clone main{overflow:hidden;background:#fff}
body.pressure-travertine-clone .service-article{width:min(1180px,calc(100% - 40px));margin-inline:auto;padding:26px 0 0}

/* Keep the same shared hero/nav structure as Travertine */
body.pressure-travertine-clone .ys-hero{min-height:650px}
body.pressure-travertine-clone .ys-hero:after{background:linear-gradient(90deg,rgba(5,32,51,.38),rgba(5,32,51,.08))}
body.pressure-travertine-clone .ys-glass{background:rgba(5,32,51,.26);border:1px solid rgba(255,255,255,.14);box-shadow:0 24px 70px rgba(0,0,0,.14)}
body.pressure-travertine-clone .ys-glass h1,body.pressure-travertine-clone .ys-glass .hero-text{text-shadow:0 3px 16px rgba(0,0,0,.68)}
body.pressure-travertine-clone .ys-proof{border:1px solid rgba(220,229,234,.95)}
body.pressure-travertine-clone .ys-feature-strip{background:#f1f5f7;border:1px solid var(--pw-line)}
body.pressure-travertine-clone .ys-feature{border:1px solid var(--pw-line);box-shadow:0 8px 20px rgba(11,45,74,.05)}

/* Travertine-style bordered section language */
body.pressure-travertine-clone .pressure-trav-content>section,
body.pressure-travertine-clone .pressure-readiness-split,
body.pressure-travertine-clone .pressure-faq,
body.pressure-travertine-clone .pressure-cta{position:relative}

body.pressure-travertine-clone .pressure-trav-content .article-block,
body.pressure-travertine-clone .pressure-trav-content .feature-band,
body.pressure-travertine-clone .pressure-trav-content>.article-grid,
body.pressure-travertine-clone .pressure-readiness-split,
body.pressure-travertine-clone .pressure-faq,
body.pressure-travertine-clone .pressure-cta{
 border:1px solid var(--pw-line)!important;border-radius:28px!important;box-shadow:var(--pw-shadow)!important;
}
body.pressure-travertine-clone .pressure-trav-content .article-block,
body.pressure-travertine-clone .pressure-trav-content .feature-band,
body.pressure-travertine-clone .pressure-trav-content>.article-grid{
 background:linear-gradient(145deg,#fff 0%,#fbfdfe 100%)!important;
 padding:clamp(28px,4vw,44px)!important;margin:30px 0 0!important;
}
body.pressure-travertine-clone .pressure-trav-content .article-block::before,
body.pressure-travertine-clone .pressure-trav-content .feature-band::before,
body.pressure-travertine-clone .pressure-trav-content>.article-grid::before,
body.pressure-travertine-clone .pressure-faq::before,
body.pressure-travertine-clone .pressure-cta::before{
 content:"";position:absolute;left:22px;right:22px;top:0;height:4px;border-radius:0 0 6px 6px;background:linear-gradient(90deg,var(--pw-water),var(--pw-blue));
}
body.pressure-travertine-clone .pressure-trav-content .feature-band::before{background:linear-gradient(90deg,var(--pw-blue),var(--pw-indigo))}
body.pressure-travertine-clone .pressure-trav-content>.article-grid::before{background:linear-gradient(90deg,var(--pw-indigo),var(--pw-purple))}
body.pressure-travertine-clone .pressure-cta::before{background:linear-gradient(90deg,var(--pw-water),#79d7f4)}

body.pressure-travertine-clone .pressure-trav-content h2,
body.pressure-travertine-clone .pressure-faq h2,
body.pressure-travertine-clone .pressure-cta h2{
 font-family:"Arial Black",Arial,sans-serif;color:var(--pw-navy);line-height:1.04;letter-spacing:-.9px
}
body.pressure-travertine-clone .pressure-trav-content h2{font-size:clamp(32px,3.7vw,48px)}
body.pressure-travertine-clone .pressure-trav-content p{color:var(--pw-muted);line-height:1.72}
body.pressure-travertine-clone .pressure-trav-content .eyebrow{color:var(--pw-blue);font-weight:900;text-transform:uppercase;letter-spacing:1.1px}

/* Interior cards mirror Travertine paired/detail cards */
body.pressure-travertine-clone .content-grid,
body.pressure-travertine-clone .article-grid{gap:16px!important}
body.pressure-travertine-clone .content-card,
body.pressure-travertine-clone .article-card,
body.pressure-travertine-clone .feature-band .article-grid>div{
 position:relative;background:#fff!important;border:1px solid var(--pw-line)!important;border-radius:22px!important;
 padding:28px!important;box-shadow:0 8px 24px rgba(11,45,74,.06)!important;overflow:hidden;
}
body.pressure-travertine-clone .content-card::before,
body.pressure-travertine-clone .article-card::before,
body.pressure-travertine-clone .feature-band .article-grid>div::before{
 content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--pw-blue)
}
body.pressure-travertine-clone .content-card:nth-child(2)::before,
body.pressure-travertine-clone .article-card:nth-child(2)::before{background:var(--pw-indigo)}
body.pressure-travertine-clone .content-card:nth-child(3)::before{background:var(--pw-purple)}
body.pressure-travertine-clone .content-card h3,
body.pressure-travertine-clone .article-card h3,
body.pressure-travertine-clone .feature-band h3{color:var(--pw-navy);font-family:"Arial Black",Arial,sans-serif}

/* Process cards exactly in the Travertine family */
body.pressure-travertine-clone .process-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px!important}
body.pressure-travertine-clone .process-step{position:relative;border:1px solid var(--pw-line)!important;border-radius:18px!important;background:#fff!important;box-shadow:0 8px 20px rgba(11,45,74,.05)!important;padding:20px!important;overflow:hidden}
body.pressure-travertine-clone .process-step::before{content:"";position:absolute;left:0;top:0;right:0;height:3px;background:var(--pw-water)}
body.pressure-travertine-clone .process-step:nth-child(2)::before,body.pressure-travertine-clone .process-step:nth-child(5)::before{background:var(--pw-blue)}
body.pressure-travertine-clone .process-step:nth-child(3)::before,body.pressure-travertine-clone .process-step:nth-child(6)::before{background:var(--pw-indigo)}
body.pressure-travertine-clone .process-step strong{color:var(--pw-navy)!important}

/* Same readiness split treatment as Travertine */
body.pressure-travertine-clone .pressure-readiness-split{width:min(1180px,calc(100% - 40px))!important;margin:34px auto 0!important;background:#f1f5f7!important;padding:18px!important;gap:16px!important}
body.pressure-travertine-clone .pressure-readiness-split>div{position:relative;background:#fff;border:1px solid var(--pw-line);border-radius:20px;padding:28px;box-shadow:0 8px 22px rgba(11,45,74,.05);overflow:hidden}
body.pressure-travertine-clone .pressure-readiness-split>div::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--pw-water)}
body.pressure-travertine-clone .pressure-readiness-split>div:nth-child(2)::before{background:var(--pw-indigo)}
body.pressure-travertine-clone .pressure-readiness-split h2{color:var(--pw-navy)!important}
body.pressure-travertine-clone .pressure-readiness-split p{color:var(--pw-muted)!important}

/* Reviews */
body.pressure-travertine-clone .gallery-embed{width:min(1180px,calc(100% - 40px));margin:36px auto 0;border:1px solid var(--pw-line);border-radius:26px;background:#fff;box-shadow:var(--pw-shadow);padding:22px!important;overflow:hidden}
body.pressure-travertine-clone .gallery-embed::before{content:"";display:block;height:4px;margin:-22px -22px 18px;background:linear-gradient(90deg,var(--pw-water),var(--pw-indigo))}

/* FAQ */
body.pressure-travertine-clone .pressure-faq{width:min(1180px,calc(100% - 40px));margin:36px auto 0!important;padding:clamp(28px,4vw,42px)!important;background:linear-gradient(145deg,#fff,#f8fbfd)!important}
body.pressure-travertine-clone .pressure-faq .faq-item{border:1px solid var(--pw-line)!important;border-radius:16px!important;background:#fff!important;margin-top:10px!important;box-shadow:0 6px 18px rgba(11,45,74,.04)!important;overflow:hidden}
body.pressure-travertine-clone .pressure-faq .faq-item summary{padding:18px 20px!important;color:var(--pw-navy)!important;font-weight:850!important}
body.pressure-travertine-clone .pressure-faq .faq-item p{padding:0 20px 18px!important;margin:0!important;color:var(--pw-muted)!important}

/* CTA */
body.pressure-travertine-clone .pressure-cta{width:min(1180px,calc(100% - 40px));margin:36px auto 88px!important;padding:clamp(30px,5vw,52px)!important;background:linear-gradient(135deg,#0b2d4a,#0f6ea8)!important;color:#fff!important;box-shadow:var(--pw-shadow-strong)!important}
body.pressure-travertine-clone .pressure-cta h2,body.pressure-travertine-clone .pressure-cta p,body.pressure-travertine-clone .pressure-cta a{color:#fff!important}

@media(max-width:900px){body.pressure-travertine-clone .process-grid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){body.pressure-travertine-clone .service-article,body.pressure-travertine-clone .pressure-readiness-split,body.pressure-travertine-clone .pressure-faq,body.pressure-travertine-clone .pressure-cta,body.pressure-travertine-clone .gallery-embed{width:calc(100% - 24px)!important}body.pressure-travertine-clone .process-grid{grid-template-columns:1fr}body.pressure-travertine-clone .pressure-trav-content .article-block,body.pressure-travertine-clone .pressure-trav-content .feature-band,body.pressure-travertine-clone .pressure-trav-content>.article-grid{padding:24px 20px!important}}
</style>`;

html = html.replace('</head>', `${css}\n</head>`);

const titleAfter = (html.match(/<title>[\s\S]*?<\/title>/i) || [])[0];
const descAfter = (html.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0];
const canonicalAfter = (html.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0];
const h1After = (html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0];
if (titleAfter !== titleBefore || descAfter !== descBefore || canonicalAfter !== canonicalBefore || h1After !== h1Before) throw new Error('Pressure washing SEO foundation changed during travertine-layout match.');
if (/yulee-roof-washing\.html/i.test(html)) throw new Error('Removed roof-service link resurfaced in pressure-washing output.');

fs.writeFileSync(file, html);
console.log('Matched Pressure Washing page to the Travertine page layout and visual system.');
