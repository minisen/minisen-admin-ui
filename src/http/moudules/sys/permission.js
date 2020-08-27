import instance from '@/http/axios'
import qs from 'qs'

/* 
 * 權限管理模块
 */

/**
 * 獲取用戶所拥有Api權限
 */
const getAccountHasApiPermissions = {
  p: ['get, /api/SystemBaseManage/permission/getAccountHasApiPermissions'],
  r: () => {
    return instance({
      url: '/api/SystemBaseManage/permission/getAccountHasApiPermissions',
      method: 'get'
    })
  }
}

/**
 * 分页获取Api权限项数据
 */
const getItemsPaged = {
  p: ['get, /api/SystemBaseManage/permission/getItemsPaged'],
  r: params => {
    return instance({
      url: '/api/SystemBaseManage/permission/getItemsPaged',
      method: 'get',
      params
    })
  }
}

/**
 * 添加Api权限数据项
 */
const addItem = {
  p: ['post, /api/SystemBaseManage/permission/addItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/permission/addItem',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

/**
 * 编辑Api权限数据项
 */
const editItem = {
  p: ['post, /api/SystemBaseManage/permission/editItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/permission/editItem',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

/**
 * 删除Api权限数据项
 */
const deleteItem = {
  p: ['post, /api/SystemBaseManage/permission/deleteItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/permission/deleteItem',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}


 export {
  getAccountHasApiPermissions,
  getItemsPaged,
  addItem,
  editItem,
  deleteItem
 }