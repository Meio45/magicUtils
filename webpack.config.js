const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const commonJsConfig = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.cjs.js',
    library: {
      type: 'commonjs2',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 8889, 
      generateStatsFile: true,
      statsOptions: { source: false },
    }),
  ],
};

const esmConfig = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.esm.js',
    library: {
      type: 'module',
    },
    environment: {
      module: true,
    },
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 8890,  
      generateStatsFile: true,
      statsOptions: { source: false },
    }),
  ],
};

module.exports = [commonJsConfig, esmConfig];
