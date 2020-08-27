<template>

  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-has="[this.$api.permission.getItemsPaged]" v-model="filters.nameKey" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <sy-button icon="fa fa-search" :label="$t('action.search')" :apiPerms="[this.$api.dictionary.getItemsPaged]" type="primary" @click="searchPage()"/>
        </el-form-item>
        <el-form-item>
          <sy-button icon="fa fa-plus" :label="$t('action.add')" :apiPerms="[this.$api.dictionary.addItem]" type="primary" @click="showAdd" />
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
    <sy-table :height="350" 
      :permsEdit="[this.$api.permission.editItem]" 
      :permsDelete="[this.$api.permission.deleteItem]" 
      :permsLook="[this.$api.permission.getItemsPaged]" 
      :data="this.pageResult" :columns="this.columns" 
      @findPage="findPage" @handleEdit="showEdit" @handleDelete="handleDelete">
    </sy-table>
    <!--新增编辑界面-->
    <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
      <el-form style="text-align: left;" :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="apiType">
          <el-select v-model="dataForm.apiType" placeholder="请选择" auto-complete="off">
            <el-option v-for="item in apiTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="访问路径" prop="apiUrl">
          <el-input v-model="dataForm.apiUrl" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="请求方式" prop="apiMethod">
          <el-select v-model="dataForm.apiMethod" placeholder="请选择" auto-complete="off">
            <el-option key="GET" label="GET" value="GET"></el-option>
            <el-option key="POST" label="POST" value="POST"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dataForm.sort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="dataForm.remarks" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./ApiPermission.js" />