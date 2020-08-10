module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件
  outputDir: process.env.outputDir,
  // 关闭map文件
  productionSourceMap: false,
  devServer: {
    port: 8082,
  }
};