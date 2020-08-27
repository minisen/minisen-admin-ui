import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import * as helper from '@/utils/helper'
import instance from '@/http/axios'
import api from '@/http/api'
import { getIFramePath, getIFrameUrl } from '@/utils/iframe'
import { sessionStorageKey } from '@/utils/global'

const Login = () => import('../views/Login/Login.vue')
const Home = () => import('../views/Home/Home.vue')
const IFrame = () => import('../views/IFrame/IFrame.vue')

Vue.use(VueRouter)

const baseRoute = [
  {
    path: '/',
    name: '首页',
    component: Home,
    children: [
    ]
  },
  {
    path: '/login',
    name: '登錄',
    component:Login
  }
]

const router = new VueRouter({
  routes: baseRoute,
  mode:'history',
})

/**
 * 在路由导航守卫中检测登陆状态、加載菜單和路由數據
 */
router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let token = sessionStorage.getItem(sessionStorageKey.token)
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(!helper.isEmpty(token)) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (helper.isEmpty(token)) {
      // 如果访问非登录界面，且用户会话信息不存在，代表未登录，则跳转到登录界面
      next({ path: '/login' })
    } else {

      // 处理IFrame嵌套页面
      handleIFrameUrl(to.path)

      // 加载动态菜单和路由
      addDynamicRoutesAndsetApiInterceptor()
      next()
    }
  }
})

/** 
 * 加载动态菜单和路由且設置Api權限過濾器
 */
function addDynamicRoutesAndsetApiInterceptor() {

  if(store.state.app.menuRouteLoaded) {
    //动态菜单和路由已存在
    return
  }

  api.menu.getAccountHasNavMenus.r().then(res => {

    let navMenus = res.data.sendData.navMenus
    let navTree = helper.buildMenu(navMenus)

    // 添加动态路由
    let dynamicRoutes = addDynamicRoutes(navTree)
    // 处理静态组件绑定路由
    handleStaticComponent(router, dynamicRoutes)
    router.addRoutes(router.options.routes)

    // 保存加载状态
    store.commit('menuRouteLoaded', true)
    // 保存菜单树
    store.commit('setNavTree', navTree)
    
    return api.permission.getAccountHasApiPermissions.r()

  }).then(res => {

    let apiResources = res.data.sendData.apiResources
    let apiResourceHash = getApiResourceHash(apiResources)

    setApiCheckInterceptor(apiResourceHash)

    // 保存用户Api权限标识集合 ！！！！(保存到sessionStorage,页面刷新不会丢失)
    //store.commit('setApiPerms', apiResourceHash)
    sessionStorage.setItem(sessionStorageKey.setApiPerms, JSON.stringify(apiResourceHash))
    
  }).catch(function(res) {
  })
}

/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
function handleStaticComponent(router, dynamicRoutes) {
  // for(let j=0;j<dynamicRoutes.length; j++) {
  //   if(dynamicRoutes[j].name == '代码生成') {
  //     dynamicRoutes[j].component = Generator
  //     break
  //   }
  // }
  router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
}

/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  for(let i=0; i<length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if(path != null && path.endsWith(iframe.path)) {
      url = iframe.url
      store.commit('setIFrameUrl', url)
      break
    }
  }
}

/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function addDynamicRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].route && /\S/.test(menuList[i].route)) {
       menuList[i].route = menuList[i].route.replace(/^\//, '')
       // 创建路由配置
       var route = {
         path: menuList[i].route,
         component: null,
         name: menuList[i].name
       }
       let path = getIFramePath(menuList[i].route)
       if (path) {
         // 如果是嵌套页面, 通过iframe展示
         route['path'] = path
         route['component'] = IFrame
         // 存储嵌套页面路由路径和访问URL,以便IFrame组件根据path检索url进行页面的展示
         let url = getIFrameUrl(menuList[i].route)
         let iFrameUrl = {'path':path, 'url':url}
         store.commit('addIFrameUrl', iFrameUrl)
       } else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
          // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
          let url = helper.urlToHump(menuList[i].route)
          route['component'] = resolve => require([`@/views/${url}`], resolve)
        
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}

/**
 * 獲取Api訪問資源哈希結構
 * 格式為：
 * { "get,/url1": true, "post,/url2": true, ... }
 * @param {*} apiResources 
 */
function getApiResourceHash(apiResources) {

  let resourceHash = {}
  if (Array.isArray(apiResources)) {
    /*
    * Input like this:
    * [{
    *   id: "2c9180895e172348015e1740805d000d",
        method: "GET",
        url: "/some-url"
    * }]
    */
    apiResources.forEach(e => {
      let key = helper.urlToHump(e.method.toLowerCase() + ',' + e.url)
      resourceHash[key] = true
    })
  }
  /* Get hash structure, like this:
     { "get,/url1": true, "post,/url2": true, ... }
  */
  return resourceHash
}

/**
 * 設置Api訪問權限的axios請求過濾器
 * @param {*} apiResourcePermission 
 */
function setApiCheckInterceptor(apiResourcePermission) {
  instance.interceptors.request.use(config => {
    
    // Check permissions

    let apiKey = helper.urlToHump(config.method.toLowerCase() + ',' + config.url)
    
    if (!apiResourcePermission[apiKey]) {

      Vue.prototype.$message({message: 'no permission', type: 'error'})
      console.log('no permission:'+config.url)
      return Promise.reject({
        message: 'no permission'
      })
    }
    return config
  })
}

export default router

