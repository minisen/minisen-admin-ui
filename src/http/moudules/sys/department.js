import instance from '@/http/axios'
import qs from 'qs'

/* 
 * 部門管理模块
 */

/**
 * 获得所有部門项数据
 */
const getAllItems_ApiUrl = '/api/SystemBaseManage/department/getAllItems'
const getAllItems = {
  p: ['get, ' + getAllItems_ApiUrl],
  r: () => {
    return instance({
      url: getAllItems_ApiUrl,
      method: 'get'
    })
  }
}

/**
 * 添加部門项
 */
const addItem_ApiUrl = '/api/SystemBaseManage/department/addItem'
const addItem = {
  p: ['post, ' + addItem_ApiUrl],
  r: data => {
    return instance({
      url: addItem_ApiUrl,
      method: 'post',
      data: qs.stringify(data)
    })
  }
}


/**
 * 編輯部門项
 */
const editItem_ApiUrl = '/api/SystemBaseManage/department/editItem'
const editItem = {
  p: ['post, ' + editItem_ApiUrl],
  r: data => {
    return instance({
      url: editItem_ApiUrl,
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

/**
 * 删除部門项
 */
const deleteItem_ApiUrl = '/api/SystemBaseManage/department/deleteItem'
const deleteItem = {
  p: ['post, ' + deleteItem_ApiUrl],
  r: data => {
    return instance({
      url: deleteItem_ApiUrl,
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

export {
  getAllItems,
  addItem,
  editItem,
  deleteItem
}