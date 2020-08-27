import instance from '@/http/axios'
import qs from 'qs'

/**
 * 文章管理模块
 */

/**
 * 分页获取文章项数据
 */
const getItemsPaged_ApiUrl = '/api/Blog/Article/getItemsPaged'
const getItemsPaged = {
  p: ['get, ' + getItemsPaged_ApiUrl],
  r: params => {
    return instance({
      url: getItemsPaged_ApiUrl,
      method: 'get',
      params
    })
  }
}

/**
 * 添加文章项
 */
const addItem_ApiUrl = '/api/Blog/Article/addItem'
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
 * 編輯文章项
 */
const editItem_ApiUrl = '/api/Blog/Article/editItem'
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
 * 删除文章项
 */
const deleteItem_ApiUrl = '/api/Blog/Article/deleteItem'
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
  getItemsPaged,
  addItem,
  editItem,
  deleteItem
}