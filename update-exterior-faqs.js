const fs = require('fs');

const configs = {
  'public/pressure-washing.html': {
    heading: 'Yulee pressure washing & power washing FAQs',
    faqs: [
      {
        q: 'What is the difference between pressure washing and power washing in Yulee, FL?',
        a: 'Homeowners often use pressure washing and power washing as interchangeable terms, but there can be a technical difference. Power washing may refer to cleaning with heated water, while pressure washing typically relies on unheated water pressure. For most residential exterior cleaning in Yulee and Wildlight, the more important question is which method fits the surface. HydroSeal uses controlled pressure on durable hard surfaces and lower-pressure soft washing on houses, roofs and other materials that should not be blasted.'
      },
      {
        q: 'What surfaces should be pressure washed instead of soft washed?',
        a: 'Concrete driveways, sidewalks, curbs and other durable hard surfaces can often be cleaned effectively with controlled pressure. Pavers, coated surfaces and pool areas should be evaluated first because joint condition, existing sealer and surface texture matter. Stucco, siding, painted finishes, soffits and roofing generally call for a lower-pressure cleaning method. The goal is not to use the highest pressure possible; it is to use enough cleaning action to remove buildup without damaging the material underneath.'
      },
      {
        q: 'What affects pressure washing or power washing cost in Yulee and Wildlight?',
        a: 'Pressure washing cost depends on the size of the area, surface material, amount of organic buildup, staining, access and whether specialty treatment is needed. A straightforward concrete driveway is different from a property that also includes patios, walkways, screen-enclosure areas, irrigation rust or oil staining. Photos are usually the fastest way to understand the scope. Send wide shots of the surfaces plus close-ups of the worst areas so the correct cleaning method and any extra treatment can be identified before scheduling.'
      },
      {
        q: 'Can pressure washing remove algae, mildew, rust and oil stains from concrete?',
        a: 'Pressure washing is effective for common dirt and organic buildup on suitable concrete, including many algae and mildew stains. Rust, irrigation staining, oil and grease are different because pressure alone may not remove material that has chemically bonded with or penetrated the surface. Those areas may need a targeted stain treatment before or after surface cleaning. Results depend on the stain type, age and depth, so HydroSeal identifies specialty stains before promising what the finished concrete will look like.'
      },
      {
        q: 'How often should driveways and exterior hard surfaces be pressure washed in Yulee?',
        a: 'There is no fixed schedule for every property. Yulee and Wildlight surfaces that stay shaded, receive frequent irrigation or collect runoff can develop dark organic film faster than open, sunny concrete. Many homeowners have driveways and walkways checked or cleaned about once a year, while other properties can go longer. A practical time to schedule service is when concrete looks noticeably darker, algae begins forming along edges or shaded walkways become slick when wet.'
      },
      {
        q: 'Do you pressure wash pavers, pool decks and patios?',
        a: 'Yes, when pressure cleaning is appropriate for the material and condition. Pavers are not treated exactly like plain concrete because loose joint sand, older sealer, repairs and drainage can change the cleaning plan. Pool decks and patios also require attention to surface texture, nearby screens, coping and wet-area use. If pavers are being prepared for resealing, the cleaning process should be coordinated with joint-sand replacement, drying and the sealer system rather than handled as an unrelated high-pressure wash.'
      },
      {
        q: 'Do you pressure wash houses and roofs in Yulee?',
        a: 'HydroSeal does not treat houses and roofs like concrete driveways. Exterior walls, stucco, siding, soffits, painted finishes and suitable roofing materials are generally cleaned with a lower-pressure soft-wash approach that relies more on the cleaning solution, dwell time and controlled rinsing. That reduces unnecessary pressure on delicate surfaces. For those services, see the dedicated Yulee house washing and Yulee roof washing pages rather than assuming every exterior surface should be pressure washed.'
      }
    ]
  },

  'public/yulee-house-washing.html': {
    heading: 'Yulee & Wildlight house washing FAQs',
    faqs: [
      {
        q: 'Is house washing the same as pressure washing?',
        a: 'House washing describes the service; soft washing describes the lower-pressure method typically used on residential exterior walls. In Yulee and Wildlight, stucco, siding, soffits, fascia and painted finishes usually should not be cleaned with the same pressure used on a concrete driveway. A house wash relies on a surface-appropriate cleaning solution, dwell time and a controlled rinse to loosen organic buildup while reducing the risk of forcing water behind siding, damaging paint or etching softer exterior materials.'
      },
      {
        q: 'What exterior surfaces can be soft washed on a Yulee or Wildlight home?',
        a: 'Soft washing can be appropriate for many common residential exteriors, including stucco, vinyl siding, fiber-cement or Hardie-style siding, soffits, fascia, trim and many sound painted surfaces. The condition matters as much as the material. Chalking paint, loose coatings, cracked stucco, damaged siding and failing caulk should be identified before cleaning. HydroSeal reviews the exterior first so the cleaning method can be adjusted instead of assuming every wall can receive the same solution and rinse pressure.'
      },
      {
        q: 'What does professional house washing remove?',
        a: 'A professional house wash is designed to remove common exterior dirt and organic buildup such as green algae, mildew, pollen film, spider webs and dark staining around shaded walls, soffits and entry areas. North-facing walls and areas beneath trees or deep eaves often show growth first because they stay damp longer. House washing improves the surface appearance, but it does not repair faded paint, damaged siding, failing caulk or permanent discoloration that is part of the material itself.'
      },
      {
        q: 'How often should I have my house washed in Wildlight or Yulee?',
        a: 'Most homes should be washed based on visible condition rather than an exact calendar. Florida humidity, shade, tree cover, irrigation and the direction each wall faces can make one side of a home develop algae much sooner than another. An annual exterior check is reasonable, and many Yulee homeowners choose house washing when green growth, dark soffits, pollen film or spider webs become noticeable. Open homes with good sun exposure may stay clean longer than heavily shaded properties.'
      },
      {
        q: 'Will house washing remove oxidation, chalky paint or irrigation rust stains?',
        a: 'Not always. Oxidation and chalking are changes in the paint or siding surface itself, so ordinary house washing may reveal them rather than remove them. Orange irrigation or rust stains can also require a separate specialty treatment from the solution used for algae and mildew. HydroSeal identifies chalky finishes, oxidation and mineral staining before cleaning so the homeowner understands which marks are normal organic buildup and which may need a different restoration process.'
      },
      {
        q: 'What should I do before a house washing appointment?',
        a: 'Close windows and doors, move fragile decorations and lightweight furniture away from exterior walls, and make sure pets are inside or secured. If possible, provide access to gates and outdoor water. Let us know about loose outlets, cameras, sensitive plants, damaged screens, open windows or areas where water intrusion has been a problem. These small preparation steps help the crew protect the property and spend more time cleaning instead of moving items around the home.'
      },
      {
        q: 'Can I combine house washing with driveway cleaning or roof washing?',
        a: 'Yes. Many Yulee and Wildlight homeowners combine exterior services so the house, driveway, walkways or roof are cleaned during the same visit. The important point is that the methods stay separate: durable concrete can use controlled pressure, the house is generally soft washed, and the roof receives a roof-specific low-pressure approach. Combining services can simplify scheduling without treating every surface with one pressure setting or one cleaning process.'
      }
    ]
  },

  'public/yulee-roof-washing.html': {
    heading: 'Yulee & Wildlight roof washing FAQs',
    faqs: [
      {
        q: 'Should a roof be pressure washed or soft washed in Yulee?',
        a: 'A roof should not be cleaned like a concrete driveway. For suitable roofing materials, HydroSeal uses a low-pressure soft-wash approach that relies on a roof-appropriate cleaning solution and controlled application rather than aggressive pressure. High pressure can be especially risky around shingles, flashing, seals and older roofing. Before cleaning, the roof material, age, visible damage, pitch and access are reviewed so the service is based on the actual roof instead of using a one-method-fits-all pressure setting.'
      },
      {
        q: 'What causes the black streaks on roofs in Wildlight and Yulee?',
        a: 'Black roof streaks in humid Florida are commonly associated with Gloeocapsa magma, a blue-green algae that can spread across shaded or moisture-prone roof slopes. Other organic growth, dirt and debris can create different discoloration, so the roof should still be inspected before treatment. Wildlight and Yulee conditions such as humidity, shade, nearby trees and slower drying on north-facing slopes can make streaking more noticeable over time. Roof washing targets the organic buildup rather than trying to blast the dark color away with pressure.'
      },
      {
        q: 'Can asphalt shingle, tile and metal roofs all be soft washed?',
        a: 'Many asphalt shingle, tile and metal roofs can be cleaned with a controlled low-pressure process, but they should not all be treated identically. Roofing material, coating, age, pitch, fasteners, loose tiles or shingles, oxidation and existing damage can change the correct chemistry and rinse approach. HydroSeal inspects the roof first and does not assume that a method suitable for one roof is automatically appropriate for another. A damaged or failing roof may need repair before cleaning is considered.'
      },
      {
        q: 'How often should a roof be cleaned in Yulee or Wildlight?',
        a: 'Roof cleaning should be based on condition rather than a rigid annual schedule. A roof with heavy shade, tree cover or a north-facing slope may show algae streaks sooner than a roof that receives more direct sun and dries quickly. A practical time to request an evaluation is when dark streaks, green growth or obvious organic discoloration become visible from the ground. Cleaning too frequently is unnecessary, while allowing heavy buildup to remain for years can make the eventual cleaning more involved.'
      },
      {
        q: 'How long does roof washing take and when will the roof look cleaner?',
        a: 'Timing depends on roof size, pitch, access, material, amount of buildup and the landscaping or runoff protection needed around the home. Many roofs show a noticeable improvement during the service, but the exact appearance and timing can vary with the type and severity of organic growth. HydroSeal does not use cleaning speed as a reason to increase pressure. Setup, controlled application, property protection and a final inspection are part of the job.'
      },
      {
        q: 'How do you protect plants, gutters and surrounding areas during roof cleaning?',
        a: 'Roof washing is planned around the entire property, not only the shingles or tile. Landscaping, gutters, downspout discharge, painted surfaces and runoff areas are identified before application begins. Plants and sensitive areas can be pre-wet and rinsed as appropriate, and runoff is monitored during the service. The exact protection plan depends on the roof layout and where water drains, which is why access and landscaping are reviewed before roof cleaning starts.'
      },
      {
        q: 'Can roof washing fix leaks, loose shingles or roof damage?',
        a: 'No. Roof washing is an exterior cleaning service, not a roofing repair. Cleaning can improve the appearance of a suitable roof by addressing organic staining, but it cannot repair leaks, loose shingles, cracked tiles, failed flashing or structural problems. Visible damage should be identified before cleaning, and a roof that is too fragile or compromised may need a roofing contractor first. HydroSeal would rather postpone cleaning than use the service to hide a condition that needs repair.'
      }
    ]
  }
};

