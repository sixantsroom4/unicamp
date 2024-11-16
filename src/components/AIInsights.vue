<script setup>
import { ref } from 'vue'

const insights = ref([
  {
    id: 1,
    title: '포트폴리오 개선점',
    description: '기술 스택 섹션에 최신 프레임워크 경험을 추가하면 좋을 것 같습니다.'
  },
  {
    id: 2,
    title: '추천 자격증',
    description: '현재 경력 방향을 고려할 때 AWS 자격증 취득을 추천드립니다.'
  }
])
</script>

<template>
  <div class="bg-white rounded-lg p-4 shadow">
    <h2 class="text-xl font-semibold mb-4">AI 인사이트</h2>
    <div class="space-y-4">
      <div
        v-for="insight in insights"
        :key="insight.id"
        class="p-4 bg-indigo-50 rounded-lg"
      >
        <h3 class="font-medium text-indigo-900 mb-2">{{ insight.title }}</h3>
        <p class="text-indigo-700">{{ insight.description }}</p>
      </div>
    </div>
  </div>
</template>