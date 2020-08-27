<template>

  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-select v-has="[ApiArea.getItemsPaged]" 
            v-model="filters.status" 
            placeholder="發佈狀態" auto-complete="off" >
            <el-option key="" label="所有狀態" value=""></el-option>
            <el-option key="1" label="已發佈" value="1"></el-option>
            <el-option key="0" label="未發佈" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <sy-button icon="fa fa-search" :label="$t('action.search')" :apiPerms="[ApiArea.getItemsPaged]" type="primary" @click="searchPage()"/>
        </el-form-item>
        <el-form-item>
          <sy-button icon="fa fa-plus" :label="$t('action.add')" :apiPerms="[ApiArea.addItem]" type="primary" @click="showAdd" />
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
    <sy-table :height="350" 
      :permsEdit="[ApiArea.editItem]" 
      :permsDelete="[ApiArea.deleteItem]" 
      :permsLook="[ApiArea.getItemsPaged]" 
      :data="this.pageResult" :columns="this.columns" 
      @findPage="findPage" @handleEdit="showEdit" @handleDelete="handleDelete">
    </sy-table>
    <!--新增编辑界面-->
    <el-dialog :lock-scroll="false" :title="operation?'新增':'编辑'" width="70%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
      <el-form style="text-align: left;" :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="標題" prop="title">
              <el-input v-model="dataForm.title" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分類" prop="category">
              <el-select v-model="dataForm.category">
                <el-option v-for="item in articleCategorys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="副標題" prop="subHead">
              <el-input v-model="dataForm.subHead" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="來源" prop="copyFrom">
              <el-input v-model="dataForm.copyFrom" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="全標題" prop="fullTitle">
              <el-input v-model="dataForm.fullTitle" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否置頂" prop="isOnTop">
              <el-switch
                v-model="dataForm.isOnTop"
                active-text="是"
                inactive-text="否"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="發佈狀態" prop="status">
              <el-switch
                v-model="dataForm.status"
                active-text="已發佈"
                inactive-text="未發佈"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="簡介" prop="intro">
              <el-input v-model="dataForm.intro" auto-complete="off" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="dataForm.remarks" auto-complete="off" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="關鍵字" prop="keyword">
              <el-input v-model="dataForm.keyword" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="dataForm.sort" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="文章內容" prop="content">
          <el-input v-model="dataForm.content" auto-complete="off" type="textarea"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./Article.js" />