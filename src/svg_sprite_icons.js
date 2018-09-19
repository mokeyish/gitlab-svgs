/* eslint-disable import/no-commonjs */
const SVGSpriter = require('svg-sprite');
const SVGO = require('svgo');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
const glob = require('glob');

const spriteFilesPath = path.join('sprite_icons');

module.exports = {
  createIconSprite: finishedCallback => {
    const dest = path.normalize(path.join('dist'));
    const spriteFiles = glob.glob.sync(`${spriteFilesPath}**/*.svg`, {
      spriteFilesPath,
    });
    const svgo = new SVGO({
      plugins: [
        {
          removeViewBox: false,
        },
      ],
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
      icons.push(file.split('/')[1].split('.')[0]);
    });

    const getFilesizeInBytes = filename => {
      const stats = fs.statSync(filename);
      const fileSizeInBytes = stats.size;
      return fileSizeInBytes;
    };

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
        spriteSize: getFilesizeInBytes(path.join(__dirname, '..', 'dist', 'icons.svg')),
        icons,
      };

      fs.writeFileSync(
        path.join(__dirname, '..', 'dist', 'icons.json'),
        JSON.stringify(iconsInfo, null, 2),
        'utf8',
      );

      if (finishedCallback) finishedCallback();
    });
  },
};
