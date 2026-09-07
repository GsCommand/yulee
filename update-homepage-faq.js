const fs = require('fs');

const file = 'public/index.html';
let html = fs.readFileSync(file, 'utf8');

const faqs = [
  {
    q: 'How much does paver sealing cost in Yulee, FL?',
    a: 'Concrete and brick paver cleaning, re-sanding and sealing starts at $1.50 per square foot, while travertine and natural stone start at $1.60 per square foot. As a simple example, a 700 sq. ft. driveway would start around $1,050 before any stripping, specialty stain treatment, repairs or other additional work. The final price depends on the condition of the existing sealer, joint-sand loss, staining, drainage, access and any pavers that need repair or re-leveling. Failed-sealer stripping is significantly more labor-intensive than a normal maintenance reseal. If you send us photos and approximate square footage, we can usually get a good idea of the scope before the final quote is confirmed.'
  },
  {
    q: 'How often should pavers be sealed in Yulee and Northeast Florida?',
    a: 'Many Florida paver surfaces should be evaluated every 2–3 years, but the condition of the pavers matters more than following an exact calendar. Full Florida sun, vehicle traffic, reclaimed irrigation, heavy rain, pool water, shade and the type of previous sealer can all affect how quickly a finish wears. Signs that it may be time to reseal include faded or dry-looking pavers, uneven color, joint-sand loss, increased water absorption or an older coating that is beginning to wear. If the existing sealer is turning white, cloudy, peeling or failing, another coat should not simply be applied over it without evaluating the cause first.'
  },
  {
    q: 'Can you clean and seal pavers the same day?',
    a: 'For most HydroSeal projects, cleaning/preparation and sealing are not rushed into the same day. The pavers need to be properly cleaned, evaluated and dry enough before new joint sand and sealer are applied. A typical project is completed in stages so moisture is not trapped beneath the sealer. Failed coatings, heavy shade, repairs, larger driveways and pool decks can require additional drying or preparation time. We would rather allow the surface the time it needs than seal damp pavers simply to finish faster.'
  },
  {
    q: 'Do you remove weeds and replace the joint sand?',
    a: 'Yes. Cleaning and preparation remove loose weeds, organic growth, debris and deteriorated joint material. Low or open joints are then re-sanded where needed before sealing. HydroSeal generally uses ASTM C144 kiln-dried joint sand with a compatible joint-stabilizing sealer. Once sealed, the sand becomes more stable and is less likely to wash out during heavy Florida rain. Sealing can also make the joints less inviting for future growth, but no paver system can permanently guarantee that weeds will never return because seeds can enter from surrounding landscaping and airborne material.'
  },
  {
    q: 'What if my existing paver sealer is white, cloudy or peeling?',
    a: 'White, cloudy, milky or peeling pavers can be a sign of a failed or incompatible previous sealer, trapped moisture or excessive product buildup. Applying another coat over a failed coating can make the problem worse. HydroSeal evaluates the existing finish before recommending a reseal. Some surfaces may need professional stripping and additional preparation before new sealer can be applied. Failed-sealer stripping starts at an additional $1.50 per square foot because removing an old coating is considerably more labor-intensive than a normal cleaning and resealing project.'
  },
  {
    q: 'How long before I can walk or drive on newly sealed pavers?',
    a: 'As a general rule, keep foot traffic off freshly sealed pavers for about 24 hours. Furniture should normally stay off for approximately 24–48 hours, and vehicles should remain off a sealed driveway for roughly 48–72 hours. Sprinklers should also remain off for about 48 hours. Weather, humidity, shade, temperature and the specific surface can affect cure time, so HydroSeal will provide project-specific instructions when the job is completed.'
  },
  {
    q: 'Will sealing make my driveway or pool deck slippery?',
    a: 'Any outdoor paver or stone surface can become slippery when wet. Sealer can also change how the surface feels depending on the product, amount applied and existing paver texture. HydroSeal selects the sealer and application method based on the surface and intended use. Pool decks and other frequently wet areas require additional consideration because traction matters more there than on a typical driveway. Applying excessive sealer simply to create a heavier shine is not the goal.'
  },
  {
    q: 'Do you seal travertine and natural-stone pool decks?',
    a: 'Yes. Travertine and natural stone require a different approach than ordinary concrete or brick pavers. HydroSeal evaluates the stone, existing finish, open fill, staining, moisture exposure and pool environment before cleaning or sealing. For suitable outdoor travertine, we generally use a breathable penetrating protection system rather than treating the stone like a standard concrete driveway. Natural stone should not automatically receive the same pressure, chemistry or coating used on concrete pavers.'
  },
  {
    q: 'Can you repair sunken, loose or uneven pavers before sealing?',
    a: 'Yes, HydroSeal can handle small paver re-leveling and repair work as part of many sealing projects. Loose, rocking or sunken pavers should be addressed before sealing whenever possible so the finished surface is more stable and uniform. Minor paver repair and re-leveling starts around $8 per paver when appropriate. More significant base failure, drainage problems or large settlement areas may require a separate repair scope because sealer alone cannot correct an underlying structural problem.'
  },
  {
    q: 'What is included with a HydroSeal paver sealing project?',
    a: 'A typical paver sealing project can include deep cleaning, treatment of organic growth and visible staining, evaluation of the existing sealer, replacement of low or missing joint sand, agreed minor repairs and application of a compatible breathable sealer. HydroSeal is licensed and insured, Trident Master Certified, and qualifying sealing projects include a 2-year workmanship and adhesion warranty. We do not require a deposit for normal sealing projects; payment is due when the work is completed.'
  }
];

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const sectionStart = html.indexOf('<section class="section faq-section">');
if (sectionStart < 0) throw new Error('Homepage FAQ section not found');
const sectionEndTag = html.indexOf('</section>', sectionStart);
if (sectionEndTag < 0) throw new Error('Homepage FAQ section end not found');
const sectionEnd = sectionEndTag + '</section>'.length;

const visibleFaq = '<section class="section faq-section"><div class="section-heading"><p class="eyebrow">Questions</p><h2>Yulee paver sealing questions</h2><p>Clear answers to the questions homeowners ask most often before cleaning, re-sanding, repairing or sealing pavers.</p></div>' +
  faqs.map(item => `<details class="faq-item"><summary>${esc(item.q)}</summary><p>${esc(item.a)}</p></details>`).join('') +
  '</section>';

html = html.slice(0, sectionStart) + visibleFaq + html.slice(sectionEnd);

const schemaRe = /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g;
let schemaUpdated = false;
html = html.replace(schemaRe, (full, jsonText) => {
  if (schemaUpdated) return full;
  let data;
  try { data = JSON.parse(jsonText); } catch (_) { return full; }
  if (!data || !Array.isArray(data['@graph'])) return full;
  const faqNode = data['@graph'].find(node => node && node['@type'] === 'FAQPage');
  if (!faqNode) return full;
  faqNode.mainEntity = faqs.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a }
  }));
  schemaUpdated = true;
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
});

if (!schemaUpdated) throw new Error('Homepage FAQPage schema not found');
if (html.includes('What if I searched for a paver sealer near me or paver sealing near me?')) throw new Error('Old keyword-stuffed near-me FAQ still present');

for (const item of faqs) {
  const questionCount = (html.match(new RegExp(item.q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  const answerCount = (html.match(new RegExp(item.a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (questionCount < 2 || answerCount < 2) throw new Error(`Visible/schema mismatch for FAQ: ${item.q}`);
}

fs.writeFileSync(file, html);
console.log('Homepage FAQ rewritten with 10 homeowner-focused questions and matching FAQPage schema');
