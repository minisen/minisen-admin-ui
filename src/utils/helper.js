/**
 *  輔助操作的函數
 */

 /**
 * 获取一个GUID字符串
 */
export const guid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}

/**
 * 深拷贝
 * 將傳入的js對象進行深拷貝
 * @param {*} source 需要進行深拷貝的對象資源
 */
export const deepcopy = function (source) {
  if (!source) {
    return source;
  }
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
  }
  return sourceCopy;
}

/**
 * 判斷字符串是否為空（undefined、null、""）
 * @param {*} obj 輸入字符串
 */
export const isEmpty = function (obj){
  if(typeof obj == "undefined" || obj == null || obj == ""){
      return true;
  }else{
      return false;
  }
}

/**
 * 将url的格式转换为驼峰的格式
 * 例：sys/user   =>   Sys/User
 * @param {*} url 输入url字串
 */
export const urlToHump = function(url){

  let humpUrl = ''
  let array = url.split('/')
  for(let i=0; i<array.length; i++) {
    humpUrl += array[i].substring(0,1).toUpperCase() + array[i].substring(1) + '/'
  }
  humpUrl = humpUrl.substring(0, humpUrl.length - 1)

  return humpUrl
}

/**
 * 以目錄樹的形式組織菜單的數據
 * @param {*} originalMenuData 原始菜單數據
 * 例：
 * [
    {
      id: "3",
      name: "系統管理",
      parent_id: "-1"，
      ...
    },{
      id: "4",
      name: "用戶管理",
      parent_id: "3",
      ...
    },{
      id: "5",
      name: "角色管理",
      parent_id: "3",
      ...
    }
  ]

  經轉換後，數據格式：
  [
    {
      id: "3",
      name: "系統管理",
      ...
      children:[
        {
          id: "4",
          name: "用戶管理",
          ...
        },{
          id: "5",
          name: "角色管理",
          ...
        }
      ]
    }
  ]
 * @param {*} parentkey 
 */
export const buildMenu = function (originalMenuData, parentkey){
  let menuData = []
  parentkey = parentkey || "parent_id"

  if(!Array.isArray(originalMenuData)) return menuData
  
  originalMenuData.forEach(item => {
    delete item.children
  })

  let map = {}
  originalMenuData.forEach(item => {
    map[item.id] = item
  });

  originalMenuData.forEach(item => {
    let parent = map[item[parentkey]]
    if(parent) {
        (parent.children || (parent.children = [])).push(item)
    } else {
      menuData.push(item)
    }
  })

  return menuData
}
