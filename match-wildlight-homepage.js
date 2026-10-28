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

const hub = `<article class="location-article" id="wildlight-services">
<section class="wildlight-options"><p class="eyebrow">Choose your service</p><h2>What would you like to protect?</h2><p>Select a service for preparation details, starting prices, and answers specific to your surface.</p>
<div class="wildlight-option-grid">
<a class="wildlight-option" href="/yulee-driveway-paver-sealing.html"><img src="/yulee-paver-resealing.webp" alt="Sealed paver driveway" loading="lazy"><div><span>Paver driveways</span><h3>Driveway sealing</h3><p>Deep cleaning, joint-sand restoration, and breathable protection for driveway pavers.</p><strong>Explore driveway sealing →</strong></div></a>
<a class="wildlight-option" href="/yulee-pool-deck-paver-sealing.html"><img src="/yulee-paver-pool-sealing.jpeg" alt="Paver pool deck" loading="lazy"><div><span>Pools, patios &amp; lanais</span><h3>Pool deck sealing</h3><p>Surface preparation and sealing for pool decks, outdoor living areas, and screened lanais.</p><strong>Explore pool deck sealing →</strong></div></a>
<a class="wildlight-option" href="/yulee-travertine-sealing.html"><img src="/yulee-natural-stone.jpg" alt="Natural stone outdoor surface" loading="lazy"><div><span>Travertine &amp; natural stone</span><h3>Travertine sealing</h3><p>Stone-safe cleaning and breathable protection selected for your natural stone.</p><strong>Explore travertine sealing →</strong></div></a>
<a class="wildlight-option" href="/pressure-washing.html"><img src="/images/hydroseal-house-washing.webp" alt="Exterior cleaning" loading="lazy"><div><span>Exterior surface cleaning</span><h3>Pressure washing</h3><p>Explore cleaning services for outdoor surfaces around your home.</p><strong>Explore pressure washing →</strong></div></a>
</div></section>
<section class="wildlight-area-option"><p class="eyebrow">Find your community</p><h2>Explore our service areas</h2><p>See coverage across Yulee, Wildlight, Del Webb Wildlight, Fernandina Beach, and Amelia Island.</p><a class="button primary" href="/service-areas.html">View all service areas →</a><a class="wildlight-del-webb" href="/del-webb-wildlight-paver-sealing.html">Del Webb Wildlight →</a></section>
</article>`;
html=html.replace(/<article class="location-article">[\s\S]*?<\/article>/,hub);
html=html.replace(/<section[^>]*aria-label="Recent paver sealing projects"[^>]*>[\s\S]*?<\/section>/,'');
html=html.replace(/href="#wildlight-pricing"/g,'href="#wildlight-services"').replace(/href="#calculator"/g,'href="#wildlight-services"');
html=html.replace('Get a Quote</a><a class="y-home-btn','Explore Services</a><a class="y-home-btn');
html=html.replace('</head>',`<style>
.wildlight-option-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;margin-top:28px}
.wildlight-option{display:block;overflow:hidden;border:1px solid #dce5ea;border-radius:24px;background:#fff;box-shadow:0 10px 28px rgba(11,45,74,.07);transition:transform .2s,box-shadow .2s}
.wildlight-option:hover{transform:translateY(-4px);box-shadow:0 18px 38px rgba(11,45,74,.14)}
.wildlight-option:focus-visible{outline:3px solid #0f6ea8;outline-offset:4px}
.wildlight-option img{display:block;width:100%;height:240px;object-fit:cover}
.wildlight-option>div{padding:26px}.wildlight-option span{font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:#0f6ea8;font-weight:850}
.wildlight-option h3{font-family:"Arial Black",Arial,sans-serif;color:#0b2d4a;font-size:28px;margin:8px 0}.wildlight-option strong{color:#0f6ea8}
body.wildlight-home-match .location-article>.wildlight-area-option{background:#edf7fc}
.wildlight-del-webb{display:inline-block;margin:16px 22px;color:#003f73;font-weight:800}
#wildlight-services{scroll-margin-top:30px}
@media(max-width:700px){.wildlight-option-grid{grid-template-columns:1fr}.wildlight-option img{height:220px}}
</style></head>`);

fs.writeFileSync(file,html);
