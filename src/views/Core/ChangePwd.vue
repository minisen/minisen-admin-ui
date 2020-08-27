<template>
	<!--密碼修改界面-->
  <el-dialog :title="$t('action.changePwd')" width="40%" :visible.sync="changePwdDialogVisible" :close-on-click-modal="false" :modal="false">
    <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
      <el-form-item label="舊密碼" prop="oldPwd">
        <el-input type="password" v-model="dataForm.oldPwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密碼" prop="newPwd">
        <el-input type="password" v-model="dataForm.newPwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="確認密碼" prop="repeatNewPwd">
        <el-input type="password" v-model="dataForm.repeatNewPwd" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :size="size" @click.native="changePwdDialogVisible = false">{{$t('action.cancel')}}</el-button>
      <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ChangePwd',
	data() {
		return {
      size: 'small',
      dataFormRules: {
				oldPwd: [
					{ required: true, message: '请输入舊密碼', trigger: 'blur' }
				],
				newPwd: [
					{ required: true, message: '请输入新密碼', trigger: 'blur' }
				],
				repeatNewPwd: [
					{ required: true, message: '请確認密碼', trigger: 'blur' }
				]
			},
      changePwdDialogVisible: false, // 修改密碼界面是否显示
			editLoading: false,
      //密碼修改表單數據
      dataForm: {
				oldPwd: '',
				newPwd: '',
				repeatNewPwd: ''
			}
		}
	},
	methods: {
    // 设置可见性
    setVisible: function (visible) {
        this.changePwdDialogVisible = visible
    },
    submitForm: function () {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认修改密碼吗？', '提示', {}).then(() => {
						this.editLoading = true
						let params = Object.assign({}, this.dataForm)

						this.$api.login.changePassword.r(params).then(res => {
							if (res.data.sendData.result == 'success') {
								this.$message({ message: '操作成功', type: 'success' })
                this.changePwdDialogVisible = false
								
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
		}
	},
	mounted() {
	}
}
</script>

<style scoped>

</style>