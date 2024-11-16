<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { auth } from '../firebase'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  nickname: '',
  birthDate: null,
  graduationYear: null,
  gender: '',
  phone: '',
  school: '',
  faculty: '',
  department: ''
})

const emailValid = ref(false)
const emailSent = ref(false)
const verificationMessage = ref('')
const remainingTime = ref(180) // 3분
const timer = ref(null)
const verificationCode = ref('')

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
      verificationMessage.value = '인증 시간이 만료되었습니다. 재전송해주세.'
    }
  }, 1000)
}

const passwordValid = computed(() => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  const isValid = regex.test(form.value.password)
  return {
    isValid,
    message: isValid ? '' : '영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.'
  }
})

const passwordMatch = computed(() => {
  const isMatch = form.value.password === form.value.passwordConfirm
  return {
    isMatch,
    message: isMatch ? '' : '비밀번호가 일치하지 않습니다.'
  }
})

const verifyEmail = async () => {
  try {
    if (!form.value.email) {
      verificationMessage.value = '이메일을 입력해주세요.'
      return
    }
    await authStore.sendVerificationEmail(form.value.email)
    emailSent.value = true
    verificationMessage.value = '인증 코드가 콘솔에 출력되었습니다. (개발용)'
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

// 이메일 인증 상태 확인 함수
const checkEmailVerification = async () => {
  try {
    const isVerified = await authStore.checkEmailVerification()
    if (isVerified) {
      emailValid.value = true
      verificationMessage.value = '이메일이 인증되었습니다!'
    }
  } catch (error) {
    console.error('인증 상태 확인 실패:', error)
  }
}
const handleRegister = async () => {
  try {
    if (!isFormValid.value) {
      alert('모든 필수 항목을 입력해주세요.')
      return
    }

    const user = await authStore.registerUser(form.value)
    if (user) {
      // 로그인 상태 설정
      await authStore.setUser(user)
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('회원가입 실패:', error)
    alert(error.message || '회원가입에 실패했습니다.')
  }
}

// 디버그 로그 추가
console.log('Register.vue loaded')

onMounted(async () => {
  console.log('=== Debug Logs ===')
  console.log('1. Register page mounted')
  console.log('2. Current URL:', window.location.href)
  console.log('3. Query params:', new URLSearchParams(window.location.search).get('email'))
  console.log('4. Is sign in link:', isSignInWithEmailLink(auth, window.location.href))
  console.log('5. Stored email:', window.localStorage.getItem('emailForSignIn'))

  // 이메일 링크로 들어왔 때
  if (isSignInWithEmailLink(auth, window.location.href)) {
    try {
      const email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        console.error('No email found in localStorage')
        verificationMessage.value = '인증에 실패했습니다. 다시 시도해주세요.'
        return
      }

      const result = await signInWithEmailLink(auth, email, window.location.href)
      console.log('6. Sign in result:', result)
      
      // 인증 성공 처리
      emailValid.value = true
      form.value.email = email
      verificationMessage.value = '이메일이 인증되었습니다!'
      
      // 로컬 스토리지 정리
      window.localStorage.removeItem('emailForSignIn')
      
      // 임시 로그인 상태 해제
      await auth.signOut()
    } catch (error) {
      console.error('7. Email verification failed:', error)
      verificationMessage.value = '인증에 실패했습니다. 다시 시도해주세요.'
    }
  }
})

const verifyCode = async () => {
  try {
    await authStore.verifyEmailCode(form.value.email, verificationCode.value)
    emailValid.value = true
    verificationMessage.value = '이메일이 인증되었습니다!'
    clearInterval(timer.value)
  } catch (error) {
    console.error('인증 코드 확인 실패:', error)
    verificationMessage.value = error.message || '인증 코드 확인에 실패했습니다.'
  }
}

const nicknameValid = ref(false)
const nicknameMessage = ref('')

const checkNickname = async () => {
  try {
    const isDuplicate = await authStore.checkNicknameDuplicate(form.value.nickname)
    if (isDuplicate) {
      nicknameMessage.value = '이미 사용 중인 닉네임입니다.'
      nicknameValid.value = false
    } else {
      nicknameMessage.value = '사용 가능한 닉네임입니다.'
      nicknameValid.value = true
    }
  } catch (error) {
    console.error('닉네임 중복 확인 실패:', error)
    nicknameMessage.value = '중복 확인에 실패했습니다.'
    nicknameValid.value = false
  }
}

const isFormValid = computed(() => {
  const allFieldsFilled = Object.values(form.value).every(value => value)
  return allFieldsFilled && 
         emailValid.value && 
         passwordValid.value.isValid && 
         passwordMatch.value.isMatch && 
         nicknameValid.value
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-8">회원가입</h2>
      
      <form @submit.prevent="handleRegister" class="space-y-6 bg-white p-8 rounded-lg shadow">
        <!-- 이메일 입력 -->
        <div>
          <label class="block text-sm font-medium text-gray-700">이메일</label>
          <div class="mt-1 flex gap-2">
            <input
              v-model="form.email"
              type="email"
              required
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              :class="{
                'border-red-500': !emailValid && emailSent,
                'border-green-500': emailValid
              }"
            />
            <button
              type="button"
              @click="verifyEmail"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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

        <!-- 인증번호 입력 -->
        <div v-if="emailSent && !emailValid" class="mt-2">
          <label class="block text-sm font-medium text-gray-700">인증번호</label>
          <div class="flex items-center gap-2">
            <input
              v-model="verificationCode"
              type="text"
              maxlength="6"
              placeholder="6자리 인증번호 입력"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              @click="verifyCode"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              type="button"
            >
              확인
            </button>
          </div>
        </div>

        <!-- 비밀번호 입력 -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              v-model="form.password"
              type="password"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              :class="{ 'border-red-500': form.password && !passwordValid.isValid }"
            />
            <p v-if="form.password" class="mt-1 text-sm" :class="passwordValid.isValid ? 'text-green-600' : 'text-red-600'">
              {{ passwordValid.message }}
            </p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">비밀번호 확인</label>
            <input
              v-model="form.passwordConfirm"
              type="password"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              :class="{ 'border-red-500': form.passwordConfirm && !passwordMatch.isMatch }"
            />
            <p v-if="form.passwordConfirm" class="mt-1 text-sm" :class="passwordMatch.isMatch ? 'text-green-600' : 'text-red-600'">
              {{ passwordMatch.message }}
            </p>
          </div>
        </div>

        <!-- 기본 정보 입력 -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">이름</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">닉네임</label>
            <div class="flex gap-2">
              <input
                v-model="form.nickname"
                type="text"
                required
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                :class="{ 'border-green-500': nicknameValid }"
              />
              <button
                type="button"
                @click="checkNickname"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                :disabled="!form.nickname || nicknameValid"
              >
                {{ nicknameValid ? '확인완료' : '중복확인' }}
              </button>
            </div>
            <p v-if="nicknameMessage" class="mt-1 text-sm" :class="nicknameValid ? 'text-green-600' : 'text-red-600'">
              {{ nicknameMessage }}
            </p>
          </div>
          
          <!-- 년월일 입력 -->
          <div>
            <label class="block text-sm font-medium text-gray-700">생년월일</label>
            <VueDatePicker
              v-model="form.birthDate"
              :max-date="new Date()"
              :min-date="new Date(1900, 0, 1)"
              locale="ko"
              format="yyyy-MM-dd"
              auto-apply
              required
              class="mt-1"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">성별</label>
            <select
              v-model="form.gender"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">선택</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="none">미회답</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">연락처</label>
            <input
              v-model="form.phone"
              type="tel"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <!-- 학교 정보 입력 -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">학교명</label>
            <input
              v-model="form.school"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">학부명</label>
            <input
              v-model="form.faculty"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">학과명</label>
            <input
              v-model="form.department"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <!-- 졸업년도 입력 -->
        <div>
          <label class="block text-sm font-medium text-gray-700">졸업년도</label>
          <VueDatePicker
            v-model="form.graduationYear"
            :min-date="new Date()"
            :max-date="new Date(2030, 11, 31)"
            locale="ko"
            format="yyyy"
            year-picker
            auto-apply
            required
            class="mt-1"
          />
        </div>

        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          :disabled="!isFormValid"
        >
          회원가입
        </button>
      </form>
    </div>
  </div>
</template> 