const async = require('async');
const SVGO = require('svgo');
const path = require('path');
const mkdirp = require('mkdirp');
const glob = require('glob');

const utils = require('./utils');

module.exports = {
  optimizeIllustrations: (BASE_PATH, finishedCallback) => {
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

    const illustrations = [];

    console.log(`Optimize ${illustrationFiles.length} Illustrations`);

    async.forEachOf(
      illustrationFiles,
      (file, key, callback) => {
        const relName = path.relative(BASE_PATH, file);
        const fpath = path.join(dest, relName);

        utils
          .readFilePromise(path.resolve(file), 'utf8')
          .then(data => svgo.optimize(data, { path: path.resolve(file) }))
          .then(result => {
            mkdirp.sync(path.dirname(fpath));

            return utils.writeFilePromise(fpath, result.data);
          })
          .then(() => {
            illustrations.push({
              name: relName,
              size: utils.getFilesizeInBytes(fpath),
            });
            callback();
          })
          .catch(e => callback(e));
      },
      err => {
        if (err) {
          return finishedCallback(err);
        }

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

        return utils
          .writeFilePromise(
            path.join(dest, 'illustrations.json'),
            JSON.stringify(illustrationsInfo, null, 2),
            'utf8',
          )
          .then(() => finishedCallback())
          .catch(e => finishedCallback(e));
      },
    );
  },
};
