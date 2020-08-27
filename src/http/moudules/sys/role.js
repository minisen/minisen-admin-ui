import instance from '@/http/axios'
import qs from 'qs'

/**
 * 角色管理模块
 */

/**
 * 分页获取角色项数据
 */
const getItemsPaged = {
  p: ['get, /api/SystemBaseManage/role/getItemsPaged'],
  r: params => {
    return instance({
      url: '/api/SystemBaseManage/role/getItemsPaged',
      method: 'get',
      params
    })
  }
}

/**
 * 添加角色
 */
const addItem = {
  p: ['post, /api/SystemBaseManage/role/addItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/role/addItem',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

/**
 * 编辑角色
 */
const editItem = {
  p: ['post, /api/SystemBaseManage/role/editItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/role/editItem',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

/**
 * 删除角色
 */
const deleteItem = {
  p: ['post, /api/SystemBaseManage/role/deleteItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/role/deleteItem',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

/**
 * 为角色设置Api权限
 */
const setApiPermissions = {
  p: ['post, /api/SystemBaseManage/role/setApiPermissions'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/role/setApiPermissions',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

/**
 * 为角色设置菜单权限
 */
const setMenuPermissions = {
  p: ['post, /api/SystemBaseManage/role/setMenuPermissions'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/role/setMenuPermissions',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}


export {
  getItemsPaged,
  addItem,
  editItem,
  deleteItem,
  setApiPermissions,
  setMenuPermissions
}