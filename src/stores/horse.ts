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
  raceSchedule: Horse[][]
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
      // Generate exactly 20 horses with unique names and colors
      this.horses = horseNames.map((name, index) => ({
        id: index + 1,
        name: name,
        condition: Math.floor(Math.random() * 100) + 1, // 1-100 condition
        color: horseColors[index],
        position: 0,
        speed: 0,
      }))
    },

    generateRaceSchedule() {
      // Reset race schedule
      this.raceSchedule = []
      const availableHorses = [...this.horses]

      // Create schedule for 6 rounds
      for (let round = 0; round < 6; round++) {
        const roundHorses: Horse[] = []
        const tempHorses = [...availableHorses]

        // Select 10 unique random horses for each round
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * tempHorses.length)
          roundHorses.push({
            ...tempHorses[randomIndex],
            position: 0, // Reset position for each round
            speed: 0, // Reset speed for each round
          })
          tempHorses.splice(randomIndex, 1)
        }

        this.raceSchedule.push(roundHorses)
      }
    },

    selectHorsesForRound() {
      // Ensure horses are selected and reset for the current round
      this.selectedHorses =
        this.raceSchedule[this.currentRound]?.map((horse) => ({
          ...horse,
          position: 0,
          speed: 0,
        })) || []
    },

    startRace() {
      // Ensure race schedule is generated before starting
      if (this.raceSchedule.length === 0) {
        this.generateRaceSchedule()
      }
      this.isRacing = true
      this.currentRound = 0
      this.selectHorsesForRound()
    },

    stopRace() {
      // Completely reset the race state
      this.isRacing = false
      this.currentRound = 0
      this.selectedHorses = []
      this.raceSchedule = []
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
