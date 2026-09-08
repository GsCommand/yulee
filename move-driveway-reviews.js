const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'yulee-driveway-paver-sealing.html');
if (!fs.existsSync(file)) throw new Error('Driveway page missing from public build output.');

let html = fs.readFileSync(file, 'utf8');

const widgetId = 'elfsight-app-6c4e28f8-e9a0-49a8-b07c-0c224e121a67';
const wildlightMarker = '<section class="feature-band driveway-wildlight-focus">';
const reviewRegex = new RegExp(`<section[^>]*aria-label="Recent reviews"[^>]*>[\\s\\S]*?<div class="${widgetId}"[^>]*><\\/div>[\\s\\S]*?<\\/section>`, 'g');
const matches = html.match(reviewRegex) || [];

if (!html.includes(wildlightMarker)) {
  throw new Error('Wildlight focus section not found; refusing to move reviews.');
}
if (matches.length !== 1) {
  throw new Error(`Expected exactly one Recent reviews widget block, found ${matches.length}.`);
}

const reviewBlock = matches[0];
html = html.replace(reviewRegex, '');
html = html.replace(wildlightMarker, `${reviewBlock}\n${wildlightMarker}`);

const widgetCount = (html.match(new RegExp(widgetId, 'g')) || []).length;
if (widgetCount !== 1) throw new Error(`Expected one reviews widget after move, found ${widgetCount}.`);

const reviewPos = html.indexOf(widgetId);
const wildlightPos = html.indexOf('Driveway Paver Sealing Wildlight Yulee FL');
if (reviewPos < 0 || wildlightPos < 0 || reviewPos > wildlightPos) {
  throw new Error('Reviews widget was not placed above the Wildlight heading.');
}

fs.writeFileSync(file, html);
console.log('Moved Recent reviews Elfsight block directly above Wildlight focus section.');
