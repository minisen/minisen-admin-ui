import instance from '@/http/axios'
import qs from 'qs'

/**
 * 用户管理模块
 */

/**
 * 分页获取用户数据项
 */
const getItemsPaged = {
  p: ['get, /api/SystemBaseManage/Account/getItemsPaged'],
  r: params => {
    return instance({
      url: '/api/SystemBaseManage/Account/getItemsPaged',
      method: 'get',
      params
    })
  }
}

/**
 * 添加用户
 */
const addItem = {
  p: ['post, /api/SystemBaseManage/Account/addItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/Account/addItem',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

/**
 * 编辑用户
 */
const editItem = {
  p: ['post, /api/SystemBaseManage/Account/editItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/Account/editItem',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

/**
 * 删除用户
 */
const deleteItem = {
  p: ['post, /api/SystemBaseManage/Account/deleteItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/Account/deleteItem',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}


export {
  getItemsPaged,
  addItem,
  editItem,
  deleteItem
}