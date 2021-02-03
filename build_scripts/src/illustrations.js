const path = require('path');
const SVGO = require('svgo');
const mkdirp = require('mkdirp');
const glob = require('glob');

const { getFilesizeInBytes, readFilePromise, writeFilePromise } = require('./utils');

module.exports = {
  optimizeIllustrations: async (BASE_PATH, finishedCallback) => {
    const illustrationFilesPath = path.join(BASE_PATH, 'illustrations');
    const dest = path.normalize(path.join(BASE_PATH, 'dist'));
    const illustrationFiles = glob.sync(`${illustrationFilesPath}/**/*.svg`, {});
    const svgo = new SVGO({
      plugins: [
        {
          removeViewBox: false,
        },
      ],
    });

    console.log(`Optimize ${illustrationFiles.length} Illustrations`);

    const optimizeIllustration = async (file) => {
      const relName = path.relative(BASE_PATH, file);
      const fpath = path.join(dest, relName);

      const illustration = await readFilePromise(path.resolve(file), 'utf8');

      const optimizedIllustration = await svgo.optimize(illustration, { path: path.resolve(file) });

      mkdirp.sync(path.dirname(fpath));

      await writeFilePromise(fpath, optimizedIllustration.data);

      return {
        name: relName,
        size: getFilesizeInBytes(fpath),
      };
    };

    try {
      const illustrations = await Promise.all(illustrationFiles.map(optimizeIllustration));

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

      await writeFilePromise(
        path.join(dest, 'illustrations.json'),
        JSON.stringify(illustrationsInfo, null, 2),
        'utf8',
      );

      finishedCallback();
    } catch (e) {
      finishedCallback(e);
    }
  },
};
