    <!-- Race Track Component -->
    <template>
        <div class="col-span-6 bg-gray-100 p-4 rounded-lg">
            <div class="relative h-[600px] bg-green-100 rounded-lg overflow-hidden">
                <!-- Fixed Lane Numbers -->
                <div v-for="(_, index) in 10" :key="index"
                    class="absolute left-4 flex items-center justify-center w-8 h-8 rounded-full"
                    :style="{ top: `${index * 60 + 10}px` }">
                    {{ index + 1 }}
                </div>
                <div v-for="(horse, index) in selectedHorses" :key="horse.id"
                    class="absolute h-12 transition-all duration-500 flex items-center" :style="{
                        top: `${index * 60 + 10}px`,
                        left: `${horse.position}%`,
                        transform: 'translateX(-50%)',
                    }">
                    <!-- Horse -->
                    <div class="absolute right-full mr-2 whitespace-nowrap text-sm font-medium">
                        {{ horse.name }}
                    </div>
                    <!-- Horse Icon with Background -->
                    <div class="w-12 h-12 flex items-center justify-center rounded-full"
                        :style="{ backgroundColor: horse.color }">
                        <span class="transform scale-x-[-1]">🐎</span>
                    </div>
                </div>
                <!-- Track Lines -->
                <div v-for="i in 10" :key="i" class="absolute w-full h-[1px] bg-gray-300"
                    :style="{ top: `${i * 60}px` }">
                </div>
                <!-- Finish Line -->
                <div class="absolute right-0 top-0 h-full w-1 bg-red-500"></div>
                <!-- Distance Marker -->
                <div class="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-sm">
                    {{ currentDistance }}m
                </div>
            </div>
        </div>
    </template>

<script setup lang="ts">
import type { Horse } from '@/types/horse'

defineProps<{
    selectedHorses: Horse[]
    currentDistance: number
}>()
</script>