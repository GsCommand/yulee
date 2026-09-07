const fs = require('fs');
const path = require('path');

const PUBLIC = 'public';
const marker = 'data-yulee-community-research="2026-09-07"';

const sections = {
  'yulee-driveway-paver-sealing.html': {
    anchor: '<section class="article-block"><p class="eyebrow">Process</p><h2>Paver Sanding and Sealing Yulee</h2>',
    html: `<section class="article-block" ${marker}><p class="eyebrow">Verified newer-community paver patterns</p><h2>Yulee neighborhoods where paver driveways are part of the actual housing stock</h2><p class="lead">Newer Yulee construction is not uniformly concrete. Builder and current-property information confirms several communities where paver driveways, walks, porches or related outdoor hardscape are part of the neighborhood product. That matters when planning cleaning, first sealing and future maintenance resealing.</p><div class="content-grid three"><div class="content-card"><h3>Lakeview at Tributary</h3><p>Lakeview is one of the clearest local targets. Developer information identifies paver driveways and patios, and current homes also show extended rear paver patios, screened paver lanais and additional paver outdoor areas.</p></div><div class="content-card"><h3>Del Webb Wildlight</h3><p>Current Del Webb information specifically advertises paver driveways and covered lanais on available homes, while resale examples show extended paver patios. This makes driveway, entry and rear-paver maintenance a natural fit for the community.</p></div><div class="content-card"><h3>Headwaters at Lofton Creek</h3><p>Taylor Morrison community specifications identify brick-paver drives, entry walks, porches and lanais depending on the plan. Many of these homes are extremely new, so some will be first-seal prospects before they become routine reseal customers.</p></div><div class="content-card"><h3>Sandy Ridge</h3><p>SEDA identifies paver driveways, walkways and front porches as community features. The rear covered-lanai material has not been verified as a standard paver surface, so we do not assume that it is.</p></div><div class="content-card"><h3>McGirt's Creek</h3><p>Paver driveways are confirmed on individual newer homes, and Drees shows paver-patio outdoor-living examples. We treat McGirt's Creek as a real paver opportunity without claiming that every home receives the same paver package.</p></div><div class="content-card"><h3>Why this matters for maintenance</h3><p>Homes built in the 2021–2024 range are moving into the period when owners may begin noticing fading, joint-sand loss, staining or wear in an earlier sealer. Newer 2025–2026 homes may instead be candidates for evaluation of their first meaningful sealing cycle.</p></div></div></section>`
  },
  'yulee-pool-deck-paver-sealing.html': {
    anchor: '<section class="article-block"><p class="eyebrow">Process</p><h2>Pool Deck Paver Sanding and Sealing Yulee</h2>',
    html: `<section class="article-block" ${marker}><p class="eyebrow">Verified patios and lanais</p><h2>Yulee communities with documented rear paver outdoor-living areas</h2><p class="lead">Rear paver hardscape is not universal across every new Yulee neighborhood, so we only make community-specific claims where the paver surface is actually documented.</p><div class="content-grid three"><div class="content-card"><h3>Lakeview at Tributary</h3><p>Developer information identifies paver patios and screened-in patios, and current homes show screened paver lanais, extended rear paver patios and paver fire-pit areas. This is one of Yulee's strongest patio and lanai paver markets.</p></div><div class="content-card"><h3>Del Webb Wildlight</h3><p>Current Del Webb homes advertise covered lanais with pavers, and resale examples document extended paver patios. These shaded and screened areas often need a different dry-down and cleaning plan than an open driveway.</p></div><div class="content-card"><h3>Headwaters at Lofton Creek</h3><p>Taylor Morrison specifications identify brick-paver lanais on applicable plans, along with other brick-paver exterior areas. Because the neighborhood is very new, many surfaces are still early in their maintenance life.</p></div><div class="content-card"><h3>Hawthorne Park at Wildlight</h3><p>A documented 2024-built Hawthorne Park home includes a private paver patio with a covered porch, confirming that paver outdoor-living areas extend beyond Del Webb within Wildlight.</p></div><div class="content-card"><h3>Tributary outside Lakeview</h3><p>Paver use is mixed rather than universal. Individual Tributary homes are documented with paver patios, and some include brick-paver driveways with screened paver lanais.</p></div><div class="content-card"><h3>Where we do not overclaim</h3><p>Sandy Ridge has substantial covered rear lanais, but the rear surface has not been verified as a standard paver installation. We therefore limit Sandy Ridge paver claims to the verified driveway, walkway and front-porch areas.</p></div></div></section>`
  },
  'wildlight-paver-sealing.html': {
    anchor: '<section><p class="eyebrow">Process</p><h2>How Wildlight paver sealing is completed</h2>',
    html: `<section ${marker}><p class="eyebrow">What is actually verified in Wildlight</p><h2>Wildlight includes both confirmed paver-heavy sections and newer areas we are still watching</h2><p class="lead">Wildlight is not one uniform housing product. The strongest verified paver evidence is in Del Webb Wildlight, while other neighborhoods show documented paver outdoor areas without enough evidence to call every home paver-standard.</p><div class="article-grid"><div class="article-card"><h3>Del Webb Wildlight: strongest confirmed paver concentration</h3><p>Current builder information advertises paver driveways and covered lanais, while resale homes show extended paver patios. That creates a real installed base across the front and rear of the property rather than a small decorative accent.</p></div><div class="article-card"><h3>Hawthorne Park: documented paver patios</h3><p>A 2024-built Hawthorne Park home is documented with a private paver patio and covered porch. That confirms paver outdoor-living use in conventional Wildlight housing beyond Del Webb.</p></div><div class="article-card"><h3>Westerly Park: do not assume pavers yet</h3><p>Current homes clearly include covered rear porches, but published information does not establish a paver specification. HydroSeal serves the area, but we do not describe Westerly Park as a paver-standard neighborhood without property-specific confirmation.</p></div><div class="article-card"><h3>Garden District growth</h3><p>Bellflower, Woodlyn and Mayfield are bringing another wave of Wildlight housing, with Bellflower beginning in late 2026. Published specifications do not yet establish a paver package, so these remain future neighborhoods to evaluate rather than current paver claims.</p></div></div></section>`
  },
  'del-webb-wildlight-paver-sealing.html': {
    anchor: '<section><p class="eyebrow">Process</p><h2>How a Del Webb paver project is completed</h2>',
    html: `<section ${marker}><p class="eyebrow">Builder-installed paver surfaces</p><h2>Why Del Webb Wildlight is a particularly strong paver-maintenance neighborhood</h2><p class="lead">Del Webb Wildlight is not being targeted simply because it is newer or higher value. Current builder material explicitly advertises paver driveways and covered lanais, and resale homes show owners extending those paver areas after construction.</p><div class="content-grid three"><div class="content-card"><h3>Paver driveways</h3><p>Current quick-move-in information includes paver driveways as part of the home package, creating a meaningful driveway sealing market as the community ages into routine maintenance cycles.</p></div><div class="content-card"><h3>Covered paver lanais</h3><p>Current villa information advertises covered lanais with pavers. Shaded rear pavers can hold moisture longer than open driveways, so drying conditions are evaluated before sealing.</p></div><div class="content-card"><h3>Expanded paver patios</h3><p>Resale examples document extended paver patios and covered paver patio areas, showing that homeowners are adding to the builder-installed hardscape rather than leaving it at the original footprint.</p></div></div><p>This combination of driveway plus rear-living pavers is why Del Webb Wildlight is one of the strongest existing Yulee-area neighborhoods for cleaning, joint-sand maintenance, first sealing and future resealing.</p></section>`
  },
  'service-areas.html': {
    anchor: '<section><p class="eyebrow">Paver services</p><h2>Services available across the area</h2>',
    html: `<section class="feature-band" ${marker}><p class="eyebrow">Verified paver-heavy communities</p><h2>Where newer Yulee construction is actually using pavers</h2><p>Builder, developer and current-property information shows a meaningful installed base of paver driveways, entries, patios and lanais in several newer Yulee communities. We separate confirmed paver-heavy neighborhoods from communities where pavers are present but not proven as a universal standard.</p><div class="content-grid three"><div class="content-card"><h3>Lakeview at Tributary</h3><p><strong>Strongest fit:</strong> paver driveways and patios are identified in the neighborhood product, with current homes also showing screened paver lanais and expanded rear paver areas.</p></div><div class="content-card"><h3>Del Webb Wildlight</h3><p><strong>Strongest fit:</strong> current builder information advertises paver driveways and covered paver lanais, with resale homes showing extended patio areas.</p></div><div class="content-card"><h3>Headwaters at Lofton Creek</h3><p><strong>Strongest future fit:</strong> Taylor Morrison specifications identify brick-paver drives, entry walks, porches and lanais depending on plan. Many homes are still extremely new.</p></div><div class="content-card"><h3>Sandy Ridge</h3><p><strong>Strong driveway fit:</strong> SEDA identifies paver driveways, walkways and front porches. Covered rear lanais are present, but a standard rear paver surface has not been verified.</p></div><div class="content-card"><h3>McGirt's Creek</h3><p><strong>Confirmed but mixed:</strong> paver driveways are documented on homes and Drees shows paver-patio examples, but a community-wide paver standard has not been established.</p></div><div class="content-card"><h3>Regular Tributary</h3><p><strong>Confirmed but mixed:</strong> individual homes show paver patios and, in some cases, brick-paver driveways with screened paver lanais. Lakeview remains the clearest paver-heavy Tributary section.</p></div></div><p><strong>Not labeled paver-standard without more evidence:</strong> Sandy Bluff, Westerly Park, Pirates Bluff and Liberty Cove. Bellflower, Garden District and Maris Cove remain future communities to watch as specifications become available.</p></section>`
  }
};

