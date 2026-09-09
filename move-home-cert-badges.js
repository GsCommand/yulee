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

function findBalancedDivEnd(source, start) {
  const tokenRe = /<div\b[^>]*>|<\/div>/gi;
  tokenRe.lastIndex = start;
  let depth = 0;
  let match;
  while ((match = tokenRe.exec(source))) {
    if (/^<div\b/i.test(match[0])) depth += 1;
    else depth -= 1;
    if (depth === 0) return tokenRe.lastIndex;
  }
  return -1;
}

const before = freezeSeo(html);
if (!before.title || !before.description || !before.canonical || !before.h1) {
  throw new Error('Could not freeze homepage SEO foundation before badge move.');
}

const badgeStartMarker = '<div class="cert-container social-cert-container"';
const badgeStart = html.indexOf(badgeStartMarker);
if (badgeStart < 0) throw new Error('Homepage certification badge strip was not found.');
const badgeEnd = findBalancedDivEnd(html, badgeStart);
if (badgeEnd < 0) throw new Error('Could not determine certification badge strip bounds.');

const badgeBlock = html.slice(badgeStart, badgeEnd);
for (const required of [
  'hydroseal-licensed-insured.png',
  'trident-master.jpg',
  'hydroseal-2-year-warranty.png'
]) {
  if (!badgeBlock.includes(required)) throw new Error(`Expected badge missing before move: ${required}`);
}

html = html.slice(0, badgeStart) + html.slice(badgeEnd);

const socialAppMarker = '<div class="elfsight-app-f7229490-8c31-483c-aa82-d3a3b751a7c7"';
const socialPos = html.indexOf(socialAppMarker);
if (socialPos < 0) throw new Error('Homepage social icon widget was not found.');

const movedBlock = `<div class="home-bottom-cert-badges">${badgeBlock}</div>\n      `;
html = html.slice(0, socialPos) + movedBlock + html.slice(socialPos);

html = html.replace(/\s*<style id="home-bottom-cert-badges-style">[\s\S]*?<\/style>\s*/i, '\n');
const css = `<style id="home-bottom-cert-badges-style">
.home-bottom-cert-badges{width:min(1180px,calc(100% - 40px));margin:34px auto 18px;padding-top:18px;border-top:1px solid #dce5ea}
.home-bottom-cert-badges .cert-container{margin-left:auto!important;margin-right:auto!important}
@media(max-width:640px){.home-bottom-cert-badges{width:min(100% - 24px,1180px);margin-top:28px;padding-top:14px}}
</style>`;
html = html.replace('</head>', `${css}\n</head>`);

const after = freezeSeo(html);
if (after.title !== before.title) throw new Error('Homepage title changed during badge move.');
if (after.description !== before.description) throw new Error('Homepage meta description changed during badge move.');
if (after.canonical !== before.canonical) throw new Error('Homepage canonical changed during badge move.');
if (after.h1 !== before.h1) throw new Error('Homepage H1 changed during badge move.');
if (JSON.stringify(after.jsonLd) !== JSON.stringify(before.jsonLd)) throw new Error('Homepage JSON-LD/schema changed during badge move.');

const finalBadgePos = html.indexOf('<div class="home-bottom-cert-badges">');
const finalSocialPos = html.indexOf(socialAppMarker);
const faqPos = html.indexOf('<section class="section faq-section">');
if (finalBadgePos < 0 || finalSocialPos < 0 || finalBadgePos > finalSocialPos) {
  throw new Error('Certification badge strip is not directly before the social icon widget.');
}
if (faqPos >= 0 && finalBadgePos < faqPos) {
  throw new Error('Certification badge strip did not move below the FAQ section.');
}

fs.writeFileSync(file, html);
console.log('Moved homepage Licensed/Trident/Warranty badges to the bottom directly above social icons.');
