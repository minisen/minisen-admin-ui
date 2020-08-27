import HeadBar from "../HeadBar/HeadBar.vue"
import NavBar from "../NavBar/NavBar.vue"
import MainContent from "../MainContent/MainContent.vue"
import { mapState } from 'vuex'
export default {
  components:{
    HeadBar,
    NavBar,
    MainContent
  },
  computed:{
    ...mapState({
      navTree: state=>state.menu.navTree,
      themeColor: state=>state.menu.navTree
    })
  }
}