/* eslint-disable import/no-commonjs */
const async = require('async');
const path = require('path');

const svgSpriteIcons = require('./src/svg_sprite_icons');
const illustrations = require('./src/illustrations');
const utils = require('./src/utils');

async.parallel(
  {
    iconSprite: callback => {
      svgSpriteIcons.createIconSprite(() => {
        console.log('Created Icon Sprite');
        callback(null, true);
      });
    },
    two: callback => {
      console.log('Starting illustrations ...');
      illustrations.optimizeIllustrations(() => {
        console.log('Created Illustrations');
        callback(null, true);
      });
    },
  },
  (err, results) => {
    console.log('Reached copying !');
    const sourcePath = path.join('dist');
    const destPath = path.normalize(path.join('svgpreviewer', 'static'));

    console.log('Copying files to dist ...');

    utils.copyFolderRecursiveSync(sourcePath, destPath);
  },
);
