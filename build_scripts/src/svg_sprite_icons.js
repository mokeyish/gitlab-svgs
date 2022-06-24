const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');
const SVGSpriter = require('svg-sprite');
const { getFilesizeInBytes } = require('./utils');

const createIconSprite = (BASE_PATH, destPath, globPattern, targetFile) => {
  const spriteFiles = glob.sync(globPattern);

  const spriter = new SVGSpriter({
    dest: destPath,
    shape: {
      dimension: {
        maxWidth: 200,
        maxHeight: 200,
        attributes: false,
      },
      transform: [
        {
          svgo: {
            /*
              The following optimizations have been turned off because they apparently break our:
              echarts icon rendering:
              - https://github.com/apache/incubator-echarts/issues/11087
              - https://gitlab.com/gitlab-org/gitlab-svgs/issues/73
               */
            plugins: [
              { convertPathData: { noSpaceAfterFlags: false } },
              { mergePaths: { noSpaceAfterFlags: false } },
            ],
          },
        },
      ],
    },
    mode: {
      inline: true, // Prepare for inline embedding
      symbol: {
        example: false,
        dest: '',
        sprite: `${targetFile}.svg`,
      },
      stack: {
        example: false,
        dest: '',
        sprite: `${targetFile}-stacked.svg`,
      },
    },
    svg: {
      namespaceClassnames: false,
    },
  });

  const icons = [];

  spriteFiles.forEach((file) => {
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
  return new Promise((resolve, reject) => {
    spriter.compile((error, result) => {
      if (error) {
        return reject(error);
      }

      try {
        Object.values(result).forEach((mode) => {
          Object.values(mode).forEach((resource) => {
            mkdirp.sync(path.dirname(resource.path));
            fs.writeFileSync(resource.path, resource.contents);

            console.log(`Compiled - Saving to ${resource.path}`);
          });
        });

        // Save the Icons in here to a json so we can then display a nice help sprite sheet in GitLab
        const iconsInfo = {
          iconCount: icons.length,
          spriteSize: getFilesizeInBytes(path.join(destPath, `${targetFile}.svg`)),
          icons,
        };

        fs.writeFileSync(
          path.join(destPath, `${targetFile}.json`),
          JSON.stringify(iconsInfo, null, 2),
          'utf8',
        );
      } catch (e) {
        return reject(e);
      }

      return resolve();
    });
  });
};

module.exports = { createIconSprite };
