const { readFile, mkdir, writeFile } = require('fs/promises');
const path = require('path');
const glob = require('glob');
const SVGSpriter = require('svg-sprite');
const { getFilesizeInBytes } = require('./utils');

const writeSpriteFile = async (resource) => {
  await mkdir(path.dirname(resource.path), { recursive: true });

  console.log(`Compiled - Saving to ${resource.path}`);
  return writeFile(resource.path, resource.contents, 'utf-8');
};

const createIconSprite = async (BASE_PATH, destPath, globPattern, targetFile) => {
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

  const icons = await Promise.all(
    spriteFiles.map(async (file) => {
      const filePath = path.resolve(file);

      const contents = await readFile(filePath, {
        encoding: 'utf-8',
      });

      spriter.add(filePath, null, contents);

      return path.basename(file, '.svg');
    }),
  );

  // Compile the sprites
  const result = await new Promise((resolve, reject) => {
    spriter.compile((error, response) => (error ? reject(error) : resolve(response)));
  });

  // Write compiled sprites to disk
  await Promise.all(
    Object.values(result)
      .flatMap((mode) => Object.values(mode))
      .map(writeSpriteFile),
  );

  // Save the Icons in here to a json so we can then display a nice help sprite sheet in GitLab
  const iconsInfo = {
    iconCount: icons.length,
    spriteSize: getFilesizeInBytes(path.join(destPath, `${targetFile}.svg`)),
    icons,
  };

  await writeFile(
    path.join(destPath, `${targetFile}.json`),
    JSON.stringify(iconsInfo, null, 2),
    'utf8',
  );
};

module.exports = { createIconSprite };
