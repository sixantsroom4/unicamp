<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ArrowRightIcon, StarIcon, CheckCircleIcon, CalendarIcon, DocumentTextIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()

const startDemo = () => {
  authStore.startDemo()
  router.push('/dashboard')
}

const features = [
  {
    title: '스마트 일정관리',
    description: 'AI가 분석하여 최적의 취업 준비 일정을 제안합니다.',
    icon: CalendarIcon
  },
  {
    title: '자기소개서 관리',
    description: 'AI 분석을 통한 맞춤형 자기소개서 작성을 지원합니다.',
    icon: DocumentTextIcon
  },
  {
    title: '커뮤니티',
    description: '취준생들과 정보를 공유하고 함께 성장하세요.',
    icon: UserGroupIcon
  }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
    <!-- 네비게이션 바 -->
    <nav class="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-indigo-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <span class="text-2xl font-bold text-indigo-600">Unicamp</span>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/login" class="text-gray-700 hover:text-indigo-600">로그인</router-link>
            <button @click="startDemo" 
                    class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                           transition-all duration-200 shadow-lg shadow-indigo-200">
              체험하기
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 히어로 섹션 -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="grid grid-cols-2 gap-12 items-center">
          <div>
            <div class="mb-8">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                         bg-indigo-100 text-indigo-800">
                <StarIcon class="w-4 h-4 mr-1" />
                AI 기반 취업 준비 플랫폼
              </span>
            </div>
            <h1 class="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              당신의 취업 준비,<br />
              <span class="text-indigo-600">더 스마트하게</span>
            </h1>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed">
              AI가 분석하고 추천하는 맞춤형 취업 준비 서비스로<br />
              당신의 꿈에 한 걸음 더 가까워지세요
            </p>
            <div class="flex space-x-4">
              <button @click="startDemo" 
                      class="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                             transition-all duration-200 shadow-lg shadow-indigo-200 flex items-center">
                지금 체험하기
                <ArrowRightIcon class="ml-2 w-4 h-4" />
              </button>
              <button class="px-8 py-3 border-2 border-indigo-200 text-indigo-600 rounded-lg 
                           hover:bg-indigo-50 transition-all duration-200">
                서비스 소개
              </button>
            </div>
            <div class="mt-8 flex items-center space-x-8">
              <div class="flex items-center">
                <div class="flex -space-x-2">
                  <div class="w-8 h-8 rounded-full bg-indigo-200 border-2 border-white"></div>
                  <div class="w-8 h-8 rounded-full bg-indigo-300 border-2 border-white"></div>
                  <div class="w-8 h-8 rounded-full bg-indigo-400 border-2 border-white"></div>
                </div>
                <p class="ml-3 text-sm text-gray-600">
                  <span class="font-semibold text-indigo-600">10,000+</span> 명이 선택
                </p>
              </div>
              <div class="flex items-center">
                <div class="flex text-yellow-400">
                  <StarIcon class="w-5 h-5" v-for="i in 5" :key="i" />
                </div>
                <p class="ml-2 text-sm text-gray-600">
                  <span class="font-semibold">4.9/5</span> 평점
                </p>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="bg-gradient-to-r from-indigo-200 to-purple-200 rounded-2xl p-8 relative z-10">
              <div class="bg-white/80 backdrop-blur rounded-xl shadow-2xl p-4">
                <div class="h-[300px] bg-indigo-50 rounded-lg"></div>
              </div>
            </div>
            <div class="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 
                        bg-indigo-500/10 rounded-full w-96 h-96 blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 기능 소개 섹션 -->
    <div class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900">
            취업 준비의 모든 것, <span class="text-indigo-600">Unicamp</span>
          </h2>
          <p class="mt-4 text-lg text-gray-600">
            AI 기술로 더 똑똑하게, 더 효율적으로
          </p>
        </div>
        <div class="grid grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title"
               class="p-6 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 
                      border border-indigo-100 hover:border-indigo-200">
            <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <component :is="feature.icon" class="w-6 h-6 text-indigo-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA 섹션 -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p class="text-xl mb-8 text-indigo-100">
            7일 무료 체험으로 Unicamp의 모든 기능을 경험해보세요
          </p>
          <button @click="startDemo" 
                  class="px-8 py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 
                         transition-all duration-200 shadow-lg">
            무료 체험 시작하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>