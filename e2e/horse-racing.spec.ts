import { test, expect } from '@playwright/test'

test('horse racing game basic functionality', async ({ page }) => {
  await page.goto('/')

  // Check initial state
  await expect(page.getByText('Horse Racing')).toBeVisible()
  await expect(page.getByText('Generate Program')).toBeVisible()
  await expect(page.getByText('Start')).toBeVisible()

  // Generate program and check horse list
  await page.getByText('Generate Program').click()
  await expect(page.locator('.horse-list')).toBeVisible()

  // Start race and check animation
  await page.getByText('Start').click()
  await expect(page.getByText('Pause')).toBeVisible()

  // Wait for first round to complete and check results
  await page.waitForTimeout(5000)
  await expect(page.getByText('Round 1 - 1200m')).toBeVisible()
})

test('horse list generation', async ({ page }) => {
  await page.goto('/')

  // Click generate program multiple times and verify horse count is within range
  for (let i = 0; i < 5; i++) {
    await page.getByText('Generate Program').click()
    const horseCount = await page.evaluate(() => {
      const text = document.querySelector('h2')?.textContent || ''
      const match = text.match(/Horse List \((\d+)\)/)
      return match ? parseInt(match[1]) : 0
    })
    expect(horseCount).toBeGreaterThanOrEqual(1)
    expect(horseCount).toBeLessThanOrEqual(20)
  }
})
