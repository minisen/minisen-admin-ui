import SyTable from "@/views/Core/SyTable.vue"
import SyButton from "@/views/Core/SyButton.vue"
export default {
	name: "Dictionary",
	components:{
    SyTable,
    SyButton
	},
	data() {
		return {
			ApiArea: this.$api.dictionary,
			size: 'small',
			filters: {
				type: ''
			},
			columns: [
				{prop:"sort", label:"排序", minWidth:50},
				{prop:"name", label:"名称", minWidth:100},
				{prop:"value", label:"值", minWidth:100},
				{prop:"type", label:"类型", minWidth:80},
				{prop:"remarks", label:"备注", minWidth:120}
			],
			pageRequest: { pageNum: 1, pageSize: 10 },
			pageResult: [],

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
				name: [
					{ required: true, message: '请输入名称', trigger: 'blur' }
				],
				value: [
					{ required: true, message: '请输入值', trigger: 'blur' }
				],
				type: [
					{ required: true, message: '请输入类型', trigger: 'blur' }
				]
			},
			// 新增编辑界面数据
			dataForm: {
				name: '',
				value: '',
				type: '',
				sort: 0,
				remarks: ''
			}
		}
	},
	methods: {
		findPage: function (data) {

			let params = {...this.pageRequest}
			if(data !== null) {
				params = {...params, ...data.pageRequest}
			}

			this.ApiArea.getItemsPaged.r(params).then((res) => {
				this.pageResult = res.data.sendData.ItemsPaged

				console.log('dictionary pageResult:')
				console.log(this.pageResult)
				
			}).then(data!==null?data.callback:'')
		},
		searchPage: function () {
			this.pageRequest = {...this.pageRequest, ...this.filters}
			this.findPage(null)
		},
		handleDelete: function (data) {
			let ids = {ids:data.params}
			this.ApiArea.deleteItem.r(ids).then(data!=null?data.callback:'')
		},
		showAdd: function () {
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
				name: '',
				value: '',
				type: '',
				sort: 0,
				remarks: 'remark'
			}
		},
		showEdit: function (params) {
			this.editDialogVisible = true
			this.operation = false
			this.dataForm = Object.assign({}, params.row)
		},
		submitForm: function () {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true
						let params = Object.assign({}, this.dataForm)
						let operationApi = {};
						
						if (this.operation) {
							//operation => Add
							operationApi = this.ApiArea.addItem

						} else {
							//operation => Edit
							operationApi = this.ApiArea.editItem
						}

						operationApi.r(params).then(res => {
							if (res.data.sendData.result == 'success') {
								this.$message({ message: '操作成功', type: 'success' })
								this.findPage(null)
								this.editDialogVisible = false
								
							} else if (res.data.sendData.result == 'fail') {
								this.$message({message: '操作失败, ' + res.data.sendData.failMessage, type: 'error'})
							} else {
								this.$message({message: '操作失败, 未知错误', type: 'error'})
							}
						}).finally(()=>{
							this.editLoading = false
						})

					})
				}
			})
		}
	},
	mounted() {
	}
}