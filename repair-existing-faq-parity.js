const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, 'public');
if (!fs.existsSync(PUBLIC)) throw new Error('public directory missing');

function decode(s){return String(s).replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');}
function strip(s){return decode(String(s).replace(/<[^>]*>/g,'')).replace(/\s+/g,' ').trim();}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function norm(s){return strip(s).toLowerCase().replace(/[’']/g,"'").replace(/[^a-z0-9]+/g,' ').trim();}

function visibleSection(html){
  const marker='<section class="section faq-section">';
  const start=html.indexOf(marker);
  if(start<0)return {start:-1,end:-1,items:[],heading:'Frequently asked questions'};
  const endTag=html.indexOf('</section>',start);
  if(endTag<0)throw new Error('FAQ section missing closing tag');
  const end=endTag+'</section>'.length;
  const section=html.slice(start,end);
  const hm=section.match(/<h2>([\s\S]*?)<\/h2>/i);
  const heading=hm?strip(hm[1]):'Frequently asked questions';
  const items=[];
  const re=/<details\b[^>]*class=["'][^"']*faq-item[^"']*["'][^>]*>\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/gi;
  let m; while((m=re.exec(section)))items.push({q:strip(m[1]),a:strip(m[2])});
  return {start,end,items,heading};
}

function findFaqSchema(html){
  const re=/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while((m=re.exec(html))){
    let data; try{data=JSON.parse(m[1]);}catch(_){continue;}
    if(data&&data['@type']==='FAQPage')return {data,node:data,full:m[0]};
    if(data&&Array.isArray(data['@graph'])){
      const node=data['@graph'].find(x=>x&&x['@type']==='FAQPage');
      if(node)return {data,node,full:m[0]};
    }
  }
  return null;
}

function renderSection(heading,items){
  return `<section class="section faq-section"><div class="section-heading"><p class="eyebrow">Questions</p><h2>${esc(heading)}</h2></div>${items.map(x=>`<details class="faq-item"><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`).join('')}</section>`;
}

function setSchema(html,items,existing){
  const entities=items.map(x=>({'@type':'Question',name:x.q,acceptedAnswer:{'@type':'Answer',text:x.a}}));
  if(existing){
    existing.node.mainEntity=entities;
    return html.replace(existing.full,`<script type="application/ld+json">${JSON.stringify(existing.data)}</script>`);
  }
  const script=`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:entities})}</script>`;
  if(!html.includes('</head>'))throw new Error('Cannot add FAQ schema without </head>');
  return html.replace('</head>',`${script}\n</head>`);
}

for(const name of fs.readdirSync(PUBLIC).filter(x=>x.endsWith('.html')).sort()){
  const file=path.join(PUBLIC,name);
  let html=fs.readFileSync(file,'utf8');
  const vis=visibleSection(html);
  const schema=findFaqSchema(html);
  const schemaItems=schema?(schema.node.mainEntity||[]).map(x=>({q:String(x.name||'').trim(),a:String(x.acceptedAnswer?.text||'').trim()})).filter(x=>x.q):[];
  if(!vis.items.length&&!schemaItems.length)continue;

  const items=vis.items.map(x=>({...x}));
  const seen=new Set(items.map(x=>norm(x.q)));
  for(const x of schemaItems){if(!seen.has(norm(x.q))){items.push({...x});seen.add(norm(x.q));}}

  const visSet=new Set(vis.items.map(x=>norm(x.q)));
  const schemaSet=new Set(schemaItems.map(x=>norm(x.q)));
  const drift=items.length!==vis.items.length||items.length!==schemaItems.length||[...visSet].some(q=>!schemaSet.has(q));
  if(!drift)continue;

  const section=renderSection(vis.heading,items);
  if(vis.start>=0)html=html.slice(0,vis.start)+section+html.slice(vis.end);
  else{
    const at=html.lastIndexOf('</main>');
    if(at<0)throw new Error(`${name}: cannot expose schema-only FAQs because </main> is missing`);
    html=html.slice(0,at)+section+'\n'+html.slice(at);
  }
  html=setSchema(html,items,schema);
  fs.writeFileSync(file,html);
  console.log(`${name}: repaired pre-existing FAQ parity additively; preserved ${vis.items.length} visible and ${schemaItems.length} schema questions -> ${items.length} matched questions`);
}
