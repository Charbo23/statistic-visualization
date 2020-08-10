module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件
  outputDir: process.env.outputDir,
  // 关闭map文件
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 8082,
    proxy: {
      '/api': {    //将www.exaple.com印射为/api
        // target: 'http://hd-admin.9jiudian.com',// 测试
        target: 'https://water3th.luxcon.cn/lt_jsq/',// 测试
        secure: true,
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
  }
};