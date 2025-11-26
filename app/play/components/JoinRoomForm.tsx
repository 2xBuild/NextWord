import { useState } from "react";
import PlayerNameInput from "./PlayerNameInput";

interface JoinRoomFormProps {
    onJoin: (playerName: string, roomId: string) => void;
}

export default function JoinRoomForm({ onJoin }: JoinRoomFormProps) {
    const [playerName, setPlayerName] = useState("");
    const [roomId, setRoomId] = useState("");

    const handleSubmit = () => {
        if (playerName && roomId) {
            onJoin(playerName, roomId);
        }
    };

    return (
        <>
            <PlayerNameInput value={playerName} onChange={setPlayerName} />

            <div className="mb-6">
                <label className="block font-mono text-sm font-bold mb-2">
                    Room ID
                </label>
                <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                    placeholder="Enter room ID (e.g., ABC123)"
                    className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg font-mono text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors uppercase"
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={!roomId || !playerName}
                className="w-full px-6 py-4 bg-white text-black font-mono font-bold text-lg rounded-lg hover:bg-white/90 transition-colors disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed"
            >
                Join Room →
            </button>
        </>
    );
}