function entities(faqs) {
  return faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a }
  }));
}

function visibleFaqSection(heading, faqs) {
  return `<section class="section faq-section"><div class="section-heading"><p class="eyebrow">Questions</p><h2>${heading}</h2></div>${faqs.map(({ q, a }) => `<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>`;
}

function updateVisible(html, heading, faqs) {
  const marker = '<section class="section faq-section">';
  const start = html.indexOf(marker);
  if (start < 0) throw new Error('Visible FAQ section not found');
  const endTag = '</section>';
  const end = html.indexOf(endTag, start);
  if (end < 0) throw new Error('Visible FAQ section end not found');
  return html.slice(0, start) + visibleFaqSection(heading, faqs) + html.slice(end + endTag.length);
}

function updateSchema(html, faqs) {
  const mainEntity = entities(faqs);
  let found = false;
  const scriptRe = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  html = html.replace(scriptRe, (full, raw) => {
    let data;
    try { data = JSON.parse(raw); } catch (_) { return full; }

    if (data && data['@type'] === 'FAQPage') {
      data.mainEntity = mainEntity;
      found = true;
    }
    if (data && Array.isArray(data['@graph'])) {
      const faqNode = data['@graph'].find(node => node && node['@type'] === 'FAQPage');
      if (faqNode) {
        faqNode.mainEntity = mainEntity;
        found = true;
      }
    }
    return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
  });

  if (!found) {
    const faqSchema = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity })}</script>`;
    html = html.replace('</head>', `${faqSchema}\n</head>`);
  }
  return html;
}

