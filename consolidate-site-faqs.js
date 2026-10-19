const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'public');
const target = path.join(root, 'faq.html');
const decode = s => s.replace(/&(?:amp|quot|apos|lt|gt|nbsp|ndash|mdash|rsquo|lsquo|hellip);|&#(?:x[0-9a-f]+|\d+);/gi, e => {
 const named = {'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>','&nbsp;':' ','&ndash;':'–','&mdash;':'—','&rsquo;':'’','&lsquo;':'‘','&hellip;':'…'};
 if (named[e]) return named[e];
 return String.fromCodePoint(e[2].toLowerCase()==='x'?parseInt(e.slice(3,-1),16):parseInt(e.slice(2,-1),10));
});
const text = s => decode(s.replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const key = x => (x.q+'\n'+x.a).toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
function items(html) {
 return [...html.matchAll(/<details\b[^>]*>\s*<summary\b[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi)]
 .map(m=>({q:text(m[1]),a:text(m[2])})).filter(x=>x.q&&x.a);
}
function files(dir) {return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):e.name.endsWith('.html')?[path.join(dir,e.name)]:[]);}
let html=fs.readFileSync(target,'utf8');
const seen=new Set();const groups=[];const all=[];let scanned=0;
function add(title, entries, url) {
 const unique=[];
 for(const item of entries){const k=key(item);if(seen.has(k))continue;seen.add(k);unique.push(item);all.push(item);}
 if(unique.length)groups.push({title,entries:unique,url});
}
// Read final rendered service pages, after every page-specific transformation.
for(const file of files(root).sort()) {
 if(file===target)continue;
 const page=fs.readFileSync(file,'utf8');
 if(/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(page))continue;
 scanned++;
 const title=text((page.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)||page.match(/<title>([\s\S]*?)<\/title>/i)||[])[1]||path.basename(file));
 add(title,items(page),'/'+path.relative(root,file).split(path.sep).join('/'));
}
// Keep the existing FAQ-only questions as well, with their original categories.
for(const m of html.matchAll(/<section class="yf-group"[^>]*>([\s\S]*?)<\/section>/g)) {
 add(text((m[1].match(/<h2[^>]*>([\s\S]*?)<\/h2>/)||[])[1]||'More questions'),items(m[1]),null);
}
if(!all.length)throw Error('No visible FAQs found');
const rendered=groups.map((g,i)=>`<section class="yf-group" id="faq-topic-${i}"><h2>${esc(g.title)}</h2>${g.url?`<p><a href="${g.url}">View service page →</a></p>`:''}${g.entries.map(x=>`<details class="yf-item"><summary>${esc(x.q)}</summary><div class="yf-answer"><p>${esc(x.a)}</p></div></details>`).join('')}</section>`).join('\n');
const old=/<section class="yf-group"[^>]*>[\s\S]*?<\/section>/g;
let first=true;
html=html.replace(old,()=>{if(!first)return '';first=false;return rendered;});
if(first)html=html.replace('</main>', `<article class="yf-article"><p class="yf-kicker">HydroSeal · Yulee &amp; Nassau County</p><h1>Yulee Paver Sealing &amp; Exterior Cleaning FAQ</h1><p class="yf-lead">Questions and answers from across our website.</p>${rendered}</article></main>`);
// Replace FAQPage data only; retain WebPage, breadcrumbs and other schema.
html=html.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,(full,raw)=>{
 const data=JSON.parse(raw);
 function prune(node){if(Array.isArray(node))return node.map(prune).filter(Boolean);if(!node||typeof node!=='object')return node;if([].concat(node['@type']||[]).includes('FAQPage'))return null;if(node['@graph'])node['@graph']=prune(node['@graph']);return node;}
 const kept=prune(data);return kept?`<script type="application/ld+json">${JSON.stringify(kept).replace(/</g,'\\u003c')}</script>`:'';
});
const schema={'@context':'https://schema.org','@type':'FAQPage','@id':'https://www.yuleepaversealing.com/faq.html#faq',mainEntity:all.map(x=>({'@type':'Question',name:x.q,acceptedAnswer:{'@type':'Answer',text:x.a}}))};
html=html.replace('</head>',`<script type="application/ld+json" id="consolidated-site-faq-schema">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script></head>`);
const nav=`<nav class="yf-topics" aria-label="FAQ topics">${groups.map((g,i)=>`<a href="#faq-topic-${i}">${esc(g.title)}</a>`).join('')}</nav>`;
html=html.replace(/(<p class="yf-lead">)[\s\S]*?<\/p>/,`$1Answers collected from across our Yulee website, organized by service and topic. Choose a topic or expand any question below.</p><p><strong>${all.length} questions and answers</strong></p>${nav}`);
html=html.replace('</head>','<style>.yf-topics{display:flex;flex-wrap:wrap;gap:8px;margin:24px 0}.yf-topics a{padding:8px 12px;background:#edf7fb;border:1px solid #cce5ef;border-radius:12px;color:#0b2d4a;font-size:13px}.yf-group{scroll-margin-top:24px}</style></head>');
const visible=items(html);
if(JSON.stringify(visible)!==JSON.stringify(all))throw Error('Visible FAQ and structured-data answers differ');
for(const file of files(root).filter(f=>f!==target))for(const item of items(fs.readFileSync(file,'utf8')))if(!seen.has(key(item)))throw Error('Missing source FAQ: '+file+' '+item.q);
fs.writeFileSync(target,html);
console.log(`Consolidated ${all.length} unique question/answer pairs from ${scanned} pages plus existing FAQ library; visible/schema parity verified.`);
