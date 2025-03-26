<!-- Race Results Component -->
<template>
    <div class="col-span-3 bg-white p-2 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Results</h2>
        <div class="space-y-4 ">
            <div v-for="(round, index) in rounds" :key="index" class="border rounded border-gray-300 p-2">
                <h3 class="font-medium">Round {{ index + 1 }} - {{ round }}m</h3>
                <div class="text-sm space-y-1">
                    <div v-for="(horse, position) in roundResults[index]" :key="horse?.id"
                        class="flex justify-between items-center p-[5.53px] bg-white rounded"
                        :style="{ borderLeft: `4px solid ${horse?.color}` }">
                        <span>{{ position + 1 }}.</span>
                        <span>{{ horse?.name || '-' }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Horse } from '@/types/horse'

defineProps<{
    rounds: number[]
    roundResults: Array<Horse[]>
}>()
</script>