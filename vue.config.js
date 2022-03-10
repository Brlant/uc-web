const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  devServer: {
    open: true,
    port: '8011',
    https: false,
    hotOnly: false, disableHostCheck: true, proxy: {
      '/api': {
        target: 'https://hw-test-uc.cdcerp.cn',
        changOrigin: true
      }
    }
  },
  transpileDependencies: ['@dtop'],
  configureWebpack: {
    plugins:[new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'), to: 'static',
        ignore: ['.*']
      }])
    ]
  }
};
