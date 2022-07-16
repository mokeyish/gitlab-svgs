const path = require('path');
const { writeFile, readFile } = require('fs/promises');
const glob = require('glob');
const mkdirp = require('mkdirp');
const { loadConfig, optimize } = require('svgo');

const { getIllustrationStats, getFilesizeInBytes } = require('./utils');

const optimizeSVGs = async (basePath, destPath, globPattern, statsFilePath = null) => {
  const files = glob.sync(globPattern, {});
  const config = await loadConfig();

  console.log(`Optimizing ${files.length} files`);

  const optimizeSVG = async (file) => {
    const relName = path.relative(basePath, file);
    const fpath = path.join(destPath, relName);

    const illustration = await readFile(path.resolve(file), 'utf8');

    const optimizedIllustration = optimize(illustration, {
      path: path.resolve(file),
      ...config,
    });

    mkdirp.sync(path.dirname(fpath));

    await writeFile(fpath, optimizedIllustration.data);

    return {
      name: relName,
      size: getFilesizeInBytes(fpath),
    };
  };

  const illustrations = await Promise.all(files.map(optimizeSVG));

  if (statsFilePath) {
    await writeFile(
      statsFilePath,
      JSON.stringify(getIllustrationStats(illustrations), null, 2),
      'utf8',
    );
  }

  return illustrations;
};

module.exports = { optimizeSVGs };
