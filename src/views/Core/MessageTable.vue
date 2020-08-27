<template>
	<!--密碼修改界面-->
  <el-dialog title="消息通知" width="60%" :visible.sync="dialogVisible" :close-on-click-modal="false" :modal="false">
    <el-tabs type="border-card">
			<el-tab-pane>
				<span slot="label"><i class="el-icon-s-release"></i> 未讀消息</span>
				<sy-table :height="350" 
					:showPagination = "false"
					:showBatchDelete = "false"
					:permsEdit="[this.$api.NoPerm]" 
					:permsDelete="[this.$api.NoPerm]"
					:permsLook="[]" 
					:data="data.noReadMessages" :columns="this.columns" 
					@findPage="findPage">
					<template slot="operations" slot-scope="scope">
						<el-popover
							placement="right"
							width="400"
							trigger="hover">
							<div>
								<ul>
									<li>{{scope.rowData.row.title}}</li>
									<li>{{scope.rowData.row.sendTime}}&nbsp;{{scope.rowData.row.senderName}}</li>
									<li>{{scope.rowData.row.content}}</li>
								</ul>
								<span style="float:right;">
									<el-button @click="markHaveRead(scope.rowData.$index, scope.rowData.row)" size="small" type="primary" plain>標記為已閱讀</el-button>
								</span>
							</div>
							
							<el-button size="small" slot="reference">閱讀</el-button>
						</el-popover>
					</template>
				</sy-table>
			</el-tab-pane>
			<el-tab-pane>
				<span slot="label"><i class="el-icon-s-claim"></i> 已讀消息</span> 
					<sy-table :height="350" 
						:showPagination = "false"
						:showBatchDelete = "false"
						:permsEdit="[this.$api.NoPerm]" 
						:permsDelete="[this.$api.NoPerm]"
						:permsLook="[]" 
						:data="data.haveReadMessages" :columns="this.columns" 
						@findPage="findPage">
						<template slot="operations" slot-scope="scope">
							<el-popover
								placement="right"
								width="400"
								trigger="hover">
								<div>
									<ul>
										<li>{{scope.rowData.row.title}}</li>
										<li>{{scope.rowData.row.sendTime}}&nbsp;{{scope.rowData.row.senderName}}</li>
										<li>{{scope.rowData.row.content}}</li>
									</ul>
								</div>
								
								<el-button size="small" slot="reference">閱讀</el-button>
							</el-popover>
						</template>
					</sy-table>
			</el-tab-pane>
	</el-tabs>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import SyTable from "@/views/Core/SyTable.vue"
import SyButton from "@/views/Core/SyButton.vue"

export default {
	name: 'MessageTable',
	components:{
		SyTable,
		SyButton
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
			size: 'small',
			dialogVisible: false,
      columns: [
				{prop:"title", label:"標題", minWidth:100},
				{prop:"content", label:"內容", minWidth:200},
				{prop:"senderName", label:"發送者", minWidth:100},
				{prop:"sendTime", label:"發送時間", minWidth:120}
			]
		}
	},
	methods: {
		findPage: function (data) {

			data.callback()
		},
    // 设置可见性
    setVisible: function (visible) {
        this.dialogVisible = visible
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

</style>