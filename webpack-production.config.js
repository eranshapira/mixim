const makeWebpackConfig = require('./make-webpack-config');

const config = makeWebpackConfig({
  // commonsChunk: true,
  longTermCaching: true,
  separateStylesheet: false,
  minimize: true,
  devtool: false,
});

module.exports = config;
