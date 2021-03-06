const path = require('path');
module.exports = {
  // 关闭map文件
  productionSourceMap: false,
  publicPath: './',
  devServer: {
    port: 8082,
    open: false,
    proxy: {
      '/api': {
        target: 'https://admin.ehafo.com', // 测试
        secure: true,
        changeOrigin: true, //是否跨域
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
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // 自定义antd主题色
          modifyVars: {
            // 'primary-color': '#41b883'
            // 'link-color': '#1DA57A',
            // 'border-radius-base': '2px',
          },
          javascriptEnabled: true
        }
      }
    }
  }
};
