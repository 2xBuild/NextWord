# Word Chain Game - Frontend

A real-time multiplayer word game built with Next.js where players take turns creating words that start with the last letter of the previous word.

## Features

- **Room Creation & Management**: Create custom game rooms with configurable settings
- **Real-time Gameplay**: WebSocket-based live updates for turns, scores, and chat
- **Game Configuration**: Customize time limits, difficulty, scoring rules, and progressive challenges
- **Live Chat**: In-game messaging system for player communication
- **Turn Indicators**: Visual feedback showing whose turn it is
- **Player Management**: Real-time player list with scores and status

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI**: React 19

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Backend server running on `constants.ts`

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── components/        # Reusable UI components
│   ├── play/             # Game room page and components
│   ├── page.tsx          # Home page with game rules
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── public/               # Static assets
└── package.json
```

## Game Configuration Options

When creating a room, you can configure:

- **Max Players**: 2-8 players
- **Time Per Turn**: Initial time limit (seconds)
- **Minimum Word Length**: 3-5 letters
- **Difficulty**: Easy, Medium, or Hard
- **Progressive Time Decrease**: Reduce time each turn
- **Progressive Difficulty**: Increase letter requirements
- **Length-based Scoring**: Award points by word length

## WebSocket Connection

The frontend connects to the backend WebSocket server at `constants.ts`. Ensure the backend is running before starting the game.

## License

ISC
