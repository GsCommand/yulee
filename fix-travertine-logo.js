const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-travertine-sealing.html');
if (!fs.existsSync(file)) throw new Error('Travertine page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');
const styleId = 'travertine-logo-fix';
if (html.includes(`id="${styleId}"`)) process.exit(0);

const css = `<style id="${styleId}">
body.travertine-driveway-clone .ys-nav{background:rgba(255,255,255,.94)!important}
body.travertine-driveway-clone .ys-logo{margin-right:auto!important;display:flex!important;align-items:center!important;background:transparent!important}
body.travertine-driveway-clone .ys-logo img{display:block!important;width:220px!important;height:auto!important;max-height:58px!important;object-fit:contain!important;background:transparent!important;filter:none!important;mix-blend-mode:normal!important;opacity:1!important;border:0!important;border-radius:0!important;box-shadow:none!important}
@media(max-width:1080px){body.travertine-driveway-clone .ys-logo img{width:190px!important;max-height:56px!important}}
@media(max-width:640px){body.travertine-driveway-clone .ys-logo img{width:160px!important;max-height:50px!important}}
</style>`;

if (!html.includes('</head>')) throw new Error('Travertine page head closing tag not found.');
html = html.replace('</head>', `${css}\n</head>`);
fs.writeFileSync(file, html);
console.log('Matched travertine header logo treatment to the homepage.');
