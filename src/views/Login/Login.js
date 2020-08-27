import { mapState } from 'vuex'
import ThemePicker from "@/components/ThemePicker"
import LangSelector from "@/components/LangSelector"
import { deepcopy } from "@/utils/helper"
import { sessionStorageKey } from '@/utils/global'

export default {
  name: 'Login',
  components:{
    ThemePicker,
    LangSelector
  },
  data() {
    return {
      loading: false,
      loginForm: {
        account: '',
        password: '',
        captcha:'',
        src: ''
      },
      fieldRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
        // ,
        // captcha: [
        //   { required: true, message: '请输入验证码', trigger: 'blur' }
        // ]
      },
      checked: true
    }
  },
  methods: {
    login() {
      this.loading = true
      let userInfo = {account:this.loginForm.account, password:this.loginForm.password}
      
      this.$api.login.login.r(userInfo).then((res) => {
          if(res.data.sendData.loginStatus == 'fail') {

            this.$message({
              message: res.data.sendData.failMessage,
              type: 'error'
            })

          } else if(res.data.sendData.loginStatus == 'success') {

            sessionStorage.setItem(sessionStorageKey.account, res.data.sendData.userInformation.account)
            sessionStorage.setItem(sessionStorageKey.userName, res.data.sendData.userInformation.userName)
            sessionStorage.setItem(sessionStorageKey.role, res.data.sendData.userInformation.role)
            sessionStorage.setItem(sessionStorageKey.token, res.data.sendData.token)
   
            this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
            this.$router.push('/')  // 跳转到主页

            return this.$api.message.getAccountMessages.r()

          } else {

            this.$message({
              message: '未知的登錄錯誤',
              type: 'error'
            })

          }

          this.loading = false

        }).then(res => {

          this.$store.commit('clearAllMessage')

          //獲取用戶的消息
          let messages = res.data.sendData.ItemsPaged

          let noSend = deepcopy(messages.filter(m => m.status == 2)) 
          let haveSend = deepcopy(messages.filter(m => m.status == 3)) 

          this.$store.commit('addNoReadMessage', noSend)
          this.$store.commit('addHaveReadMessage', haveSend)
          
          console.log('messages:')
          console.log(messages)
          console.log('noSend:')
          console.log(noSend)
          console.log('haveSend:')
          console.log(haveSend)
          
        }).catch((res) => {
          this.$message({
            message: res.message,
            type: 'error'
          })
        })
    },
    // refreshCaptcha: function(){
    //   this.loginForm.src = this.global.baseUrl + "/captcha.jpg?t=" + new Date().getTime();
    // },
    reset() {
      this.$refs.loginForm.resetFields()
    },
    // 切换主题
    onThemeChange: function(themeColor) {
      this.$store.commit('setThemeColor', themeColor)
    }
  },
  // mounted() {
  //   startBroadcastHubConnection()
  // },
  computed:{
    ...mapState({
      themeColor: state=>state.app.themeColor
    })
  }
}