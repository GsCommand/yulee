const fs = require('fs');

const configs = {
  'public/yulee-driveway-paver-sealing.html': {
    heading: 'Wildlight & Yulee driveway paver sealing FAQs',
    faqs: [
      {
        q: 'How much does driveway paver sealing cost in Wildlight and Yulee?',
        a: 'Concrete and brick driveway paver cleaning, re-sanding and sealing starts at $1.50 per square foot. A 750–1,000 sq. ft. driveway would therefore start around $1,125–$1,500 before any failed-sealer stripping, specialty stain treatment, repairs or other extra preparation. Final pricing depends on the actual square footage, joint-sand loss, previous coating, staining, drainage, access and paver condition. Photos and approximate measurements are usually enough for us to understand the likely scope before the final quote is confirmed.'
      },
      {
        q: 'When should a Wildlight driveway be resealed?',
        a: 'There is no single calendar date that works for every Wildlight driveway. Full sun, daily vehicle traffic, irrigation overspray, heavy rain, drainage and the previous sealer all affect wear. Good signs that it is time for an evaluation include faded or dry-looking pavers, uneven color, low or missing joint sand, faster water absorption or an older finish that has noticeably worn in tire lanes. If the existing sealer is white, cloudy or peeling, the coating should be evaluated before another coat is applied.'
      },
      {
        q: 'Do you replace washed-out joint sand on Wildlight driveways?',
        a: 'Yes. Joint loss is common near driveway edges, drainage paths, garage approaches and areas that receive heavy runoff. After cleaning, we evaluate joint depth and restore depleted joints where needed. HydroSeal generally uses ASTM C144 kiln-dried joint sand with a compatible joint-stabilizing sealer. Re-sanding improves the finished appearance and supports the paver system, but it should not be used to hide a failed base, severe settlement or a drainage problem that needs separate correction.'
      },
      {
        q: 'Can you reseal a driveway that has white, cloudy or peeling sealer?',
        a: 'Sometimes, but not by simply adding another coat. White haze, clouding, peeling or tacky areas can indicate trapped moisture, incompatible products or a failed previous coating. We evaluate the existing sealer first because coating over a failure can make the appearance and adhesion problem worse. Some driveways can be cleaned and resealed normally, while others may need stripping or additional preparation before a new breathable sealer system is appropriate.'
      },
      {
        q: 'Can you treat tire marks, rust and irrigation stains before driveway sealing?',
        a: 'Yes. We can use targeted treatment for many common driveway stains, including organic buildup, irrigation-related discoloration, rust and some vehicle or oil residue. Results depend on how long the stain has been present, how deeply it has penetrated and whether a previous sealer has trapped it below the surface. We identify the problem before sealing and set expectations first, because sealer should not be used to hide staining that still needs treatment.'
      },
      {
        q: 'Can you fix loose or sunken driveway pavers before sealing?',
        a: 'HydroSeal can handle agreed small paver repairs and re-leveling before sealing when the repair is appropriate for the project. Rocking, sunken or uneven pavers should be addressed before the final sealer is applied so the finished surface is more stable and uniform. Larger settlement, failed base material or drainage problems may require a separate repair scope because paver sealer and joint sand cannot correct an underlying structural problem by themselves.'
      },
      {
        q: 'How long before I can drive on a newly sealed Wildlight driveway?',
        a: 'Plan on keeping vehicles off the driveway for about 48–72 hours unless HydroSeal gives different project-specific guidance. Foot traffic is generally kept off for about 24 hours. Temperature, humidity, shade, rain risk, the sealer system and the condition of the surface can all affect cure time. We provide clear return-to-use instructions after the project so the new finish is not damaged before it has had enough time to cure.'
      }
    ]
  },

  'public/yulee-pool-deck-paver-sealing.html': {
    heading: 'Wildlight pool deck & patio paver sealing FAQs',
    faqs: [
      {
        q: 'How much does pool deck paver sealing cost in Wildlight and Yulee?',
        a: 'Concrete and brick pool deck paver cleaning, re-sanding and sealing starts at $1.50 per square foot, while travertine and natural stone start at $1.60 per square foot. Final pricing depends on the deck size, screen-enclosure access, coping detail, joint-sand loss, staining, previous coatings, repairs, shade and moisture conditions. Failed sealer, heavy efflorescence or extra restoration can add preparation. Send photos and approximate square footage and we can usually identify the likely scope before the final quote is confirmed.'
      },
      {
        q: 'Why do screened pool decks and lanais in Wildlight need extra drying time?',
        a: 'Screen enclosures can reduce direct sun and airflow, so pavers around a pool may stay damp longer than an open driveway. Shade, humidity, splash-out, nearby landscaping and low spots can all slow dry-down. Sealing before the surface and joints are ready can contribute to whitening, clouding or adhesion problems. We evaluate actual moisture and weather conditions instead of forcing every pool deck onto the same schedule.'
      },
      {
        q: 'Is paver sealing suitable around saltwater and chlorine pools?',
        a: 'Yes, when the surface, moisture conditions and sealer system are appropriate for a wet pool environment. Saltwater and chlorine splash-out, sunscreen oils and frequent rinsing can increase wear around coping and high-traffic areas. The goal is not to create a thick glossy film; it is to use controlled application and a compatible system that protects the pavers while keeping pool-deck use and maintenance in mind.'
      },
      {
        q: 'Will sealing make my Wildlight pool deck slippery?',
        a: 'Any wet paver surface can become slippery, so traction has to be considered around a pool. Slip risk depends on the paver texture, finish, application rate, contaminants and maintenance. Pool decks are treated differently from driveways, and we avoid excessive product buildup in walking areas. The selected finish should protect the surface without chasing a heavy wet-look coating that can reduce traction.'
      },
      {
        q: 'Do you replace joint sand around pool decks, drains and screen-cage edges?',
        a: 'Yes, where the joints are depleted and the drainage system is suitable. Pool decks often lose sand near drains, screen-cage edges, downspout paths and areas that are frequently rinsed. After cleaning, we restore low joints as needed using ASTM C144 kiln-dried joint sand with a compatible joint-stabilizing sealer. We do not pack sand into areas in a way that blocks drainage or hides a base problem.'
      },
      {
        q: 'What causes white haze or efflorescence on pool deck pavers?',
        a: 'White or chalky residue can come from mineral salts moving through the pavers as moisture evaporates, while a cloudy white film can also be related to an older sealer or trapped moisture. Those are different problems and should not automatically receive the same treatment. We inspect the condition first, use appropriate cleaning or treatment when practical and allow proper dry-down before deciding whether the deck is ready to seal.'
      },
      {
        q: 'How soon can we walk on the deck and use the pool after sealing?',
        a: 'Foot traffic is generally kept off the freshly sealed deck for about 24 hours. Normal pool use is commonly delayed about 24–48 hours, and shaded or screened areas may need longer depending on humidity, airflow, weather and the sealer system. Furniture should also stay off until the surface has had adequate cure time. HydroSeal provides site-specific return-to-use guidance after the project.'
      }
    ]
  },

  'public/yulee-travertine-sealing.html': {
    heading: 'Wildlight travertine & natural-stone sealing FAQs',
    faqs: [
      {
        q: 'How much does travertine sealing cost in Wildlight and Yulee?',
        a: 'Travertine and natural-stone cleaning and sealing starts at $1.60 per square foot. Final pricing depends on the stone condition, pool or patio layout, access, open fill, staining, moisture, previous products and whether separate restoration or coating removal is needed. Travertine should be evaluated as natural stone rather than priced as a generic concrete-paver project. Photos of the full area plus close-ups of stains, open holes and any shiny or dark patches help us understand the likely scope before the final quote is confirmed.'
      },
      {
        q: 'What type of sealer is best for an outdoor travertine pool deck in Wildlight?',
        a: 'Outdoor travertine generally benefits from a breathable penetrating sealer selected for natural stone and wet-area exposure. A penetrating system protects within the stone instead of relying on a heavy surface film. The correct choice still depends on porosity, previous treatments, moisture, the desired appearance and how the area is used. We inspect the stone first because a product that works on ordinary concrete pavers is not automatically appropriate for travertine.'
      },
      {
        q: 'Why should travertine not be pressure washed like concrete pavers?',
        a: 'Travertine is a calcium-based natural stone that can be etched by the wrong chemistry and damaged by overly aggressive pressure. Harsh acidic cleaners can dull or roughen the surface, and excessive pressure can enlarge weak areas or disturb existing fill. We use stone-appropriate chemistry, controlled cleaning and thorough rinsing so organic buildup and staining can be addressed without treating the travertine like a driveway.'
      },
      {
        q: 'What if my travertine has holes, missing fill or loose pieces?',
        a: 'Travertine naturally contains voids, and factory or field-applied fill can loosen with age, water exposure, traffic and previous cleaning. We inspect open pits, missing fill, loose pieces and damaged edges before sealing. Small repair needs can be discussed as part of the project, while larger movement, base problems or widespread deterioration may require a separate repair scope before the stone should be sealed.'
      },
      {
        q: 'Will sealing make a travertine pool deck slippery?',
        a: 'Any wet natural-stone surface can be slippery. Slip risk depends on the stone texture, existing finish, sealer type, application rate, contamination and maintenance. For outdoor pool areas, we generally favor breathable penetrating protection rather than building a thick film on top of the travertine. The goal is to protect the stone while preserving its natural feel and keeping wet-area traction in mind.'
      },
      {
        q: 'What do dark patches, white haze or uneven color on travertine mean?',
        a: 'Uneven color can come from moisture, organic buildup, mineral residue, previous sealers, repairs or differences in the natural stone itself. Dark areas that remain damp and white or shiny patches from older products should be evaluated before new sealer is applied. Sealing over unresolved moisture or an incompatible coating can lock in an uneven appearance, so cleaning, dry-down and inspection come before product selection.'
      },
      {
        q: 'How soon can we use a travertine pool deck after sealing?',
        a: 'Plan on about 24 hours before normal foot traffic and roughly 24–48 hours before normal pool use, unless project conditions require longer. Screened enclosures, high humidity, shade and limited airflow can slow curing. Furniture should remain off until the surface has had adequate time to cure as well. We provide site-specific guidance after sealing so the newly protected stone is not disturbed too early.'
      }
    ]
  }
};

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function updateJsonLd(html, faqs, file) {
  const scriptRe = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;
  let replacement = null;

  while ((match = scriptRe.exec(html))) {
    try {
      const data = JSON.parse(match[1]);
      const graph = Array.isArray(data['@graph']) ? data['@graph'] : [];
      const faqPage = graph.find((item) => item && item['@type'] === 'FAQPage');
      if (!faqPage) continue;
      faqPage.mainEntity = faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a }
      }));
      replacement = `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
      html = html.slice(0, match.index) + replacement + html.slice(match.index + match[0].length);
      break;
    } catch (_) {}
  }

  if (!replacement) throw new Error(`FAQPage schema not found in ${file}`);
  return html;
}

function updateVisibleFaq(html, heading, faqs, file) {
  const marker = '<section class="section faq-section">';
  const start = html.indexOf(marker);
  if (start < 0) throw new Error(`Visible FAQ section not found in ${file}`);
  const endTag = html.indexOf('</section>', start);
  if (endTag < 0) throw new Error(`FAQ section end not found in ${file}`);
  const end = endTag + '</section>'.length;

  const details = faqs.map(({ q, a }) =>
    `<details class="faq-item"><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`
  ).join('');

  const section = `<section class="section faq-section"><div class="section-heading"><p class="eyebrow">Questions</p><h2>${escapeHtml(heading)}</h2></div>${details}</section>`;
  return html.slice(0, start) + section + html.slice(end);
}

function verify(html, faqs, file) {
  const scriptMatch = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => { try { return JSON.parse(m[1]); } catch (_) { return null; } })
    .find((data) => data && Array.isArray(data['@graph']) && data['@graph'].some((x) => x && x['@type'] === 'FAQPage'));
  if (!scriptMatch) throw new Error(`Unable to verify FAQ schema in ${file}`);
  const faqPage = scriptMatch['@graph'].find((x) => x && x['@type'] === 'FAQPage');
  if (faqPage.mainEntity.length !== faqs.length) throw new Error(`FAQ schema count mismatch in ${file}`);

  faqs.forEach(({ q, a }, i) => {
    const schemaQ = faqPage.mainEntity[i]?.name;
    const schemaA = faqPage.mainEntity[i]?.acceptedAnswer?.text;
    if (schemaQ !== q || schemaA !== a) throw new Error(`FAQ schema text mismatch in ${file}: ${q}`);
    if (!html.includes(`<summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p>`)) {
      throw new Error(`Visible FAQ text mismatch in ${file}: ${q}`);
    }
  });
}

for (const [file, config] of Object.entries(configs)) {
  let html = fs.readFileSync(file, 'utf8');
  html = updateJsonLd(html, config.faqs, file);
  html = updateVisibleFaq(html, config.heading, config.faqs, file);
  verify(html, config.faqs, file);
  fs.writeFileSync(file, html);
  console.log(`Updated ${config.faqs.length} matched visible/schema FAQs in ${file}`);
}
