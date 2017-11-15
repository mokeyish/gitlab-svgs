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
  optimizeIllustrations: (finishedCallback) => {
    const illustrationFilesPath = path.join('illustrations');
    const dest = path.normalize(path.join('dist'));
    const illustrationFiles = glob.glob.sync(`${illustrationFilesPath}/**/*.svg`, {});
    const svgo = new SVGO();

    const illustrations = [];

    async.forEachOf(illustrationFiles, (file, key, callback) => {
      fs.readFile(path.resolve(file), 'utf8', (err, data) => {
        if (err) {
          console.log('ERR ', err);
          callback(err);
          throw err;
        }

        svgo.optimize(data, (result) => {
          const fpath = path.join(dest, file);
          mkdirp.sync(path.dirname(fpath));
          fs.writeFile(fpath, result.data, (writeError) => {
            if (writeError) {
              callback(writeError);
              return console.log(writeError);
            }
            console.log(`Optimized : ${file}`);

            illustrations.push({
              name: file,
              size: utils.getFilesizeInBytes(fpath),
            });

            return callback();
          });
        });
      });
    }, (err) => {
      if (err) console.error(err.message);
      // configs is now a map of JSON data
      console.log('Found Illustrations : ', illustrations);

      // Save the Illustrations Info to a JSON
      const illustrationsInfo = {
        illustrationCount: illustrations.length,
        illustrations,
      };

      fs.writeFileSync(path.join(__dirname, '..', 'dist', 'illustrations.json'), JSON.stringify(illustrationsInfo), 'utf8');

      if (finishedCallback) finishedCallback();
    });
  },
};
