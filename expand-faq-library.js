const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, 'public');
if (!fs.existsSync(PUBLIC)) throw new Error('public directory missing');

const FAQ = {
  worth: { q: `Is paver sealing worth it in Yulee, Florida?`, a: `For most concrete-paver driveways, patios and pool decks, yes. Northeast Florida exposes pavers to strong UV, heavy rain, humidity, irrigation, organic growth and repeated wet/dry cycles. Proper sealing can enhance color, make staining easier to manage and, when paired with correctly installed joint sand, help stabilize the joints. The important qualifier is proper preparation: incompatible products, trapped moisture or sealing over an existing failure can create more problems than leaving the pavers alone.` },
  lasts: { q: `How long does paver sealing last in Florida?`, a: `There is no honest expiration date that applies to every property. A professionally prepared and sealed Florida surface commonly enters a maintenance or resealing window around two to three years, but full-sun driveways can wear sooner than protected patios. Traffic, irrigation, UV exposure, surface condition and the sealer system all matter.` },
  resealOften: { q: `How often should Yulee pavers be resealed?`, a: `Do not reseal simply because a calendar says two years have passed. Fading, loss of protection, worn traffic lanes, low joint sand or deterioration of the existing coating are better indicators. A two-to-three-year inspection cycle is a useful planning point in Florida, but the actual surface condition should control the decision.` },
  cost: { q: `How much does paver sealing cost in Yulee?`, a: `HydroSeal's published starting price for standard concrete and brick paver cleaning, re-sanding and sealing is $1.50 per square foot, with travertine and natural stone starting at $1.60 per square foot. The final price depends on square footage, staining, existing sealer, joint condition, repairs, access and whether stripping is required. A straightforward first-time seal is very different from correcting a failed coating.` },
  priceFactors: { q: `What changes the price of a paver sealing project?`, a: `The biggest variables are square footage, the condition of the existing coating, staining, joint-sand loss, drainage, access, repairs and whether failed sealer must be stripped. Extra restoration and specialty stain treatment add labor compared with a straightforward clean, re-sand and seal project.` },
  strippingExtra: { q: `Is stripping old paver sealer extra?`, a: `Yes, when stripping is actually required it is a separate restoration step because removing a failed or incompatible coating is substantially more labor intensive than normal maintenance cleaning and resealing. The existing coating should be evaluated before deciding whether stripping is necessary.` },
  included: { q: `What is included in professional paver sealing?`, a: `A complete restoration-style service involves more than spraying sealer over the surface. The pavers should be inspected, thoroughly cleaned, problem areas treated, joints prepared and re-sanded where required, followed by the appropriate sealer application and cure period. HydroSeal's concrete-paver system uses Trident CAT 5 with two controlled coats when the surface and project conditions are suitable.` },
  sealerType: { q: `What type of paver sealer do you use?`, a: `For concrete pavers, HydroSeal uses Trident CAT 5, a two-component water-reducible urethane designed for color enhancement and joint stabilization while remaining breathable. Trident describes CAT 5 as non-yellowing under sunlight exposure. Product selection still depends on the surface and existing coating condition.` },
  breathable: { q: `What does a breathable paver sealer mean?`, a: `Moisture naturally moves through concrete pavers. A breathable sealer is designed to allow moisture vapor movement rather than simply locking moisture beneath an impermeable coating. That is particularly important in Florida, where trapped moisture can contribute to cloudy or white coating failure.` },
  whiteCloudy: { q: `Why did my old paver sealer turn white or cloudy?`, a: `White or milky pavers can have several causes, including trapped moisture, incompatible coatings, over-application, sealer failure or efflorescence beneath the coating. The cause should be diagnosed before applying anything else because covering failed sealer with another coat can make restoration more difficult.` },
  hazeEfflorescence: { q: `Is white paver haze always failed sealer?`, a: `No. White discoloration can also be efflorescence, which is mineral material migrating to the paver surface. Powdery deposits sitting on top of the paver are different from a cloudy appearance trapped beneath a coating, so the treatment is different.` },
  sealOverOld: { q: `Can you seal over old paver sealer?`, a: `Sometimes a sound, compatible existing sealer can remain, but failed, peeling, cloudy or incompatible sealer should not simply be buried under another coating. The old system needs to be evaluated first, and restoration cases may require chemical stripping before re-sanding and resealing.` },
  failedRemove: { q: `Can failed paver sealer be removed?`, a: `Yes. Many failed coatings can be chemically stripped and the surface restored. The amount of work depends on what product was originally applied, how many coats are present and how badly the coating has failed. Stripping is significantly more labor intensive than routine resealing.` },
  timeToReseal: { q: `How do I know it is time to reseal my pavers?`, a: `Look for fading, worn traffic lanes, increased water absorption, low joint sand or an older coating that has lost its uniform appearance. White, cloudy, peeling or tacky coating is a different situation and should be diagnosed before another coat is applied.` },
  oldMustRemove: { q: `Must old paver sealer always be removed before resealing?`, a: `No. A sound and compatible coating may not require complete removal. Failed, peeling, cloudy or incompatible coatings should not simply be covered, so the existing system has to be evaluated before the resealing plan is chosen.` },
  cleanBeforeSeal: { q: `Must pavers be cleaned before sealing?`, a: `Yes. Proper cleaning and surface preparation are fundamental to a sealing project. Dirt, organic growth, staining, loose joint material and residue need to be addressed before new joint sand and sealer are installed. Sealer should not be used to hide contamination that still needs treatment.` },
  washingSand: { q: `Does pressure washing remove joint sand from pavers?`, a: `It can. Cleaning pavers often removes loose, deteriorated or already-low joint material, and aggressive pressure can accelerate joint loss. That is why a sealing project should evaluate the joints after cleaning and restore depleted sand where needed rather than treating washing and re-sanding as unrelated steps.` },
  stainsBeforeSeal: { q: `Can stains be removed before paver sealing?`, a: `Many organic, irrigation, rust and vehicle-related stains can be treated before sealing, although results depend on the stain type, age, depth and whether an old coating has trapped it. Problem areas should be treated and expectations set before sealer is applied.` },
  hazeFixed: { q: `Can white or hazy paver sealer be fixed?`, a: `Often, but the cause has to be identified first. Trapped moisture, efflorescence and coating failure are not the same problem. Failed coatings may require stripping and additional preparation before the pavers can be re-sanded and resealed.` },
  peelingFixed: { q: `Can peeling paver sealer be repaired?`, a: `Peeling usually indicates a coating or adhesion problem, so simply spraying more product over it is not a reliable repair. The failed areas and existing coating need to be evaluated, and some projects require stripping before a new compatible system can be installed.` },
  relevel: { q: `Can sunken or uneven pavers be re-leveled before sealing?`, a: `HydroSeal can handle agreed small paver re-leveling and repair work on many sealing projects. Loose, rocking or sunken pavers should be addressed before sealing when practical. Larger settlement, drainage problems or base failure may require a separate repair scope because sealer cannot correct an underlying structural problem.` },
  darken: { q: `Does sealing darken concrete pavers?`, a: `A color-enhancing paver sealer can deepen or enrich the appearance of concrete pavers, but the final look depends on the paver, existing coating and product system. The goal is a controlled, uniform finish rather than simply applying more material to chase shine.` },
  wetVsNatural: { q: `What is the difference between a wet-look and natural-look sealer?`, a: `Wet-look systems emphasize color enhancement and a richer finished appearance, while natural-look protection aims to change the appearance less. More gloss is not automatically better, especially around pools or on natural stone. The surface type, traction needs and existing coating should drive product selection.` },
  yellow: { q: `Will a wet-look paver sealer turn yellow?`, a: `Product chemistry matters. HydroSeal's concrete-paver system uses Trident CAT 5, which Trident describes as non-yellowing under sunlight exposure. That does not eliminate the need for correct preparation, compatible existing coatings and controlled application.` },

  sandWhy: { q: `Why do you put sand between pavers?`, a: `Joint sand is part of the interlocking pavement system. Properly graded sand fills the joints, helps the pavers transfer load and supports stability. Empty or badly depleted joints are not just a cosmetic issue.` },
  sandType: { q: `What type of sand should be used between pavers?`, a: `For standard interlocking concrete-paver joints, HydroSeal uses properly graded ASTM C144 kiln-dried joint sand rather than random play sand. Particle size matters because the material needs to enter and fill the joint correctly.` },
  sandLock: { q: `Does sealing lock the joint sand in place?`, a: `CAT 5 is designed to provide joint stabilization when used as part of the appropriate system on a dry, properly prepared surface. Stabilization does not make the joints indestructible; drainage problems, aggressive pressure washing and pavement movement can still create future maintenance needs.` },
  weeds: { q: `Does paver sealing permanently stop weeds?`, a: `No contractor should promise permanent weed elimination. Proper cleaning, full joints and stabilization can substantially reduce weed growth and make maintenance easier, but airborne seeds can eventually grow in dirt and organic material that collects on top of the joints.` },
  ants: { q: `Will paver sealing stop ants?`, a: `Joint stabilization makes the joints less inviting and harder to excavate, but it is not a lifetime pest-control treatment. Existing colonies and surrounding soil conditions still matter.` },
  sandWashout: { q: `Why does joint sand wash out?`, a: `Heavy runoff, drainage paths, downspouts, aggressive cleaning, low joints and pavement movement can all contribute to sand loss. Re-sanding helps restore the joints, but a drainage or base problem should not be hidden with more sand.` },
  replaceAllSand: { q: `Do you replace all of the joint sand before sealing?`, a: `Not automatically. Cleaning removes loose and deteriorated material, then the remaining joint depth and condition are evaluated. Depleted joints are restored to the appropriate working level rather than removing sound material solely for the sake of replacing it.` },

  newTiming: { q: `How soon can brand-new pavers be sealed?`, a: `There is not one universal 30-, 60- or 90-day rule. Timing depends on the paver, moisture, efflorescence, joint system and sealer specifications. Trident's CAT 5 guidance allows application to most new, clean surfaces without a mandatory waiting period when application conditions are appropriate. The actual surface still needs to be inspected first.` },
  newWildlight: { q: `Do new Wildlight or Tributary homes need paver sealing?`, a: `They can. New construction does not automatically mean the pavers already have the protection or joint stabilization you want. Builder-installed pavers should be inspected for previous sealer, efflorescence, moisture and joint condition before treatment.` },
  builder: { q: `Should I seal builder-installed pavers before they fade?`, a: `Potentially, yes, but first-time sealing should be based on actual paver condition and the sealer requirements rather than fear-based timing. New pavers are often straightforward surfaces to work with when they are clean, compatible and free of unresolved efflorescence.` },
  whitePowder: { q: `What is the white powder on my new pavers?`, a: `It may be efflorescence: soluble mineral salts transported to the surface by moisture. It is not the same thing as dirt or cloudy coating failure, and it should be evaluated before a film-forming sealer is applied so visible deposits are not trapped underneath the finished coating.` },
  combineNew: { q: `Can a new paver driveway and patio be sealed during the same project?`, a: `Yes. When both surfaces are ready, combining them can be efficient because cleaning, drying, joint preparation and sealing can be coordinated at the property together. Each area still has to meet the same moisture and preparation requirements before sealer is applied.` },
  irrigationEffect: { q: `How do irrigation stains affect paver sealing?`, a: `Irrigation staining should be evaluated and treated before sealing when practical. Mineral or rust staining can remain visible beneath a new finish, and active overspray can continue creating stains after the project. The source and surface condition should be addressed rather than relying on sealer to hide the problem.` },

  drivewaySeal: { q: `Should driveway pavers be sealed?`, a: `Driveways are one of the strongest cases for sealing because they receive direct sunlight, vehicle traffic, tire friction, rainfall and vehicle-related staining. Proper sealing can improve stain resistance, make future cleaning easier and restore considerable color to faded concrete pavers.` },
  oil: { q: `Does paver sealer protect against oil stains?`, a: `It improves stain resistance and gives you more opportunity to clean spills before they penetrate deeply, but sealer does not make a driveway stain-proof. CAT 5 is designed to provide stain and chemical resistance, and vehicle fluids should still be cleaned promptly.` },
  driveCure: { q: `How soon can I drive on my driveway after sealing?`, a: `For HydroSeal's process, plan on keeping vehicles off for approximately 48–72 hours. Foot traffic is generally held for about 24 hours, and furniture should remain off during the initial cure. Weather and site conditions can change those instructions, so the final on-site guidance controls.` },
  sprinklers: { q: `Can sprinklers run after paver sealing?`, a: `They should remain off during the initial cure period. Irrigation hitting freshly sealed pavers is an unnecessary risk and can also leave mineral staining. HydroSeal generally wants sprinklers kept off for approximately 48 hours after sealing unless project-specific guidance says otherwise.` },
  drivewayCleanOften: { q: `How often should a Florida driveway be cleaned?`, a: `Many Florida driveways fall somewhere around a 12–18 month cleaning cycle, with shaded surfaces or areas exposed to irrigation sometimes needing attention sooner. Visible algae, darkening, slick shaded areas and staining are better triggers than cleaning a surface that is still clean.` },
  rustOil: { q: `Can rust and oil stains be removed from a driveway?`, a: `Many rust, irrigation, oil and grease stains can be improved with targeted treatment, but pressure alone may not remove material that has chemically bonded with or penetrated the surface. Results depend on the stain type, age and depth, so expectations should be set before cleaning or sealing.` },
  surfaceCleaner: { q: `What is the difference between pressure washing and surface cleaning a driveway?`, a: `Surface cleaning is a controlled way to clean broad, flat hard surfaces as part of a pressure-washing service, while detail work is still needed around edges and stubborn stains. The important point is using pressure and technique appropriate to the concrete rather than simply using maximum PSI everywhere.` },

  poolSeal: { q: `Should pool deck pavers be sealed?`, a: `Often, yes. Pool decks deal with UV, water, organic material, sunscreen and repeated wet/dry cycles. Proper sealing can improve appearance, protect the surface and stabilize joints when the deck is prepared and dry enough for the selected system.` },
  poolSlip: { q: `Does paver sealer make a pool deck slippery?`, a: `Any coating that changes the surface can change traction, particularly when wet. The correct product, application rate and finish matter. More gloss is not automatically better around a swimming pool, and wet-area traction should be considered when selecting and applying sealer.` },
  poolReseal: { q: `How often should pool deck pavers be resealed?`, a: `There is no universal schedule. Pool chemistry, sun exposure, traffic, screen enclosure and previous sealer all affect wear. A two-to-three-year inspection cycle is sensible in Florida, but the condition of the deck should determine whether another coating is actually needed.` },
  chlorine: { q: `Does pool chlorine damage sealed pavers?`, a: `Repeated chemical exposure is one reason pool decks need a coating system suited to the environment. A quality sealer improves resistance, but no sealer should be treated as chemically indestructible. Concentrated chemical spills should be rinsed rather than allowed to sit.` },
  coveredPatio: { q: `Does a covered or screened paver patio still need sealing?`, a: `It can. Covered patios and screened lanais may receive less direct UV than open driveways, but they still experience humidity, moisture, organic buildup and joint-sand loss. Protected areas can also dry more slowly, so actual moisture and condition matter when deciding when to seal or reseal.` },
  furniture: { q: `Can patio or pool furniture go back immediately after sealing?`, a: `No. Furniture should generally stay off newly sealed pavers for approximately 24–48 hours so the coating can cure without marks or pressure points. Shade, humidity and weather can extend that window, so project-specific cure instructions control.` },

  travSeal: { q: `Should outdoor travertine be sealed?`, a: `Outdoor travertine often benefits from a penetrating sealer because the stone is porous and exposed to water, staining and pool-area conditions. The critical point is that travertine should not automatically receive the same film-forming coating used on concrete pavers.` },
  travProduct: { q: `What sealer do you use on travertine?`, a: `For suitable outdoor travertine and natural stone, HydroSeal uses Trident Breakwall, an invisible water-based penetrating silane/siloxane treatment. It penetrates rather than creating the same type of surface film used on concrete pavers and is intended to resist water and salt penetration while maintaining a natural appearance.` },
  travGloss: { q: `Should travertine have a glossy wet-look sealer?`, a: `Usually, a penetrating treatment is the safer direction for an outdoor travertine pool deck when the goal is protection without creating a glossy surface film. Natural stone and concrete pavers are different materials and should not automatically receive the same sealing system.` },
  travPressure: { q: `Can travertine be pressure washed?`, a: `It can be cleaned, but natural stone requires much more care than ordinary concrete. Aggressive high pressure can damage or erode the stone surface and joints. The cleaning method should be selected for the condition of the travertine rather than simply turning up the pressure.` },

  roofStreaks: { q: `What are the black streaks on my roof?`, a: `On asphalt shingles, dark streaks are commonly associated with Gloeocapsa magma, a blue-green algae that is common in warm, humid regions. The Asphalt Roofing Manufacturers Association says there is no scientific evidence that algae discoloration itself damages asphalt shingles, although it clearly affects appearance. Moss is a different condition and can affect roof performance.` },
  roofPressure: { q: `Should an asphalt roof be pressure washed?`, a: `No. Asphalt-roof guidance warns against using power washers to remove algae because high-pressure washing can damage the roofing surface. Roof cleaning should use a roof-appropriate low-pressure process rather than the pressure used on concrete.` },
  roofSoftwash: { q: `What is soft-wash roof cleaning?`, a: `Soft washing relies on an appropriate cleaning solution applied and rinsed with very low pressure rather than using water pressure to blast contamination from the roof. The roof material, age, condition and surrounding property protection still need to be evaluated before service.` },
  roofSafe: { q: `Is soft washing safe for asphalt shingles?`, a: `When performed according to the roof manufacturer's cleaning recommendations, low-pressure chemical cleaning is the appropriate direction for algae discoloration. The contractor should also protect vegetation and surrounding surfaces because roof-cleaning chemistry requires careful handling.` },
  roofOften: { q: `How often should a roof be washed in Yulee?`, a: `There is no universal annual schedule. Shade, surrounding trees, roof orientation, material and moisture exposure determine how rapidly organic growth returns. Florida cleaning cycles can fall around one to three years, but the roof's visible condition should drive the decision.` },
  roofCleaningVsWashing: { q: `What is the difference between roof washing and roof cleaning?`, a: `Homeowners often use the terms interchangeably. For HydroSeal, the important distinction is the method: a roof is cleaned with a roof-specific low-pressure process rather than treated like a concrete pressure-washing job. The goal is to address organic discoloration without damaging the roofing surface.` },

  houseMethod: { q: `Is soft washing or pressure washing better for a house?`, a: `For painted siding, stucco, Hardie-type siding and other finished exterior surfaces, soft washing is usually the appropriate method. High pressure is better reserved for sufficiently durable hard surfaces such as concrete.` },
  stuccoSafe: { q: `Is soft washing safe for stucco and paint?`, a: `Proper soft washing uses low pressure and lets the cleaning chemistry break down algae and organic buildup rather than trying to blast the finish clean. That reduces the risk of etching stucco, damaging sound paint or forcing water into places it does not belong. Existing loose or failing coatings still need to be identified before cleaning.` },
  houseOften: { q: `How often should a Yulee house be washed?`, a: `For many Florida homes, an annual inspection or wash is a reasonable starting point, but there is no reason to clean a perfectly clean house simply because twelve months passed. Shade, irrigation overspray, trees and moisture exposure can make one side of a home develop algae much faster than another.` },
  plants: { q: `Will house washing hurt my plants?`, a: `A professional process should include landscape protection, pre-wetting where appropriate and controlled application and rinsing. Cleaning chemistry is not magically harmless to every plant, so proper dilution, runoff awareness and property protection are part of doing the job correctly.` },
  softSurfaces: { q: `What surfaces are normally soft washed?`, a: `Roofs, stucco, siding, soffits, fascia, painted exterior finishes and other materials that should not be blasted with high pressure are typical soft-wash candidates. The condition of the material still matters, so loose paint, damaged siding or fragile roofing should be identified before cleaning.` },
  softPlants: { q: `Will soft washing hurt landscaping?`, a: `It should be planned around landscaping, not performed as if plants are irrelevant. Pre-wetting, controlled application, rinsing and runoff management are used as appropriate to the property. Sensitive or damaged vegetation should be identified before service.` },
  softLast: { q: `How long do soft-washing results last?`, a: `There is no fixed lifespan. Shade, tree cover, roof or wall orientation, irrigation and humidity determine how quickly organic growth returns. Many Florida properties are evaluated roughly annually for house washing and less frequently for roofs, but visible condition should drive the next cleaning.` },

  pressureVsSoft: { q: `What is the difference between pressure washing and soft washing?`, a: `Pressure washing uses mechanical force. Soft washing relies primarily on cleaning chemistry and low-pressure application. Concrete, some masonry and certain hardscape surfaces can tolerate controlled pressure, while roofs, stucco, painted siding and other delicate surfaces generally require a softer approach.` },
  pressureSurfaces: { q: `What surfaces can be pressure washed safely?`, a: `Typical candidates include concrete driveways, sidewalks, some pavers and other durable hardscape surfaces. The correct pressure still depends on the material, coating and condition. Being concrete does not mean maximum PSI is appropriate.` },
  pressureOften: { q: `How often should a Florida driveway be pressure washed?`, a: `Many Florida driveways fall around a 12–18 month cleaning cycle, with shaded surfaces or areas exposed to irrigation sometimes needing attention sooner. Visible organic buildup and slick shaded areas are better indicators than a rigid calendar.` },
  pressureCost: { q: `How much does pressure washing cost in Florida?`, a: `Pricing depends heavily on the service, property size, height, material, contamination, access and specialty stain treatment. Normal residential cleaning is often a few-hundred-dollar service, but HydroSeal does not use one generic price table for every surface because a driveway, full house wash and roof wash are different scopes.` },

  localWildlight: { q: `Do you provide paver sealing in Wildlight?`, a: `Yes. Wildlight, including newer areas with builder-installed paver driveways, patios and lanais, is part of HydroSeal's Yulee service focus.` },
  localDelWebb: { q: `Do you seal pavers in Del Webb Wildlight?`, a: `Yes. Driveways, patios, lanais and other concrete-paver areas in Del Webb Wildlight can be evaluated for cleaning, re-sanding and sealing.` },
  localTributary: { q: `Do you provide paver sealing in Tributary?`, a: `Yes, including newer paver driveways and outdoor living areas in Tributary and Lakeview at Tributary.` },
  localHeadwaters: { q: `Do you service Headwaters at Lofton Creek and Sandy Ridge?`, a: `Yes. These Yulee communities are relevant to the paver-sealing service area, including homes with builder-installed paver driveways, entrances, walks, porches and lanais.` },
  combineAreas: { q: `Can you seal a driveway and pool deck during the same project?`, a: `Yes. Combining paver areas during one project is often more efficient because cleaning, drying, sanding and sealing can be coordinated at the property together. Each surface still has to meet its own preparation and moisture requirements.` },
  warranty: { q: `Do you offer a warranty on paver sealing?`, a: `Yes. HydroSeal provides a two-year workmanship and coating-adhesion warranty on qualifying paver-sealing work, with the specific terms provided with the project and published on the Yulee warranty page.` },
};

