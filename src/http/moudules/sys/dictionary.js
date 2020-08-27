import instance from '@/http/axios'
import qs from 'qs'

/**
 * 字典管理模块
 */

/**
 * 分页获取字典项数据
 */
const getItemsPaged = {
  p: ['get, /api/SystemBaseManage/Dictionary/getItemsPaged'],
  r: params => {
    return instance({
      url: '/api/SystemBaseManage/Dictionary/getItemsPaged',
      method: 'get',
      params
    })
  }
}

/**
 * 添加字典项
 */
const addItem = {
  p: ['post, /api/SystemBaseManage/Dictionary/addItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/Dictionary/addItem',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

/**
 * 编辑字典项
 */
const editItem = {
  p: ['post, /api/SystemBaseManage/Dictionary/editItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/Dictionary/editItem',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

/**
 * 删除字典项
 */
const deleteItem = {
  p: ['post, /api/SystemBaseManage/Dictionary/deleteItem'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/Dictionary/deleteItem',
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