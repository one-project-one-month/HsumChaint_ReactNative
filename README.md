# hsum-chaint

⚠️ **Note: This is a starter project and is currently a work-in-progress. Features are not completed yet and are actively being added.**

This is a starter project template built with [Expo](https://expo.dev) and React Native. It utilizes a modern tech stack to serve as a strong foundation for future development.

## Tech Stack

- **Framework:** React Native / Expo
- **Navigation:** Expo Router (`src/app`)
- **Styling:** Tailwind CSS (`tailwindcss`) with `uniwind` and `class-variance-authority`
- **Data Fetching:** React Query (`@tanstack/react-query`)
- **Forms & Validation:** React Hook Form (`react-hook-form`) & Zod (`zod`)
- **Local Storage:** React Native MMKV (`react-native-mmkv`)
- **Animations:** React Native Reanimated (`react-native-reanimated`)
- **Testing:** Jest & React Native Testing Library
- **Formatting/Linting:** ESLint, Prettier, Lefthook, Commitlint

## Project Directory

The main logic is organized under the `src/` directory:

- `src/app/` - App navigation & screens (Expo Router)
- `src/components/` - Reusable UI components
- `src/constants/` - App-wide constants
- `src/hooks/` - Custom React hooks
- `src/lib/` - Shared libraries, context and utilities
- `src/css/` - Global styling configurations

## Setup & Getting Started

1. Install dependencies (we use `bun`, as indicated by `bun.lock`):

   ```bash
   bun install
   ```

2. Start the development server:

   ```bash
   bun run start
   ```

In the output, you'll find options to open the app in a:

- Android emulator
- iOS simulator
- Expo Go, a limited sandbox for trying out app development with Expo

## Work in Progress (WIP)

Because this repository is considered a **starter project** template, many expected features have not yet been finished. It is currently under active development, so expect frequent updates and structural changes as new capabilities are added.

## Scripts

Available npm/bun scripts mapped in `package.json`:

- `start` - Start Expo development server
- `android` / `ios` / `web` - Open specific local environment
- `lint` - Run Expo linter and fix basic errors
- `format` - Format source files with Prettier
- `test` - Run Jest tests in watch mode