const categories = [
  ['General Paver Sealing', ['worth','lasts','resealOften','cost','priceFactors','strippingExtra','included','sealerType','breathable','whiteCloudy','hazeEfflorescence','sealOverOld','failedRemove','timeToReseal','oldMustRemove','cleanBeforeSeal','washingSand','stainsBeforeSeal','hazeFixed','peelingFixed','relevel','darken','wetVsNatural','yellow']],
  ['Paver Joint Sand', ['sandWhy','sandType','sandLock','weeds','ants','sandWashout','replaceAllSand']],
  ['New Pavers, Wildlight & Tributary', ['newTiming','newWildlight','builder','whitePowder','combineNew','irrigationEffect']],
  ['Driveway Paver Sealing', ['drivewaySeal','oil','driveCure','sprinklers','drivewayCleanOften','rustOil','surfaceCleaner']],
  ['Pool Deck & Patio Paver Sealing', ['poolSeal','poolSlip','poolReseal','chlorine','coveredPatio','furniture']],
  ['Travertine Sealing', ['travSeal','travProduct','travGloss','travPressure']],
  ['Roof Washing', ['roofStreaks','roofPressure','roofSoftwash','roofSafe','roofOften','roofCleaningVsWashing']],
  ['House & Soft Washing', ['houseMethod','stuccoSafe','houseOften','plants','softSurfaces','softPlants','softLast']],
  ['Pressure Washing', ['pressureVsSoft','pressureSurfaces','pressureOften','pressureCost']],
  ['Local Yulee Service', ['localWildlight','localDelWebb','localTributary','localHeadwaters','combineAreas','warranty']],
];