function decodeEntities(str) {
  return str.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function stripTags(str) {
  return decodeEntities(str.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
}

function getSchemaFaqs(html) {
  const found = [];
  const scriptRe = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRe.exec(html))) {
    let data;
    try { data = JSON.parse(match[1]); } catch (_) { continue; }
    if (data && data['@type'] === 'FAQPage') found.push(data);
    if (data && Array.isArray(data['@graph'])) {
      data['@graph'].forEach(node => { if (node && node['@type'] === 'FAQPage') found.push(node); });
    }
  }
  return found;
}

for (const [file, cfg] of Object.entries(configs)) {
  let html = fs.readFileSync(file, 'utf8');
  html = updateVisible(html, cfg.heading, cfg.faqs);
  html = updateSchema(html, cfg.faqs);

  const sectionStart = html.indexOf('<section class="section faq-section">');
  const sectionEnd = html.indexOf('</section>', sectionStart);
  const section = html.slice(sectionStart, sectionEnd + 10);
  const visible = [...section.matchAll(/<details class="faq-item"><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)]
    .map(m => ({ q: stripTags(m[1]), a: stripTags(m[2]) }));
  if (visible.length !== 7) throw new Error(`${file}: expected 7 visible FAQs, found ${visible.length}`);

  const schemaPages = getSchemaFaqs(html);
  if (schemaPages.length !== 1) throw new Error(`${file}: expected exactly 1 FAQPage schema, found ${schemaPages.length}`);
  const schema = schemaPages[0].mainEntity || [];
  if (schema.length !== 7) throw new Error(`${file}: expected 7 schema FAQs, found ${schema.length}`);

  visible.forEach((item, i) => {
    const sq = stripTags(schema[i].name || '');
    const sa = stripTags((schema[i].acceptedAnswer && schema[i].acceptedAnswer.text) || '');
    if (item.q !== sq || item.a !== sa) throw new Error(`${file}: visible/schema mismatch at FAQ ${i + 1}`);
  });

  fs.writeFileSync(file, html);
  console.log(`Updated ${file} with 7 homeowner FAQs and matching FAQPage schema`);
}
