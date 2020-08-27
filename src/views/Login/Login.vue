<template>
  <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <span style="float: left;">MiniSen v1.0</span><br/>
    <span class="tool-bar">
      <!-- 主题切换 -->
      <theme-picker style="float:right;" class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange"></theme-picker>
      <!-- 语言切换 -->
      <!-- <lang-selector class="lang-selector"></lang-selector>    -->
    </span>
    <h2 class="title" style="padding-left:22px;" >系 統 登 录</h2>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" @keyup.enter.native="login"></el-input>
    </el-form-item>
    <!-- <el-form-item >
      <el-col :span="12">
        <el-form-item prop="captcha">
          <el-input type="test" v-model="loginForm.captcha" auto-complete="off" placeholder="验证码, 单击图片刷新"
            style="width: 100%;">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="1">&nbsp;</el-col>
      <el-col :span="11">
        <el-form-item>
            <img style="width: 100%;" class="pointer" :src="loginForm.src" @click="refreshCaptcha">
        </el-form-item>
      </el-col>
    </el-form-item> -->
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button>
      <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="loading">登 录</el-button>
    </el-form-item>
    <br/>
    <span style="float: right;">QQ：2822737354（加好友備註：MiniSen系統）</span>
  </el-form>
</template>

<script src="./Login.js" />

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 510px;
    height: 300px;
    padding: 35px 35px 15px 35px;
    background: rgb(241, 238, 238);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #ccc6c6;
    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>