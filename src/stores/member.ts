import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore(
  'counter',
  () => {

    const password_list = [{account:"ching",password:"aa1234"}];
    const isLogin = ref(false);
    function memberLogin(member: any){
      for(const item of password_list){
        if(member.account == item.account && member.password == item.password){
          isLogin.value = true;
        }
      }
    }
    function regitser(member: any){
      password_list.push(member);
    }
  
    return {isLogin, memberLogin }
  },
  {
    persist: true,
  },
)