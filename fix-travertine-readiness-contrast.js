const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-travertine-sealing.html');
if (!fs.existsSync(file)) throw new Error('Travertine page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');
const styleId = 'travertine-readiness-contrast-fix';
if (html.includes(`id="${styleId}"`)) process.exit(0);

const css = `<style id="${styleId}">
body.travertine-driveway-clone .travertine-readiness-split,
body.travertine-driveway-clone .travertine-readiness-split > div{
  color:#0b1220!important;
}
body.travertine-driveway-clone .travertine-readiness-split h2,
body.travertine-driveway-clone .travertine-readiness-split h3{
  color:#0b2d4a!important;
}
body.travertine-driveway-clone .travertine-readiness-split p{
  color:#536475!important;
}
body.travertine-driveway-clone .travertine-readiness-split .eyebrow{
  color:#0f6ea8!important;
}
</style>`;

if (!html.includes('</head>')) throw new Error('Travertine page head closing tag not found.');
html = html.replace('</head>', `${css}\n</head>`);
fs.writeFileSync(file, html);
console.log('Fixed readiness split text contrast on travertine page.');