const targetAdds = {
  'index.html': ['worth','sealerType','breathable','newTiming'],
  'yulee-driveway-paver-sealing.html': ['drivewaySeal','oil','sprinklers','drivewayCleanOften'],
  'yulee-pool-deck-paver-sealing.html': ['poolSeal','poolReseal','coveredPatio','furniture'],
  'yulee-travertine-sealing.html': ['travSeal','travGloss'],
  'yulee-roof-washing.html': ['roofPressure','roofSafe','roofCleaningVsWashing'],
  'yulee-house-washing.html': ['stuccoSafe','plants','softLast'],
  'pressure-washing.html': ['pressureVsSoft','pressureOften'],
  'wildlight-paver-sealing.html': ['newTiming','newWildlight','builder','whitePowder','localWildlight','irrigationEffect'],
  'del-webb-wildlight-paver-sealing.html': ['newTiming','builder','localDelWebb','combineNew'],
  'service-areas.html': ['localWildlight','localDelWebb','localTributary','localHeadwaters','combineAreas','warranty'],
};

const answerEnhancements = {
  'index.html': {
    'What if my existing paver sealer is white, cloudy or peeling?': `White or chalky material can also be efflorescence rather than coating failure. Powdery mineral deposits on the surface and cloudy whitening trapped beneath a coating are different problems, so HydroSeal distinguishes the cause before recommending another sealer application.`
  },
  'yulee-pool-deck-paver-sealing.html': {
    'Is paver sealing suitable around saltwater and chlorine pools?': `A quality sealer improves resistance to pool-area exposure, but no coating should be treated as chemically indestructible. Concentrated chlorine or other pool chemicals should be rinsed rather than allowed to sit on the sealed surface.`
  },
  'yulee-travertine-sealing.html': {
    'What type of sealer is best for an outdoor travertine pool deck in Wildlight?': `For suitable outdoor travertine, HydroSeal uses Trident Breakwall, an invisible water-based penetrating silane/siloxane treatment designed to resist water and salt penetration while maintaining a natural appearance.`
  },
  'yulee-roof-washing.html': {
    'What causes the black streaks on roofs in Wildlight and Yulee?': `An important accuracy point: the Asphalt Roofing Manufacturers Association says there is no scientific evidence that algae discoloration itself damages asphalt shingles. Moss is a different issue. High-pressure cleaning, however, can damage asphalt roofing surfaces.`
  },
  'pressure-washing.html': {
    'How often should driveways and exterior hard surfaces be pressure washed in Yulee?': `As a broad planning range, many Florida driveways fall around a 12–18 month cleaning cycle, although shade, irrigation and organic growth can move that timing earlier or later.`
  },
};

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function decode(s) {
  return String(s).replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
}
function strip(s) { return decode(String(s).replace(/<[^>]*>/g,'')).replace(/\s+/g,' ').trim(); }
function norm(s) { return strip(s).toLowerCase().replace(/[’']/g,"'").replace(/[^a-z0-9]+/g,' ').trim(); }

function faqSchemas(html) {
  const out = [];
  const re = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    let data; try { data = JSON.parse(m[1]); } catch (_) { continue; }
    if (data && data['@type'] === 'FAQPage') out.push({data, node:data, full:m[0], index:m.index});
    if (data && Array.isArray(data['@graph'])) {
      const node = data['@graph'].find(x => x && x['@type'] === 'FAQPage');
      if (node) out.push({data, node, full:m[0], index:m.index});
    }
  }
  return out;
}

function getVisibleFaqs(html) {
  const marker = '<section class="section faq-section">';
  const start = html.indexOf(marker);
  if (start < 0) return {start:-1,end:-1,items:[]};
  const endTag = html.indexOf('</section>', start);
  if (endTag < 0) throw new Error('FAQ section has no closing section tag');
  const end = endTag + '</section>'.length;
  const section = html.slice(start,end);
  const items = [];
  const re = /<details\b[^>]*class=["'][^"']*faq-item[^"']*["'][^>]*>\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/gi;
  let m;
  while ((m = re.exec(section))) items.push({q:strip(m[1]),a:strip(m[2])});
  return {start,end,items};
}

function schemaItems(html) {
  const schemas = faqSchemas(html);
  if (!schemas.length) return [];
  if (schemas.length > 1) throw new Error('Multiple FAQPage schemas found');
  return (schemas[0].node.mainEntity || []).map(x => ({q:String(x.name||'').trim(), a:String(x.acceptedAnswer?.text||'').trim()})).filter(x => x.q);
}

function renderSection(items, heading='Frequently asked questions') {
  return `<section class="section faq-section"><div class="section-heading"><p class="eyebrow">Questions</p><h2>${esc(heading)}</h2></div>${items.map(x => `<details class="faq-item"><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`).join('')}</section>`;
}

function updateSchema(html, items) {
  const mainEntity = items.map(x => ({'@type':'Question',name:x.q,acceptedAnswer:{'@type':'Answer',text:x.a}}));
  let updated = false;
  const re = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  html = html.replace(re, (full, raw) => {
    let data; try { data = JSON.parse(raw); } catch (_) { return full; }
    let node = null;
    if (data && data['@type'] === 'FAQPage') node = data;
    if (data && Array.isArray(data['@graph'])) node = data['@graph'].find(x => x && x['@type'] === 'FAQPage') || null;
    if (!node || updated) return full;
    node.mainEntity = mainEntity;
    updated = true;
    return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
  });
  if (!updated) {
    const script = `<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity})}</script>`;
    if (!html.includes('</head>')) throw new Error('Missing </head> while adding FAQ schema');
    html = html.replace('</head>', `${script}\n</head>`);
  }
  return html;
}

function processTarget(filename, addIds) {
  const file = path.join(PUBLIC, filename);
  if (!fs.existsSync(file)) throw new Error(`${filename}: target page missing`);
  let html = fs.readFileSync(file,'utf8');
  const beforeVisible = getVisibleFaqs(html);
  const beforeSchema = schemaItems(html);
  if (beforeVisible.items.length && beforeSchema.length) {
    const s = new Set(beforeSchema.map(x => norm(x.q)));
    for (const x of beforeVisible.items) if (!s.has(norm(x.q))) throw new Error(`${filename}: pre-existing visible/schema FAQ mismatch for ${x.q}`);
  }

  let items = beforeVisible.items.length ? beforeVisible.items.map(x => ({...x})) : beforeSchema.map(x => ({...x}));
  const seen = new Set(items.map(x => norm(x.q)));

  const enhancements = answerEnhancements[filename] || {};
  for (const item of items) {
    const extra = enhancements[item.q];
    if (extra && !item.a.includes(extra)) item.a = `${item.a} ${extra}`;
  }

  for (const id of addIds) {
    const item = FAQ[id];
    if (!item) throw new Error(`${filename}: unknown FAQ id ${id}`);
    if (!seen.has(norm(item.q))) {
      items.push({...item});
      seen.add(norm(item.q));
    }
  }

  const oldHeadingMatch = beforeVisible.start >= 0 ? html.slice(beforeVisible.start,beforeVisible.end).match(/<h2>([\s\S]*?)<\/h2>/i) : null;
  const heading = oldHeadingMatch ? strip(oldHeadingMatch[1]) : 'Frequently asked questions';
  const section = renderSection(items, heading);
  if (beforeVisible.start >= 0) html = html.slice(0,beforeVisible.start) + section + html.slice(beforeVisible.end);
  else {
    const insertAt = html.lastIndexOf('</main>');
    if (insertAt < 0) throw new Error(`${filename}: no </main> for FAQ insertion`);
    html = html.slice(0,insertAt) + section + '\n' + html.slice(insertAt);
  }
  html = updateSchema(html, items);

  const afterVisible = getVisibleFaqs(html).items;
  const afterSchema = schemaItems(html);
  const afterV = new Set(afterVisible.map(x => norm(x.q)));
  const afterS = new Set(afterSchema.map(x => norm(x.q)));
  for (const x of beforeVisible.items) if (!afterV.has(norm(x.q)) || !afterS.has(norm(x.q))) throw new Error(`${filename}: existing visible FAQ removed: ${x.q}`);
  for (const x of beforeSchema) if (!afterS.has(norm(x.q)) || !afterV.has(norm(x.q))) throw new Error(`${filename}: existing schema FAQ removed: ${x.q}`);
  if (afterVisible.length !== afterSchema.length) throw new Error(`${filename}: visible/schema FAQ count mismatch after additive expansion`);
  for (const x of afterVisible) if (!afterS.has(norm(x.q))) throw new Error(`${filename}: missing schema for ${x.q}`);

  fs.writeFileSync(file,html);
  console.log(`${filename}: preserved ${beforeVisible.items.length} existing visible FAQs; now ${items.length} visible/schema-matched FAQs`);
}

function navMarkup() {
return `<header class="ys-header"><nav class="ys-nav ys-shell" aria-label="Primary navigation">
<a class="ys-logo" href="/" aria-label="Yulee Paver Sealing home"><img src="/images/yulee-hydroseal-logo.webp" alt="Yulee Paver Sealing by HydroSeal" width="400" height="145" /></a>
<button class="ys-toggle" type="button" aria-expanded="false" aria-controls="ysMenu" aria-label="Open menu">☰</button>
<div class="ys-menu" id="ysMenu">
<div class="ys-group ys-group--paver"><button class="ys-parent" type="button" aria-expanded="false">Paver Sealing</button><div class="ys-mega"><a href="/yulee-driveway-paver-sealing.html">Driveway Paver Sealing<small>Clean, resand, and protect</small></a><a href="/yulee-pool-deck-paver-sealing.html">Pool Deck Sealing<small>Moisture-aware preparation</small></a><a href="/yulee-travertine-sealing.html">Travertine Sealing<small>Natural-stone specific care</small></a></div></div>
<div class="ys-group"><button class="ys-parent" type="button" aria-expanded="false">Service Areas</button><div class="ys-mega"><a href="/service-areas.html">Yulee &amp; Nassau County</a><a href="/wildlight-paver-sealing.html">Wildlight</a><a href="/del-webb-wildlight-paver-sealing.html">Del Webb Wildlight</a><a href="/fernandina-beach-paver-sealing.html">Fernandina Beach</a><a href="/amelia-island-paver-sealing.html">Amelia Island</a></div></div>
<div class="ys-group"><button class="ys-parent" type="button" aria-expanded="false">Pressure Washing</button><div class="ys-mega"><a href="/pressure-washing.html">Pressure Washing</a><a href="/yulee-house-washing.html">House Washing</a><a href="/yulee-roof-washing.html">Roof Washing</a></div></div>
<div class="ys-group"><button class="ys-parent" type="button" aria-expanded="false">About</button><div class="ys-mega"><a href="/about.html">About HydroSeal</a><a href="/faq.html">FAQ</a><a href="/#calculator">Pricing Calculator</a><a href="/warranty.html">2-Year Warranty</a></div></div>
</div><a class="ys-call" href="tel:+19045375000">Call 904.537.5000</a><a class="ys-quote" href="/#calculator">Get a Quote</a></nav></header>
<script>(function(){var t=document.querySelector('.ys-toggle'),m=document.getElementById('ysMenu');if(!t||!m)return;t.addEventListener('click',function(){var o=m.classList.toggle('is-open');t.setAttribute('aria-expanded',String(o));});document.querySelectorAll('.ys-group').forEach(function(g){var b=g.querySelector('.ys-parent');if(!b)return;b.addEventListener('click',function(e){if(window.innerWidth>900)return;e.preventDefault();var w=!g.classList.contains('is-open');document.querySelectorAll('.ys-group').forEach(function(x){x.classList.remove('is-open');var q=x.querySelector('.ys-parent');if(q)q.setAttribute('aria-expanded','false');});g.classList.toggle('is-open',w);b.setAttribute('aria-expanded',String(w));});});}());</script>`;
}

function renderMasterPage() {
  const all = [];
  for (const [,ids] of categories) for (const id of ids) all.push(FAQ[id]);
  const schema = {'@context':'https://schema.org','@type':'FAQPage','@id':'https://www.yuleepaversealing.com/faq.html#faq','url':'https://www.yuleepaversealing.com/faq.html','name':'Yulee Paver Sealing FAQ','mainEntity':all.map(x => ({'@type':'Question',name:x.q,acceptedAnswer:{'@type':'Answer',text:x.a}}))};
  const pageGraph = {'@context':'https://schema.org','@graph':[{'@type':'WebPage','@id':'https://www.yuleepaversealing.com/faq.html#webpage','url':'https://www.yuleepaversealing.com/faq.html','name':'Yulee Paver Sealing FAQ | Driveways, Pool Decks, Travertine & Washing','description':'Answers to common Yulee paver sealing, driveway, pool deck, travertine, roof washing, house washing and pressure washing questions.','about':{'@id':'https://hydrosealpavers.com/#business'}},{'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Home','item':'https://www.yuleepaversealing.com/'},{'@type':'ListItem','position':2,'name':'FAQ','item':'https://www.yuleepaversealing.com/faq.html'}]}]};
  const groups = categories.map(([title,ids]) => `<section class="yf-group"><h2>${esc(title)}</h2>${ids.map(id => {const x=FAQ[id];return `<details class="yf-item"><summary>${esc(x.q)}</summary><div class="yf-answer"><p>${esc(x.a)}</p></div></details>`;}).join('')}</section>`).join('');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Yulee Paver Sealing FAQ | Driveways, Pool Decks, Travertine &amp; Washing</title>
<meta name="description" content="Yulee paver sealing FAQ covering driveways, pool decks, travertine, joint sand, new pavers, roof washing, house washing and pressure washing." />
<meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="https://www.yuleepaversealing.com/faq.html" /><link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="stylesheet" href="/styles.css?v=7" /><link rel="stylesheet" href="/shared-top-layout.css?v=2" />
<script type="application/ld+json">${JSON.stringify(pageGraph)}</script><script type="application/ld+json">${JSON.stringify(schema)}</script>
<style id="yulee-faq-page-style">body.y-shared-top.yf-page{background:#f7fafc;color:#0b1220}body.yf-page .ys-header{position:relative;top:auto;left:auto;right:auto;padding-top:18px}body.yf-page .yf-wrap{width:min(920px,calc(100% - 40px));margin:34px auto 84px}body.yf-page .yf-crumb{margin:0 0 24px;color:#6a7785;font-size:14px}body.yf-page .yf-crumb a{color:#0f6ea8;text-decoration:none;font-weight:750}body.yf-page .yf-article{background:#fff;border:1px solid #e1e8ed;border-radius:24px;padding:42px 46px;box-shadow:0 14px 38px rgba(11,45,74,.06)}body.yf-page .yf-kicker{margin:0 0 9px;color:#0f6ea8;font-size:12px;font-weight:900;letter-spacing:1.4px;text-transform:uppercase}body.yf-page h1{margin:0 0 14px;color:#0b2d4a;font-family:"Arial Black",Arial,sans-serif;font-size:clamp(34px,4.2vw,48px);line-height:1.04;letter-spacing:-1px}body.yf-page .yf-lead{margin:0 0 32px;color:#526273;font-size:17px;line-height:1.72}body.yf-page .yf-group{margin-top:34px}body.yf-page .yf-group:first-of-type{margin-top:0}body.yf-page .yf-group h2{margin:0 0 12px;padding-bottom:10px;border-bottom:1px solid #e4eaee;color:#0b2d4a;font-family:"Arial Black",Arial,sans-serif;font-size:25px;line-height:1.15}body.yf-page .yf-item{border-bottom:1px solid #e6ecef}body.yf-page .yf-item summary{position:relative;cursor:pointer;list-style:none;padding:17px 38px 17px 0;color:#20384d;font-size:16px;font-weight:850;line-height:1.4}body.yf-page .yf-item summary::-webkit-details-marker{display:none}body.yf-page .yf-item summary:after{content:"+";position:absolute;right:4px;top:15px;color:#0f6ea8;font-size:22px;font-weight:900}body.yf-page .yf-item[open] summary:after{content:"–"}body.yf-page .yf-answer{padding:0 34px 18px 0}body.yf-page .yf-answer p{margin:0;color:#526273;font-size:15.5px;line-height:1.72}@media(max-width:700px){body.yf-page .ys-header{padding-top:10px}body.yf-page .yf-wrap{width:calc(100% - 24px);margin-top:24px}body.yf-page .yf-article{padding:28px 22px;border-radius:20px}body.yf-page .yf-group h2{font-size:22px}}</style></head><body class="y-shared-top yf-page">${navMarkup()}<main class="yf-wrap"><nav class="yf-crumb" aria-label="Breadcrumb"><a href="/">Home</a> / FAQ</nav><article class="yf-article"><p class="yf-kicker">HydroSeal · Yulee &amp; Nassau County</p><h1>Yulee Paver Sealing &amp; Exterior Cleaning FAQ</h1><p class="yf-lead">Straight answers to the questions Yulee, Wildlight and Nassau County homeowners ask about paver sealing, joint sand, driveways, pool decks, travertine and exterior cleaning. Click any question to expand the answer.</p>${groups}</article></main><footer class="site-footer"><nav><a href="/">Home</a></nav><p>© 2026 HydroSeal</p></footer></body></html>`;
  fs.writeFileSync(path.join(PUBLIC,'faq.html'),html);
  console.log(`faq.html: generated ${all.length} categorized click-to-expand FAQs with matching FAQPage schema`);
}

function addFaqNavLink() {
  const files = fs.readdirSync(PUBLIC).filter(x => x.endsWith('.html'));
  for (const name of files) {
    const file = path.join(PUBLIC,name);
    let html = fs.readFileSync(file,'utf8');
    if (html.includes('href="/faq.html"')) continue;
    const about = '<a href="/about.html">About HydroSeal</a>';
    if (html.includes(about)) {
      html = html.replace(about, `${about}<a href="/faq.html">FAQ</a>`);
      fs.writeFileSync(file,html);
      console.log(`${name}: added FAQ to About navigation`);
    }
  }
}

for (const [filename,ids] of Object.entries(targetAdds)) processTarget(filename,ids);
renderMasterPage();
addFaqNavLink();

// Final master-page visible/schema parity check.
const faqHtml = fs.readFileSync(path.join(PUBLIC,'faq.html'),'utf8');
const visibleCount = (faqHtml.match(/<details class="yf-item">/g) || []).length;
const masterSchema = faqSchemas(faqHtml).find(x => x.node['@type'] === 'FAQPage' || x.data['@type'] === 'FAQPage');
const schemaCount = masterSchema ? (masterSchema.node.mainEntity || []).length : 0;
if (visibleCount !== schemaCount) throw new Error(`faq.html visible/schema mismatch: ${visibleCount}/${schemaCount}`);
console.log(`FAQ expansion complete: master page ${visibleCount} FAQs; all target pages preserved existing questions and gained only additive/deeper FAQ coverage.`);
