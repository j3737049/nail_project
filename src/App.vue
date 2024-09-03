<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
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
        <svg class="member-svg qk-text--nav_menu_icon qk-vert--mid" xmlns="http://www.w3.org/2000/svg" height="24" width="25.8" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="6" r="5" stroke="currentColor" stroke-width="2"></circle>
          <path d="M17.607 22.9957H6.393C5.54025 23.04 4.70467 22.7442 4.06888 22.1729C3.43309 21.6017 3.0488 20.8015 3 19.9471V19.1174C3 14.6077 7.032 11 12 11C16.968 11 21 14.6077 21 19.1174V19.9471C20.9512 20.8015 20.5669 21.6017 19.9311 22.1729C19.2953 22.7442 18.4598 23.04 17.607 22.9957V22.9957Z" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"></path>
        </svg>
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

<style scoped>
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
    &:hover {
      background-color: transparent;
    }
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
    display: none;
}

footer {
  padding: 3rem 0;
  text-align: center;
  background-color: hsla(187, 100%, 37%, 0.2);
}

@media (max-width: 1024px){
  /* footer{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  } */
}
</style>
