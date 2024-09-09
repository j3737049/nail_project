<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAppointmentStore } from '../stores/appointment'
import type { RowData } from '../types/Report';
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();

const appointment = useAppointmentStore();

// const headers = ref<Array<{ key: keyof RowData, label: string }>>([
//   { key: 'Name', label: t('mamber.name') },
//   { key: 'Date', label: t('mamber.appointmentDate') },
//   { key: 'Phone', label: t('mamber.phone') },
//   { key: 'Email', label: t('mamber.email') },
//   { key: 'notes', label: t('mamber.notes') }
// ]);
// const rows = ref<Array<RowData>>([
//   { Name: 'John Doe', Phone: "0988888888", Email: 'fse@google.com', Date: '2024/09/15 15:00', Memo: '' },
//   { Name: 'Jane Doe', Phone: "0845244456", Email: 'janeD@yahoo.com.tw', Date: '2024/09/11 10:00', Memo: '' },
//   { Name: 'Sam Smith', Phone: "0156454535", Email: 'wev@google.com', Date: '2024/09/23 13:00', Memo: '' }
// ]);
const searchQuery = ref<string>('');
const sortKey = ref<keyof RowData | null>(null);
const sortAsc = ref<boolean>(true);

const filteredRows = computed(() => {
  let filtered = appointment.appointments.filter(row =>
    appointment.titles.some(header =>
      row[header.key as keyof RowData].toString().toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );

  if (sortKey.value) {
    filtered.sort((a, b) => {
      if (sortKey.value !== null){
        const aValue = a[sortKey.value];
        const bValue = b[sortKey.value];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortAsc.value 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        } 
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortAsc.value ? aValue - bValue : bValue - aValue;
        }
      }
      
      return 0;
    });
  }

  return filtered;
});

function sortBy(key: any) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortKey.value = key;
    sortAsc.value = true;
  }
}
</script>

<template>
  <div class="main">
    <h1>預約紀錄</h1>
    <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="header in appointment.titles" :key="header.key" @click="sortBy(header.key)">
          {{ header.label }}
            <span v-if="sortKey === header.key">
              {{ sortAsc ? '🔼' : '🔽' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in filteredRows" :key="index">
          <td v-for="header in appointment.titles" :key="header.key">{{ row[header.key as keyof RowData] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;

  .table-container {
    max-width: 800px;
    margin: auto;
    border-collapse: collapse;
  }
  table {
    width: 100%;
    border: 1px solid #ddd;
    th, td {
      padding: 8px;
      text-align: left;
      border: 1px solid #ddd;
    }
    th {
      background-color: #f4f4f4;
    }
  }
}
h1 {
  margin: 1rem;
  padding-bottom: 0.1rem;
  border-bottom: 1px solid;
}

@media (max-width: 768px){
  .main{
    h1{
      font-size: 1.5rem;
    }
    p{
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
      text-align: center;
      max-width: 88%;
    }
    img {
      width: 100%;
    }
  }
}
</style>
