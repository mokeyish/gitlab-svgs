const {
  fileExtensionIcons,
  fileNameIcons,
  twoFileExtensionIcons,
} = require('../src/file_icon_map');

const usedFileIcons = [
  ...new Set(Object.values({ ...fileNameIcons, ...fileExtensionIcons, ...twoFileExtensionIcons })),
].sort();

// eslint-disable-next-line no-restricted-syntax
for (const icon of usedFileIcons) {
  console.log(icon);
}
