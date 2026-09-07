const fs = require('fs');

const file = 'public/yulee-driveway-paver-sealing.html';
let html = fs.readFileSync(file, 'utf8');

const heading = '<h2>Get a driveway paver sealing quote in Yulee</h2>';
const headingPos = html.indexOf(heading);
if (headingPos < 0) throw new Error('Driveway bottom quote heading not found');

const sectionStart = html.lastIndexOf('<section', headingPos);
const sectionEndTag = html.indexOf('</section>', headingPos);
if (sectionStart < 0 || sectionEndTag < 0) throw new Error('Driveway quote section bounds not found');
const sectionEnd = sectionEndTag + '</section>'.length;

const section = `<section class="driveway-quote-experience" id="driveway-quote">
  <div class="driveway-quote-visual" role="img" aria-label="Before and after sealed paver driveway by HydroSeal in Yulee, Florida">
    <div class="driveway-quote-visual-copy">
      <p class="driveway-quote-kicker">HydroSeal driveway restoration</p>
      <h2>A cleaner, stronger, more beautiful driveway.</h2>
      <p>Cleaning, re-sanding, joint stabilization and breathable sealer for Yulee, Wildlight and Nassau County driveways.</p>
      <div class="driveway-quote-proof"><span>Licensed &amp; Insured</span><span>Trident Master Certified</span><span>2-Year Warranty</span></div>
    </div>
  </div>

  <div class="driveway-quote-card">
    <div class="driveway-quote-card-head">
      <p class="driveway-quote-kicker">Free driveway quote</p>
      <h2>Get a Driveway Paver Sealing Quote in Yulee</h2>
      <p>Send your contact details and project information. HydroSeal usually responds within a few hours during normal business hours.</p>
    </div>

    <div class="driveway-quote-includes" aria-label="Typical driveway sealing process">
      <span>✓ Driveway cleaning</span>
      <span>✓ Re-sanding where needed</span>
      <span>✓ Joint-sand stabilization</span>
      <span>✓ Breathable sealer application</span>
    </div>

    <form class="driveway-quote-form" data-driveway-quote-form>
      <div class="driveway-quote-grid">
        <label>First Name<input required autocomplete="given-name" placeholder="First name" data-dq-first></label>
        <label>Last Name<input required autocomplete="family-name" placeholder="Last name" data-dq-last></label>
        <label>Email<input type="email" required autocomplete="email" placeholder="you@example.com" data-dq-email></label>
        <label>Phone<input type="tel" required autocomplete="tel" placeholder="(904) 537-5000" data-dq-phone></label>
        <label class="driveway-quote-wide">Property Address<input required autocomplete="street-address" placeholder="Street address" data-dq-address></label>
        <label>Approx. Sq Ft<input type="number" min="1" inputmode="numeric" placeholder="e.g. 800" data-dq-sqft></label>
        <label>Surface Condition<select data-dq-condition><option value="Not specified">Select condition</option><option>Never sealed / bare</option><option>Due for a recoat</option><option>White or cloudy sealer</option><option>Failing sealer / stripping may be needed</option><option>Not sure</option></select></label>
        <label class="driveway-quote-wide">Notes<textarea placeholder="Neighborhood, staining, low joints, repairs, gate access, or anything else we should know." data-dq-notes></textarea></label>
      </div>
      <small class="driveway-quote-consent">By submitting, you agree to be contacted by HydroSeal Pavers about your quote.</small>
      <button class="driveway-quote-submit" type="submit">Request My Driveway Quote →</button>
      <div class="driveway-quote-confirm" data-dq-confirm hidden><strong>Request received.</strong><span>Thanks — HydroSeal has your driveway quote request and will follow up as soon as possible.</span></div>
    </form>

    <div class="driveway-quote-actions">
      <a href="tel:+19045375000">Call 904.537.5000</a>
      <a href="sms:+19045375000">Text Driveway Photos</a>
    </div>
  </div>
</section>`;

html = html.slice(0, sectionStart) + section + html.slice(sectionEnd);

