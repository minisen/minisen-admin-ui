<template>
  <div class="personal-panel">
    <div class="personal-desc" :style="{'background':this.$store.state.app.themeColor}">
        <div class="avatar-container">
          <img class="avatar" :src="require('@/assets/user.png')" />
        </div>  
        <div class="name-role">
          <span class="sender">{{ user.name }} - {{ user.role }}</span>
        </div>  
        <!-- <div class="registe-info">
          <span class="registe-info">
            <li class="fa fa-clock-o"></li>
            {{ user.registeInfo }}
          </span>
        </div>   -->
    </div>
    <!-- <div class="personal-relation">
        <span class="relation-item">followers</span>  
        <span class="relation-item">watches</span>  
        <span class="relation-item">friends</span>
    </div>
    <div class="main-operation">
        <span class="main-operation-item">
          <el-button size="small" icon="fa fa-male"> 个人中心</el-button>
        </span>
        <span class="main-operation-item">
          <el-button size="small" icon="fa fa-key"> 修改密码</el-button>
        </span>    
    </div>
    <div class="other-operation">
        <div class="other-operation-item">
          <li class="fa fa-eraser"></li>
          清除缓存
        </div>    
        <div class="other-operation-item">
          <li class="fa fa-user"></li>
          在线人数
        </div>    
        <div class="other-operation-item">
          <li class="fa fa-bell"></li>
          访问次数
        </div>    
        <div class="other-operation-item" @click="showBackupDialog">
          <li class="fa fa-undo"></li>
          {{$t("common.backupRestore")}}
        </div>
    </div> -->
    <div v-has="[api.login.changePassword]" class="other-operation-item" @click="showChangePwd">
      <li class="fa fa-key"></li>
      {{$t("action.changePwd")}}
    </div>
    <div v-has="[api.login.logout]" class="personal-footer" @click="logout">
      <li class="fa fa-sign-out"></li>
      {{$t("common.logout")}}
    </div> 

    <!--修改密碼界面-->
    <change-pwd ref="changePwdDialog"></change-pwd>

  </div>
</template>

<script>
import api from '@/http/api.js'
import Cookies from "js-cookie"
import ChangePwd from "@/views/Core/ChangePwd.vue"
import { sessionStorageKey } from '@/utils/global'

export default {
  name: 'PersonalPanel',
  components:{
    ChangePwd
  },
  props: {
    user: {
      type: Object,
      default: {
        name: "请登录",
        avatar: "",
        role: "请登录",
        registeInfo: ""
      }
    }
  },
  data() {
    return {
      api: api
    }
  },
  methods: {
    // 退出登录
    logout: function() {
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      }).then(() => {
        
        this.$api.login.logout.r().then((res) => {

          sessionStorage.removeItem(sessionStorageKey.account)
          sessionStorage.removeItem(sessionStorageKey.userName)
          sessionStorage.removeItem(sessionStorageKey.role)
          sessionStorage.removeItem(sessionStorageKey.token)
          sessionStorage.removeItem(sessionStorageKey.setApiPerms)
          sessionStorage.setItem(sessionStorageKey.broadcastHubConnectionId, '')
          this.$router.push("/login")

        }).catch(function(res) {})

      })
      .catch(() => {})
    },
    showChangePwd: function() {
      this.$refs.changePwdDialog.setVisible(true)
    }
    
  },
  mounted() {
  }
}
</script>

<style scoped>
.personal-panel {
  font-size: 14px;
  width: 280px;
  text-align: center;
  border-color: rgba(180, 190, 190, 0.2);
  border-width: 1px;
  border-style: solid;
  background: rgba(182, 172, 172, 0.1);
  margin: -14px;
}
.personal-desc {
  padding: 15px;
  color: #fff;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 90px;
}
.name-role {
  font-size: 16px;
  padding: 5px;
}
.personal-relation {
  font-size: 16px;
  padding: 12px;
  margin-right: 1px;
  background: rgba(200, 209, 204, 0.3);
}
.relation-item {
  padding: 12px;
}
.relation-item:hover {
  cursor: pointer;
  color: rgb(19, 138, 156);
}
.main-operation {
  padding: 8px;
  margin-right: 1px;
  /* background: rgba(175, 182, 179, 0.3); */
  border-color: rgba(201, 206, 206, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.main-operation-item {
  margin: 15px;
}
.other-operation {
  padding: 15px;
  margin-right: 1px;
  text-align: left;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.other-operation-item {
  padding: 12px;
}
.other-operation-item:hover {
  cursor: pointer;
  background: #9e94941e;
  color: rgb(19, 138, 156);
}
.personal-footer {
  margin-right: 1px;
  font-size: 14px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.personal-footer:hover {
  cursor: pointer;
  color: rgb(19, 138, 156);
  background: #b1a6a61e;
}
</style>