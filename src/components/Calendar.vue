<script setup>
import { ref, onMounted } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import interactionPlugin from '@fullcalendar/interaction'

const calendarOptions = ref({
  plugins: [dayGridPlugin, googleCalendarPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek'
  },
  googleCalendarApiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY,
  events: {
    googleCalendarId: import.meta.env.VITE_GOOGLE_CALENDAR_ID
  },
  height: 'auto',
  editable: true,
  selectable: true,
  weekends: true,
  locale: 'ko'
})
</script>

<template>
  <div class="calendar-container">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<style scoped>
.calendar-container :deep(.fc) {
  @apply bg-white rounded-lg p-4;
}

.calendar-container :deep(.fc-toolbar-title) {
  @apply text-lg font-semibold;
}

.calendar-container :deep(.fc-button) {
  @apply bg-indigo-600 hover:bg-indigo-700 border-0 rounded px-3 py-1 text-sm;
}

.calendar-container :deep(.fc-day-today) {
  @apply bg-indigo-50;
}
</style>