const styles = `<style id="driveway-bottom-quote-styles">
.driveway-quote-experience{width:min(calc(100% - 36px),1180px);margin:clamp(46px,7vw,90px) auto;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(430px,.92fr);border-radius:32px;overflow:hidden;background:#062c50;box-shadow:0 28px 80px rgba(10,38,64,.22)}
.driveway-quote-visual{position:relative;min-height:720px;background-image:linear-gradient(180deg,rgba(5,29,52,.18),rgba(5,29,52,.82)),url('/images/yulee-driveway-paver-sealing.webp');background-size:cover;background-position:center;display:flex;align-items:flex-end;padding:clamp(28px,4vw,52px)}
.driveway-quote-visual::after{content:'Before / After';position:absolute;top:24px;left:24px;padding:8px 12px;border-radius:999px;background:rgba(5,29,52,.82);color:#fff;font-size:.76rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.driveway-quote-visual-copy{position:relative;z-index:1;max-width:610px;color:#fff}.driveway-quote-visual-copy h2{margin:0 0 16px;color:#fff;font-size:clamp(2.35rem,4vw,4.55rem);line-height:.98;letter-spacing:-.055em}.driveway-quote-visual-copy>p:not(.driveway-quote-kicker){margin:0;color:rgba(255,255,255,.86);font-size:1.06rem}.driveway-quote-kicker{margin:0 0 10px!important;color:#e1b955!important;font-size:.76rem!important;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.driveway-quote-proof{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px}.driveway-quote-proof span{padding:8px 11px;border:1px solid rgba(255,255,255,.24);border-radius:999px;background:rgba(255,255,255,.12);color:#fff;font-size:.79rem;font-weight:800;backdrop-filter:blur(8px)}
.driveway-quote-card{padding:clamp(28px,4vw,50px);background:linear-gradient(145deg,#fff,#f5f9fc);display:flex;flex-direction:column;justify-content:center}.driveway-quote-card-head h2{margin:0 0 14px;color:#073e70;font-size:clamp(2rem,3vw,3.25rem);line-height:1.02;letter-spacing:-.045em}.driveway-quote-card-head>p:not(.driveway-quote-kicker){color:#607083;margin:0 0 18px}.driveway-quote-includes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:0 0 22px}.driveway-quote-includes span{padding:10px 12px;border:1px solid rgba(0,94,168,.12);border-radius:12px;background:#eef6fb;color:#073e70;font-size:.83rem;font-weight:800}
.driveway-quote-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.driveway-quote-grid label{display:grid;gap:6px;color:#17324b;font-size:.78rem;font-weight:850}.driveway-quote-wide{grid-column:1/-1}.driveway-quote-grid input,.driveway-quote-grid select,.driveway-quote-grid textarea{width:100%;min-height:48px;padding:12px 13px;border:1px solid #d7e3ec;border-radius:12px;background:#fff;color:#142338;font:inherit;outline:none}.driveway-quote-grid textarea{min-height:88px;resize:vertical}.driveway-quote-grid input:focus,.driveway-quote-grid select:focus,.driveway-quote-grid textarea:focus{border-color:#005ea8;box-shadow:0 0 0 3px rgba(0,94,168,.10)}.driveway-quote-consent{display:block;margin:12px 0;color:#6b7784;font-size:.72rem}.driveway-quote-submit{width:100%;min-height:52px;border:0;border-radius:14px;background:linear-gradient(135deg,#c99632,#e2b952);color:#fff;font:inherit;font-weight:900;cursor:pointer;box-shadow:0 14px 30px rgba(186,137,42,.22)}.driveway-quote-submit:disabled{opacity:.65;cursor:wait}.driveway-quote-confirm{margin-top:14px;padding:14px 16px;border:1px solid #b9dbc8;border-radius:14px;background:#edf8f2;color:#155b36;display:grid;gap:3px}.driveway-quote-confirm[hidden]{display:none}.driveway-quote-confirm strong{font-size:1rem}.driveway-quote-confirm span{font-size:.86rem}.driveway-quote-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}.driveway-quote-actions a{display:flex;align-items:center;justify-content:center;min-height:48px;padding:10px 12px;border-radius:13px;font-weight:850;text-align:center}.driveway-quote-actions a:first-child{background:#005ea8;color:#fff}.driveway-quote-actions a:last-child{border:1px solid #005ea8;background:#fff;color:#005ea8}
@media(max-width:960px){.driveway-quote-experience{grid-template-columns:1fr}.driveway-quote-visual{min-height:520px}.driveway-quote-card{padding:32px}}
@media(max-width:600px){.driveway-quote-experience{width:calc(100% - 24px);border-radius:24px}.driveway-quote-visual{min-height:430px;padding:24px}.driveway-quote-grid,.driveway-quote-includes,.driveway-quote-actions{grid-template-columns:1fr}.driveway-quote-wide{grid-column:auto}.driveway-quote-card{padding:24px}.driveway-quote-visual-copy h2{font-size:2.6rem}}
</style>`;

if (!html.includes('id="driveway-bottom-quote-styles"')) {
  html = html.replace('</head>', `${styles}\n</head>`);
}

const script = `<script id="driveway-bottom-quote-runtime">
(function(){
  var form=document.querySelector('[data-driveway-quote-form]');
  if(!form)return;
  var q=function(s){return form.querySelector(s)};
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var button=form.querySelector('.driveway-quote-submit');
    var confirm=q('[data-dq-confirm]');
    button.disabled=true;
    button.textContent='Sending…';
    var payload=[
      'New HydroSeal Driveway Quote!',
      'Name: '+q('[data-dq-first]').value+' '+q('[data-dq-last]').value,
      'Email: '+q('[data-dq-email]').value,
      'Phone: '+q('[data-dq-phone]').value,
      'Address: '+q('[data-dq-address]').value,
      'Approx Sq Ft: '+(q('[data-dq-sqft]').value||'Not provided'),
      'Surface Condition: '+q('[data-dq-condition]').value,
      'Notes: '+(q('[data-dq-notes]').value||'None'),
      'Source: Yulee driveway page bottom quote form'
    ].join('\\n');
    fetch('https://ntfy.sh/hs-quotes',{method:'POST',headers:{Title:'New HydroSeal Driveway Quote!',Priority:'high'},body:payload})
      .then(function(response){if(!response.ok)throw new Error('Quote submission failed');return response.text();})
      .then(function(){form.reset();confirm.hidden=false;button.textContent='Quote Request Sent ✓';})
      .catch(function(){button.disabled=false;button.textContent='Request My Driveway Quote →';alert('We could not send the form. Please call or text HydroSeal at 904.537.5000.');});
  });
})();
</script>`;

if (!html.includes('id="driveway-bottom-quote-runtime"')) {
  html = html.replace('</body>', `${script}\n</body>`);
}

if (!html.includes('https://ntfy.sh/hs-quotes')) throw new Error('Nocatee quote endpoint missing from driveway form');
if (!html.includes('data-driveway-quote-form')) throw new Error('Driveway quote form missing');
if ((html.match(/id="driveway-quote"/g)||[]).length !== 1) throw new Error('Expected exactly one driveway quote experience');

fs.writeFileSync(file, html);
console.log('Installed live driveway bottom quote form using the Nocatee calculator quote endpoint');
