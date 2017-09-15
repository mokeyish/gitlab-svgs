/* eslint-disable no-commonjs */
const SVGSpriter = require('svg-sprite');
const SVGO = require('svgo');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
const glob = require('glob');

const illustrationFilesPath = path.join('illustrations');
const dest = path.normalize(path.join('dist'));
const illustrationFiles = glob.glob.sync(`${illustrationFilesPath}**/*.svg`, {});
const svgo = new SVGO();

illustrationFiles.forEach((file) => {
  fs.readFile(path.resolve(file), 'utf8', (err, data) => {
    if (err) {
      console.log('ERR ', err);
      throw err;
    }

    svgo.optimize(data, (result) => {
      const fpath = path.join(dest, file);
      mkdirp.sync(path.dirname(fpath));
      fs.writeFile(fpath, result.data, (err) => {
        if (err) {
          return console.log(err);
        }
        console.log(`Optimized : ${file}`);
      });
    });
  });
});
