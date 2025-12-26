// 通过路由守卫判断是否具有权限
import router from '@/router'
import { message } from 'ant-design-vue'
import { useLoginUserStore } from './stores/loginUser'

// 是否为用户首次登录
let ifFirstLogin = true

/**
 * 全局校验
 */
router.beforeEach(async (to, from, next) => {
  const loginUserStore = useLoginUserStore()
  let loginUser = loginUserStore.loginUser

  // 确保页面刷新，首次加载，能够等待后端返回登录用户信息后再校验
 if (ifFirstLogin) {
    await loginUserStore.fetchLoginUser()
    loginUser = loginUserStore.loginUser
    ifFirstLogin = false
  }
  const toUrl = to.fullPath
  if (toUrl.startsWith('/admin')) {
    if (!loginUser || loginUser.userRole !== 'admin') {
      message.error('没有权限')
      next(`/user/login?redirect=${to.fullPath}`)
      return
    }
  }
  next()
})
// import { useLoginUserStore } from '@/stores/loginUser'
// import { message } from 'ant-design-vue'
// import router from '@/router'

// // 是否为首次获取登录用户
// let firstFetchLoginUser = true

// /**
//  * 全局权限校验
//  */
// router.beforeEach(async (to, from, next) => {
//   const loginUserStore = useLoginUserStore()
//   let loginUser = loginUserStore.loginUser
//   // 确保页面刷新，首次加载时，能够等后端返回用户信息后再校验权限
//   if (firstFetchLoginUser) {
//     await loginUserStore.fetchLoginUser()
//     loginUser = loginUserStore.loginUser
//     firstFetchLoginUser = false
//   }
//   const toUrl = to.fullPath
//   if (toUrl.startsWith('/admin')) {
//     if (!loginUser || loginUser.userRole !== 'admin') {
//       message.error('没有权限')
//       next(`/user/login?redirect=${to.fullPath}`)
//       return
//     }
//   }
//   next()
// })
