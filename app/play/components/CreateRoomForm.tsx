import { useState } from "react";
import { GameConfig } from "../types";
import PlayerNameInput from "./PlayerNameInput";
import GameConfiguration from "./config/GameConfiguration";

interface CreateRoomFormProps {
    onCreateRoom: (playerName: string, config: GameConfig) => void;
}

export default function CreateRoomForm({ onCreateRoom }: CreateRoomFormProps) {
    const [playerName, setPlayerName] = useState("");
    const [config, setConfig] = useState<GameConfig>({
        maxPlayers: 4,
        initialTime: 30,
        minWordLength: 3,
        difficulty: "medium",
        timeDecreaseEnabled: true,
        difficultyIncrease: true,
        rewardByWordLength: true,
    });

    const handleSubmit = () => {
        if (playerName) {
            onCreateRoom(playerName, config);
        }
    };

    return (
        <>
            <PlayerNameInput value={playerName} onChange={setPlayerName} />

            <GameConfiguration config={config} onConfigChange={setConfig} />

            <button
                onClick={handleSubmit}
                disabled={!playerName}
                className="w-full px-6 py-4 bg-white text-black font-mono font-bold text-lg rounded-lg hover:bg-white/90 transition-colors disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed"
            >
                Create Room →
            </button>
        </>
    );
}
