<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const skills = ref([])
const certificates = ref([])

onMounted(async () => {
  try {
    const userData = await authStore.loadUserProfile()
    if (userData?.skills) {
      skills.value = userData.skills
    }
    if (userData?.certificates) {
      certificates.value = userData.certificates
    }
  } catch (error) {
    console.error('스킬/자격증 로드 실패:', error)
  }
})

const addSkill = () => {
  skills.value.push({ name: '', level: 'beginner' })
}

const addCertificate = () => {
  certificates.value.push({
    name: '',
    issuer: '',
    date: '',
    expiry: ''
  })
}

const removeSkill = (index) => {
  skills.value.splice(index, 1)
}

const removeCertificate = (index) => {
  certificates.value.splice(index, 1)
}

const saveSkillsAndCertificates = async () => {
  try {
    await authStore.updateUserProfile({
      skills: skills.value,
      certificates: certificates.value
    })
    alert('스킬/자격증 정보가 저장되었습니다.')
  } catch (error) {
    console.error('저장 실패:', error)
    alert('저장에 실패했습니다.')
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <!-- 스킬 섹션 -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-semibold">보유 스킬</h2>
        <button @click="addSkill" class="text-indigo-600 hover:text-indigo-500">
          <PlusIcon class="w-5 h-5" />
        </button>
      </div>

      <div v-if="skills.length === 0" class="text-center py-8 text-gray-500">
        등록된 스킬이 없습니다.
      </div>

      <div v-else class="space-y-4">
        <div v-for="(skill, index) in skills" :key="index" class="flex items-center space-x-4">
          <input
            v-model="skill.name"
            type="text"
            placeholder="스킬명"
            class="flex-1 border rounded p-2"
          />
          <select v-model="skill.level" class="border rounded p-2">
            <option value="beginner">입문</option>
            <option value="intermediate">중급</option>
            <option value="advanced">고급</option>
          </select>
          <button @click="removeSkill(index)" class="text-red-500">
            <TrashIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- 자격증 섹션 -->
    <div>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-semibold">자격증</h2>
        <button @click="addCertificate" class="text-indigo-600 hover:text-indigo-500">
          <PlusIcon class="w-5 h-5" />
        </button>
      </div>

      <div v-if="certificates.length === 0" class="text-center py-8 text-gray-500">
        등록된 자격증이 없습니다.
      </div>

      <div v-else class="space-y-6">
        <div v-for="(cert, index) in certificates" :key="index" class="border rounded-lg p-4">
          <div class="grid grid-cols-2 gap-4">
            <input
              v-model="cert.name"
              type="text"
              placeholder="자격증명"
              class="border rounded p-2"
            />
            <input
              v-model="cert.issuer"
              type="text"
              placeholder="발급기관"
              class="border rounded p-2"
            />
            <input
              v-model="cert.date"
              type="date"
              placeholder="취득일"
              class="border rounded p-2"
            />
            <input
              v-model="cert.expiry"
              type="date"
              placeholder="만료일"
              class="border rounded p-2"
            />
          </div>
          <button @click="removeCertificate(index)" class="mt-2 text-red-500">
            <TrashIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-6">
      <button
        @click="saveSkillsAndCertificates"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        저장하기
      </button>
    </div>
  </div>
</template>