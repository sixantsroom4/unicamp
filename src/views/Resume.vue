<script setup>
import { ref } from 'vue'
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  TagIcon, 
  DocumentIcon, 
  PencilIcon, 
  TrashIcon, 
  BuildingOfficeIcon 
} from '@heroicons/vue/24/outline'

const activeTab = ref('all')

const filters = ref({
  tags: [],
  companies: [],
  status: []
})

const resumes = ref([
  {
    id: 1,
    company: '네이버',
    position: '백엔드 개발자 (2024)',
    status: 'accepted',
    lastModified: '2024.11.15',
    tags: ['백엔드', 'Spring']
  },
  {
    id: 2,
    company: '카카오',
    position: '프론트엔드 개발자 (2024)',
    status: 'reviewing',
    lastModified: '2024.11.14',
    tags: ['프론트엔드', 'React']
  }
])

const getStatusClass = (status) => {
  switch (status) {
    case 'accepted':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    case 'reviewing':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'accepted':
      return '합격'
    case 'rejected':
      return '불합격'
    case 'reviewing':
      return '검토중'
    default:
      return '대기중'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 상단 헤더 -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">자기소개서 관리</h1>
          <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
            <PlusIcon class="w-5 h-5 mr-2" />
            새 자기소개서 작성
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid grid-cols-12 gap-6">
        <!-- 좌측 필터 패널 -->
        <div class="col-span-3">
          <div class="bg-white rounded-lg shadow p-4">
            <div class="mb-6">
              <div class="relative">
                <input
                  type="text"
                  placeholder="자기소개서 검색"
                  class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <h3 class="font-medium mb-2 flex items-center">
                  <TagIcon class="w-4 h-4 mr-2" />
                  태그 필터
                </h3>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox text-indigo-600 rounded" />
                    <span class="ml-2 text-sm">백엔드</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox text-indigo-600 rounded" />
                    <span class="ml-2 text-sm">프론트엔드</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox text-indigo-600 rounded" />
                    <span class="ml-2 text-sm">데브옵스</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 class="font-medium mb-2 flex items-center">
                  <BuildingOfficeIcon class="w-4 h-4 mr-2" />
                  기업 필터
                </h3>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox text-indigo-600 rounded" />
                    <span class="ml-2 text-sm">네이버</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox text-indigo-600 rounded" />
                    <span class="ml-2 text-sm">카카오</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 class="font-medium mb-2">상태 필터</h3>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox text-indigo-600 rounded" />
                    <span class="ml-2 text-sm">합격</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox text-indigo-600 rounded" />
                    <span class="ml-2 text-sm">불합격</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox text-indigo-600 rounded" />
                    <span class="ml-2 text-sm">대기중</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 메인 콘텐츠 -->
        <div class="col-span-9">
          <div class="bg-white rounded-lg shadow">
            <!-- 탭 네비게이션 -->
            <div class="border-b">
              <div class="flex space-x-8 px-6">
                <button 
                  class="py-4 px-2 border-b-2"
                  :class="[
                    activeTab === 'all' 
                      ? 'border-indigo-500 text-indigo-600' 
                      : 'border-transparent text-gray-500'
                  ]"
                  @click="activeTab = 'all'"
                >
                  전체 자기소개서
                </button>
                <button 
                  class="py-4 px-2 border-b-2"
                  :class="[
                    activeTab === 'draft' 
                      ? 'border-indigo-500 text-indigo-600' 
                      : 'border-transparent text-gray-500'
                  ]"
                  @click="activeTab = 'draft'"
                >
                  임시저장
                </button>
              </div>
            </div>

            <!-- ES 리스트 -->
            <div class="p-6">
              <div class="space-y-4">
                <div v-for="resume in resumes" :key="resume.id"
                     class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="flex items-center mb-2">
                        <span class="font-medium text-lg">{{ resume.company }} {{ resume.position }}</span>
                        <span :class="[
                          'ml-3 px-2 py-1 text-xs rounded-full',
                          getStatusClass(resume.status)
                        ]">
                          {{ getStatusText(resume.status) }}
                        </span>
                      </div>
                      <div class="flex items-center text-sm text-gray-500 mb-3">
                        <DocumentIcon class="w-4 h-4 mr-1" />
                        최종 수정: {{ resume.lastModified }}
                      </div>
                      <div class="flex space-x-2">
                        <span v-for="tag in resume.tags" :key="tag"
                              class="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                          {{ tag }}
                        </span>
                      </div>
                    </div>
                    <div class="flex space-x-2">
                      <button class="p-2 hover:bg-gray-100 rounded">
                        <PencilIcon class="w-5 h-5 text-gray-500" />
                      </button>
                      <button class="p-2 hover:bg-gray-100 rounded">
                        <TrashIcon class="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>