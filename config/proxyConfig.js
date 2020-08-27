module.exports = {
  proxy: {
        '/api': {
            target: 'http://localhost:65302/',  // 接口域名
            changeOrigin: true,  //是否跨域
            ws: true
        }
  }
}