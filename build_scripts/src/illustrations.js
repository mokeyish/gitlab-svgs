const path = require('path');
const glob = require('glob');
const { optimizeSVGs } = require('./svg_optimization');
const {
  getIllustrationStats,
  writeFilePromise,
  copyFileSync,
  getFilesizeInBytes,
} = require('./utils');

const collectIllustrations = async (basePath, distPath) => {
  const statsFile = path.join(distPath, 'illustrations.json');

  console.log('Optimizing SVG illustrations...');
  const SVGs = await optimizeSVGs(
    basePath,
    distPath,
    path.join(basePath, 'illustrations', '**', '*.svg'),
  );
  console.log('Optimized SVG illustrations');

  console.log('Copying third party PNG illustrations...');
  const PNGs = await Promise.all(
    glob
      .sync(path.join(basePath, 'illustrations/third-party-logos', '**', '*.png'))
      .map(async (sourcePath) => {
        const relPath = path.relative(basePath, sourcePath);
        copyFileSync(sourcePath, path.join(distPath, relPath));
        return { name: relPath, size: getFilesizeInBytes(sourcePath) };
      }),
  );
  console.log('Finished copying third party PNG illustrations');

  const stats = getIllustrationStats([...SVGs, ...PNGs]);

  await writeFilePromise(statsFile, JSON.stringify(stats, null, 2), 'utf-8');
};

module.exports = {
  collectIllustrations,
};
