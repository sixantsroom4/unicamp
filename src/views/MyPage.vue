<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { 
  UserIcon, 
  AcademicCapIcon, 
  TrophyIcon, 
  Cog6ToothIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  LinkIcon
} from '@heroicons/vue/24/outline'
import ProfileSection from '../components/mypage/ProfileSection.vue'
import EducationSection from '../components/mypage/EducationSection.vue'
import SkillsSection from '../components/mypage/SkillsSection.vue'
import SettingsSection from '../components/mypage/SettingsSection.vue'

const authStore = useAuthStore()
const userProfile = ref(null)
const activeTab = ref('profile')

const schoolName = computed(() => {
  if (!userProfile.value?.educations?.length) return ''
  const education = userProfile.value.educations.find(edu => 
    edu.type === 'education' && (edu.current || edu.endDate === '')
  )
  return education?.school || ''
})

onMounted(async () => {
  if (authStore.currentUser) {
    try {
      userProfile.value = await authStore.loadUserProfile()
    } catch (error) {
      console.error('프로필 로드 실패:', error)
    }
  }
})

const navigation = [
  { id: 'profile', name: '기본 정보', icon: UserIcon },
  { id: 'education', name: '학력 및 경력', icon: AcademicCapIcon },
  { id: 'skills', name: '스킬 및 자격증', icon: TrophyIcon },
  { id: 'settings', name: '설정', icon: Cog6ToothIcon }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 상단 프로필 섹션 -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center space-x-8">
          <div class="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
            <span class="text-3xl font-semibold text-indigo-600">
              {{ userProfile?.name ? userProfile.name.charAt(0) : 'UN' }}
            </span>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              {{ userProfile?.name || (authStore.currentUser ? '이름 미입력' : '김유니캠') }}
            </h1>
            <p v-if="!authStore.currentUser" class="text-gray-600">프론트엔드 개발자 지망생</p>
            <p v-else-if="schoolName" class="text-gray-600">{{ schoolName }}</p>
            <p v-else class="text-gray-600">학교 정보 미입력</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-12 gap-8">
        <!-- 좌측 네비게이션 -->
        <div class="col-span-3">
          <div class="bg-white rounded-lg shadow p-4">
            <nav class="space-y-1">
              <button
                v-for="item in navigation"
                :key="item.id"
                class="w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200"
                :class="[
                  activeTab === item.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                ]"
                @click="activeTab = item.id"
              >
                <component :is="item.icon" class="w-5 h-5 mr-3" />
                {{ item.name }}
              </button>
            </nav>
          </div>
        </div>

        <!-- 메인 콘텐츠 -->
        <div class="col-span-9">
          <ProfileSection v-if="activeTab === 'profile'" />
          <EducationSection v-if="activeTab === 'education'" />
          <SkillsSection v-if="activeTab === 'skills'" />
          <SettingsSection v-if="activeTab === 'settings'" />
        </div>
      </div>
    </div>
  </div>
</template>