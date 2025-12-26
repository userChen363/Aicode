<template>
  <div class="userLogin">
    <h1>AI应用生成 - 用户注册</h1>
    <div class="desc">
      不写一行代码，生成your app
    </div>
    <a-form :model="formState" name="basic" autocomplete="off" @finish="handleSubmit">
      <a-form-item name="userAccount" :rules="[{ required: true, message: '请输入账号' }]">
        <a-input v-model:value="formState.userAccount" placeholder="请输入账号" />
      </a-form-item>

      <a-form-item name="userPassword"
        :rules="[{ required: true, message: '请输入密码' }, { min: 8, message: '密码长度不能小于8' }]">
        <a-input-password v-model:value="formState.userPassword" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item name="checkPassword"
        :rules="[{ required: true, message: '请确认密码' }, { min: 8, message: '密码长度不能小于8' }]">
        <a-input-password v-model:value="formState.checkPassword" placeholder="请确认密码" />
      </a-form-item>
      <div class="tips">
        已有账号？去登陆
        <router-link to="/user/login">
          去注册
        </router-link>
      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>

</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { useLoginUserStore } from '@/stores/loginUser';
import { useRouter } from 'vue-router';
import {  userRegister } from '@/api/userController';
import { message } from 'ant-design-vue';
const loginUserStore = useLoginUserStore();
const router = useRouter();
const formState = reactive<API.UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
  checkPassword:''
});
const handleSubmit = async (values: any) => {
  try {
    const res = await userRegister(values)
    if (res.data.code === 0 && res.data) {
      await loginUserStore.fetchLoginUser()
      message.success('注册成功')
      router.push({
        path: '/user/userLoginPage',
      })
    } else {
      message.error(res.data.message)
    }
  } catch (error) {
    message.error('注册失败',error.message)
  }

};

</script>
<style scoped lang="scss">
.userLogin {
  max-width: 420px;
  margin: 0 auto;
  text-align: center;

  >h2 {
    margin-bottom: 16px;
  }

  .desc {
    margin-bottom: 16px;
    color: #bbb;
  }

  .tips {
    margin-bottom: 16px;
    text-align: right;
    color: #bbb;

  }
}
</style>
