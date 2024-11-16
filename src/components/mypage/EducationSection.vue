<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const educations = ref([])

onMounted(async () => {
  try {
    const userData = await authStore.loadUserProfile()
    if (userData?.educations) {
      educations.value = userData.educations
    }
  } catch (error) {
    console.error('학력/경력 로드 실패:', error)
  }
})

const addEducation = () => {
  educations.value.push({
    type: 'education', // 'education' 또는 'career'
    school: '',
    major: '',
    degree: '',
    startDate: '',
    endDate: '',
    current: false
  })
}

const removeEducation = (index) => {
  educations.value.splice(index, 1)
}

const saveEducations = async () => {
  try {
    await authStore.updateUserProfile({
      educations: educations.value
    })
    alert('학력/경력 정보가 저장되었습니다.')
  } catch (error) {
    console.error('저장 실패:', error)
    alert('저장에 실패했습니다.')
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold">학력 및 경력</h2>
      <button @click="addEducation" class="text-indigo-600 hover:text-indigo-500">
        <PlusIcon class="w-5 h-5" />
      </button>
    </div>

    <div v-if="educations.length === 0" class="text-center py-8 text-gray-500">
      등록된 학력/경력이 없습니다.
    </div>

    <div v-else class="space-y-6">
      <div v-for="(edu, index) in educations" :key="index" class="border rounded-lg p-4">
        <div class="flex justify-between mb-4">
          <select v-model="edu.type" class="border rounded p-2">
            <option value="education">학력</option>
            <option value="career">경력</option>
          </select>
          <button @click="removeEducation(index)" class="text-red-500">
            <TrashIcon class="w-5 h-5" />
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <input
            v-model="edu.school"
            type="text"
            :placeholder="edu.type === 'education' ? '학교명' : '회사명'"
            class="border rounded p-2"
          />
          <input
            v-model="edu.major"
            type="text"
            :placeholder="edu.type === 'education' ? '전공' : '부서/직책'"
            class="border rounded p-2"
          />
          <input
            v-model="edu.startDate"
            type="date"
            class="border rounded p-2"
          />
          <input
            v-model="edu.endDate"
            type="date"
            class="border rounded p-2"
            :disabled="edu.current"
          />
        </div>
        
        <div class="mt-2">
          <label class="flex items-center">
            <input type="checkbox" v-model="edu.current" class="mr-2" />
            <span>현재 {{ edu.type === 'education' ? '재학중' : '재직중' }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-6">
      <button
        @click="saveEducations"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        저장하기
      </button>
    </div>
  </div>
</template>