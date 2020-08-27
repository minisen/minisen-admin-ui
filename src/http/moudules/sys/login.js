import instance from '@/http/axios'
import qs from 'qs'

/* 
 * 系统登录模块
 */

/**
 * 登錄
 */
const login = {
  p: ['post, /api/SystemBaseManage/login/login'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/login/login',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

/**
 * 登出
 */
const logout = {
  p: ['post, /api/SystemBaseManage/login/logout'],
  r: () => {
    return instance({
      url: '/api/SystemBaseManage/login/logout',
      method: 'post'
    })
  }
}

/**
 * 修改密碼
 */
const changePassword = {
  p: ['post, /api/SystemBaseManage/login/changePassword'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/login/changePassword',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

export {
  login,
  logout,
  changePassword
}