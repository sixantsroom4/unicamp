<script setup>
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'

const events = ref([
  {
    id: 1,
    title: 'N사 면접',
    datetime: '11월 16일 13:00',
    type: 'interview',
    color: 'purple'
  },
  {
    id: 2,
    title: 'K사 서류 마감',
    datetime: '11월 19일 18:00',
    type: 'deadline',
    color: 'blue'
  }
])
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold mb-4">다가오는 일정</h2>
    <div class="space-y-4">
      <div v-for="event in events" :key="event.id"
           :class="`flex items-center p-3 bg-${event.color}-50 rounded-lg`">
        <div :class="`w-2 h-2 bg-${event.color}-500 rounded-full mr-3`"></div>
        <div>
          <p class="font-medium">{{ event.title }}</p>
          <p class="text-sm text-gray-500">{{ event.datetime }}</p>
        </div>
      </div>
      <button class="w-full px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 flex items-center justify-center">
        <PlusIcon class="w-4 h-4 mr-2" />
        일정 추가
      </button>
    </div>
  </div>
</template>