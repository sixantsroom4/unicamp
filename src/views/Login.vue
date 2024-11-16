<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')

const handleEmailLogin = async () => {
  try {
    const user = await authStore.loginWithEmail(email.value, password.value)
    if (user) {
      await authStore.loadUserProfile(user.uid)
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('로그인 실패:', error)
    alert(error.message || '로그인에 실패했습니다.')
  }
}

const handleGoogleLogin = async () => {
  try {
    await authStore.loginWithGoogle()
    router.push('/dashboard')
  } catch (error) {
    console.error('Google 로그인 실패:', error)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
        로그인
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        아직 회원이 아니신가요?
        <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
          회원가입
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleEmailLogin">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
                       focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
            <div class="mt-1">
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
                       focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">로그인 상태 유지</label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">비밀번호 찾기</a>
            </div>
          </div>

          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                   text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            이메일로 로그인
          </button>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-2 text-gray-500">또는</span>
            </div>
          </div>

          <div class="mt-6">
            <button
              @click="handleGoogleLogin"
              class="w-full flex justify-center items-center gap-3 px-4 py-3 border border-gray-300 
                     rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-indigo-500"
            >
              <img class="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo">
              <span class="text-gray-700">Google로 계속하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>