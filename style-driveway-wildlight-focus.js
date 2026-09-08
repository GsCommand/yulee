const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-driveway-paver-sealing.html');
if (!fs.existsSync(file)) throw new Error('Driveway page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');

const marker = '<section class="feature-band"><p class="eyebrow">Wildlight focus</p>';
const styledMarker = '<section class="feature-band driveway-wildlight-focus"><p class="eyebrow">Wildlight focus</p>';

if (html.includes(marker)) {
  html = html.replace(marker, styledMarker);
} else if (!html.includes(styledMarker)) {
  throw new Error('Wildlight focus section marker not found; refusing to alter unrelated content.');
}

const css = `<style id="driveway-wildlight-focus-style">
.driveway-wildlight-focus{position:relative;background:linear-gradient(145deg,#f4faff 0%,#ffffff 72%)!important;color:#0b1220!important;border:1px solid #dce8f1!important;border-top:4px solid #39bfea!important;border-radius:28px!important;padding:clamp(26px,4vw,38px)!important;box-shadow:0 18px 44px rgba(11,45,74,.09)!important;overflow:hidden}
.driveway-wildlight-focus::after{content:"";position:absolute;right:-90px;top:-90px;width:220px;height:220px;border-radius:50%;background:rgba(57,191,234,.08);pointer-events:none}
.driveway-wildlight-focus>.eyebrow{position:relative;z-index:1;display:inline-flex!important;align-items:center;padding:7px 11px!important;margin:0 0 12px!important;border-radius:999px;background:#eaf7fc!important;color:#0f6ea8!important;font-size:11px!important;font-weight:900!important;letter-spacing:1.25px!important}
.driveway-wildlight-focus>h2{position:relative;z-index:1;margin:0 0 14px!important;color:#0b2d4a!important;font-size:clamp(30px,3.15vw,44px)!important;line-height:1.04!important;letter-spacing:-1px!important}
.driveway-wildlight-focus>p{position:relative;z-index:1;margin:0!important;max-width:980px;color:#536475!important;font-size:16px!important;line-height:1.72!important}
.driveway-wildlight-focus .article-grid{position:relative;z-index:1;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:16px!important;margin-top:26px!important;padding-top:24px!important;border-top:1px solid #dce8f1!important}
.driveway-wildlight-focus .article-grid>div{position:relative;background:#fff!important;border:1px solid #dce5ea!important;border-radius:19px!important;padding:22px 22px 21px 24px!important;box-shadow:0 9px 24px rgba(11,45,74,.06)!important;overflow:hidden}
.driveway-wildlight-focus .article-grid>div::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:#39bfea}
.driveway-wildlight-focus .article-grid>div:nth-child(2)::before{background:#0f6ea8}
.driveway-wildlight-focus .article-grid h3{margin:0 0 9px!important;color:#0b2d4a!important;font-size:19px!important;line-height:1.2!important}
.driveway-wildlight-focus .article-grid p{margin:0!important;color:#536475!important;font-size:15px!important;line-height:1.66!important}
.driveway-wildlight-focus a{color:#0f6ea8!important;text-decoration:none!important;border-bottom:1px solid rgba(15,110,168,.28)}
.driveway-wildlight-focus a:hover,.driveway-wildlight-focus a:focus-visible{color:#0b2d4a!important;border-bottom-color:#0b2d4a}
@media(max-width:760px){.driveway-wildlight-focus .article-grid{grid-template-columns:1fr!important}.driveway-wildlight-focus{border-radius:22px!important;padding:24px 20px!important}.driveway-wildlight-focus>h2{font-size:32px!important}}
</style>`;

if (!html.includes('id="driveway-wildlight-focus-style"')) {
  html = html.replace('</head>', `${css}\n</head>`);
}

const protectedText = [
  'Driveway Paver Sealing Wildlight Yulee FL',
  'Wildlight includes a large amount of paver hardscape across driveways, entries, patios and screened outdoor areas.',
  'Wildlight Driveway Paver Cleaning and Sealing',
  'Del Webb Wildlight Paver Sealing',
  '/wildlight-paver-sealing.html',
  '/del-webb-wildlight-paver-sealing.html'
];
for (const item of protectedText) {
  if (!html.includes(item)) throw new Error(`Protected Wildlight content missing after styling: ${item}`);
}

fs.writeFileSync(file, html);
console.log('Styled driveway Wildlight focus section without changing copy.');
