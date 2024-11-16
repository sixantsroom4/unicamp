<script setup>
import { computed } from 'vue'
import SideNav from './components/SideNav.vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const showSideNav = computed(() => {
  return authStore.isAuthenticated && !['/', '/login'].includes(route.path)
})
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <SideNav v-if="showSideNav" />
    <main :class="[showSideNav ? 'flex-1' : 'w-full']">
      <RouterView />
    </main>
  </div>
</template>