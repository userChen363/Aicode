<template>
  <div class="userLogin">
    <h1>AI应用生成 - 用户登录</h1>
    <div class="desc">
      不写一行代码，生成your app
    </div>
    <a-form :model="formState" name="basic" autocomplete="off" @finish="handleSubmit">
      <a-form-item name="userAccount" :rules="[{ required: true, message: '请输入账号' }]">
        <a-input v-model:value="formState.userAccount" placeholder="请输入用户名" />
      </a-form-item>

      <a-form-item name="userPassword" :rules="[
        { required: true, message: '请输入密码' },
        { min: 8, message: '密码长度不能小于 8 位' },
      ]">
        <a-input-password v-model:value="formState.userPassword" placeholder="请输入密码" />
      </a-form-item>

      <div class="tips">
        没有账号？
        <router-link to="/user/register">
          去注册
        </router-link>
      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>

</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { useLoginUserStore } from '@/stores/loginUser';
import { useRouter } from 'vue-router';
import { userLogin } from '@/api/userController';
import { message } from 'ant-design-vue';
const loginUserStore = useLoginUserStore();
const router = useRouter();
const formState = reactive<API.UserLoginRequest>({
  userAccount: '',
  userPassword: '',
});
const handleSubmit = async (values: any) => {
  try {
    const res = await userLogin(values)
    if (res.data.code === 0 && res.data) {
      await loginUserStore.fetchLoginUser()
      message.success('登录成功')
      router.push({
        path: '/',
        replace: true,//替换历史记录，登录成功之后点击返回时是没用的
      })
    } else {
      message.error(res.data.message)
    }
  } catch (error) {
    message.error('登录失败')
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
