// vue.config.js
module.exports = {
  lintOnSave: false, //取消eslint
  devServer: {
      proxy: {
          '/api': {
              target: 'http://localhost:3000', 
              changeOrigin: true, 
              pathRewrite: {
                  '^/api': ''
              }
          }
      }
  }
}