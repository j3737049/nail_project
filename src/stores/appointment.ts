import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RowData } from '../types/Report';

export const useAppointmentStore = defineStore(
  'appointment',
  () => {
    
    const titles = ref<Array<{ key: keyof RowData, label: string }>>([
      { key: 'name', label: '姓名' },
      { key: 'date', label: '預約日期' },
      { key: 'phone', label: '電話號碼' },
      { key: 'email', label: '電子郵件' },
      { key: 'notes', label: '備註' }
    ]);
    const appointments = ref([
      { name: 'John Doe', phone: "0988888888", email: 'fse@google.com', date: '2024-09-15 15:00', notes: '' },
      { name: 'Jane Doe', phone: "0845244456", email: 'janeD@yahoo.com.tw', date: '2024-09-11 10:00', notes: '' },
      { name: 'Sam Smith', phone: "0156454535", email: 'wev@google.com', date: '2024-09-23 13:00', notes: '' }
    ]);
    function addAppointment(appointment:any){

      for(const app of appointments.value){
        if(app.date == appointment.date){
          return false;
        }
      }
      appointments.value.push(appointment);
      return true;
    }
  
    return { addAppointment, appointments, titles }
  },
  {
    persist: true,
  },
)