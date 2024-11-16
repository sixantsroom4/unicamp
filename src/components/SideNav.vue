<script setup>
import { ref } from 'vue'
import { HomeIcon, DocumentTextIcon, FolderIcon, UserGroupIcon, UserIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigation = [
  { name: '대시보드', icon: HomeIcon, href: '/dashboard' },
  { name: '자기소개서', icon: DocumentTextIcon, href: '/resume' },
  { name: '포트폴리오', icon: FolderIcon, href: '/portfolio' },
  { name: '커뮤니티', icon: UserGroupIcon, href: '/community' },
  { name: '마이페이지', icon: UserIcon, href: '/mypage' },
  { name: '설정', icon: Cog6ToothIcon, href: '/settings' },
]

const navigateToHome = () => {
  router.push('/')
}
</script>

<template>
  <aside class="w-64 bg-white border-r">
    <div class="p-4">
      <h1 @click="navigateToHome" class="text-2xl font-bold text-indigo-600 cursor-pointer">Unicamp</h1>
    </div>
    <nav class="mt-4">
      <ul>
        <li v-for="item in navigation" :key="item.name">
          <router-link :to="item.href" 
                      class="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      active-class="bg-indigo-50 text-indigo-600">
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>