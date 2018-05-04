/* eslint-disable import/no-commonjs */
const async = require('async');
const SVGSpriter = require('svg-sprite');
const SVGO = require('svgo');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
const glob = require('glob');

const utils = require('./utils');

module.exports = {
  optimizeIllustrations: finishedCallback => {
    const illustrationFilesPath = path.join('illustrations');
    const dest = path.normalize(path.join('dist'));
    const illustrationFiles = glob.glob.sync(`${illustrationFilesPath}/**/*.svg`, {});
    const svgo = new SVGO();

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
            const fpath = path.join(dest, file);
            mkdirp.sync(path.dirname(fpath));
            fs.writeFile(fpath, result.data, writeError => {
              if (writeError) {
                callback(writeError);
                return console.log(writeError);
              }
              illustrations.push({
                name: file,
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
          illustrations,
        };

        fs.writeFileSync(
          path.join(__dirname, '..', 'dist', 'illustrations.json'),
          JSON.stringify(illustrationsInfo),
          'utf8',
        );

        if (finishedCallback) finishedCallback();
      },
    );
  },
};
