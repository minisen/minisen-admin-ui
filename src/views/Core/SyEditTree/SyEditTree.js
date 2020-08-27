import { deepcopy, guid } from "@/utils/helper.js"

export default{
  name: 'SyEditTree',
  props: {
    permsEdit: Array,    // 编辑权限数组
    permsDelete: Array,  // 删除权限数组
    permsLook: Array,    // 查看权限数组
    permsAdd: Array,     // 新增权限数组
    treeData: {
      type: Array,
      default: () => [
        {
          id: 0,
          name: "默认结点",
          children: []
        }
      ]
    },
    props: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'name'
        }
      } 
    },
    nodeKey: {
      type: String,
      default: "id"
    },
    maxLevel: {
      type: Number,
      default: 3
    }
    
  },
	data(){
		return {
      NODE_KEY: this.nodeKey,
			MAX_LEVEL: this.maxLevel,
			NODE_ID_START: 1,
			startId: null,
			initParam: {
				name: '新增节点',
				pid: '0',
        children: [],
        _isAddNew: true
      },
      EMIT_EVENTS: {
        NODE_ADD: 'nodeAdd',
        NODE_EDIT: 'nodeEdit',
        NODE_DELETE: 'nodeDelete',
      }
		}
	},
	created(){
		this.startId = this.NODE_ID_START
	},
	methods: {
		handleAdd(_node, _data){
      console.log(_node, _data)
      
			if(_node.level >= this.MAX_LEVEL){
				this.$message.warning("当前已达到"+ this.MAX_LEVEL + "级，无法新增！")
				return false;
			}

			let newNodeParam = deepcopy(this.initParam)
			newNodeParam.name += this.startId++
			newNodeParam.pid = _data[this.NODE_KEY]
      newNodeParam[this.NODE_KEY] = guid()
      
			if(!_data.children){
				this.$set(_data, 'children', [])
      }
      
			_data.children.unshift(newNodeParam)

			// 展开节点
			if(!_node.expanded){
				_node.expanded = true
      }

      let emitData = {
        parentNode: _node,
        parentData: _data,
        newNodeData: newNodeParam
      }
      
      this.$emit(this.EMIT_EVENTS.NODE_ADD, emitData)
    },
    handleEdit(_node, _data){
      let emitData = {
        currentNode: _node,
        currentData: _data
      }
      
      this.$emit(this.EMIT_EVENTS.NODE_EDIT, emitData)
    },
    handleDelete(_node, _data){

      if (_data._isAddNew) {
        this.$refs.EditTree.remove(_data)
        this.$message.success("删除成功！")
      } else {
        this.$message.error("此节点不可删除！")
      }
    },
		handleAddTop(){
      
			let newNodeParam = deepcopy(this.initParam)
			newNodeParam.name += this.startId++
      newNodeParam[this.NODE_KEY] = guid()
      
			this.treeData.unshift(newNodeParam)
		}
	}
}