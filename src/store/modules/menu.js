export default {
  state: {
    navTree: [],  // 导航菜单树
  },
  getters: {
 
  },
  mutations: {
    setNavTree(state, navTree){  // 设置导航菜单树
      state.navTree = navTree;
    }
  },
  actions: {
      
  }
}

/** Data Format Example:
 * 
 * navTree:[
    {
      id: "3",
      name: "系統管理",
      route: "",
      isMenuItem:false,
      icon:"el-icon-receiving"
      children:[
        {
          id: "4",
          name: "用戶管理",
          route: "/accounts",
          isMenuItem:false,
          icon:"el-icon-receiving"
        },{
          id: "5",
          name: "角色管理",
          route: "/roles",
          isMenuItem:false,
          icon:"el-icon-receiving"
        }
      ]
    }
   ]
 */