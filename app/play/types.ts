export type DifficultyLevel = "easy" | "medium" | "hard";

export interface GameConfig {
    maxPlayers: number;
    initialTime: number;
    minWordLength: number;
    difficulty: DifficultyLevel;
    timeDecreaseEnabled: boolean;
    difficultyIncrease: boolean;
    rewardByWordLength: boolean;
}

export interface PlayerInfo {
    name: string;
    roomId?: string;
}

export interface Player {
    username: string;
    score: number;
    missedTurns: number;
    isHost?: boolean;
}

export interface ChatMessage {
    id: string;
    type: "system" | "user" | "game";
    content: string;
    sender?: string;
    timestamp: number;
}

export type GameStatus = "lobby" | "playing" | "ended";
