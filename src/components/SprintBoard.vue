<script setup>
import { ref } from 'vue'

const tasks = ref([
  { id: 1, title: '자기소개서 작성', status: 'progress', dueDate: '2024-03-20' },
  { id: 2, title: '포트폴리오 업데이트', status: 'progress', dueDate: '2024-03-25' },
  { id: 3, title: '기술 면접 준비', status: 'todo', dueDate: '2024-03-30' }
])

const columns = [
  { id: 'todo', title: '할 일' },
  { id: 'progress', title: '진행 중' },
  { id: 'done', title: '완료' }
]

const getTasksByStatus = (status) => {
  return tasks.value.filter(task => task.status === status)
}
</script>

<template>
  <div class="bg-white rounded-lg p-4 shadow">
    <h2 class="text-xl font-semibold mb-4">스프린트 보드</h2>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="column in columns" :key="column.id" class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-medium text-gray-700 mb-3">{{ column.title }}</h3>
        <div class="space-y-3">
          <div
            v-for="task in getTasksByStatus(column.id)"
            :key="task.id"
            class="bg-white p-3 rounded shadow-sm border border-gray-200"
          >
            <h4 class="font-medium">{{ task.title }}</h4>
            <p class="text-sm text-gray-500">마감일: {{ task.dueDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>