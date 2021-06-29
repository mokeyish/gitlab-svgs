/* eslint-disable import/no-commonjs, filenames/match-regex */

const baseDir = process.env.CI ? '/gitlab-svgs/' : '/';

module.exports = {
  server: {
    port: 3333,
  },
  srcDir: 'svgpreviewer/',
  /*
   ** Headers of the page
   */
  head: {
    title: 'GitLab SVG Previewer',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Preview Application for all GitLab SVG assets.',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `${baseDir}favicon.ico`,
      },
    ],
    bodyAttrs: {
      class: 'ui_indigo',
    },
  },

  css: ['bootstrap/dist/css/bootstrap.css', '@/assets/gitlab-application.css'],

  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  generate: {
    dir: 'public',
  },

  router: {
    base: baseDir,
  },

  /*
   ** Build configuration
   */
  build: {},
};
