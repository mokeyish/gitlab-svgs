const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');
const SVGO = require('svgo');
const { getFilesizeInBytes, readFilePromise, writeFilePromise } = require('./utils');

const optimizeSVGs = async (basePath, destPath, globPattern, statsFile) => {
  const files = glob.sync(globPattern, {});
  const svgo = new SVGO({
    plugins: [
      {
        removeViewBox: false,
      },
    ],
  });

  console.log(`Optimizing ${files.length} files`);

  const optimizeSVG = async (file) => {
    const relName = path.relative(basePath, file);
    const fpath = path.join(destPath, relName);

    const illustration = await readFilePromise(path.resolve(file), 'utf8');

    const optimizedIllustration = await svgo.optimize(illustration, { path: path.resolve(file) });

    mkdirp.sync(path.dirname(fpath));

    await writeFilePromise(fpath, optimizedIllustration.data);

    return {
      name: relName,
      size: getFilesizeInBytes(fpath),
    };
  };

  const illustrations = await Promise.all(files.map(optimizeSVG));

  // Save the Illustrations Info to a JSON
  const illustrationsInfo = {
    illustrationCount: illustrations.length,
    illustrations: illustrations.sort((a, b) => {
      if (a.name === b.name) {
        return 0;
      }
      return a.name < b.name ? -1 : 1;
    }),
  };

  await writeFilePromise(statsFile, JSON.stringify(illustrationsInfo, null, 2), 'utf8');
};

module.exports = { optimizeSVGs };
