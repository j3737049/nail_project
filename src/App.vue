<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useCounterStore } from './stores/member'
// import HelloWorld from './components/HelloWorld.vue'

const router = useRouter();
const counter = useCounterStore();

// let lists = ref([
//   { value: 1, label: '會員登入', url: '/login' },
//   { value: 2, label: '會員註冊', url: '/register' }
// ])

// if(counter.isLogin){
//   lists = ref([
//     { value: 1, label: '會員登出', url: '/logout' }
//   ])
// }
// const isAuthenticated = computed(() => counter.isLogin);

const lists = computed(()=>{
  if(counter.isLogin){
    return [
      // { value: 1, label: '預約紀錄', url: '/appointment' },
      { value: 2, label: '會員登出', url: '/logout' }
    ]
  }else{
    return [
      { value: 1, label: '會員登入', url: '/login' },
      { value: 2, label: '會員註冊', url: '/register' }
    ]
  }
  
})

// const emit = defineEmits(['select'])

const isOpen = ref(false)
const selectedOption = ref(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: any) => {
  selectedOption.value = option.label
  isOpen.value = false
  // emit('select', option)
  if(option.url != "/logout"){
    router.push(option.url);
  }else{
    const result = counter.logout();
    if(result){
      alert('登出成功');
      router.push('/');
    }
  }

}
</script>

<template>
  <header>
    <RouterLink to="/" >
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
    </RouterLink>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">首頁</RouterLink>
        <RouterLink to="/reserve">預約</RouterLink>
        <RouterLink to="/gallery">作品欣賞</RouterLink>
        <RouterLink to="/about">關於我們</RouterLink>
        <!-- <RouterLink to="/contact">客服中心</RouterLink> -->
      </nav>
    </div>
    <div class="memberarea">
      <div>
        <!-- <RouterLink to="/" >
          <svg class="member-svg qk-text--nav_menu_icon qk-vert--mid" xmlns="http://www.w3.org/2000/svg" height="24" width="25.8" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="6" r="5" stroke="currentColor" stroke-width="2"></circle>
            <path d="M17.607 22.9957H6.393C5.54025 23.04 4.70467 22.7442 4.06888 22.1729C3.43309 21.6017 3.0488 20.8015 3 19.9471V19.1174C3 14.6077 7.032 11 12 11C16.968 11 21 14.6077 21 19.1174V19.9471C20.9512 20.8015 20.5669 21.6017 19.9311 22.1729C19.2953 22.7442 18.4598 23.04 17.607 22.9957V22.9957Z" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"></path>
          </svg>
        </RouterLink> -->
        <div class="dropdown">
          <div v-if="isOpen" @click="toggleDropdown" class="dropdown-backgroud"></div>
          <button @click="toggleDropdown" class="dropdown-toggle">
            <svg class="member-svg qk-text--nav_menu_icon qk-vert--mid" xmlns="http://www.w3.org/2000/svg" height="24" width="25.8" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="6" r="5" stroke="currentColor" stroke-width="2"></circle>
              <path d="M17.607 22.9957H6.393C5.54025 23.04 4.70467 22.7442 4.06888 22.1729C3.43309 21.6017 3.0488 20.8015 3 19.9471V19.1174C3 14.6077 7.032 11 12 11C16.968 11 21 14.6077 21 19.1174V19.9471C20.9512 20.8015 20.5669 21.6017 19.9311 22.1729C19.2953 22.7442 18.4598 23.04 17.607 22.9957V22.9957Z" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"></path>
            </svg>
          </button>
          <ul v-if="isOpen" class="dropdown-list">
            <li v-for="option in lists" :key="option.value" @click="selectOption(option)">
              {{ option.label }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>

  <RouterView />

  <footer>
    <div>
      <p>客服時間 09:00am - 18:00pm (週一至週五)</p>
      <p>04-XXXX-XXXX</p>
      <p>台中市西區XX路XX號</p>
    </div>
  </footer>
</template>

<style lang="scss">
.icon{
  position: absolute;
  top: 2.5rem;
  right: 1rem;
  width: 1rem;
  height: 1rem;
}
.hide{
  display: none!important;
}
.margin-top4{
  margin-top: 4rem;
}


.main {
  form {
    display: contents;
    .form-group {
      display: flex;
      flex-direction: column;
      width: 75%;
      margin-bottom: 1.5rem;
      position: relative;
      .form-control {
        color: rgb(50, 122, 151);
        border: 1px solid rgb(50, 122, 151);
        border-radius: 4px;
        padding: 1rem;
        -moz-appearance: none; /* Firefox */
        -webkit-appearance: none; /* Safari and Chrome */
        appearance: none;
        height: 3rem;
        &[name='appointmentDate'] {
          background-position: right calc(3rem) center;
          padding: 1rem 1rem;
          line-height: 1rem;
        }
        &[name='appointmentTime'] {
          height: 4rem;
        }
      }
      textarea.form-control {
        height: 10rem;
      }
      .error-feedback {
        color: red;
      }
      button {
        height: 3rem;
        background-color: rgb(50, 122, 151);
        border: 0;
        color: #fff;
        border-radius: 5px;
        font-weight: bold;
      }
    }
  }
}
@media (max-width: 768px) {
  .main {
    .form-group {
      input {
        height: 3rem;
      }
    }
    .margin-top4{
      margin-top: 1rem;
    }
  }
}
@media (max-width: 1024px) {
  .main {
    .form-group {
      input {
        height: 2rem;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  display: block;
  cursor: pointer;
}

nav {
  width: 100%;
  /* font-size: 12px; */
  text-align: center;
  /* margin-top: 2rem; */
  background-color: hsla(187, 100%, 37%, 0.2);
}
nav a {
  display: inline-block;
  padding: 1rem 1rem;
  /* border-left: 1px solid var(--color-border); */
  text-decoration: none;
  color: var(--color-text);
  &:hover{
    font-weight: bolder;
  }
  &:first-of-type {
    border: 0;
  }
  &.router-link-exact-active {
    color: var(--color-text);
    font-weight: bold;
    background-color: hsla(187, 100%, 37%, 0.2);
    // &:hover {
    //   background-color: transparent;
    // }
  }
}


.wrapper{
  width: 100%;
}

.memberarea {
    position: absolute;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
    // display: none;
}

footer {
  padding: 3rem 0;
  text-align: center;
  background-color: hsla(187, 100%, 37%, 0.2);
}

.dropdown {
  position: relative;
  width: 7rem;
  
  .dropdown-backgroud {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: auto;
  }

  .dropdown-toggle {
    width: 100%;
    padding: 1rem;
    background-color: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .dropdown-list {
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    background-color: #ffffff;
    border: 1px solid #ced4da;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    li {
      padding: 10px;
      cursor: pointer;
      &:hover {
        background-color: #f8f9fa;
      }
    }
  }
}




@media (max-width: 1024px){
  .dropdown-toggle{
    text-align: right;
    padding: 1rem 0.5rem;
  }
}
</style>