const { writeFile, mkdir } = require('fs/promises');
const path = require('path');
const rimraf = require('rimraf');

const packageJSON = require('../package.json');
const { optimizeSVGs } = require('./src/svg_optimization');
const { createIconSprite } = require('./src/svg_sprite_icons');
const { copyFolderRecursive, copyFile } = require('./src/utils');
const { collectIllustrations } = require('./src/illustrations');

const BASE_PATH = path.join(__dirname, '..');
const REVIEW_PATH = path.join(BASE_PATH, 'review');

const DIST_PATH = path.join(BASE_PATH, 'dist');
const FILE_ICONS_DIST_PATH = path.join(DIST_PATH, 'file_icons');
const STATIC_PATH = path.normalize(path.join(BASE_PATH, 'svgpreviewer', 'static'));

async function writeReviewMetadata() {
  await mkdir(REVIEW_PATH, { recursive: true });

  let data = {
    version: packageJSON.version,
  };

  if (process.env.CI) {
    const {
      CI_JOB_ID,
      CI_PIPELINE_URL,
      CI_MERGE_REQUEST_PROJECT_URL,
      CI_MERGE_REQUEST_IID,
      CI_MERGE_REQUEST_TITLE,
    } = process.env;

    data = {
      ...data,
      jobId: CI_JOB_ID,
      pipelineURL: CI_PIPELINE_URL,
    };

    if (CI_MERGE_REQUEST_PROJECT_URL && CI_MERGE_REQUEST_IID) {
      data.mrURL = `${CI_MERGE_REQUEST_PROJECT_URL}/-/merge_requests/${CI_MERGE_REQUEST_IID}`;
      data.mrTitle = CI_MERGE_REQUEST_TITLE;
    }
  }

  await writeFile(path.join(REVIEW_PATH, 'metadata.json'), JSON.stringify(data));
}

async function buildFiles() {
  console.log('Creating Icon Sprite...');
  await createIconSprite(
    BASE_PATH,
    DIST_PATH,
    path.join(BASE_PATH, 'sprite_icons', '*.svg'),
    'icons',
  );
  console.log('Created Icon Sprite');

  console.log('Creating File Icon Sprite...');
  await createIconSprite(
    BASE_PATH,
    FILE_ICONS_DIST_PATH,
    path.join(BASE_PATH, 'file_icons', '*.svg'),
    'file_icons',
  );
  console.log('Created File Icon Sprite');

  console.log('Optimizing icons...');
  await optimizeSVGs(
    BASE_PATH,
    DIST_PATH,
    path.join(BASE_PATH, 'sprite_icons', '**', '*.svg'),
    path.join(DIST_PATH, 'icons_individual.json'),
  );
  console.log('Optimized icons');

  console.log('Optimizing file icons...');
  await optimizeSVGs(
    BASE_PATH,
    FILE_ICONS_DIST_PATH,
    path.join(BASE_PATH, 'file_icons', '**', '*.svg'),
    path.join(FILE_ICONS_DIST_PATH, 'file_icons_individual.json'),
  );
  console.log('Optimized file icons');

  await collectIllustrations(BASE_PATH, DIST_PATH);

  console.log('Copying files to dist ...');
  await copyFolderRecursive(DIST_PATH, STATIC_PATH);

  console.log('Copying file_icons notice');
  await copyFile(path.join(BASE_PATH, 'file_icons', 'LICENSE.md'), FILE_ICONS_DIST_PATH);

  console.log('Writing out metadata');
  await writeReviewMetadata();
}

rimraf(`${DIST_PATH}/**/*`, async () => {
  console.log('Cleared out dist folder');

  try {
    await buildFiles();
  } catch (err) {
    console.error('Something went wrong');
    console.error(err);
    process.exit(1);
  }
});
