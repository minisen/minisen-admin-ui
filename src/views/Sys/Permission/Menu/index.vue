<template>
	<sy-tree-style-panel 
		:loading="true"
		:treeData="treeData"
		:emptyDataForm="emptyDataForm"
		:permsAdd="[ApiArea.addItem]"
		:permsDelete="[ApiArea.deleteItem]"
		:permsEdit="[ApiArea.editItem]"
		:permsLook="[ApiArea.getAllItems]"
		@handleAddNew="addNewHandleFunc" @handleEdit="editHandleFunc" @handleDelete="deleteHandleFunc">
		<template slot="editForm" slot-scope="scope">
			<el-form :model="scope.dataForm" label-width="100px" :rules="dataFormRules" ref="dataForm" :size="size" >
				<el-form-item label="菜单项名称" prop="name">
					<el-input v-model="scope.dataForm.name" placeholder="请输入菜单项名称" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="菜单类型" prop="type">
					<el-select v-model="scope.dataForm.type" placeholder="请选择菜单类型" auto-complete="off" style="width: 35vh;">
						<el-option key="1" label="目录项" value="1"></el-option>
						<el-option key="2" label="菜单项" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="图标" prop="icon">
					<el-input v-model="scope.dataForm.icon" auto-complete="off" placeholder="element-ui 官网：element.eleme.io 查询图标"></el-input>
				</el-form-item>
				<el-form-item label="页面路径" prop="pagePath">
					<el-input 
					  placeholder="请输入页面路径[超链接前缀：http(s)://][iframe前缀：iframe:]" 
						:disabled="scope.dataForm.type == 1"  
					  v-model="scope.dataForm.pagePath" 
						auto-complete="off" class="input-with-select" />
				</el-form-item>
				<el-form-item label="排序" prop="sort">
					<el-input v-model="scope.dataForm.sort" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remarks">
					<el-input v-model="scope.dataForm.remarks" auto-complete="off" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<!-- {{scope.editFormProps}} -->
		</template>
	</sy-tree-style-panel>
	
</template>

<script src="./Menu.js" />

<style scoped>
  .el-select .el-input {
    width: 500px;
		
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
	.el-form-item {
		padding-bottom: 3vh;
		text-align: left;
		width: 90vh;
	}
</style>