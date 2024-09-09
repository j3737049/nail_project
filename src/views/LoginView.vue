<template>
  <div class="main">
    <ValidationForm @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <h1>登入</h1>
      <div class="form-group">
        <label for="account">帳號</label>
        <Field
          name="account"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.account }"
        />
        <ErrorMessage name="account" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="password">密碼</label>
        <Field
          name="password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
        />
        <span class="icon hide"
          ><svg
            viewBox="0 0 20 14"
            focusable="false"
            class="chakra-icon icon-password-visibility emotion-css-cache-blpcuq"
          >
            <path
              d="M19.5088 1.2089C19.611 1.25074 19.6601 1.36775 19.6163 1.46914C19.1289 2.59656 18.4454 3.62068 17.6082 4.49961L18.9568 5.99878L17.8417 7.00198L16.4985 5.50888C15.5938 6.22036 14.5674 6.7865 13.4555 7.17185L14.1946 9.2714L12.8053 9.72941L12.0394 7.55372C11.3797 7.68288 10.6977 7.75059 9.99978 7.75059C9.32819 7.75059 8.67131 7.68789 8.0348 7.56806L7.31157 9.73778L5.88854 9.26343L6.58145 7.18472C5.46686 6.80317 4.43758 6.24022 3.52977 5.53138L2.03027 7.03088L0.969613 5.97021L2.41524 4.52459C1.56718 3.64011 0.875232 2.60726 0.383259 1.46914C0.339431 1.36775 0.388517 1.25074 0.490744 1.2089L1.50879 0.79228C1.61102 0.750444 1.72764 0.799611 1.7718 0.900853C3.14365 4.04555 6.30943 6.25059 9.99978 6.25059C13.6901 6.25059 16.8559 4.04555 18.2277 0.900854C18.2719 0.799611 18.3885 0.750444 18.4907 0.79228L19.5088 1.2089Z"
              fill="currentColor"
            ></path></svg
        ></span>
        <ErrorMessage name="password" class="error-feedback" />
      </div>

      <div class="form-group">
        <button type="submit">提交</button>
      </div>

      <h1 class="margin-top4">還不是會員?</h1>
      <div class="form-group">
        <span>
          <RouterLink to="/register" class="registerBTN">點擊註冊</RouterLink>
        </span>
      </div>
    </ValidationForm>
  </div>
</template>

<script setup lang="ts">
import { Form as ValidationForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useMemberStore } from '../stores/member'
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()


const router = useRouter();

const counter = useMemberStore()

const schema = yup.object({
  account: yup.string().required('請輸入帳號'),
  password: yup.string().required('請輸入密碼')
})

// 在這裡處理表單提交邏輯
const onSubmit = (values: any) => {
  console.log(values)
  const result = counter.memberLogin(values);
  if(result){
    alert("登入成功");
    router.replace('/');
  }else{
    alert("帳號或密碼錯誤");
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 800px;
  margin: 2rem auto;
  border: 1px solid rgb(50, 122, 151);
  border-radius: 15px;
  padding: 2rem 0.5rem;
  .registerBTN {
    text-align: center;
    display: block;
    height: 3rem;
    line-height: 3rem;
    background-color: rgb(50, 122, 151);
    border: 0;
    color: #fff;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
  }
}
@media (max-width: 768px) {
  .main {
    .form-group {
      input {
        height: 3rem;
      }
    }
  }
}
@media (max-width: 1024px) {
  .main {
    width: 80%;
    .form-group {
      input {
        height: 2rem;
      }
    }
  }
}
</style>
