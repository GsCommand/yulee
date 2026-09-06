(function () {
  var layoutStyles = document.createElement('style');
  layoutStyles.textContent = '.pricing-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,.9fr);gap:clamp(24px,4vw,48px);align-items:start}.pricing-panel{min-width:0}.pricing-calculator{position:sticky;top:130px}.pricing-section>.section-heading{max-width:900px;margin-left:auto;margin-right:auto;text-align:center}.pricing-section>.section-heading p{margin-left:auto;margin-right:auto}.pricing-section .price-table{min-width:0}.pricing-calculator-note{margin-top:18px;color:var(--muted);font-size:.95rem}@media(max-width:900px){.pricing-grid{grid-template-columns:1fr}.pricing-calculator{position:static}}';
  document.head.appendChild(layoutStyles);

  var RATE_PAVER = 1.5;
  var RATE_TRAVERTINE = 1.6;
  var STRIP_RATE = 1.5;
  var EFFLOR_RATE = 0.05;
  var WALL_RATE = 1;
  var REPAIR_RATE = 8;

  function fmt(low, high) {
    low = Math.round(low);
    high = Math.round(high);
    return low === high ? '$' + low.toLocaleString() : '$' + low.toLocaleString() + ' – $' + high.toLocaleString();
  }

  function step(n, title, sub, body, first, optional) {
    return '<section class="hspav-step" data-step="' + n + '"><h4>' + title + '</h4><p>' + sub + '</p>' + body + '<button class="hspav-next" type="button" data-next="' + (n + 1) + '" ' + (!optional ? 'disabled' : '') + '>' + (n === 6 ? 'See My Estimate' : 'Continue') + ' →</button>' + (n > 1 ? '<button class="hspav-back" type="button" data-back="' + (n - 1) + '">Back</button>' : '') + '</section>';
  }

  function tile(low, high, label, sub, strip) {
    return '<button class="hspav-tile" type="button" data-low="' + low + '" data-high="' + high + '" data-label="' + label + '" ' + (strip ? 'data-strip="1"' : '') + '><strong>' + label + '</strong>' + (sub ? '<small>' + sub + '</small>' : '') + '</button>';
  }

  function template() {
    return '<div class="hspav-card"><div class="hspav-brand"><div class="hspav-eye">HydroSeal</div><h3>Paver Sealing <span>Cost Calculator</span></h3><p>Get your free estimate in under 60 seconds</p></div><div class="hspav-progress">' +
      [1,2,3,4,5,6,7].map(function(i){return '<span data-seg="'+i+'"></span>';}).join('') +
      '</div>' +
      step(1, 'Paver Area Size', 'Choose the range that best fits the total area you want sealed.', '<div class="hspav-grid two" data-group="size">' +
        tile('250','500','250–500 sq ft','Small porch, patio, or walkway') +
        tile('500','750','500–750 sq ft','1-car driveway + walkway') +
        tile('750','1000','750–1,000 sq ft','Average 2-car driveway') +
        tile('1000','1500','1,000–1,500 sq ft','Large 2-car driveway') +
        tile('1500','2000','1,500–2,000 sq ft','3-car driveway + patio') +
        '<button class="hspav-tile" type="button" data-custom="true"><strong>Custom</strong><small>Enter exact square footage</small></button></div><div class="hspav-field" data-custom-wrap hidden><label>Exact Square Footage</label><input type="number" min="1" step="1" inputmode="numeric" placeholder="e.g. 2400" data-custom-input></div>', true) +
      step(2, 'What Areas Need Sealing?', 'Different areas take different amounts of prep and product.', '<div class="hspav-grid" data-group="area">' +
        tile('0','0','Driveway Area','') +
        tile('0','0','Patio / Lanai','') +
        tile('50','100','Pool Deck','+$50 to $100 for coping detail') +
        tile('75','150','Driveway and Patio Area','') +
        tile('125','225','Whole Property','') + '</div>') +
      step(3, 'Paver Material', 'Material affects product choice and application method.', '<div class="hspav-grid two" data-group="material">' +
        tile('0','0','Concrete Pavers','') +
        tile('0','0','Brick Pavers','') +
        tile('1','1','Travertine/Marble/Natural Stone','') +
        tile('0','0','Not Sure','') + '</div>') +
      step(4, 'Current Condition', 'Stripping takes far more time than a fresh recoat.', '<div class="hspav-grid" data-group="cond">' +
        tile('0','0','Never Sealed','Brand new or bare pavers') +
        tile('0','0','Due for a Recoat','Sealed before with light prep') +
        tile('0','0','Failing Sealer — Needs Stripping','+$1.50/sq ft','1') + '</div>') +
      step(5, 'Add Services', 'Select all that apply, or skip to continue.', '<div class="hspav-grid"><button class="hspav-addon" type="button" data-addon="efflor"><span></span><strong>Efflorescence Treatment</strong><small>Remove white mineral staining — $0.05/sq ft</small></button><button class="hspav-addon" type="button" data-addon="wallFirepit"><span></span><strong>Wall/Firepit Sealing</strong><small>Seat walls or firepits — $1.00/sq ft</small></button><div class="hspav-field" data-wall-wrap hidden><label>Approx. Square Footage</label><input type="number" min="1" step="1" inputmode="numeric" placeholder="e.g. 40" data-wall-input><button class="hspav-link" type="button" data-wall-standard>Use standard firepit size (~40 sq ft)</button></div><button class="hspav-addon" type="button" data-addon="paverRepair"><span></span><strong>Paver Repair / Releveling</strong><small>Fix sunken or shifted pavers — $8/paver</small></button><div class="hspav-field" data-repair-wrap hidden><label>How Many Pavers?</label><input type="number" min="1" step="1" inputmode="numeric" placeholder="e.g. 12" data-repair-input></div></div>', false, true) +
      step(6, 'Choose Your Sealer Finish', 'All packages include prep, resand, and 2-coat flood seal application.', '<div class="hspav-grid" data-group="pkg"><button class="hspav-tile" type="button" data-low="0" data-high="0" data-label="Natural Look Seal"><strong>Natural Look Seal</strong><small>Trident penetrating sealer</small></button><div class="hspav-pick"><em>Most Popular</em><button class="hspav-tile" type="button" data-low="0" data-high="0" data-label="Enhancement Sealer"><strong>Enhancement Sealer</strong><small>Trident Cat 5 semi-gloss color enhancing finish</small></button></div></div>') +
      '<section class="hspav-step" data-step="7"><div class="hspav-est"><small>Your Estimated Price Range</small><strong data-est>—</strong><span>Final price confirmed after on-site review at no charge</span></div><div class="hspav-breakdown" data-breakdown></div><form class="hspav-form" data-form><h4>Lock In Your Estimate</h4><p>Fill out the form below and our team will confirm your quote within a few hours.</p><div><input required placeholder="First Name" data-first><input required placeholder="Last Name" data-last></div><input type="email" required placeholder="Email" data-email><input type="tel" required placeholder="Phone" data-phone><input required placeholder="Property Address" data-address><textarea placeholder="Notes (optional)" data-notes></textarea><small>By submitting, you agree to be contacted by HydroSeal Pavers about your quote.</small><button class="hspav-next" type="submit">Submit My Quote Request →</button></form><div class="hspav-confirm" data-confirm hidden><strong>Request Received</strong><p>Thanks — we have your estimate details and will reach out within a few hours.</p></div><button class="hspav-back" type="button" data-back="6">Adjust Selections</button></section></div>';
  }

  document.querySelectorAll('[data-calculator]').forEach(function(root){
    root.innerHTML = template();
    var cur = 1;
    var S = {
      size:{low:0,high:0,lbl:''},
      area:{low:0,high:0,lbl:''},
      material:{low:0,high:0,lbl:''},
      cond:{low:0,high:0,lbl:''},
      pkg:{low:0,high:0,lbl:''},
      efflor:{checked:false},
      wallFirepit:{checked:false,sqft:0},
      paverRepair:{checked:false,count:0}
    };

    function q(s){return root.querySelector(s);}
    function qa(s){return [].slice.call(root.querySelectorAll(s));}
    function show(n){
      q('[data-step="'+cur+'"]').classList.remove('active');
      cur=n;
      q('[data-step="'+cur+'"]').classList.add('active');
      qa('[data-seg]').forEach(function(seg){var i=+seg.dataset.seg; seg.className=i<n?'done':i===n?'active':'';});
      root.scrollIntoView({behavior:'smooth',block:'start'});
    }
    function rate(){return S.material.low===1?RATE_TRAVERTINE:RATE_PAVER;}
    function surcharge(){return S.cond.strip ? {low:S.size.low*STRIP_RATE,high:S.size.high*STRIP_RATE}:{low:0,high:0};}
    function calc(){
      var bs={low:S.size.low*rate(),high:S.size.high*rate()};
      var st=surcharge();
      var ef=S.efflor.checked?{low:S.size.low*EFFLOR_RATE,high:S.size.high*EFFLOR_RATE}:{low:0,high:0};
      var wa=S.wallFirepit.checked&&S.wallFirepit.sqft>0?{low:S.wallFirepit.sqft*WALL_RATE,high:S.wallFirepit.sqft*WALL_RATE}:{low:0,high:0};
      var re=S.paverRepair.checked&&S.paverRepair.count>0?{low:S.paverRepair.count*REPAIR_RATE,high:S.paverRepair.count*REPAIR_RATE}:{low:0,high:0};
      return {bs:bs,st:st,ef:ef,wa:wa,re:re,low:bs.low+st.low+S.area.low+S.pkg.low+ef.low+wa.low+re.low,high:bs.high+st.high+S.area.high+S.pkg.high+ef.high+wa.high+re.high};
    }
    function estimate(){
      var c=calc();
      var html='<h4>Estimate Breakdown</h4><p><span>Base Sealing ('+S.size.lbl+' @ $'+rate().toFixed(2)+'/sq ft)</span><strong>'+fmt(c.bs.low,c.bs.high)+'</strong></p>';
      if(S.cond.strip) html+='<p><span>Stripping ('+S.size.lbl+' @ $'+STRIP_RATE.toFixed(2)+'/sq ft)</span><strong>+'+fmt(c.st.low,c.st.high)+'</strong></p>';
      if(S.area.low||S.area.high) html+='<p><span>'+S.area.lbl+'</span><strong>+'+fmt(S.area.low,S.area.high)+'</strong></p>';
      if(S.efflor.checked) html+='<p><span>Efflorescence Treatment</span><strong>+'+fmt(c.ef.low,c.ef.high)+'</strong></p>';
      if(S.wallFirepit.checked&&S.wallFirepit.sqft>0) html+='<p><span>Wall/Firepit Sealing</span><strong>+'+fmt(c.wa.low,c.wa.high)+'</strong></p>';
      if(S.paverRepair.checked&&S.paverRepair.count>0) html+='<p><span>Paver Repair/Releveling</span><strong>+'+fmt(c.re.low,c.re.high)+'</strong></p>';
      html+='<p><span>Estimated Total</span><strong>'+fmt(c.low,c.high)+'</strong></p>';
      q('[data-est]').textContent=fmt(c.low,c.high);
      q('[data-breakdown]').innerHTML=html;
      show(7);
    }

    qa('.hspav-step').forEach(function(s){s.classList.toggle('active', s.dataset.step==='1');});
    var firstSeg=q('[data-seg="1"]');
    if(firstSeg) firstSeg.className='active';

    root.addEventListener('click', function(e){
      var btn=e.target.closest('button');
      if(!btn||!root.contains(btn))return;
      if(btn.dataset.next){ if(+btn.dataset.next===7) estimate(); else show(+btn.dataset.next); }
      if(btn.dataset.back) show(+btn.dataset.back);
      if(btn.dataset.custom){
        qa('[data-group="size"] .hspav-tile').forEach(function(b){b.classList.remove('sel');});
        btn.classList.add('sel');
        q('[data-custom-wrap]').hidden=false;
      }
      if(btn.dataset.low!==undefined){
        var group=btn.closest('[data-group]');
        if(group){
          qa('[data-group="'+group.dataset.group+'"] .hspav-tile').forEach(function(b){b.classList.remove('sel');});
          btn.classList.add('sel');
          var key=group.dataset.group;
          S[key]={low:+btn.dataset.low,high:+btn.dataset.high,lbl:btn.dataset.label,strip:btn.dataset.strip==='1'};
          var next=q('[data-step="'+cur+'"] [data-next]');
          if(next) next.disabled=false;
          if(key==='size') q('[data-custom-wrap]').hidden=true;
        }
      }
      if(btn.dataset.addon){
        btn.classList.toggle('sel');
        S[btn.dataset.addon].checked=btn.classList.contains('sel');
        if(btn.dataset.addon==='wallFirepit') q('[data-wall-wrap]').hidden=!S.wallFirepit.checked;
        if(btn.dataset.addon==='paverRepair') q('[data-repair-wrap]').hidden=!S.paverRepair.checked;
      }
      if(btn.dataset.wallStandard!==undefined){
        q('[data-wall-input]').value=40;
        S.wallFirepit.sqft=40;
      }
    });

    root.addEventListener('input', function(e){
      if(e.target.matches('[data-custom-input]')){
        var v=parseFloat(e.target.value);
        S.size=v>0?{low:v,high:v,lbl:'Custom — '+Math.round(v).toLocaleString()+' sq ft'}:{low:0,high:0,lbl:''};
        q('[data-step="1"] [data-next]').disabled=!(v>0);
      }
      if(e.target.matches('[data-wall-input]')) S.wallFirepit.sqft=parseFloat(e.target.value)||0;
      if(e.target.matches('[data-repair-input]')) S.paverRepair.count=parseFloat(e.target.value)||0;
    });

    var form=q('[data-form]');
    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var payload='New HydroSeal Quote!\n'+q('[data-first]').value+' '+q('[data-last]').value+' — '+q('[data-est]').textContent+'\n'+q('[data-phone]').value+' — '+q('[data-address]').value;
        fetch('https://ntfy.sh/hs-quotes',{method:'POST',headers:{Title:'New HydroSeal Quote!',Priority:'high'},body:payload}).catch(function(err){console.error('ntfy push failed:',err);});
        form.hidden=true;
        q('[data-confirm]').hidden=false;
      });
    }
  });
})();
