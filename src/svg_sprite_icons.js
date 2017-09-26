const SVGSpriter = require('svg-sprite');
const SVGO = require('svgo');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
const glob = require('glob');

const spriteFilesPath = path.join('sprite_icons');

module.exports = {
  createIconSprite: (finishedCallback) => {
    const dest = path.normalize(path.join('dist'));
    const spriteFiles = glob.glob.sync(`${spriteFilesPath}**/*.svg`, {
      spriteFilesPath,
    });
    const svgo = new SVGO();
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

    spriteFiles.forEach((file) => {
      console.log(`Adding Icon : ${path.resolve(spriteFilesPath, file)}`);
      const filePath = path.resolve(file);
      spriter.add(filePath, null, fs.readFileSync(filePath, {
        encoding: 'utf-8',
      }));
      icons.push(file.split('/')[1].split('.')[0]);
    });

    // Compile the sprite
    spriter.compile((error, result) => {
      for (const mode in result) {
        for (const resource in result[mode]) {
          mkdirp.sync(path.dirname(result[mode][resource].path));
          fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents);
        }
      }
    });

    function getFilesizeInBytes(filename) {
      const stats = fs.statSync(filename);
      const fileSizeInBytes = stats.size;
      return fileSizeInBytes;
    }

    // Save the Icons in here to a json so we can then display a nice help sprite sheet in GitLab
    const iconsInfo = {
      iconCount: icons.length,
      spriteSize: getFilesizeInBytes(path.join(__dirname, '..', 'dist', 'icons.svg')),
      icons,
    };

    fs.writeFileSync(path.join(__dirname, '..', 'dist', 'icons.json'), JSON.stringify(iconsInfo), 'utf8');

    if (finishedCallback) finishedCallback();
  },
};

