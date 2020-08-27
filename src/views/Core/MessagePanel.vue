<template>
  <div class="message-panel">
    <div class="message-header">您共有 {{data.noReadMessages.length}} 条未讀消息</div>
    <div class="message-content">
      <div v-for="(item, index) in data.noReadMessages.slice(0,4)" :key="item.id" class="message-item">

        <el-popover
          placement="right"
          width="400"
          trigger="hover">
          <div>
            <ul>
              <li>{{item.title}}</li>
              <li>{{item.sendTime}}&nbsp;{{item.senderName}}</li>
              <li>{{item.content}}</li>
            </ul>
            <span style="float:right;">
              <el-button @click="markHaveRead(index, item)" size="small" type="primary" plain>標記為已閱讀</el-button>
            </span>
          </div>

          <div slot="reference">
            <div class="message-avatar">
              <img class="avatar" :src="require('@/assets/user.png')" />
            </div>
            <span class="sender">
              {{ item.senderName }}
            </span>  
            <span class="time">
              <li class="fa fa-clock-o"></li> {{ item.sendTime }}
            </span>  
            <div class="message-cotent">
              {{ item.title }}
            </div>  
          </div>
          
          <!-- <el-button size="small" slot="reference">閱讀</el-button> -->
        </el-popover>

        
        
      </div>
    </div>
    <div class="message-footer" @click="showMessageTable">查看所有消息</div>

    <!--消息通知列表界面-->
    <message-table :data="data" ref="messageTableDialog"></message-table>

  </div>
</template>

<script>
import MessageTable from "@/views/Core/MessageTable.vue"

export default {
  name: 'MessagePanel',
  components:{
    MessageTable
  },
  props: {
    data: {
      type: Object,
      default: {
        noReadMessages: [],
        haveReadMessages: []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick: function () {
      // 按钮操作处理函数
      this.$emit('click', {})
    },
    showMessageTable: function () {
      this.$refs.messageTableDialog.setVisible(true)
    },
    markHaveRead: function (index, row) {

			let ids = {ids:[row.id]}

			this.$api.message.markReadMessage.r(ids).then(res => {
				if(res.data.sendData.result == 'success') {
					
					this.$store.commit('removeNoReadMessage', index)
					this.$store.commit('addHaveReadMessage', row)

					this.$message({
						message: '標記成功！',
						type: 'success'
					})
				} else if (res.data.sendData.result == 'fail') {
					this.$message({message: '標記失败, ' + res.data.sendData.failMessage, type: 'error'})
				}
			})
			
		}
  },
  mounted() {
  }
}
</script>

<style scoped>
.message-panel {
  font-size: 15px;
  width: 300px;
  margin: -12px;
}
.message-header {
  padding-left: 10px;
  font-size: 14px;
  padding-top: 6px;
  padding-bottom: 6px;
}
.message-content {
  font-size: 15px;
}
.message-item {
  border-color: rgba(180, 190, 190, 0.8);
  border-top-width: 1px;
  border-top-style: solid;
  padding-top: 10px;
  padding-bottom: 10px;
}
.message-item:hover {
  cursor: pointer;
  background: #b1a6a61e;
}
.message-avatar {
  padding-left: 10px;
}
.avatar {
  margin-right: 10px;
}
.sender {
  font-size: 16px;
  font-weight:bold;
}
.time {
  font-size: 12px;
  float: right;
  padding-right: 10px;
}
.message-footer {
  font-size: 14px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: rgba(180, 190, 190, 0.8);
  border-top-width: 1px;
  border-top-style: solid;
}
.message-footer:hover {
  cursor: pointer;
  background: #b1a6a61e;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 90px;
  float: left;
}
</style>