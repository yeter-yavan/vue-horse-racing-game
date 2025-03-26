<template>
    <div class="bg-white p-2 rounded-lg">
        <h2 class="text-xl font-bold mb-4">Race Schedule</h2>
        <div v-if="store.raceSchedule.length > 0" class="space-y-2">
            <div v-for="(round, roundIndex) in store.raceSchedule" :key="roundIndex"
                class="border rounded border-gray-300 p-2">
                <h3 class="font-semibold mb-2">Round {{ roundIndex + 1 }} ({{ store.rounds[roundIndex] }}m)</h3>
                <div class="grid gap-2">
                    <div v-for="horse in round" :key="horse.id" class="flex items-center gap-2">
                        <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: horse.color }"></div>
                        <span>{{ horse.name }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-gray-500">
            Click Generate to create race schedule
        </div>
    </div>
</template>

<script setup lang="ts">
import { useHorseStore } from '@/stores/horse'

const store = useHorseStore()
</script>