module.exports = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          convertPathData: {
            noSpaceAfterFlags: true,
          },
        },
      },
    },
  ],
};
