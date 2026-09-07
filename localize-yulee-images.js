const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = 'public';
const SITE = 'https://www.yuleepaversealing.com';
const LOCAL = {
  logo: `${SITE}/images/yulee-hydroseal-logo.webp`,
  driveway: `${SITE}/images/yulee-driveway-paver-sealing.webp`,
  wildlight: `${SITE}/images/yulee-wildlight-paver-sealing.webp`
};

// Use a genuinely local Yulee/Nassau image only where it is relevant enough to the page.
// Pages without a suitable local image intentionally lose the borrowed Nocatee photo and
// receive a clean branded hero treatment instead of substituting an unrelated image.
const pageImage = {
  'index.html': LOCAL.wildlight,
  'yulee-driveway-paver-sealing.html': LOCAL.wildlight,
  'wildlight-paver-sealing.html': LOCAL.wildlight,
  'del-webb-wildlight-paver-sealing.html': LOCAL.wildlight,
  'fernandina-beach-paver-sealing.html': LOCAL.driveway,
  'service-areas.html': LOCAL.wildlight
};

const trustMarkup = `<section class="section cert-section yulee-trust-section" aria-label="HydroSeal credentials"><div class="section-inner"><div class="content-grid three"><div class="content-card"><h3>Licensed &amp; Insured</h3><p>HydroSeal is licensed and insured for professional exterior surface work.</p></div><div class="content-card"><h3>Trident Master Certified</h3><p>HydroSeal is a Trident Master Certified paver sealing applicator.</p></div><div class="content-card"><h3>2-Year Warranty</h3><p>Qualifying sealing projects include HydroSeal's written two-year workmanship and adhesion warranty.</p></div></div></div></section>`;

const noPhotoStyles = `<style id="yulee-local-image-fallback">.hero-no-image .hero-media{background:linear-gradient(135deg,#082744 0%,#005ea8 58%,#1e7ebb 100%)}.hero-no-image .hero-media::before{background:linear-gradient(90deg,rgba(8,18,28,.34),rgba(8,18,28,.08))}.yulee-trust-section .content-card{text-align:center}.yulee-trust-section .content-card h3{color:var(--blue-dark)}</style>`;

function removeExternalImageMetadata(html) {
  html = html.replace(/\s*<meta\s+property="og:image"\s+content="https:\/\/nocateepaversealing\.com\/[^"]+"\s*\/?>/gi, '');
  html = html.replace(/\s*<meta\s+name="twitter:image"\s+content="https:\/\/nocateepaversealing\.com\/[^"]+"\s*\/?>/gi, '');
  html = html.replace(/\s*<link\s+rel="preload"\s+as="image"\s+href="https:\/\/nocateepaversealing\.com\/[^"]+"[^>]*>/gi, '');
  html = html.replace(/,"(?:primaryImageOfPage|image)":"https:\/\/nocateepaversealing\.com\/[^"]+"/g, '');
  html = html.replace(/"(?:primaryImageOfPage|image)":"https:\/\/nocateepaversealing\.com\/[^"]+",/g, '');
  return html;
}

function localizePage(file) {
  const fullPath = path.join(PUBLIC_DIR, file);
  let html = fs.readFileSync(fullPath, 'utf8');
  const replacementImage = pageImage[file] || null;

  // Host the Yulee logo from Yulee instead of jsDelivr.
  html = html.replace(/https:\/\/cdn\.jsdelivr\.net\/gh\/GsCommand\/yulee@[^/"']+\/yulee-paver-sealing\.webp/g, LOCAL.logo);

  // Normalize already-local root assets into the dedicated image folder.
  html = html.replace(/(["'])\/yulee-wildlight-paver-sealing\.webp/g, `$1/images/yulee-wildlight-paver-sealing.webp`);
  html = html.replace(/(["'])\/driveway-paver-resealed\.webp/g, `$1/images/yulee-driveway-paver-sealing.webp`);

  // Replace externally hosted certification artwork with factual text credentials.
  html = html.replace(/<section class="section cert-section">[\s\S]*?<\/section>/g, trustMarkup);

  if (replacementImage) {
    // Same HydroSeal work can still be used, but the page now points only to an asset served by Yulee.
    html = html.replace(/https:\/\/nocateepaversealing\.com\/[^"'\s)<]+/g, replacementImage);
  } else {
    // No suitable local photo yet: remove borrowed Nocatee imagery rather than mislabel it.
    html = removeExternalImageMetadata(html);
    html = html.replace(/<img\b[^>]*src="https:\/\/nocateepaversealing\.com\/[^"]+"[^>]*\/?\s*>/gi, '');
    html = html.replace(/<img\b[^>]*src='https:\/\/nocateepaversealing\.com\/[^']+'[^>]*\/?\s*>/gi, '');

    if (!html.includes('class="hero-image"') && html.includes('<section class="hero">')) {
      html = html.replace('<section class="hero">', '<section class="hero hero-no-image">');
    }
  }

  // Final cleanup for any Nocatee-hosted image reference missed by a page-specific rule.
  // If one remains in markup or metadata, remove the reference instead of leaking it to production.
  if (html.includes('nocateepaversealing.com/')) {
    html = removeExternalImageMetadata(html);
    html = html.replace(/<img\b[^>]*nocateepaversealing\.com[^>]*\/?\s*>/gi, '');
  }

  if (!html.includes('id="yulee-local-image-fallback"')) {
    html = html.replace('</head>', `${noPhotoStyles}\n</head>`);
  }

  if (html.includes('nocateepaversealing.com/')) {
    throw new Error(`${file}: Nocatee-hosted image URL still present after localization`);
  }
  if (html.includes('cdn.jsdelivr.net/gh/GsCommand/yulee@') && html.includes('yulee-paver-sealing.webp')) {
    throw new Error(`${file}: Yulee logo still served through jsDelivr`);
  }

  fs.writeFileSync(fullPath, html);
  console.log(`Localized Yulee imagery in ${file}${replacementImage ? ` -> ${replacementImage}` : ' -> borrowed photos removed'}`);
}

for (const file of fs.readdirSync(PUBLIC_DIR).filter(name => name.endsWith('.html'))) {
  localizePage(file);
}

console.log('Yulee image localization complete: production HTML contains no nocateepaversealing.com image references.');
