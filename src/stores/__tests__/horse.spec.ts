import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useHorseStore } from '../horse'

describe('Horse Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('generates horses within the correct range', () => {
    const store = useHorseStore()
    store.generateHorses()
    expect(store.horses.length).toBeGreaterThanOrEqual(1)
    expect(store.horses.length).toBeLessThanOrEqual(20)
  })

  it('has correct round distances', () => {
    const store = useHorseStore()
    expect(store.rounds).toEqual([1200, 1400, 1600, 1800, 2000, 2200])
  })

  it('manages race state correctly', () => {
    const store = useHorseStore()
    store.startRace()
    expect(store.isRacing).toBe(true)
    expect(store.currentRound).toBe(0)

    store.stopRace()
    expect(store.isRacing).toBe(false)
    expect(store.currentRound).toBe(0)
  })

  it('advances to next round correctly', () => {
    const store = useHorseStore()
    store.startRace()
    store.nextRound()
    expect(store.currentRound).toBe(1)
  })
})
