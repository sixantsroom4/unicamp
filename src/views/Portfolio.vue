<script setup>
import { ref } from 'vue'
import { PlusIcon, ShareIcon, ComputerDesktopIcon, PencilIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'

const projects = ref([
  {
    id: 1,
    title: '취준생 대시보드 개발',
    tech: 'Vue, Spring Boot, AWS',
    status: '진행중',
    description: '취업 준비생을 위한 올인원 대시보드. AI 기반 포트폴리오 관리 시스템 구현.'
  }
])

const skills = ref(['Vue', 'Spring', 'AWS'])
const certificates = ref([
  { name: '정보처리기사', date: '2024.03' }
])

const insights = ref([
  '기술 스택: Spring Boot 프로젝트 추가 권장',
  '프로젝트 설명: 성과 중심 서술 필요',
  '추천 자격증: 정보처리기사'
])
</script>

<template>
  <div class="p-8">
    <!-- 헤더 섹션 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">포트폴리오 대시보드</h1>
        <p class="text-gray-600">AI 기반 포트폴리오 최적화</p>
      </div>
      <div class="flex gap-2">
        <button class="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg">
          <PlusIcon class="w-4 h-4 mr-2" />
          새 프로젝트
        </button>
        <button class="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg">
          <ShareIcon class="w-4 h-4 mr-2" />
          공유하기
        </button>
      </div>
    </div>

    <!-- AI 분석 카드 -->
    <div class="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
      <div class="flex items-start justify-between">
        <div>
          <h2 class="text-lg font-semibold flex items-center">
            <ComputerDesktopIcon class="w-5 h-5 mr-2 text-purple-600" />
            AI 포트폴리오 인사이트
          </h2>
          <ul class="mt-4 space-y-2">
            <li v-for="insight in insights" :key="insight" class="flex items-center text-gray-700">
              • {{ insight }}
            </li>
          </ul>
        </div>
        <button class="px-4 py-2 bg-purple-600 text-white rounded-lg">
          상세 분석 보기
        </button>
      </div>
    </div>

    <!-- 프로젝트 및 스킬 그리드 -->
    <div class="grid grid-cols-2 gap-6">
      <!-- 프로젝트 섹션 -->
      <div class="bg-white rounded-lg p-6 shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">주요 프로젝트</h2>
          <button class="text-indigo-600">
            <PencilIcon class="w-4 h-4" />
          </button>
        </div>
        <div class="space-y-4">
          <div v-for="project in projects" :key="project.id" 
               class="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold">{{ project.title }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ project.tech }}</p>
              </div>
              <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                {{ project.status }}
              </span>
            </div>
            <p class="mt-2 text-sm text-gray-700">{{ project.description }}</p>
          </div>
        </div>
      </div>

      <!-- 스킬 & 자격증 섹션 -->
      <div class="bg-white rounded-lg p-6 shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">스킬 & 자격증</h2>
          <button class="text-indigo-600">
            <PencilIcon class="w-4 h-4" />
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <h3 class="font-medium mb-2">기술 스택</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in skills" :key="skill"
                    class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded">
                {{ skill }}
              </span>
            </div>
          </div>
          <div>
            <h3 class="font-medium mb-2">자격증</h3>
            <div class="space-y-2">
              <div v-for="cert in certificates" :key="cert.name"
                   class="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{{ cert.name }}</span>
                <span class="text-sm text-gray-600">{{ cert.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 템플릿 & 내보내기 섹션 -->
    <div class="mt-6 bg-white rounded-lg p-6 shadow">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold">포트폴리오 템플릿</h2>
        <button class="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg">
          <ArrowDownTrayIcon class="w-4 h-4 mr-2" />
          PDF로 내보내기
        </button>
      </div>
      <div class="grid grid-cols-4 gap-4 mt-4">
        <div class="p-4 border rounded-lg cursor-pointer hover:border-indigo-500">
          <div class="h-32 bg-gray-100 rounded mb-2"></div>
          <p class="text-sm font-medium">기본 템플릿</p>
        </div>
        <div class="p-4 border rounded-lg cursor-pointer hover:border-indigo-500">
          <div class="h-32 bg-gray-100 rounded mb-2"></div>
          <p class="text-sm font-medium">개발자 특화</p>
        </div>
      </div>
    </div>
  </div>
</template>