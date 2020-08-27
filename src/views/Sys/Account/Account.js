import SyTable from "@/views/Core/SyTable.vue"
import SyButton from "@/views/Core/SyButton.vue"
import { deepcopy } from "@/utils/helper.js"
export default {
  name: "Account",
	components:{
    SyTable,
    SyButton
	},
	data() {
		return {
			ApiArea: this.$api.account,
			size: 'small',
			filters: {
				name: '',
				account: ''
			},
			columns: [
				{prop:"account", label:"账号", minWidth:100},
				{prop:"name", label:"姓名", minWidth:100},
				{prop:"roles", label:"所属角色", minWidth:200},
				{prop:"remarks", label:"备注", minWidth:120}
			],
			pageRequest: { pageNum: 1, pageSize: 10 },
			pageResult: [],
			allRoles: [],
			originalRoleCheckIds: [],
			checkedRoleIds: [],

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				account: [
					{ required: true, message: '请输入账号', trigger: 'blur' }
				]
			},
			// 新增编辑界面数据
			dataForm: {
				name: '',
				account: '',
				remarks: '',
				hasRoleIds:[]
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
		handleCheckedRolesChange: function(val) {
			console.log('choose roles:')
			console.log(this.checkedRoleIds)
		},
		showAdd: function () {
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
				name: '',
				account: '',
				remarks: '',
				hasRoleIds:[]
			}
			this.originalRoleCheckIds = deepcopy(this.dataForm.hasRoleIds)
		},
		showEdit: function (params) {
			this.editDialogVisible = true
			this.operation = false
			this.dataForm = deepcopy(params.row)
			this.originalRoleCheckIds = deepcopy(this.dataForm.hasRoleIds)
			this.checkedRoleIds = this.originalRoleCheckIds

			console.log('hasRoles')
			console.log(this.dataForm.hasRoleIds)
		},
		submitForm: function () {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true
						this.dataForm.hasRoleIds = this.checkedRoleIds
						let params = Object.assign({}, this.dataForm)
						let operationApi = {};
						
						if (this.operation) {
							//operation => Add
							operationApi = this.ApiArea.addItem

						} else {
							//operation => Edit
							operationApi = this.ApiArea.editItem
						}

						console.log('dataForm:')
						console.log(this.dataForm)

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
		},
		loadAllRoles: function () {
			this.$api.role.getItemsPaged.r().then(res => {
				this.allRoles =	res.data.sendData.ItemsPaged
				console.log('allRoles')
				console.log(this.allRoles)
			})
		}
	},
	mounted() {
		this.loadAllRoles()
	}
}
