export default {
  state: {
      // apiPerms: [],  // 用户Api权限标识集合 ！！！=>已转存到sessionStorage中，防止页面刷新时丢失
  },
  getters: {
 
  },
  mutations: {
    // setApiPerms(state, apiPerms){
    //   state.apiPerms = apiPerms;
    // }
  },
  actions: {
  }
}

/** Data Format Example:
 * 
 * apiPerms：{ "get,/url1": true, "post,/url2": true, ... }
 */