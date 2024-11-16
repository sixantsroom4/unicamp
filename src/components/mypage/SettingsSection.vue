<script setup>
import { ref } from 'vue'
import { 
  LockClosedIcon, 
  BellIcon, 
  EyeIcon, 
  ShieldCheckIcon 
} from '@heroicons/vue/24/outline'

const settings = ref({
  notifications: {
    email: true,
    push: true
  },
  privacy: {
    profilePublic: true,
    showEmail: false
  }
})
</script>

<template>
  <div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b">
      <h2 class="text-lg font-semibold">설정</h2>
    </div>
    
    <div class="p-6">
      <div class="space-y-8">
        <!-- 알림 설정 -->
        <div>
          <h3 class="text-lg font-medium flex items-center mb-4">
            <BellIcon class="w-5 h-5 mr-2" />
            알림 설정
          </h3>
          <div class="space-y-4">
            <label class="flex items-center justify-between">
              <span class="text-gray-700">이메일 알림</span>
              <input
                v-model="settings.notifications.email"
                type="checkbox"
                class="form-checkbox h-5 w-5 text-indigo-600"
              />
            </label>
            <label class="flex items-center justify-between">
              <span class="text-gray-700">푸시 알림</span>
              <input
                v-model="settings.notifications.push"
                type="checkbox"
                class="form-checkbox h-5 w-5 text-indigo-600"
              />
            </label>
          </div>
        </div>

        <!-- 개인정보 설정 -->
        <div>
          <h3 class="text-lg font-medium flex items-center mb-4">
            <ShieldCheckIcon class="w-5 h-5 mr-2" />
            개인정보 설정
          </h3>
          <div class="space-y-4">
            <label class="flex items-center justify-between">
              <span class="text-gray-700">프로필 공개</span>
              <input
                v-model="settings.privacy.profilePublic"
                type="checkbox"
                class="form-checkbox h-5 w-5 text-indigo-600"
              />
            </label>
            <label class="flex items-center justify-between">
              <span class="text-gray-700">이메일 주소 표시</span>
              <input
                v-model="settings.privacy.showEmail"
                type="checkbox"
                class="form-checkbox h-5 w-5 text-indigo-600"
              />
            </label>
          </div>
        </div>

        <!-- 보안 설정 -->
        <div>
          <h3 class="text-lg font-medium flex items-center mb-4">
            <LockClosedIcon class="w-5 h-5 mr-2" />
            보안 설정
          </h3>
          <button class="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50">
            비밀번호 변경
          </button>
        </div>
      </div>
    </div>
  </div>
</template>