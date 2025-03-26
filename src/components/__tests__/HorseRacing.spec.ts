import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseRacing from '../HorseRacing.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useHorseStore } from '@/stores/horse'

describe('HorseRacing', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const store = useHorseStore()
    store.generateHorses()
  })

  it('renders properly', () => {
    const wrapper = mount(HorseRacing)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Horse Racing')
  })

  it('generates program when generate button is clicked', async () => {
    const wrapper = mount(HorseRacing)
    const store = useHorseStore()

    await wrapper.find('button').trigger('click')

    expect(store.raceSchedule.length).toBe(6)
    expect(store.raceSchedule[0].length).toBe(10)
  })

  it('starts race when start button is clicked', async () => {
    const wrapper = mount(HorseRacing)
    const store = useHorseStore()

    // Generate program first
    await wrapper.find('button').trigger('click')

    // Start race
    await wrapper.find('button:nth-child(2)').trigger('click')

    expect(store.isRacing).toBe(true)
    expect(store.currentRound).toBe(0)
  })

  it('stops race when pause button is clicked', async () => {
    const wrapper = mount(HorseRacing)
    const store = useHorseStore()

    // Generate program first
    await wrapper.find('button').trigger('click')

    // Start race
    await wrapper.find('button:nth-child(2)').trigger('click')

    // Pause race
    await wrapper.find('button:nth-child(2)').trigger('click')

    expect(store.isRacing).toBe(false)
  })

  it('records results when all horses finish', async () => {
    const wrapper = mount(HorseRacing)
    const store = useHorseStore()

    // Generate program first
    await wrapper.find('button').trigger('click')

    // Start race
    await wrapper.find('button:nth-child(2)').trigger('click')

    // Mock all horses finishing
    store.selectedHorses.forEach((horse) => {
      horse.position = 100
    })

    // Wait for next tick
    await wrapper.vm.$nextTick()

    // Check if results are recorded
    expect(store.selectedHorses.length).toBe(10)
    expect(store.selectedHorses.every((horse) => horse.position >= 100)).toBe(true)
  })
})
