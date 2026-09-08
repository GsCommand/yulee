const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'wildlight-paver-sealing.html');
if (!fs.existsSync(file)) throw new Error('public/wildlight-paver-sealing.html not found');

let html = fs.readFileSync(file, 'utf8');

const requiredTopics = [
  'Wildlight driveways',
  'Screened lanais',
  'Pool decks',
  'Irrigation staining',
  'Joint-sand washout',
  'Coastal exposure',
];

for (const topic of requiredTopics) {
  if (!html.includes(`<span>${topic}</span>`)) {
    throw new Error(`Missing Wildlight topic pill: ${topic}`);
  }
}

const style = `<style id="wildlight-topic-pill-style">
body.y-shared-top .ys-wildlight-topics{
  width:min(1180px,calc(100% - 40px));
  margin:12px auto 0;
  display:grid;
  grid-template-columns:repeat(6,minmax(0,1fr));
  gap:8px;
}
body.y-shared-top .ys-wildlight-topics span{
  display:flex;
  align-items:center;
  justify-content:center;
  min-height:50px;
  padding:10px 12px;
  border:1px solid rgba(36,176,184,.34);
  border-radius:999px;
  background:linear-gradient(135deg,rgba(57,191,234,.18) 0%,rgba(42,190,158,.18) 100%);
  color:#0b3658;
  font-weight:900;
  font-size:13px;
  line-height:1.2;
  text-align:center;
  white-space:nowrap;
  box-shadow:0 8px 22px rgba(32,151,170,.10),inset 0 1px 0 rgba(255,255,255,.8);
}
body.y-shared-top .ys-wildlight-topics span:nth-child(even){
  background:linear-gradient(135deg,rgba(41,188,164,.19) 0%,rgba(57,191,234,.15) 100%);
  border-color:rgba(35,171,159,.36);
}
@media(max-width:900px){
  body.y-shared-top .ys-wildlight-topics{
    width:calc(100% - 24px);
    display:flex;
    gap:8px;
    overflow-x:auto;
    flex-wrap:nowrap;
    scrollbar-width:thin;
    padding-bottom:5px;
  }
  body.y-shared-top .ys-wildlight-topics span{
    flex:0 0 auto;
    min-width:160px;
  }
}
</style>`;

const existing = /<style id="wildlight-topic-pill-style">[\s\S]*?<\/style>\s*/i;
if (existing.test(html)) {
  html = html.replace(existing, `${style}\n`);
} else {
  if (!html.includes('</head>')) throw new Error('Missing </head> in Wildlight page');
  html = html.replace('</head>', `${style}\n</head>`);
}

fs.writeFileSync(file, html);
console.log('Styled Wildlight six-topic strip as blue-green single-row pills.');
