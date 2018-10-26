const async = require('async');
const path = require('path');
const rimraf = require('rimraf');

const svgSpriteIcons = require('./src/svg_sprite_icons');
const illustrations = require('./src/illustrations');
const utils = require('./src/utils');

const BASE_PATH = path.join(__dirname, '..');
const DIST_PATH = path.join(BASE_PATH, 'dist');

rimraf(`${DIST_PATH}/**/*`, () => {
  console.log('Cleared out dist folder');

  async.parallel(
    [
      callback => {
        svgSpriteIcons.createIconSprite(BASE_PATH, err => {
          console.log('Created Icon Sprite');
          callback(err, true);
        });
      },
      callback => {
        console.log('Starting illustrations ...');
        illustrations.optimizeIllustrations(BASE_PATH, err => {
          console.log('Created Illustrations');
          callback(err, true);
        });
      },
    ],
    err => {
      if (err) {
        console.error('Something went wrong');
        console.error(err);
        process.exit(1);
      }

      console.log('Reached copying !');

      const staticPath = path.normalize(path.join(BASE_PATH, 'svgpreviewer', 'static'));

      console.log('Copying files to dist ...');

      utils.copyFolderRecursiveSync(DIST_PATH, staticPath);
    },
  );
});
