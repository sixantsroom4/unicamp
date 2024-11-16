<script setup>
import DashboardStats from '../components/DashboardStats.vue'
import Calendar from '../components/Calendar.vue'
import UpcomingEvents from '../components/UpcomingEvents.vue'
import AIRecommendations from '../components/AIRecommendations.vue'
</script>

<template>
  <div class="p-6 space-y-6">
    <header>
      <h1 class="text-3xl font-bold text-gray-900">대시보드</h1>
    </header>

    <DashboardStats />

    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-2">
        <Calendar />
      </div>
      <div class="space-y-6">
        <UpcomingEvents />
        <AIRecommendations />
      </div>
    </div>
  </div>
</template>