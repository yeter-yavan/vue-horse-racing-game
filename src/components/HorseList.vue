<!-- Horse List Component -->
<template>
    <div class="col-span-3 bg-gray-100 p-4 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Horse List ({{ horses.length }})</h2>
        <div class="space-y-2 max-h-[600px] overflow-y-auto">
            <div v-for="horse in horses" :key="horse.id" class="flex items-center justify-between p-2 bg-white rounded"
                :style="{ borderLeft: `4px solid ${horse.color}` }">
                <span>{{ horse.name }}</span>
                <span class="text-sm">Condition: {{ horse.condition }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Horse } from '@/types/horse'

defineProps<{
    horses: Horse[]
}>()
</script>