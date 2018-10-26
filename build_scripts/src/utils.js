const fs = require('fs');
const path = require('path');

const utils = {
  getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename);
    return stats.size;
  },

  readFilePromise: (file, options) =>
    new Promise((resolve, reject) => {
      fs.readFile(file, options, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),

  writeFilePromise: (file, data, options) =>
    new Promise((resolve, reject) => {
      fs.writeFile(file, data, options, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }),

  copyFileSync: (source, target) => {
    let targetFile = target;
    // If target is a directory a new file with the same name will be created
    if (fs.existsSync(target)) {
      if (fs.lstatSync(target).isDirectory()) {
        targetFile = path.join(target, path.basename(source));
      }
    }
    console.log(`Copy File : ${targetFile}`);
    fs.writeFileSync(targetFile, fs.readFileSync(source));
  },

  copyFolderRecursiveSync: (source, target) => {
    let files = [];

    // Check if folder needs to be created or integrated
    const targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }

    // Copy
    if (fs.lstatSync(source).isDirectory()) {
      files = fs.readdirSync(source);
      files.forEach(file => {
        const curSource = path.join(source, file);
        if (fs.lstatSync(curSource).isDirectory()) {
          utils.copyFolderRecursiveSync(curSource, targetFolder);
        } else {
          utils.copyFileSync(curSource, targetFolder);
        }
      });
    }
  },
};

module.exports = utils;
