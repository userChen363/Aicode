<template>
  <div id="header">
    <a-row>
      <!-- 左侧logo部分 -->
      <a-col flex="200px">
        <router-link to="/">
          <div class="headerlogo">
            <img src="@/assets/Code.png" alt="logo">
            <h1>ai应用生成</h1>
          </div>
        </router-link>
      </a-col>
      <!-- 导航菜单 -->
      <a-col flex="auto">
        <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal" :items="menuItems" @click="handleMenuClick" />
      </a-col>
      <!-- 右侧用户功能区 -->
      <a-col>
        <div class="usrLoginStatus">
          <div v-if="loginUserStore.loginUser.id">
            <a-dropdown>
              <a-space>
                <a-avatar :src="useAvatar"></a-avatar>
                {{ loginUserStore.loginUser.value || '无名'}}
              </a-space>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="doLogout">
                    <LogoutOutlined /><!-- 退出图标 -->
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>

          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>

      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, ref, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { LogoutOutlined, HomeOutlined, LoadingOutlined, LoginOutlined } from '@ant-design/icons-vue'
import {useLoginUserStore} from '@/stores/loginUser.ts'
import useAvatar from '@/assets/avatar.jpg'
import { userLogout } from '@/api/userController';
import { message, } from 'ant-design-vue';
const router = useRouter()
const loginUserStore = useLoginUserStore()
// 当前选中菜单
const selectedKeys = ref<string[]>(['/'])
// 监听路由变化，更新当前选中菜单
router.afterEach((to, from, next) => {
  selectedKeys.value = [to.path]
})

// 菜单配置项
const originItems = [
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/admin/userManagePage',
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: '/admin/appManage',
    label: '应用管理',
    title: '应用管理',
  },
  {
    key: 'others',
    label: h('a', { href: 'https://www.codefather.cn', target: '_blank' }, '编程导航'),
    title: '编程导航',
  },
]

// 过滤菜单项
const filterMenus = (menus = [] as MenuProps['items']) => {
  return menus?.filter((menu) => {
    const menuKey = menu?.key as string
    if (menuKey?.startsWith('/admin')) {
      const loginUser = loginUserStore.loginUser
      if (!loginUser || loginUser.userRole !== 'admin') {
        return false
      }
    }
    return true
  })
}

// 展示在菜单的路由数组
const menuItems = computed<MenuProps['items']>(() => filterMenus(originItems))

// 处理菜单点击
const handleMenuClick: MenuProps['onClick'] = (e) => {
  const key = e.key as string
  selectedKeys.value = [key]
  // 跳转到对应页面
  if (key.startsWith('/')) {
    router.push(key)
  }
}

// 退出登录
const doLogout = async () => {
  const res = await userLogout()
  if (res.data.code === 0) {
    loginUserStore.setLoginUser({
      userName: '未登录',
    })
   message.success('退出成功')
    await router.push('/user/login')
  } else {
    message.error('退出登录失败，' + res.data.message)
  }
}
</script>
<style lang="scss" scoped>
#header {
  background-color: #fff;
  padding: 0 40px;

  .headerlogo {
    display: flex;
    align-items: center;
    gap: 12px;

    img {
      width: 48px;
      height: 48px;
    }

    h1 {
      font-size: 20px;
      margin-bottom: 0 !important;
      color: #333;
    }
  }
}
</style>
