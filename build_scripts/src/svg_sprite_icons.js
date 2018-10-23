const SVGSpriter = require('svg-sprite');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
const glob = require('glob');

const utils = require('./utils');

module.exports = {
  createIconSprite: (BASE_PATH, finishedCallback) => {
    const spriteFilesPath = path.join(BASE_PATH, 'sprite_icons');

    const dest = path.normalize(path.join(BASE_PATH, 'dist'));
    const spriteFiles = glob.sync(`${spriteFilesPath}**/*.svg`, {
      spriteFilesPath,
    });

    const spriter = new SVGSpriter({
      dest,
      shape: {
        dimension: {
          maxWidth: 200,
          maxHeight: 200,
          attributes: false,
        },
        transform: ['svgo'],
      },
      mode: {
        inline: true, // Prepare for inline embedding
        symbol: {
          example: false,
          dest: '',
          sprite: 'icons.svg',
        },
      },
      svg: {
        namespaceClassnames: false,
      },
    });
    const icons = [];
    spriteFiles.forEach(file => {
      const filePath = path.resolve(file);
      spriter.add(
        filePath,
        null,
        fs.readFileSync(filePath, {
          encoding: 'utf-8',
        }),
      );
      icons.push(path.basename(file, '.svg'));
    });

    // Compile the sprite
    spriter.compile((error, result) => {
      console.log('Compile done : ', error, result);
      Object.values(result).forEach(mode => {
        Object.values(mode).forEach(resource => {
          mkdirp.sync(path.dirname(resource.path));
          fs.writeFileSync(resource.path, resource.contents);

          console.log(`Compiled - Saving to ${resource.path}`);
        });
      });

      // Save the Icons in here to a json so we can then display a nice help sprite sheet in GitLab
      const iconsInfo = {
        iconCount: icons.length,
        spriteSize: utils.getFilesizeInBytes(path.join(dest, 'icons.svg')),
        icons,
      };

      fs.writeFileSync(path.join(dest, 'icons.json'), JSON.stringify(iconsInfo, null, 2), 'utf8');

      if (finishedCallback) finishedCallback();
    });
  },
};
