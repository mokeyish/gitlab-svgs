const path = require('path');
const rimraf = require('rimraf');

const illustrations = require('./src/illustrations');
const svgSpriteIcons = require('./src/svg_sprite_icons');
const utils = require('./src/utils');

const BASE_PATH = path.join(__dirname, '..');
const DIST_PATH = path.join(BASE_PATH, 'dist');
const STATIC_PATH = path.normalize(path.join(BASE_PATH, 'svgpreviewer', 'static'));

async function buildFiles() {
  console.log('Creating Icon Sprite...');
  await svgSpriteIcons.createIconSprite(BASE_PATH);
  console.log('Created Icon Sprite');

  console.log('Optimizing illustrations...');
  await illustrations.optimizeIllustrations(BASE_PATH);
  console.log('Optimized illustrations');

  console.log('Copying files to dist ...');
  utils.copyFolderRecursiveSync(DIST_PATH, STATIC_PATH);
}

rimraf(`${DIST_PATH}/**/*`, async () => {
  console.log('Cleared out dist folder');

  try {
    await buildFiles();
  } catch (err) {
    console.error('Something went wrong');
    console.error(err);
    process.exit(1);
  }
});
