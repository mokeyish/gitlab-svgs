/* eslint-disable import/no-commonjs */
const async = require('async');
const path = require('path');

const svgSpriteIcons = require('./src/svg_sprite_icons');
const illustrations = require('./src/illustrations');
const utils = require('./src/utils');

// an example using an object instead of an array
async.parallel(
  {
    iconSprite: callback => {
      svgSpriteIcons.createIconSprite(() => {
        callback(null, true);
      });
    },
    two: callback => {
      illustrations.optimizeIllustrations(() => {
        callback(null, true);
      });
    },
  },
  (err, results) => {
    const sourcePath = path.join('dist');
    const destPath = path.normalize(path.join('svgpreviewer', 'static'));

    utils.copyFolderRecursiveSync(sourcePath, destPath);
  },
);
