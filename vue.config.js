const path = require('path');
const timestamp = new Date().getTime();
module.exports = {
  // 关闭map文件
  productionSourceMap: false,
  publicPath:'./',
  devServer: {
    port: 8082,
    open:true,
    proxy: {
      '/api': {  
        target: 'https://admin-hotfix.dev.ehafo.com',// 测试
        secure: true,
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('@mock', path.resolve(__dirname, 'mock'));
    config.performance.set('maxAssetSize', 1024 * 1024).set('maxEntrypointSize', 1024 * 1024);
  },
  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].[chunkhash].${timestamp}.js`,
      chunkFilename: `[name].[chunkhash].${timestamp}.js`
    },
  },
};
