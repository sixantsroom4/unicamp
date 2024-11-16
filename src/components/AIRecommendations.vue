<script setup>
import { ref } from 'vue'
import { ComputerDesktopIcon } from '@heroicons/vue/24/outline'

const recommendations = ref([
  'MSA 아키텍처 설계 경험',
  '대규모 트래픽 처리 방안'
])
</script>

<template>
  <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold mb-4 flex items-center">
      <ComputerDesktopIcon class="w-5 h-5 mr-2" />
      AI 추천
    </h2>
    <div class="space-y-3">
      <p class="text-sm text-gray-600">
        면접 예정인 N사의 최근 면접 질문 분석 결과,
        다음 주제들을 중점적으로 준비하시면 좋을 것 같습니다:
      </p>
      <ul class="text-sm space-y-2">
        <li v-for="(rec, index) in recommendations" :key="index" class="flex items-center">
          <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
          {{ rec }}
        </li>
      </ul>
    </div>
  </div>
</template>