import SyTable from "@/views/Core/SyTable.vue"
import SyButton from "@/views/Core/SyButton.vue"
import { deepcopy } from "@/utils/helper.js"
export default {
	name: "Article",
	components:{
    SyTable,
    SyButton
	},
	data() {
		return {
			ApiArea: this.$api.article,
			size: 'small',
			filters: {
				status: ''
			},
			columns: [
				{prop:"sort", label:"排序", minWidth:50},
				{prop:"title", label:"標題", minWidth:100},
				{prop:"intro", label:"簡介", minWidth:150},
				{prop:"author", label:"作者", minWidth:80},
				{prop:"keyword", label:"關鍵字", minWidth:80},
				{prop:"isOnTopText", label:"是否置頂", minWidth:50},
				{prop:"statusText", label:"發佈狀態", minWidth:50},
				{prop:"remarks", label:"备注", minWidth:120}
			],
			pageRequest: { pageNum: 1, pageSize: 10 },
			pageResult: [],

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
				title: [
					{ required: true, message: '请输入標題', trigger: 'blur' }
				],
				content: [
					{ required: true, message: '请输入文章內容', trigger: 'blur' }
				],
				keyword: [
					{ required: true, message: '请输入關鍵字', trigger: 'blur' }
				]
			},
			// 新增编辑界面数据
			emptyDataForm: {
				category: '',
				title: '',
				fullTitle: '',
				subHead: '',
				intro: '',
				content: '',
				author: '',
				copyFrom: '',
				keyword: '',
				isOnTop: 0,
				isOnTopText: '',
				status: 0,
				statusText: '',
				sort: 0,
				remarks: ''
			},
			dataForm: {
				category: '',
				title: '',
				fullTitle: '',
				subHead: '',
				intro: '',
				content: '',
				author: '',
				copyFrom: '',
				keyword: '',
				isOnTop: 0,
				isOnTopText: '',
				status: 0,
				statusText: '',
				sort: 0,
				remarks: ''
			},
			articleCategorys:[]
		}
	},
	methods: {
		findPage: function (data) {

			let params = {...this.pageRequest}
			if(data !== null) {
				params = {...params, ...data.pageRequest}
			}

			this.ApiArea.getItemsPaged.r(params).then((res) => {
				this.pageResult = res.data.sendData.itemsPaged
				
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
			this.dataForm = deepcopy(this.emptyDataForm)
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
		},
		loadAllArticleCategorys: function () {
			let params = {type: "BlogArticleCategory"}
			this.$api.dictionary.getItemsPaged.r(params).then(res => {
				res.data.sendData.ItemsPaged.forEach(item => {
					this.articleCategorys.push({
						value: item.value,
						label: item.name
					})
				})
			})
		}
	},
	mounted() {
		this.loadAllArticleCategorys()
	}
}