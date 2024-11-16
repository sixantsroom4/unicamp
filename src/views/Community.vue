<script setup>
import { ref } from 'vue'
import { 
  BellIcon, 
  PencilIcon, 
  MagnifyingGlassIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  FunnelIcon,
  HandThumbUpIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  GiftIcon,
  BookmarkIcon,
  FlagIcon,
  EllipsisVerticalIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const activeCategory = ref('all')

const categories = [
  { id: 'all', name: '전체', icon: ChatBubbleLeftIcon },
  { id: 'free', name: '자유게시판', icon: UserGroupIcon },
  { id: 'cert', name: '자격증', icon: AcademicCapIcon },
  { id: 'interview', name: '면접', icon: UserGroupIcon },
  { id: 'webtest', name: '코딩테스트', icon: ChartBarIcon },
  { id: 'gd', name: '그룹디스커션', icon: ChatBubbleLeftIcon },
  { id: 'offer', name: '내정', icon: BuildingOfficeIcon },
  { id: 'intern', name: '인턴십', icon: BuildingOfficeIcon },
  { id: 'activity', name: '대외활동', icon: CalendarIcon },
  { id: 'event', name: '이벤트', icon: GiftIcon }
]

const showReportModal = ref(false)
const showOptions = ref(false)

const handleReport = (reason) => {
  console.log('신고 사유:', reason)
  showReportModal.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 상단 헤더 -->
    <div class="bg-white border-b sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900">커뮤니티</h1>
          <div class="flex items-center space-x-4">
            <button class="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <BellIcon class="w-6 h-6" />
            </button>
            <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
              <PencilIcon class="w-5 h-5 mr-2" />
              글쓰기
            </button>
          </div>
        </div>

        <!-- 검색바 -->
        <div class="mt-4 relative">
          <input
            type="text"
            placeholder="관심있는 내용을 검색해보세요"
            class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid grid-cols-12 gap-6">
        <!-- 좌측 카테고리 -->
        <div class="col-span-3">
          <div class="bg-white rounded-lg shadow p-4">
            <nav class="space-y-1">
              <button
                v-for="category in categories"
                :key="category.id"
                class="w-full flex items-center px-4 py-3 rounded-lg"
                :class="[
                  activeCategory === category.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                ]"
                @click="activeCategory = category.id"
              >
                <component :is="category.icon" class="w-5 h-5 mr-3" />
                {{ category.name }}
              </button>
            </nav>
          </div>

          <!-- 인기 태그 -->
          <div class="bg-white rounded-lg shadow mt-6 p-4">
            <h3 class="text-lg font-semibold mb-4">인기 태그</h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                #네이버
              </span>
              <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                #카카오
              </span>
              <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                #정보처리기사
              </span>
            </div>
          </div>
        </div>

        <!-- 메인 콘텐츠 -->
        <div class="col-span-9">
          <!-- 필터 옵션 -->
          <div class="mb-6 flex justify-between items-center">
            <div class="flex space-x-4">
              <button class="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg">
                최신순
              </button>
              <button class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                인기순
              </button>
              <button class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                조회순
              </button>
            </div>
            <button class="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg">
              <FunnelIcon class="w-4 h-4 mr-2" />
              필터
            </button>
          </div>

          <!-- 게시글 목록 -->
          <div class="space-y-4">
            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-start justify-between">
                <div>
                  <div class="flex items-center space-x-2 mb-2">
                    <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      면접
                    </span>
                    <span class="text-gray-500 text-sm">2시간 전</span>
                  </div>
                  <h3 class="font-medium text-lg mb-2">
                    네이버 백엔드 개발자 최종 면접 후기
                  </h3>
                  <p class="text-gray-600 mb-4">
                    오늘 네이버 최종 면접을 보고 왔습니다. 기술 면접에서 받았던 질문들과 제가 준비했던 방법들을 공유드립니다...
                  </p>
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span class="flex items-center">
                      <HandThumbUpIcon class="w-4 h-4 mr-1" />
                      128
                    </span>
                    <span class="flex items-center">
                      <ChatBubbleLeftIcon class="w-4 h-4 mr-1" />
                      45
                    </span>
                    <span class="flex items-center">
                      <EyeIcon class="w-4 h-4 mr-1" />
                      1.2k
                    </span>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button class="p-2 text-gray-400 hover:text-indigo-600">
                    <BookmarkIcon class="w-5 h-5" />
                  </button>
                  <div class="relative">
                    <button 
                      class="p-2 text-gray-400 hover:text-gray-600"
                      @click="showOptions = !showOptions"
                    >
                      <EllipsisVerticalIcon class="w-5 h-5" />
                    </button>
                    <div v-if="showOptions" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1">
                      <button
                        class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center"
                        @click="showReportModal = true"
                      >
                        <FlagIcon class="w-4 h-4 mr-2" />
                        신고하기
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

    <!-- 신고 모달 -->
    <div v-if="showReportModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium">게시글 신고하기</h3>
          <button @click="showReportModal = false" class="text-gray-400 hover:text-gray-500">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
        <div class="space-y-4">
          <button
            class="w-full px-4 py-2 text-left hover:bg-gray-50 rounded-lg"
            v-for="reason in ['스팸/홍보', '욕설/비하', '불법정보', '개인정보노출', '음란성/선정성', '기타']"
            :key="reason"
            @click="handleReport(reason)"
          >
            {{ reason }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>