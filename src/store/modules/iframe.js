export default {
  state: {
    iframeUrl: [],   // 当前嵌套页面路由路径
    iframeUrls: []   // 所有嵌套页面路由路径访问URL
  },
  getters: {
  },
  mutations: {
    setIFrameUrl(state, iframeUrl) {  // 设置iframeUrl
      state.iframeUrl = iframeUrl
    },
    addIFrameUrl(state, iframeUrl) {  // iframeUrls
      state.iframeUrls.push(iframeUrl)
    }
  },
  actions: {
  }
}

/** Data Format Example:
 * 
 * iframeUrls:[
    {
      path:"www.baidu.com",
      url:"http://www.baidu.com"
    },
    {
      path:"/sys/user",
      url:"http://localhost:8080/sys/user"
    }
   ]
 */