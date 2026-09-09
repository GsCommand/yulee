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
  throw new Error('Could not freeze homepage SEO fields before adding floating quote card.');
}

if (html.includes('home-floating-quote')) {
  throw new Error('Floating homepage quote card already exists before transform.');
}

const style = `<style id="home-floating-quote-style">
.home-floating-quote{position:fixed;right:22px;top:52%;z-index:120;width:226px;padding:18px;border:1px solid rgba(255,255,255,.65);border-radius:22px;background:linear-gradient(145deg,rgba(11,54,88,.97),rgba(15,110,168,.96));box-shadow:0 18px 46px rgba(5,32,51,.28);color:#fff;opacity:0;pointer-events:none;transform:translate3d(18px,-44%,0);transition:opacity .24s ease,transform .24s ease;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
.home-floating-quote.is-visible{opacity:1;pointer-events:auto;transform:translate3d(0,-50%,0)}
.home-floating-quote__eyebrow{margin:0 0 6px;color:#a9edff;font-size:10px;font-weight:950;letter-spacing:1.35px;text-transform:uppercase}
.home-floating-quote h3{margin:0 0 7px;color:#fff;font-family:"Arial Black",Arial,sans-serif;font-size:22px;line-height:1.04;letter-spacing:-.45px}
.home-floating-quote__copy{margin:0 0 14px;color:rgba(255,255,255,.86);font-size:12.5px;line-height:1.45}
.home-floating-quote__button{display:flex;align-items:center;justify-content:center;width:100%;min-height:44px;padding:11px 14px;border-radius:999px;background:#39bfea;color:#fff!important;font-size:12px;font-weight:950;letter-spacing:.7px;text-decoration:none!important;text-transform:uppercase;box-shadow:0 10px 24px rgba(57,191,234,.30)}
.home-floating-quote__button:hover,.home-floating-quote__button:focus-visible{background:#56c9eb;transform:translateY(-1px)}
.home-floating-quote__phone{display:block;margin-top:10px;color:#fff!important;font-size:11px;font-weight:850;text-align:center;text-decoration:none!important}
.home-floating-quote__phone:hover,.home-floating-quote__phone:focus-visible{text-decoration:underline!important;text-underline-offset:3px}
@media(max-width:1180px){.home-floating-quote{display:none!important}}
@media(prefers-reduced-motion:reduce){.home-floating-quote{transition:none!important}}
</style>`;

const box = `<aside class="home-floating-quote" aria-label="Free paver sealing estimate">
  <p class="home-floating-quote__eyebrow">Free Estimate</p>
  <h3>Ready for a quote?</h3>
  <p class="home-floating-quote__copy">Send photos and approximate square footage for a quick project review.</p>
  <a class="home-floating-quote__button" href="https://hydrosealpavers.com/get-a-quote">Get a Quote</a>
  <a class="home-floating-quote__phone" href="tel:+19045375000">Call or text 904.537.5000</a>
</aside>
<script id="home-floating-quote-script">
(function(){
  var box=document.querySelector('.home-floating-quote');
  var hero=document.querySelector('.y-home-hero');
  if(!box||!hero)return;
  function update(){
    var rect=hero.getBoundingClientRect();
    box.classList.toggle('is-visible',rect.bottom<140);
  }
  update();
  window.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',update);
}());
</script>`;

html = html.replace('</head>', `${style}\n</head>`);

const mobileBar = '<div class="mobile-contactbar"';
if (!html.includes(mobileBar)) throw new Error('Homepage mobile contact bar marker not found for floating quote insertion.');
html = html.replace(mobileBar, `${box}\n\n    ${mobileBar}`);

const after = freezeSeo(html);
if (after.title !== before.title) throw new Error('Homepage title changed while adding floating quote card.');
if (after.description !== before.description) throw new Error('Homepage meta description changed while adding floating quote card.');
if (after.canonical !== before.canonical) throw new Error('Homepage canonical changed while adding floating quote card.');
if (after.h1 !== before.h1) throw new Error('Homepage H1 changed while adding floating quote card.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Homepage JSON-LD/schema changed while adding floating quote card.');

for (const required of ['home-floating-quote','Ready for a quote?','https://hydrosealpavers.com/get-a-quote','Call or text 904.537.5000']) {
  if (!html.includes(required)) throw new Error(`Floating quote verification failed: ${required}`);
}

fs.writeFileSync(file, html);
console.log('Added desktop floating homepage quote card that follows the viewport after the hero; protected SEO fields unchanged.');
