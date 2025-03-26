# Horse Racing Game

An interactive horse racing game built with Vue.js and Tailwind CSS.

## Features

- Generate random horse list (1-20 horses)
- 6 rounds of racing with different distances
- Real-time race results

## Project Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Run unit tests
pnpm run test:unit

# Run end-to-end tests
pnpm run test:e2e
```

## Technical Stack

- Vue.js 3
- TypeScript
- Tailwind CSS
- Pinia for state management
- Vitest for unit testing
- Playwright for E2E testing

## Project Structure

```
src/
  ├── assets/         # Static assets and global CSS
  ├── components/     # Vue components
  ├── stores/         # Pinia stores
  ├── types/          # TypeScript type definitions
  └── App.vue         # Root component
```

## Game Rules

1. Each race consists of 6 rounds with different distances:

   - Round 1: 1200 meters
   - Round 2: 1400 meters
   - Round 3: 1600 meters
   - Round 4: 1800 meters
   - Round 5: 2000 meters
   - Round 6: 2200 meters

2. Horse characteristics:
   - Each horse has a unique color
   - Condition score ranges from 1 to 100
   - 10 random horses are selected for each round

## License

# MIT

# vue-horse-racing-game

Horse racing game
