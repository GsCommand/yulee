const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) throw new Error('Public build directory is missing.');

const CONFIG = {
  eyebrow: 'Free Estimate',
  heading: 'Ready for a quote?',
  copy: 'Send photos and approximate square footage for a quick project review.',
  quoteLabel: 'Get a Quote',
  quoteUrl: 'https://hydrosealpavers.com/get-a-quote',
  phoneLabel: 'Call or text 904.537.5000',
  phoneUrl: 'tel:+19045375000'
};

const style = `<style id="site-floating-quote-style">
.site-floating-quote{position:fixed;right:22px;top:52%;z-index:120;width:226px;padding:18px;border:1px solid rgba(255,255,255,.65);border-radius:22px;background:linear-gradient(145deg,rgba(11,54,88,.97),rgba(15,110,168,.96));box-shadow:0 18px 46px rgba(5,32,51,.28);color:#fff;opacity:0;pointer-events:none;transform:translate3d(18px,-44%,0);transition:opacity .24s ease,transform .24s ease;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
.site-floating-quote.is-visible{opacity:1;pointer-events:auto;transform:translate3d(0,-50%,0)}
.site-floating-quote__eyebrow{margin:0 0 6px;color:#a9edff;font-size:10px;font-weight:950;letter-spacing:1.35px;text-transform:uppercase}
.site-floating-quote h3{margin:0 0 7px;color:#fff;font-family:"Arial Black",Arial,sans-serif;font-size:22px;line-height:1.04;letter-spacing:-.45px}
.site-floating-quote__copy{margin:0 0 14px;color:rgba(255,255,255,.86);font-size:12.5px;line-height:1.45}
.site-floating-quote__button{display:flex;align-items:center;justify-content:center;width:100%;min-height:44px;padding:11px 14px;border-radius:999px;background:#39bfea;color:#fff!important;font-size:12px;font-weight:950;letter-spacing:.7px;text-decoration:none!important;text-transform:uppercase;box-shadow:0 10px 24px rgba(57,191,234,.30)}
.site-floating-quote__button:hover,.site-floating-quote__button:focus-visible{background:#56c9eb;transform:translateY(-1px)}
.site-floating-quote__phone{display:block;margin-top:10px;color:#fff!important;font-size:11px;font-weight:850;text-align:center;text-decoration:none!important}
.site-floating-quote__phone:hover,.site-floating-quote__phone:focus-visible{text-decoration:underline!important;text-underline-offset:3px}
@media(max-width:1180px){.site-floating-quote{display:none!important}}
@media(prefers-reduced-motion:reduce){.site-floating-quote{transition:none!important}}
</style>`;

const box = `<aside class="site-floating-quote" aria-label="Free estimate">
  <p class="site-floating-quote__eyebrow">${CONFIG.eyebrow}</p>
  <h3>${CONFIG.heading}</h3>
  <p class="site-floating-quote__copy">${CONFIG.copy}</p>
  <a class="site-floating-quote__button" href="${CONFIG.quoteUrl}">${CONFIG.quoteLabel}</a>
  <a class="site-floating-quote__phone" href="${CONFIG.phoneUrl}">${CONFIG.phoneLabel}</a>
</aside>
<script id="site-floating-quote-script">
(function(){
  var box=document.querySelector('.site-floating-quote');
  if(!box)return;
  var hero=document.querySelector('.y-home-hero, .ys-hero, .hero');
  function update(){
    var show=hero ? hero.getBoundingClientRect().bottom<140 : window.scrollY>180;
    box.classList.toggle('is-visible',show);
  }
  update();
  window.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',update);
}());
</script>`;

function snapshot(source) {
  return {
    title: (source.match(/<title>[\s\S]*?<\/title>/i) || [])[0] || '',
    description: (source.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i) || [])[0] || '',
    canonical: (source.match(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i) || [])[0] || '',
    h1: (source.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0] || '',
    h2: source.match(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi) || [],
    h3: source.match(/<h3\b[^>]*>[\s\S]*?<\/h3>/gi) || [],
    jsonLd: source.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []
  };
}

function removeLegacyFloatingQuote(html) {
  return html
    .replace(/\s*<style id="home-floating-quote-style">[\s\S]*?<\/style>\s*/i, '\n')
    .replace(/\s*<aside class="home-floating-quote"[\s\S]*?<\/aside>\s*<script id="home-floating-quote-script">[\s\S]*?<\/script>\s*/i, '\n')
    .replace(/\s*<style id="site-floating-quote-style">[\s\S]*?<\/style>\s*/i, '\n')
    .replace(/\s*<aside class="site-floating-quote"[\s\S]*?<\/aside>\s*<script id="site-floating-quote-script">[\s\S]*?<\/script>\s*/i, '\n');
}

const htmlFiles = fs.readdirSync(publicDir).filter(name => name.endsWith('.html')).sort();
if (htmlFiles.length < 15) throw new Error(`Expected at least 15 HTML pages, found ${htmlFiles.length}.`);

for (const name of htmlFiles) {
  const file = path.join(publicDir, name);
  let html = fs.readFileSync(file, 'utf8');
  const before = snapshot(html);

  html = removeLegacyFloatingQuote(html);

  if (!html.includes('</head>') || !html.includes('</body>')) {
    throw new Error(`${name}: missing </head> or </body> marker.`);
  }

  html = html.replace('</head>', `${style}\n</head>`);

  const mobileBarRe = /(<div\s+class="mobile-contactbar"\b)/i;
  if (mobileBarRe.test(html)) {
    html = html.replace(mobileBarRe, `${box}\n\n    $1`);
  } else {
    html = html.replace('</body>', `${box}\n</body>`);
  }

  const after = snapshot(html);
  if (after.title !== before.title) throw new Error(`${name}: title changed while installing floating quote box.`);
  if (after.description !== before.description) throw new Error(`${name}: meta description changed while installing floating quote box.`);
  if (after.canonical !== before.canonical) throw new Error(`${name}: canonical changed while installing floating quote box.`);
  if (after.h1 !== before.h1) throw new Error(`${name}: H1 changed while installing floating quote box.`);
  if (JSON.stringify(after.h2) !== JSON.stringify(before.h2)) throw new Error(`${name}: H2 inventory changed while installing floating quote box.`);
  if (JSON.stringify(after.h3) !== JSON.stringify(before.h3.concat([`<h3>${CONFIG.heading}</h3>`]))) {
    // The floating card intentionally contributes one presentation heading; verify all pre-existing H3s are still intact below.
    const strippedAfter = after.h3.filter(h => h !== `<h3>${CONFIG.heading}</h3>`);
    if (JSON.stringify(strippedAfter) !== JSON.stringify(before.h3)) throw new Error(`${name}: existing H3 inventory changed while installing floating quote box.`);
  }
  if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error(`${name}: JSON-LD/schema changed while installing floating quote box.`);

  for (const required of ['site-floating-quote', CONFIG.heading, CONFIG.quoteUrl, CONFIG.phoneLabel]) {
    if (!html.includes(required)) throw new Error(`${name}: floating quote verification failed for ${required}`);
  }

  fs.writeFileSync(file, html);
}

console.log(`Installed one centrally managed floating quote component on ${htmlFiles.length} pages.`);
