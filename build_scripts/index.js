const async = require('async');
const path = require('path');

const svgSpriteIcons = require('./src/svg_sprite_icons');
const illustrations = require('./src/illustrations');
const utils = require('./src/utils');

const BASE_PATH = path.join(__dirname, '..');

async.parallel(
  {
    iconSprite: callback => {
      svgSpriteIcons.createIconSprite(BASE_PATH, () => {
        console.log('Created Icon Sprite');
        callback(null, true);
      });
    },
    two: callback => {
      console.log('Starting illustrations ...');
      illustrations.optimizeIllustrations(BASE_PATH, () => {
        console.log('Created Illustrations');
        callback(null, true);
      });
    },
  },
  (err, results) => {
    console.log('Reached copying !');
    const sourcePath = path.join(BASE_PATH, 'dist');
    const destPath = path.normalize(path.join(BASE_PATH, 'svgpreviewer', 'static'));

    console.log('Copying files to dist ...');

    utils.copyFolderRecursiveSync(sourcePath, destPath);
  },
);
