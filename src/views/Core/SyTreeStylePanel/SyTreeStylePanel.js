import SyEditTree from "@/views/Core/SyEditTree"
import SyButton from "@/views/Core/SyButton.vue"
import { deepcopy, isEmpty } from "@/utils/helper.js"

export default{
	name: 'SyTreeStylePanel',
	components: {
		SyEditTree,
    SyButton
  },
  props: {
    permsEdit: Array,    // 编辑权限数组
    permsDelete: Array,  // 删除权限数组
    permsLook: Array,    // 查看权限数组
    permsAdd: Array,     // 新增权限数组
    treeData: Array,
		emptyDataForm: Object,
		maxLevel: {
      type: Number,
      default: 3
    }
  },
	data: () => {
		return {
			size: 'small',
			// 新增编辑界面数据
			dataForm: {},
			editLoading: false,
			isAddNew: false
		}
	},
	methods: {
		addNewNode: function (data) {
			console.log('emit addNode params:')
			console.log(data)

			this.isAddNew = true

      this.dataForm = this.emptyDataForm
      this.dataForm.parentId = data.newNodeData.pid
      this.dataForm.name = data.newNodeData.name
		},
		editNode: function (data) {
			console.log('emit editNode params:')
			console.log(data)

			if (data.currentData._isAddNew) {

				this.isAddNew = true
        this.dataForm = this.emptyDataForm
        this.dataForm.parentId = data.currentData.pid
        this.dataForm.name = data.currentData.name

			} else {

				this.isAddNew = false
				this.dataForm = deepcopy(data.currentData)
			}
			
		},
		submitForm: function () {

			console.log('this.dataForm')
			console.log(this.dataForm)
			
			if (isEmpty(this.dataForm.parentId))
			{
				this.$message({message: '当前无节点存在', type: 'error'})
				return
			}

			let callbackOpenLoading = res => {
				this.editLoading = true
			}
			let callbackCloseLoading = res => {
				this.editLoading = false
			}
			let callbackInitForm = res => {
				if (this.isAddNew) {
					this.isAddNew = false
					this.dataForm = this.emptyDataForm
				}
			}

			let params = Object.assign({}, this.dataForm)

			if (this.isAddNew) {
				//operation => Add
				this.$emit('handleAddNew', {addNewForm:params, callbackOpenLoading, callbackCloseLoading, callbackInitForm})

			} else {
				//operation => Edit
				this.$emit('handleEdit', {editForm:params, callbackOpenLoading, callbackCloseLoading, callbackInitForm})
			}

		},
		deleteCurrent: function () {

			if (isEmpty(this.dataForm.id))
			{
				this.$message({message: '当前节点为空', type: 'error'})
				return
			}

			let callbackInitForm = res => {
				this.isAddNew = false
				this.dataForm = this.emptyDataForm
			}

			let params = {
				id: this.dataForm.id
			}

			this.$emit('handleDelete', {deleteParams:params, callbackInitForm})
		}
	},
	mounted() {
		this.dataForm = this.emptyDataForm
	},
}