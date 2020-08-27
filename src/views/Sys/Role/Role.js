import SyTable from "@/views/Core/SyTable.vue"
import SyButton from "@/views/Core/SyButton.vue"
import { deepcopy, buildMenu } from "@/utils/helper.js"
import api from '@/http/api.js'
export default {
  name: "Role",
	components:{
    SyTable,
    SyButton
	},
	data() {

		return {
		  ApiArea: this.$api.role,
			api: api,
			size: 'small',
			filters: {
				name: ''
			},
			columns: [
				{prop:"name", label:"角色名", minWidth:80},
				{prop:"sort", label:"排序", minWidth:50},
				{prop:"remarks", label:"备注", minWidth:100}
			],
			pageRequest: { pageNum: 1, pageSize: 10 },
			pageResult: [],

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
				name: [
					{ required: true, message: '请输入角色名称', trigger: 'blur' }
				]
			},
			// 新增编辑界面数据
			dataForm: {
				name: '',
				sort: 0,
				remarks: ''
			},

			apiPermDialogVisible: false, //api权限设置界面是否显示
			allApiPermissions: [],
			apiTransferKVs: [],			//示例：[{key: 'dsadsda654654dsadd', label: '/api/role/getAllItems(获得所有角色项)'},...]
			apiPermsBeChoosed: [],	//示例：['dsadsda654654dsadd',...]
			apiPermsOriginalChoosed: [], 
			apiTypes: [{
				value: '',
				label: '所有API'
			}],
			chooseApiType: '',
			//api权限设置界面提交数据
			apiPermForm: {
				roleId: '',
				apiPermissionIds: []
			},

			menuPermDialogVisible: false,	//菜单权限设置界面是否显示
			allMenuItemTree: [],
			defaultProps: {
				children: 'children',
				label: 'name'
			},
			menuIdsBeChoosed: [],	//示例：['dsadsda654654dsadd',...]
			menuIdsOriginalChoosed: [],
			//菜单权限设置界面提交数据
			menuPermForm: {
				roleId: '',
				menuIds: []
			},
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
			console.log(this.dataForm)
		},
		showAdd: function () {
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
				name: '',
				sort: 0,
				remarks: ''
			}
		},
		showEdit: function (params) {
			this.editDialogVisible = true
			this.operation = false
			this.dataForm = deepcopy(params.row)
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
    showApiPermsEdit: function (index, row) {
			console.log('role row:')
			console.log(row)
			this.apiPermForm.roleId = row.id
			this.apiPermDialogVisible = true
			this.chooseApiType = ''
			this.apiPermsBeChoosed = row.hasApiPermissionIds
			this.apiPermsOriginalChoosed = this.apiPermsBeChoosed
			this.apiTransferKVs = this.allApiPermissions
		},
		changeApiType: function (selectValue){

			console.log('select ApiType:')
			console.log(selectValue)
			if (selectValue == '') {
				this.apiTransferKVs = this.allApiPermissions
			} else {
				this.apiTransferKVs = this.allApiPermissions.filter(permission => permission.apiType == selectValue)
			}
			
		},
		submitApiPerms: function () {
			console.log('apiPermsBeChoosed')
			console.log(this.apiPermsBeChoosed)
			this.apiPermForm.apiPermissionIds = this.apiPermsBeChoosed

			this.$confirm('确认提交吗？', '提示', {}).then(() => {

				this.ApiArea.setApiPermissions.r(this.apiPermForm).then(res => {
					if (res.data.sendData.result == 'success') {
						this.$message({ message: '操作成功', type: 'success' })
						this.findPage(null)
						this.apiPermDialogVisible = false
						
					} else if (res.data.sendData.result == 'fail') {
						this.$message({message: '操作失败, ' + res.data.sendData.failMessage, type: 'error'})
					} else {
						this.$message({message: '操作失败, 未知错误', type: 'error'})
					}
				}).finally(()=>{
					this.editLoading = false
				})
			})

			
		},
		showMenuPermsEdit: function (index, row) {
			
			this.menuPermForm.roleId = row.id
			this.menuPermDialogVisible = true
			this.menuIdsBeChoosed = row.hasMenuIds
			this.menuIdsOriginalChoosed = this.menuIdsBeChoosed
			
			this.$nextTick(() => {
				this.$refs.menuPermsTree.setCheckedKeys(this.menuIdsBeChoosed)
			})

			console.log('menuIdsBeChoosed')
			console.log(this.menuIdsBeChoosed)
			console.log('menuIdsOriginalChoosed')
			console.log(this.menuIdsOriginalChoosed)
		},
		resetMenuPermsChoosed: function () {
			this.$refs.menuPermsTree.setCheckedKeys(this.menuIdsOriginalChoosed)
		},
		submitMenuPerms: function () {
			let menuIds = this.$refs.menuPermsTree.getCheckedKeys(true)
			this.menuPermForm.menuIds = menuIds

			console.log('menuPermForm')
			console.log(this.menuPermForm)

			this.$confirm('确认提交吗？', '提示', {}).then(() => {

				this.ApiArea.setMenuPermissions.r(this.menuPermForm).then(res => {
					if (res.data.sendData.result == 'success') {
						this.$message({ message: '操作成功', type: 'success' })
						this.findPage(null)
						this.menuPermDialogVisible = false
						
					} else if (res.data.sendData.result == 'fail') {
						this.$message({message: '操作失败, ' + res.data.sendData.failMessage, type: 'error'})
					} else {
						this.$message({message: '操作失败, 未知错误', type: 'error'})
					}
				}).finally(()=>{
					this.editLoading = false
				})
			})

			
		},
		loadAllPermissions: function () {
			this.$api.permission.getItemsPaged.r().then(res => {
				
				this.allApiPermissions = res.data.sendData.ItemsPaged.map(permission => {
					return {
						...permission,
						key: permission.id,
						label: permission.name + '（' + permission.apiUrl + '）'
					}
				})
				console.log('allApiPermissions')
				console.log(this.allApiPermissions)
			})
		},
		loadAllApiTypes: function () {
			let params = {type: "ApiType"}
			this.$api.dictionary.getItemsPaged.r(params).then(res => {
				res.data.sendData.ItemsPaged.forEach(item => {
					this.apiTypes.push({
						value: item.value,
						label: item.name
					})
				})
			})
		},
		loadAllMenus: function () {
			this.$api.menu.getAllItems.r().then(res => {
				this.allMenuItemTree = buildMenu(res.data.sendData.navMenus, 'parentId')
				console.log('allMenuItemTree')
				console.log(this.allMenuItemTree)
			})
		},
		//穿梭框渲染函数
		renderFunc: function (h, option) {
			return <span title={option.label}>{option.label}</span>
		}
	},
	mounted() {
		this.loadAllPermissions()
		this.loadAllApiTypes()
		this.loadAllMenus()
	}
}
