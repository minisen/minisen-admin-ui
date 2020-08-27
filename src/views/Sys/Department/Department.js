import SyTreeStylePanel from "@/views/Core/SyTreeStylePanel"
import { buildMenu } from "@/utils/helper.js"
export default{
	name: 'Department',
	components:{
		SyTreeStylePanel
	},
	data() {
		return {
			size: 'small',
			ApiArea: this.$api.department,
			treeData: [],
			dataFormRules: {
				name: [
					{ required: true, message: '请输入名称', trigger: 'blur' }
				]
			},
			emptyDataForm: {
				parentId: '',
				name: '',
				sort: 0,
				remarks: ''
			}
		}
	},
	methods: {
		addNewHandleFunc: function (data) {

			this.$refs.dataForm.validate((valid) => {

				if (valid) {

					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						data.callbackOpenLoading()

						this.ApiArea.addItem.r(data.addNewForm).then(res => {
							if (res.data.sendData.result == 'success') {
								this.$message({ message: '操作成功', type: 'success' })
			
								data.callbackInitForm()
			
								this.loadAllDepartments()
								
							} else if (res.data.sendData.result == 'fail') {
								this.$message({message: '操作失败, ' + res.data.sendData.failMessage, type: 'error'})
							} else {
								this.$message({message: '操作失败, 未知错误', type: 'error'})
							}
						}).finally(()=>{
							data.callbackCloseLoading()
						})

          })
          
        }
        
			})

		},
		editHandleFunc: function (data) {

			this.$refs.dataForm.validate((valid) => {

				if (valid) {

					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						data.callbackOpenLoading()

						this.ApiArea.editItem.r(data.editForm).then(res => {
							if (res.data.sendData.result == 'success') {
								this.$message({ message: '操作成功', type: 'success' })
			
								data.callbackInitForm()
								
								this.loadAllDepartments()
								
							} else if (res.data.sendData.result == 'fail') {
								this.$message({message: '操作失败, ' + res.data.sendData.failMessage, type: 'error'})
							} else {
								this.$message({message: '操作失败, 未知错误', type: 'error'})
							}
						}).finally(()=>{
							data.callbackCloseLoading()
						})
						
          })
          
        }
        
			})

		},
		deleteHandleFunc: function (data) {

			this.$confirm('确认删除吗？', '提示', {
				type: 'warning'
			}).then(() => {

				this.ApiArea.deleteItem.r(data.deleteParams).then(res => {
					if (res.data.sendData.result == 'success') {
						this.$message({ message: '操作成功', type: 'success' })
	
						data.callbackInitForm()
	
						this.loadAllDepartments()
						
					} else if (res.data.sendData.result == 'fail') {
						this.$message({message: '操作失败, ' + res.data.sendData.failMessage, type: 'error'})
					} else {
						this.$message({message: '操作失败, 未知错误', type: 'error'})
					}
				})
				
			})
		},
		loadAllDepartments: function () {
			this.ApiArea.getAllItems.r().then(res => {
				this.treeData = buildMenu(res.data.sendData.allDepartments, 'parentId')
				console.log('setTree')
				console.log(this.setTree)
			})
		}
	},
	mounted() {
		this.loadAllDepartments()
	},
}