<script setup>
import { ref } from 'vue'

const stats = ref([
  {
    id: 1,
    title: '이번 주 지원',
    value: '5',
    change: '+2',
    changeLabel: '전주 대비',
    gradient: 'from-purple-500 to-purple-600',
    textColor: 'text-white'
  },
  {
    id: 2,
    title: '서류 통과율',
    value: '68%',
    change: '최근 3개월',
    textColor: 'text-green-600'
  },
  {
    id: 3,
    title: '면접 예정',
    value: '2',
    change: '다음 주',
    textColor: 'text-blue-600'
  },
  {
    id: 4,
    title: '완료한 ES',
    value: '12',
    change: '총 작성',
    textColor: 'text-orange-600'
  }
])
</script>

<template>
  <div class="grid grid-cols-4 gap-6 mb-8">
    <div v-for="stat in stats" :key="stat.id"
         :class="[
           'rounded-lg p-6 shadow',
           stat.gradient ? `bg-gradient-to-br ${stat.gradient}` : 'bg-white'
         ]">
      <h3 :class="[
        'text-lg font-medium mb-2',
        stat.gradient ? 'text-white' : 'text-gray-700'
      ]">{{ stat.title }}</h3>
      <p :class="['text-3xl font-bold', stat.textColor]">{{ stat.value }}</p>
      <p :class="[
        'text-sm mt-2',
        stat.gradient ? 'text-white' : 'text-gray-500'
      ]">{{ stat.change }}</p>
    </div>
  </div>
</template>