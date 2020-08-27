<template>
	<sy-tree-style-panel 
		:loading="true"
		:maxLevel="5"
		:treeData="treeData"
		:emptyDataForm="emptyDataForm"
		:permsAdd="[ApiArea.addItem]"
		:permsDelete="[ApiArea.deleteItem]"
		:permsEdit="[ApiArea.editItem]"
		:permsLook="[ApiArea.getAllItems]"
		@handleAddNew="addNewHandleFunc" @handleEdit="editHandleFunc" @handleDelete="deleteHandleFunc">
		<template slot="editForm" slot-scope="scope">
			<el-form :model="scope.dataForm" label-width="100px" :rules="dataFormRules" ref="dataForm" :size="size" >
				<el-form-item label="部門名称" prop="name">
					<el-input v-model="scope.dataForm.name" placeholder="请输入部門名称" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="排序" prop="sort">
					<el-input v-model="scope.dataForm.sort" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remarks">
					<el-input v-model="scope.dataForm.remarks" auto-complete="off" type="textarea"></el-input>
				</el-form-item>
			</el-form>
		</template>
	</sy-tree-style-panel>
	
</template>

<script src="./Department.js" />

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