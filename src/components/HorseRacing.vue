<template>
    <div class="container mx-auto p-4">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold">Horse Racing</h1>
            <div class="space-x-4">
                <button @click="generateProgram"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Generate Program
                </button>
                <button v-if="store.raceSchedule.length" @click="toggleRace" :class="[
                    'font-bold py-2 px-4 rounded',
                    isRacing
                        ? 'bg-red-500 hover:bg-red-700 text-white'
                        : 'bg-green-500 hover:bg-green-700 text-white'
                ]">
                    {{ isRacing ? 'Pause' : 'Start' }}
                </button>
            </div>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-2">
                <HorseList :horses="horses" />
            </div>
            <div class="col-span-6">
                <RaceTrack :selected-horses="selectedHorses" :current-distance="rounds[currentRound]" />
            </div>
            <div class="col-span-2">
                <RaceSchedule />
            </div>
            <div class="col-span-2">
                <RaceResults :rounds="rounds" :round-results="roundResults" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useHorseStore } from '@/stores/horse'
import type { Horse } from '@/types/horse'
import HorseList from './HorseList.vue'
import RaceTrack from './RaceTrack.vue'
import RaceResults from './RaceResults.vue'
import RaceSchedule from './RaceSchedule.vue'

const store = useHorseStore()
const isRacing = ref(false)
const roundResults = ref<Array<Horse[]>>([])
let animationFrameId: number | null = null

// Get horses from store
const horses = computed(() => store.horses)
const selectedHorses = computed(() => store.selectedHorses)
const rounds = computed(() => store.rounds)
const currentRound = computed(() => store.currentRound)

// Generate new program
const generateProgram = () => {
    store.stopRace()
    store.generateRaceSchedule()
    roundResults.value = Array(rounds.value.length).fill([])
}

// Toggle race state
const toggleRace = () => {
    if (!isRacing.value) {
        store.startRace()
        isRacing.value = true
        runRace()
    } else {
        store.stopRace()
        isRacing.value = false
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId)
            animationFrameId = null
        }
    }
}

// Generate horses on initial load
onMounted(() => {
    store.generateHorses()
})

const recordResults = () => {
    const finishedHorses = selectedHorses.value
        .filter(horse => horse.position >= 100)
        .sort((a, b) => b.position - a.position)

    roundResults.value[currentRound.value] = finishedHorses
}

// Run the race animation
const runRace = () => {
    const updatePositions = () => {
        if (!isRacing.value) return

        let allFinished = true
        selectedHorses.value.forEach(horse => {
            if (horse.position < 100) {
                if (horse.speed === 0) {
                    const baseSpeed = (horse.condition / 100) * (1.5 + Math.random() * 0.8)
                    horse.speed = Math.max(baseSpeed, 0.5)
                }
                horse.position += horse.speed * 0.3
                allFinished = false
            }
        })

        if (allFinished) {
            recordResults()

            if (currentRound.value < rounds.value.length - 1) {
                store.nextRound()
                setTimeout(() => {
                    runRace()
                }, 1000)
            } else {
                store.stopRace()
                isRacing.value = false
            }
        } else {
            animationFrameId = requestAnimationFrame(updatePositions)
        }
    }

    updatePositions()
}

onUnmounted(() => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
    }
})
</script>