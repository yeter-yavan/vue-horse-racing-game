import { defineStore } from 'pinia'
import type { Horse } from '@/types/horse'

const horseNames = [
  'Thunder',
  'Storm',
  'Lightning',
  'Shadow',
  'Spirit',
  'Phoenix',
  'Blaze',
  'Arrow',
  'Comet',
  'Star',
  'Luna',
  'Nova',
  'Flash',
  'Wind',
  'River',
  'Mountain',
  'Ocean',
  'Sky',
  'Forest',
  'Desert',
]

const horseColors = [
  '#FF0000',
  '#0000FF',
  '#00FF00',
  '#FFFF00',
  '#800080',
  '#FFC0CB',
  '#4B0082',
  '#FFA500',
  '#008080',
  '#00FFFF',
  '#FF4500',
  '#000080',
  '#006400',
  '#FFD700',
  '#8B008B',
  '#FF69B4',
  '#483D8B',
  '#FF8C00',
  '#008B8B',
  '#00CED1',
]

interface HorseState {
  horses: Horse[]
  selectedHorses: Horse[]
  rounds: number[]
  currentRound: number
  isRacing: boolean
  raceSchedule: Horse[][] // Her round için at listesi
}

export const useHorseStore = defineStore('horse', {
  state: (): HorseState => ({
    horses: [],
    selectedHorses: [],
    rounds: [1200, 1400, 1600, 1800, 2000, 2200],
    currentRound: 0,
    isRacing: false,
    raceSchedule: [],
  }),

  actions: {
    generateHorses() {
      // Her at için sabit renk ve isim ataması
      this.horses = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        name: horseNames[index],
        condition: Math.floor(Math.random() * 100) + 1,
        color: horseColors[index],
        position: 0,
        speed: 0,
      }))
    },

    generateRaceSchedule() {
      this.raceSchedule = []
      const availableHorses = [...this.horses]

      // 6 round için program oluştur
      for (let round = 0; round < 6; round++) {
        const roundHorses: Horse[] = []
        const tempHorses = [...availableHorses]

        // Her round için 10 random at seç
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * tempHorses.length)
          roundHorses.push({ ...tempHorses[randomIndex] })
          tempHorses.splice(randomIndex, 1)
        }

        this.raceSchedule.push(roundHorses)
      }
    },

    selectHorsesForRound() {
      this.selectedHorses = this.raceSchedule[this.currentRound]?.map((horse) => ({
        ...horse,
        position: 0,
        speed: 0,
      }))
    },

    startRace() {
      this.isRacing = true
      this.currentRound = 0
      this.selectHorsesForRound()
    },

    stopRace() {
      this.isRacing = false
      this.currentRound = 0
    },

    nextRound() {
      if (this.currentRound < this.rounds.length - 1) {
        this.currentRound++
        this.selectHorsesForRound()
      } else {
        this.stopRace()
      }
    },
  },
})
