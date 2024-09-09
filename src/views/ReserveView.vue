<template>
  <div class="main">
    <ValidationForm @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <h1>{{ t('public.reserve') }}</h1>
      <div class="form-group">
        <label for="name">*{{ t('member.name') }}</label>
        <!-- <input type="text" placeholder="請輸入您的姓名" > -->
        <Field
          name="name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
        />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="phone">*{{ t('member.phone') }}</label>
        <!-- <input type="text" placeholder="請輸入您的連絡電話" v-on:keydown="checkDown" maxlength="10" > -->
        <Field
          name="phone"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors.phone }"
        />
        <ErrorMessage name="phone" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="email">{{ t('member.email') }}</label>
        <!-- <input type="text" placeholder="請輸入您的電子郵件" > -->
        <Field
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors.email }"
        />
        <ErrorMessage name="email" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="appointmentDate">*{{ t('member.appointmentDate') }}</label>
        <Field
          name="appointmentDate"
          type="date"
          class="form-control"
          :class="{ 'is-invalid': errors.appointmentDate }"
        />
        <ErrorMessage name="appointmentDate" class="error-feedback" />
      </div>

      <div class="form-group">
        <label for="appointmentTime">*{{ t('member.appointmentTime') }}</label>
        <Field
          name="appointmentTime"
          as="select"
          class="form-control"
          :class="{ 'is-invalid': errors.appointmentTime }"
        >
          <option value="">{{ t('member.choose') }}{{ t('member.appointmentTime') }}</option>
          <option v-for="hour in availableHours" :key="hour" :value="hour">{{ hour }}:00</option>
        </Field>
        <ErrorMessage name="appointmentTime" class="error-feedback" />
      </div>

      <div class="form-group">
        <label for="notes">{{ t('member.notes') }}</label>
        <!-- <textarea style="height: 150px;" ></textarea> -->
        <Field
          name="notes"
          as="textarea"
          class="form-control"
          :class="{ 'is-invalid': errors.notes }"
        />
        <ErrorMessage name="notes" class="error-feedback" />
      </div>
      <div class="form-group">
        <button type="submit">{{ t('button.submit') }}</button>
      </div>
    </ValidationForm>
  </div>
</template>

<script setup lang="ts">
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

import { Form as ValidationForm, Field, ErrorMessage } from 'vee-validate'
import { useAppointmentStore } from '../stores/appointment'
import * as yup from 'yup'
// import dayjs from 'dayjs';
import { defineComponent, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

let maxDate = new Date()
maxDate.setDate(maxDate.getDate() + 40) // 設置最大日期為40天後
console.log(maxDate)

const appointment = useAppointmentStore()

const checkDown = function (e: any) {
  console.log(e.key)
  if (isNaN(e.key) && e.key != 'Backspace') {
    e.preventDefault()
  }
}
const schema = yup.object({
  name: yup
    .string()
    .required(t('member.pleaseEnter') + t('member.name'))
    .min(2, '姓名至少需要2個字符')
    .max(50, '姓名不能超過50個字符'),
  phone: yup
    .string()
    .required(t('member.pleaseEnter') + t('member.phone'))
    .matches(/^[0-9]{10}$/, '請輸入有效的10位電話號碼')
    .test('not-all-same', '電話號碼不能全部是相同的數字', (value) => !/^(\d)\1+$/.test(value)),
  email: yup.string().email(t('member.pleaseEnter') + t('member.valid') + t('member.email')),
  appointmentDate: yup
    .date()
    .required(t('member.pleaseEnter') + t('member.appointmentDate'))
    .min(new Date(), '預約日期不能早於今天')
    .max(maxDate, '預約日期不能晚於40天後'),
  appointmentTime: yup.string().required(t('member.pleaseEnter') + t('member.appointmentTime')),
  // .matches(/^([0-9]|1[0-9]|2[0-3]):00$/, '請選擇有效的整點時間'),
  notes: yup.string().max(500, '備註不能超過500個字符')
})

// 在這裡處理表單提交邏輯
const onSubmit = (values: any) => {
  console.log(values)
  // let message = ''
  // const pack = {
  //   name: t('member.name'),
  //   phone: t('member.phone'),
  //   appointmentDate: t('member.appointmentDate')
  // }
  // for (let key of Object.keys(pack) as (keyof typeof pack)[]) {
  //   console.log(key)
  //   console.log(values[key])
  //   // console.log(pack[key])
  //   if (pack[key] != undefined) {
  //     message += pack[key] + ':' + values[key]
  //     if (key == 'appointmentDate') message += ' ' + values['appointmentTime'] + ':00'
  //     message += '\n'
  //   }
  // }
  values['date'] = values['appointmentDate'] + ' ' + values['appointmentTime'] + ':00'

  console.log(values);
  
  // window.alert(message)
  if (appointment.addAppointment(values)) {
    alert('預約成功')
  } else {
    alert('預約時間已有預定，請更換時間');
  }
}
const availableHours = computed(() => {
  const hours = []
  for (let i = 9; i <= 20; i++) {
    hours.push(i < 10 ? `0${i}` : `${i}`)
  }
  return hours
})
</script>

<style lang="scss" scoped>
.main {
  width: 800px;
  margin: 2rem auto;
  border: 1px solid rgb(50, 122, 151);
  border-radius: 15px;
  padding: 2rem 0.5rem;
}

@media (max-width: 1024px) {
  .main {
    width: 80%;
  }
}
</style>
