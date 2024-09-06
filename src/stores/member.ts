import { defineStore } from 'pinia'
import { ref } from 'vue'
import Cookies from 'js-cookie'

export const useCounterStore = defineStore(
  'member',
  () => {

    const password_list = [{account:"admin",password:"aa1234"}];
    const member = ref({
      account: "",
      password: ""
    });
    const isLogin = ref(!!Cookies.get('isLogin'));
    function memberLogin(loginMember: any){
      const foundMember = password_list.find(item => 
        item.account === loginMember.account && item.password === loginMember.password
      );
      // for(const item of password_list){
      //   if(member.account == item.account && member.password == item.password){
      //     console.log(member);
      //     member.account.value = item.account;
      //     member.password.value = item.password;
      //     loginSuccess();
      //     // alert("登入成功");
      //     result = true;
      //   }
      // }
      
      if (foundMember) {
        // for(const key in foundMember){
        //   member[key] = foundMember[key];
        // }
        member.value.account = foundMember.account;
        member.value.password = foundMember.password;
        loginSuccess();
        return true;
      }
      return false;

    }
    function regitser(newMember: any){
      // for(const item of password_list){
      //   if(member.account == item.account){
      //     result = false;
      //   }
      // }
      if (password_list.some(item => item.account === newMember.account)) {
        return false;
      }

      password_list.push(newMember);
      loginSuccess();

      return true;
    }

    //登入後存資料
    function loginSuccess(){
      isLogin.value = true;
      // Cookies.set('login', "true", { expires: 1 })
    }

    function logout(){
      isLogin.value = false;
      member.value = {
        account: "",
        password: ""
      };
      Cookies.remove('isLogin');

      return true;
    }
  
    return {isLogin, memberLogin, member, regitser, logout }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['isLogin', 'member'],
      afterRestore: (ctx: any) => {
        console.log('Store restored:', ctx.store.$state)
      }
    }as any,
  },
)