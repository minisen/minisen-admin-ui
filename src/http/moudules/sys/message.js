import instance from '@/http/axios'
import qs from 'qs'

/**
 * 消息模块
 */

/**
 * 獲取當前用戶的消息
 */
const getAccountMessages = {
  p: ['get, /api/SystemBaseManage/Message/getAccountMessages'],
  r: params => {
    return instance({
      url: '/api/SystemBaseManage/Message/getAccountMessages',
      method: 'get',
      params
    })
  }
}

/**
 * 標記消息已讀
 */
const markReadMessage = {
  p: ['post, /api/SystemBaseManage/Message/markReadMessage'],
  r: data => {
    return instance({
      url: '/api/SystemBaseManage/Message/markReadMessage',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}


export {
  getAccountMessages,
  markReadMessage
}