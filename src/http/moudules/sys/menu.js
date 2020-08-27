import instance from '@/http/axios'
import qs from 'qs'

/* 
 * 菜单管理模块
 */

/**
 * 獲取用戶所有導航菜單
 */
const getAccountHasNavMenus = {
  p: ['get, /api/SystemBaseManage/menu/getAccountHasNavMenus'],
  r: () => {
    return instance({
      url: '/api/SystemBaseManage/menu/getAccountHasNavMenus',
      method: 'get'
    })
  }
}

/**
 * 获得所有菜单项数据
 */
const getAllItems = {
  p: ['get, /api/SystemBaseManage/menu/getAllItems'],
  r: () => {
    return instance({
      url: '/api/SystemBaseManage/menu/getAllItems',
      method: 'get'
    })
  }
}

/**
 * 添加菜单数据项
 */
const addItem = {
  p: ['post, /api/SystemBaseManage/menu/addItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/menu/addItem',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

/**
 * 编辑菜单数据项
 */
const editItem = {
  p: ['post, /api/SystemBaseManage/menu/editItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/menu/editItem',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

/**
 * 删除菜单数据项
 */
const deleteItem = {
  p: ['post, /api/SystemBaseManage/menu/deleteItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/menu/deleteItem',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

 export {
  getAccountHasNavMenus,
  getAllItems,
  addItem,
  editItem,
  deleteItem
 }