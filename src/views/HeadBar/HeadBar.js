import { mapState } from 'vuex'
import Hamburger from "@/components/Hamburger"
import ThemePicker from "@/components/ThemePicker"
import LangSelector from "@/components/LangSelector"
// import Action from "@/components/Toolbar/Action"
import NoticePanel from "@/views/Core/NoticePanel"
import MessagePanel from "@/views/Core/MessagePanel"
import PersonalPanel from "@/views/Core/PersonalPanel"
import { startBroadcastHubConnection } from "@/utils/broadcastSignalR"

export default {
  components:{
        Hamburger,
        ThemePicker,
        LangSelector,
        // Action,
        NoticePanel,
        MessagePanel,
        PersonalPanel
  },
  data() {
    return {
      user: {
        name: sessionStorage.getItem('account')+"("+sessionStorage.getItem('userName')+")",
        avatar: require('@/assets/user.png'),
        role: sessionStorage.getItem('role'),
        registeInfo: "注册时间：2018-12-20 "
      },
      activeIndex: '1',
      langVisible: false
    }
  },
  methods: {
    openWindow(url) {
      window.open(url)
    },
    selectNavBar(key, keyPath) {
      console.log(key, keyPath)
    },
    // 折叠导航栏
    onCollapse: function() {
      this.$store.commit('onCollapse')
    },
    // 切换主题
    onThemeChange: function(themeColor) {
      this.$store.commit('setThemeColor', themeColor)
    },
    // 语言切换
    changeLanguage(lang) {
      lang === '' ? 'zh_cn' : lang
      this.$i18n.locale = lang
      this.langVisible = false
    }
  },
  mounted() {
    this.sysName = "Kitty Platform"
    var user = sessionStorage.getItem("user")
    if (user) {
      this.user.name = user
      this.user.avatar = require("@/assets/user.png")
    }

    startBroadcastHubConnection()
  },
  computed:{
    ...mapState({
      themeColor: state=>state.app.themeColor,
      collapse: state=>state.app.collapse,
      noReadMessages: state=>state.message.noReadMessages,
      haveReadMessages: state=>state.message.haveReadMessages
    })
  }
}