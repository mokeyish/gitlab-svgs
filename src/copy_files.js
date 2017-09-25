/* eslint-disable no-commonjs */
const path = require('path');
const fs = require('fs');

const sourcePath = path.join('dist');
const destPath = path.normalize(path.join('svgpreviewer', 'static'));

// Helper Functions
function copyFileSync(source, target) {
  let targetFile = target;
  // If target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }
  console.log(`Copy SVG File : ${targetFile}`);
  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
  let files = [];

  // Check if folder needs to be created or integrated
  const targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

// Actual Task copying the 2 files + all illustrations
copyFolderRecursiveSync(sourcePath, destPath);
