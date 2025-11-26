export type DifficultyLevel = "easy" | "medium" | "hard";

export interface GameConfig {
    maxPlayers: number;
    initialTime: number;
    minWordLength: number;
    difficulty: DifficultyLevel;
    timeDecreaseEnabled: boolean;
    difficultyIncrease: boolean;
}

export interface PlayerInfo {
    name: string;
    roomId?: string;
}
