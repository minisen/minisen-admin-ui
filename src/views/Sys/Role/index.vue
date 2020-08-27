<template>

  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-has="[this.$api.role.getItemsPaged]" v-model="filters.name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <sy-button icon="fa fa-search" :label="$t('action.search')" :apiPerms="[this.$api.role.getItemsPaged]" type="primary" @click="searchPage()"/>
        </el-form-item>
        <el-form-item>
          <sy-button icon="fa fa-plus" :label="$t('action.add')" :apiPerms="[this.$api.role.addItem]" type="primary" @click="showAdd" />
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
    <sy-table :height="350" rightWidth='450' 
      :permsEdit="[this.$api.role.editItem]" 
      :permsDelete="[this.$api.role.deleteItem]" 
      :permsLook="[this.$api.role.getItemsPaged]" 
      :data="this.pageResult" :columns="this.columns" 
      @findPage="findPage" @handleEdit="showEdit" @handleDelete="handleDelete">
      <template slot="operations" slot-scope="scope">
        <sy-button icon="el-icon-tickets" :label="$t('action.apiPerms')" 
          :apiPerms="[api.role.setApiPermissions]" 
          @click="showApiPermsEdit(scope.rowData.$index, scope.rowData.row)" />
        <sy-button icon="el-icon-menu" :label="$t('action.menuPerms')" 
          :apiPerms="[api.role.setMenuPermissions]" 
          @click="showMenuPermsEdit(scope.rowData.$index, scope.rowData.row)" />
      </template>
    </sy-table>

    <!--新增编辑界面-->
    <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="dataForm.name" auto-complete="off"></el-input>
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

    <!--Api权限设置界面-->
    <el-dialog title="Api权限设置" width="50%" :visible.sync="apiPermDialogVisible" :close-on-click-modal="false">
      
      <div style="text-align: center">
        <el-transfer style="text-align: left; display: inline-block" 
          v-model="apiPermsBeChoosed" :data="apiTransferKVs"  
          :titles="['未有权限', '已有权限']" :render-content="renderFunc">
        </el-transfer>
      </div>

      <div slot="footer" class="dialog-footer">
        <div style="text-align: center;">
          <el-select size="mini" v-model="chooseApiType" placeholder="Api分类" @change="changeApiType">
            <el-option v-for="item in apiTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button :size="size" @click.native="apiPermDialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button :size="size" @click.native="apiPermsBeChoosed = apiPermsOriginalChoosed">{{$t('action.reset')}}</el-button>
        <el-button :size="size" type="primary" @click.native="submitApiPerms" :loading="editLoading">{{$t('action.submit')}}</el-button>
      </div>
    </el-dialog>

    <!--菜单权限设置界面-->
    <el-dialog title="菜单权限设置" width="50%" :visible.sync="menuPermDialogVisible" :close-on-click-modal="false">
      
      <div style="width: 80vh; height: 50vh;">
        <el-tree
          :data="allMenuItemTree"
          show-checkbox
          node-key="id"
          ref="menuPermsTree"
          :props="defaultProps">
        </el-tree>
      </div>
      <br/>
      
      <div>
        <el-button :size="size" @click.native="menuPermDialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button :size="size" @click.native="resetMenuPermsChoosed">{{$t('action.reset')}}</el-button>
        <el-button :size="size" type="primary" @click.native="submitMenuPerms" :loading="editLoading">{{$t('action.submit')}}</el-button>
      </div>
      
    </el-dialog>    

  </div>
</template>

<script src="./Role.js" />