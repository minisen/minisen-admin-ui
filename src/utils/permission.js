import store from '@/store'
import * as helper from '@/utils/helper'

/**
 * 判断用户是否拥有操作权限
 * 对比vuex中存储的当前用户拥有api权限集合
 * 根据传入的权限标识，查看是否存在用户权限标识集合
 * @param {*} apiPermArray 被判断的api权限数组
 * 例：apiPermArray 
 *   => [
          {
            p: ['post, /api/login/login'],
            ...
          }     
        ]
 */
export function hasApiPerms (apiPermArray) {

  let hasApiPerms = JSON.parse(sessionStorage.getItem('setApiPerms'))
  let RequiredPermissions = []
  let permission = true
  
  if (Array.isArray(apiPermArray)) {
    apiPermArray.forEach(e => {
      if(e && e.p){
        RequiredPermissions = RequiredPermissions.concat(e.p.map(hashUrl => helper.urlToHump(hashUrl.replace(/\s*/g,""))))
      }
    });
  } else {
    if(apiPermArray && apiPermArray.p){
      RequiredPermissions = apiPermArray.p.map(hashUrl => helper.urlToHump(hashUrl.replace(/\s*/g,"")))
    }
    
  }

  for(let i=0;i<RequiredPermissions.length;i++){
    let p = helper.urlToHump(RequiredPermissions[i].replace(/\s*/g,""))
    if (!hasApiPerms[p]) {

      console.log('apiPerms')
      console.log(hasApiPerms)
      permission = false
      break
    }
  }
  
  return permission
}