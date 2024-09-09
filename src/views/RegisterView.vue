<script setup lang="ts">
import { Form as ValidationForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useMemberStore } from '../stores/member'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const counter = useMemberStore()

const router = useRouter()

const schema = yup.object({
  account: yup.string().required(t('member.pleaseEnter') + t('member.account')),
  password: yup.string().required(t('member.pleaseEnter') + t('member.password')),
  phone: yup
    .string()
    // .matches(/^[0-9]{10}$/, '請輸入有效的10位電話號碼')
    .test('is-empty-or-valid', '電話號碼必須是10位數字', (value) => {
      // 如果沒有輸入，返回 true（有效）
      if (!value || value.trim() === '') {
        return true
      }
      // 如果有輸入，必須是10位數字
      return /^\d{10}$/.test(value)
    }),
  email: yup.string().email(t('member.pleaseEnter') + t('member.valid') + t('member.email'))
})

const onPhoneInput = (event: any, handleChange: any) => {
  const newValue = event.target.value.replace(/\D/g, '')
  handleChange(newValue)
  console.log(event.target.value)
}

// 在這裡處理表單提交邏輯
const onSubmit = (values: any) => {
  console.log(values)
  const result = counter.regitser(values)

  if (result) {
    alert(t('member.register') + t('member.success'))
    router.replace('/')
  } else {
    alert(t('member.registerError'))
  }
}
</script>
<template>
  <div class="main">
    <ValidationForm @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <h1>{{ t('member.register') }}</h1>
      <div class="form-group">
        <label for="account">*{{ t('member.account') }}</label>
        <Field
          name="account"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.account }"
          :placeholder="t('member.pleaseEnter') + t('member.account')"
        />
        <ErrorMessage name="account" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="password">*{{ t('member.password') }}</label>
        <Field
          name="password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
          :placeholder="t('member.pleaseEnter') + t('member.password')"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="phone">{{ t('member.phone') }}</label>
        <Field name="phone" v-slot="{ field, errors, handleChange }">
          <input
            v-bind="field"
            type="tel"
            class="form-control"
            :placeholder="t('member.pleaseEnter') + t('member.phone')"
            @input="(event) => onPhoneInput(event, handleChange)"
          />
          <span v-if="errors.length" class="error-feedback">{{ errors[0] }}</span>
        </Field>
        <!-- <ErrorMessage name="phone" class="error-feedback" /> -->
      </div>
      <div class="form-group">
        <label for="email">{{ t('member.email') }}</label>
        <!-- <input type="text" placeholder="請輸入您的電子郵件" > -->
        <Field
          name="email"
          type="email"
          class="form-control"
          :placeholder="t('member.pleaseEnter') + t('member.email')"
          :class="{ 'is-invalid': errors.email }"
        />
        <ErrorMessage name="email" class="error-feedback" />
      </div>

      <div class="form-group">
        <button type="submit">{{ t('button.submit') }}</button>
      </div>

      <h1 class="margin-top4">{{ t('button.hasAccount') }}?</h1>
      <div class="form-group">
        <span>
          <RouterLink to="/login" class="loginBTN"
            >{{ t('button.click') }}{{ t('member.login') }}</RouterLink
          >
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
