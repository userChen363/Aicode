import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLoginUser } from '@/api/userController.ts'

export const useLoginUserStore = defineStore('loginUser', () => {
  const loginUser = ref<API.LoginUserVO>({
      userName:'未登录'
    })

  /**
   * 获取登录用户
   */
  async function fetchLoginUser(){
    const res = await  getLoginUser()
    if(res.data.code ===0 && res.data){
      loginUser.value = res.data.data
    }
  }

  /**
   * 设置登录用户信息
   * @param newLginUser
   */
  function setLoginUser(newLginUser:any){
    loginUser.value=newLginUser
  }
  return { loginUser,fetchLoginUser,setLoginUser }
})
