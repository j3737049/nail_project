

<script setup lang="ts">
import { Form as ValidationForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useCounterStore } from '../stores/member'
import { useRouter } from 'vue-router';

const counter = useCounterStore();

const router = useRouter();

const schema = yup.object({
  account: yup.string().required('請輸入帳號'),
  password: yup.string().required('請輸入密碼'),
  phone: yup.string()
    // .matches(/^[0-9]{10}$/, '請輸入有效的10位電話號碼')
    .test('is-empty-or-valid', '電話號碼必須是10位數字', (value) => {
      // 如果沒有輸入，返回 true（有效）
      if (!value || value.trim() === '') {
        return true;
      }
      // 如果有輸入，必須是10位數字
      return /^\d{10}$/.test(value);
    }),
  email: yup.string()
    .email('請輸入有效的電子郵件地址')
})

const onPhoneInput = (event: any, handleChange: any) => {
  const newValue = event.target.value.replace(/\D/g, '');
  handleChange(newValue);
  console.log(event.target.value);
};

// 在這裡處理表單提交邏輯
const onSubmit = (values: any) => {
  console.log(values);
  const result = counter.regitser(values);
  
  if(result){
    alert("註冊成功");
    router.replace('/');
  }else{
    alert("帳號重複");
  }
}

</script>
<template>
  <div class="main">
    <ValidationForm @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <h1>註冊</h1>
      <div class="form-group">
        <label for="account">*帳號</label>
        <Field
          name="account"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.account }"
           placeholder="請輸入帳號"
        />
        <ErrorMessage name="account" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="password">*密碼</label>
        <Field
          name="password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
           placeholder="請輸入密碼"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="phone">電話電話</label >
        <!-- <input type="text" placeholder="請輸入您的連絡電話" v-on:keydown="checkDown" maxlength="10" > -->
      <!-- <Field name="phone" type="tel" class="form-control" :class="{ 'is-invalid': errors.phone }" @input="onPhoneInput" /> -->

        <Field name="phone" v-slot="{ field, errors, handleChange }">
          <input v-bind="field" type="tel" class="form-control" placeholder="請輸入電話號碼" 
          @input="(event) => onPhoneInput(event, handleChange)" />
          <span v-if="errors.length" class="error-feedback">{{ errors[0] }}</span>
        </Field>
      <!-- <ErrorMessage name="phone" class="error-feedback" /> -->
      </div>
      <div class="form-group">
        <label for="email">電子郵件</label >
        <!-- <input type="text" placeholder="請輸入您的電子郵件" > -->
      <Field name="email" type="email" class="form-control" placeholder="請輸入電子郵件" :class="{ 'is-invalid': errors.email }" />
      <ErrorMessage name="email" class="error-feedback" />
      </div>

      <div class="form-group">
        <button type="submit">提交</button>
      </div>
      
      <h1 class="margin-top4">已有帳號?</h1>
      <div class="form-group">
        <span>
          <RouterLink to="/login" class="loginBTN">點擊登入</RouterLink>
        </span>
      </div>
    </ValidationForm>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 800px;
  margin: 2rem auto;
  border: 1px solid rgb(50, 122, 151);
  border-radius: 15px;
  padding: 2rem 0.5rem;
  
  .loginBTN {
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
@media (max-width: 1024px) {
  .main {
    width: 80%;
  }
}
</style>