function protect(html) {
  const one = (re, label) => {
    const m = html.match(re);
    if (!m) throw new Error(`Missing protected ${label}`);
    return m[0];
  };
  return {
    title: one(/<title>[\s\S]*?<\/title>/i, 'title'),
    canonical: one(/<link\s+rel="canonical"[^>]*>/i, 'canonical'),
    h1: one(/<h1>[\s\S]*?<\/h1>/i, 'h1'),
    jsonld: (html.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || []).join('\n')
  };
}

for (const [file, spec] of Object.entries(sections)) {
  const full = path.join(PUBLIC, file);
  if (!fs.existsSync(full)) throw new Error(`Missing ${full}`);
  let html = fs.readFileSync(full, 'utf8');
  if (html.includes(marker)) {
    console.log(`${file}: community research already present`);
    continue;
  }
  const before = protect(html);
  const idx = html.indexOf(spec.anchor);
  if (idx === -1) throw new Error(`${file}: insertion anchor not found`);
  html = html.slice(0, idx) + spec.html + '\n' + html.slice(idx);
  const after = protect(html);
  for (const key of ['title','canonical','h1','jsonld']) {
    if (before[key] !== after[key]) throw new Error(`${file}: protected ${key} changed`);
  }
  fs.writeFileSync(full, html);
  console.log(`${file}: added verified community research with SEO-sensitive fields preserved`);
}
