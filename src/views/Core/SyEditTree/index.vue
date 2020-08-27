<template>
	<div class="comp-tree" >
		<el-button class="comp-tr-top" 
			icon="el-icon-folder-add"
			type="primary" 
			size="small" 
			@click="handleAddTop"
			v-has="permsAdd">
			添加根节点
		</el-button>
		<el-tree ref="EditTree"
			:data="treeData"
			:props="props"
			:expand-on-click-node="false"
			highlight-current
			:node-key="NODE_KEY"
			v-has="permsLook">
			<div class="comp-tr-node" slot-scope="{ node, data }">

				<template>
					<!-- 名称： 新增节点增加class（is-new） -->
					<span :class="[data['_isAddNew'] ? 'is-new' : '', 'comp-tr-node--name']">
						{{ node.label }}
					</span>
					
					<!-- 按钮 -->
					<span class="comp-tr-node--btns">
						<!-- 新增 -->
						<el-button icon="el-icon-plus" 
							v-show="!data['_isAddNew']"
							size="mini"
							circle 
							type="primary"	
							@click="handleAdd(node, data)" 
							v-has="permsAdd"/>

						<!-- 编辑 -->
							<el-button icon="el-icon-edit" 
								size="mini"
								circle 
								type="info"
								@click="handleEdit(node, data)" 
								v-has="permsEdit"/>

						<!-- 删除 -->
							<el-button icon="el-icon-delete" 
								v-show="data['_isAddNew']"
								size="mini"
								circle 
								type="danger"
								@click="handleDelete(node, data)" 
								v-has="permsDelete"/>

					</span>

				</template>
			</div>
		</el-tree>
		
  </div>
</template>

<script src="./SyEditTree.js" />

<style lang="scss">
	/* common */

	// 显示按钮
	.show-btns{
		opacity: 1;
	}

	/* common end */

	.comp-tree{
    text-align: left;
    float: left;
		// width: 90%;
		// height: 80vh;
		padding: 2em;
		// overflow: auto;
		// border:1.8px dotted gray;
		// 顶部按钮
		.comp-tr-top{
			width: 110px;
			margin-bottom: 2em;
		}
		// 自定义节点
		.comp-tr-node{
			// label
			.comp-tr-node--name{
				display: inline-block;
				line-height: 40px;
				min-height: 40px;
				// 新增
				&.is-new{
					font-weight: bold;
				}
			}
			// button
			.comp-tr-node--btns{
				margin-left: 10px;
				opacity: 0;
				transition: opacity .1s;
				.el-button{
					transform: scale(0.8);// 缩小按钮
					& + .el-button{
						margin-left: -1px;
					}
				}
			}
		}
		// 悬浮显示按钮
		.el-tree-node__content{
			&:hover{
				.comp-tr-node--btns{
					@extend .show-btns;
				}
			}
		}
	}
</style>
