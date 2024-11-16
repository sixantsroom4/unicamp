<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { PencilIcon, LinkIcon } from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const emailValid = ref(false)
const profile = ref({
  name: '',
  email: '',
  github: '',
  portfolio: '',
  // 다른 필요한 프로필 필드들 추가
})

// watch 추가
watch(() => authStore.currentUser, async (newUser) => {
  if (newUser) {
    try {
      const userData = await authStore.loadUserProfile()
      if (userData) {
        profile.value = userData
        emailValid.value = userData.emailVerified || false
      }
    } catch (error) {
      console.error('프로필 로드 실패:', error)
    }
  }
})

const emailSent = ref(false)
const verificationMessage = ref('')
const remainingTime = ref(180)
const timer = ref(null)

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60)
  const seconds = remainingTime.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const startTimer = () => {
  clearInterval(timer.value)
  remainingTime.value = 180
  timer.value = setInterval(() => {
    remainingTime.value--
    if (remainingTime.value <= 0) {
      clearInterval(timer.value)
      emailSent.value = false
      verificationMessage.value = '인증 시간이 만료되었습니다. 재전송해주세요.'
    }
  }, 1000)
}

const verifyEmail = async () => {
  try {
    if (!profile.value.email) {
      verificationMessage.value = '이메일을 입력해주세요.'
      return
    }
    await authStore.sendVerificationEmail(profile.value.email)
    emailSent.value = true
    verificationMessage.value = '인증 메일을 전송했습니다! 이메일을 확인해주세요.'
    startTimer()
  } catch (error) {
    console.error('이메일 인증 실패:', error)
    if (error.message === '이미 등록된 이메일입니다.') {
      verificationMessage.value = error.message
    } else {
      verificationMessage.value = '이메일 인증 실패. 다시 시도해주세요.'
    }
  }
}

const resendVerification = async () => {
  verificationMessage.value = '인증 메일을 재전송 중...'
  await verifyEmail()
}

const updateProfile = async () => {
  try {
    if (!authStore.currentUser) {
      throw new Error('로그인이 필요합니다')
    }
    
    await authStore.updateUserProfile({
      name: profile.value.name,
      email: profile.value.email,
      github: profile.value.github,
      portfolio: profile.value.portfolio,
      emailVerified: emailValid.value
    })
    alert('프로필이 업데이트되었습니다.')
  } catch (error) {
    console.error('프로필 업데이트 실패:', error)
    alert(error.message || '프로필 업데이트에 실패했습니다.')
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold">기본 정보</h2>
        <button class="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50">
          <PencilIcon class="w-4 h-4 mr-2 inline-block" />
          수정하기
        </button>
      </div>
    </div>
    
    <div class="p-6">
      <div class="space-y-6">
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">이름</label>
            <input
              v-model="profile.name"
              type="text"
              class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
            <input
              v-model="profile.birthDate"
              type="date"
              class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <div class="flex items-center space-x-2">
            <input
              v-model="profile.email"
              type="email"
              class="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              :class="{
                'border-red-500': !emailValid && emailSent,
                'border-green-500': emailValid
              }"
            />
            <button 
              @click="verifyEmail"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              :disabled="emailValid || emailSent"
            >
              {{ emailValid ? '인증됨' : '인증하기' }}
            </button>
          </div>
          <div class="mt-1 flex items-center justify-between">
            <p class="text-sm" :class="emailValid ? 'text-green-600' : 'text-red-600'">
              {{ verificationMessage }}
            </p>
            <div class="flex items-center gap-2">
              <span v-if="emailSent" class="text-sm text-gray-500">
                남은 시간: {{ formattedTime }}
              </span>
              <button
                v-if="emailSent && !emailValid"
                @click="resendVerification"
                class="text-sm text-indigo-600 hover:text-indigo-500"
                type="button"
              >
                재전송
              </button>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">연락처</label>
          <input
            v-model="profile.phone"
            type="tel"
            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">주소</label>
          <input
            v-model="profile.address"
            type="text"
            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">소셜 링크</label>
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <LinkIcon class="w-5 h-5" />
              <input
                v-model="profile.github"
                type="url"
                placeholder="Github URL"
                class="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div class="flex items-center space-x-2">
              <LinkIcon class="w-5 h-5" />
              <input
                v-model="profile.portfolio"
                type="url"
                placeholder="포트폴리오 URL"
                class="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <button
        @click="updateProfile"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        저장하기
      </button>
    </div>
  </div>
</template>