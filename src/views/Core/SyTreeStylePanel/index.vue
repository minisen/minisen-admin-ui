<template>
	<div style="margin-left: 1vh;">
		<div class="left-show">
			<sy-edit-tree class="left-edit-tree" 
				:maxLevel="maxLevel" 
				:treeData="treeData" 
				@nodeAdd="addNewNode" 
				@nodeEdit="editNode"
				:permsAdd="permsAdd"
				:permsDelete="permsDelete"
				:permsEdit="permsEdit"
				:permsLook="permsLook">
			</sy-edit-tree>

		</div>
		
		<div class="right-show">
			<div class="right-form" v-has="permsLook">
				<slot name="editForm" v-bind:dataForm="dataForm"></slot>
				<div slot="footer" class="dialog-footer" style="float: right;">
					<sy-button icon="fa fa-trash" :label="$t('action.delete')" :apiPerms="permsDelete" :size="size" type="danger" @click="deleteCurrent()" />
					<el-button icon="el-icon-edit" :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
				</div>
			</div>
		</div>
		
	</div>
	
</template>

<script src="./SyTreeStylePanel.js" />



<style scoped>

	.left-show{
		float: left;
		width: 35vh;
		height: 83.5vh;
		overflow: auto;
		border:1.8px dotted gray;
	}

	.left-edit-tree{
		width: 50vh;
		display: inline-block;
	}

	.right-form{
		
		position: absolute;
		display: inline-block;
		margin-top: 8vh;
		margin-bottom: 2vh;	
		margin-left: -20vh;
		margin-right: 2vh;
	}

	.right-show{
		float: left;
		border:1.8px dotted gray;
		width: 80vh;
		height: 83.5vh;
		border-left: none;
		padding-right: 55vh;
	}

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