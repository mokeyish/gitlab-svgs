const async = require('async');
const SVGO = require('svgo');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
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
        fs.readFile(path.resolve(file), 'utf8', (err, data) => {
          if (err) {
            console.log('ERR ', err);
            callback(err);
            throw err;
          }

          svgo.optimize(data, { path: path.resolve(file) }).then(result => {
            const relName = path.relative(BASE_PATH, file);
            const fpath = path.join(dest, relName);
            mkdirp.sync(path.dirname(fpath));
            fs.writeFile(fpath, result.data, writeError => {
              if (writeError) {
                callback(writeError);
                return console.log(writeError);
              }
              illustrations.push({
                name: relName,
                size: utils.getFilesizeInBytes(fpath),
              });

              return callback();
            });
          });
        });
      },
      err => {
        if (err) console.error(err.message);
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

        fs.writeFileSync(
          path.join(dest, 'illustrations.json'),
          JSON.stringify(illustrationsInfo, null, 2),
          'utf8',
        );

        if (finishedCallback) finishedCallback();
      },
    );
  },
};
