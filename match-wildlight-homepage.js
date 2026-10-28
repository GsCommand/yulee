const fs=require('fs');
const file='public/wildlight-paver-sealing.html';
let html=fs.readFileSync(file,'utf8');
const home=fs.readFileSync('public/index.html','utf8');
const header=home.match(/<header class="y-home-header">[\s\S]*?<\/header>\s*<script>[\s\S]*?<\/script>/)[0];
let hero=home.match(/<section class="hero y-home-hero">[\s\S]*?<\/section>/)[0];
hero=hero.replace('<h1>Paver Sealing Yulee FL</h1>','<h1>Paver Sealing Wildlight FL</h1>').replace('Professional paver sealing in Yulee, Wildlight &amp; Nassau County','Professional paver sealing in Wildlight, Yulee').replace(/<p class="hero-text">[\s\S]*?<\/p>/,'<p class="hero-text">Driveway, patio, walkway and lanai paver cleaning, re-sanding, restoration and sealing for Wildlight homeowners.</p>').replace(/href="#calculator"/g,'href="#wildlight-pricing"');
html=html.replace(/<header class="ys-header">[\s\S]*?<\/header>\s*<script>[\s\S]*?<\/script>/,header);
html=html.replace(/<section class="ys-hero[^"]*">[\s\S]*?<\/section>/,hero);
html=html.replace(/<body class="([^"]*)">/,'<body class="$1 yulee-home wildlight-home-match">');
html=html.replace('</head>','<link rel="stylesheet" href="/home-hydroseal.css?v=1" />'+(home.match(/<style id="yulee-home-hydroseal-v2">[\s\S]*?<\/style>/)||[''])[0]+`<style id="wildlight-home-match">
body.wildlight-home-match .location-article{width:min(1180px,calc(100% - 40px));gap:48px;padding:64px 0}
body.wildlight-home-match .location-article>section{padding:34px;border:1px solid #dce5ea;border-radius:28px;background:#fff;box-shadow:0 12px 32px rgba(11,45,74,.06)}
body.wildlight-home-match .location-article h2{font-family:"Arial Black",Arial,sans-serif;color:#0b2d4a;font-size:clamp(30px,3.5vw,48px);line-height:1.06}
body.wildlight-home-match .location-article .feature-band{background:#0b2d4a}
body.wildlight-home-match .location-article .feature-band h2,body.wildlight-home-match .location-article .feature-band h3{color:#fff}
body.wildlight-home-match .ys-feature-wrap{width:min(1180px,calc(100% - 40px));margin-inline:auto}
body.wildlight-home-match .ys-feature-strip{border-radius:30px;background:#f0f5f7}
body.wildlight-home-match .content-card,body.wildlight-home-match .article-card,body.wildlight-home-match .location-service-card{border-radius:24px;background:#f7fafc}
body.wildlight-home-match .faq-section{padding:40px;border:1px solid #dce5ea;border-radius:28px}
@media(max-width:640px){body.wildlight-home-match .location-article{width:calc(100% - 28px);gap:28px}body.wildlight-home-match .location-article>section{padding:24px 18px}body.wildlight-home-match .faq-section{padding:24px 18px}}
</style></head>`);
html=html.replace('<h2>Wildlight paver sealing cost</h2>','<h2 id="wildlight-pricing">Wildlight paver sealing cost</h2>');
if(!html.includes('y-home-hero-bg')||!html.includes('y-home-header')||!html.includes('<h1>Paver Sealing Wildlight FL</h1>'))throw Error('Wildlight homepage match failed');
fs.writeFileSync(file,html);
