<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useMemberStore } from './stores/member'
import { useI18n } from 'vue-i18n'
import { Button } from 'bootstrap'

const { t, locale } = useI18n()
const router = useRouter()
const counter = useMemberStore()

const lists = computed(() => {
  if (counter.isLogin) {
    return [
      { value: 1, label: t('button.appointment'), url: '/appointment' },
      { value: 2, label: t('button.logout'), url: '/logout' }
    ]
  } else {
    return [
      { value: 1, label: t('button.login'), url: '/login' },
      { value: 2, label: t('button.register'), url: '/register' }
    ]
  }
})

const isOpen = ref(false)
const selectedOption = ref(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: any) => {
  selectedOption.value = option.label
  isOpen.value = false
  // emit('select', option)
  if (option.url != '/logout') {
    router.push(option.url)
  } else {
    const result = counter.logout()
    if (result) {
      alert('登出成功')
      router.push('/')
    }
  }
}
</script>

<template>
  <header>
    <RouterLink to="/">
      <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
    </RouterLink>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">{{ t('public.home') }}</RouterLink>
        <RouterLink to="/reserve">{{ t('public.reserve') }}</RouterLink>
        <RouterLink to="/gallery">{{ t('public.gallery') }}</RouterLink>
        <RouterLink to="/about">{{ t('public.aboutUs') }}</RouterLink>
        <!-- <RouterLink to="/contact">客服中心</RouterLink> -->
      </nav>
    </div>
    <div class="memberarea">
      <div>
        <div class="dropdown">
          <div v-if="isOpen" @click="toggleDropdown" class="dropdown-backgroud"></div>
          <button @click="toggleDropdown" class="dropdown-toggle">
            <svg
              class="member-svg qk-text--nav_menu_icon qk-vert--mid"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="25.8"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="6" r="5" stroke="currentColor" stroke-width="2"></circle>
              <path
                d="M17.607 22.9957H6.393C5.54025 23.04 4.70467 22.7442 4.06888 22.1729C3.43309 21.6017 3.0488 20.8015 3 19.9471V19.1174C3 14.6077 7.032 11 12 11C16.968 11 21 14.6077 21 19.1174V19.9471C20.9512 20.8015 20.5669 21.6017 19.9311 22.1729C19.2953 22.7442 18.4598 23.04 17.607 22.9957V22.9957Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-miterlimit="10"
              ></path>
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
    <div data-v-7a7a37b1="" class="github">
      <a data-v-7a7a37b1="" href="https://github.com/j3737049/nail_project" target="_blank"
        ><svg
          data-v-7a7a37b1=""
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
          data-v-7c184dd8=""
        >
          <path
            data-v-7a7a37b1=""
            fill="currentColor"
            d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          ></path></svg
      ></a>
    </div>
  </header>

  <RouterView />

  <footer>
    <div>
      <p>{{ t('public.csTime') }} 09:00am - 18:00pm ({{ t('public.csDate') }})</p>
      <p>04-XXXX-XXXX</p>
      <p>{{ t('public.csAdress') }}</p>
    </div>
  </footer>
</template>

<style lang="scss">
.icon {
  position: absolute;
  top: 2.5rem;
  right: 1rem;
  width: 1rem;
  height: 1rem;
}
.hide {
  display: none !important;
}
.margin-top4 {
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
    .margin-top4 {
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
  &:hover {
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

.wrapper {
  width: 100%;
}

.memberarea {
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  // display: none;
}
.github {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1rem;
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

@media (max-width: 1024px) {
  .dropdown-toggle {
    text-align: right;
    padding: 1rem 0.5rem;
  }
}
</style>
