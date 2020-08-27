import { deepcopy } from "@/utils/helper"

export default {
  state: {
    noReadMessages: [],  // 未讀消息
    haveReadMessages: [] // 已讀消息
  },
  getters: {
 
  },
  mutations: {
    clearAllMessage(state) {
      state.noReadMessages = []
      state.haveReadMessages = []
    },
    addNoReadMessage(state, noReadMessage) {

      if (Array.isArray(noReadMessage)) {

        noReadMessage.forEach(m => {
          state.noReadMessages.push(m)
        })
      } else {
        state.noReadMessages.push(noReadMessage)
      }

      //sort by sendTime desc
      state.noReadMessages.sort(function(front, behind){
        return new Date(front.sendTime) < new Date(behind.sendTime) ? 1 : -1
      })
    },
    removeNoReadMessage(state, index) {

      state.noReadMessages.splice(index, 1)
    },
    addHaveReadMessage(state, haveReadMessage) {

      if (Array.isArray(haveReadMessage)) {

        haveReadMessage.forEach(m => {
          state.haveReadMessages.push(m)
        })
      } else {
        state.haveReadMessages.push(haveReadMessage)
      }

      //sort by sendTime desc
      state.haveReadMessages.sort(function(front, behind){
        return new Date(front.sendTime) < new Date(behind.sendTime) ? 1 : -1
      })
    }
  },
  actions: {
      
  }
}


/** Data Format Example:
 * 
 * noReadMessages:[
    {
      "id": "2c9180895e13261e015e13469b7e0002",
      "sender": "system",
      "senderName": "system",
      "title": "測試標題",
      "content": "測試內容",
      "sendTime": "2020/3/30 14:20:42",
      "type": 2,
      "status": 2,
    },
    {
      "id": "2c9180895e13261e015e13469b7e0001",
      "sender": "system",
      "senderName": "system",
      "title": "測試標題",
      "content": "測試內容",
      "sendTime": "2020/3/30 14:20:42",
      "type": 2,
      "status": 3,
    }
   ]
 */