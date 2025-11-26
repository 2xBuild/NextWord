"use client";

import { useState } from "react";
import Link from "next/link";
import ModeToggle from "./components/ModeToggle";
import JoinRoomForm from "./components/JoinRoomForm";
import CreateRoomForm from "./components/CreateRoomForm";
import { GameConfig } from "./types";

export default function PlayPage() {
    const [mode, setMode] = useState<"join" | "create">("create");

    const handleJoinRoom = (playerName: string, roomId: string) => {
        // TODO: Connect to WebSocket and join room
        console.log("Joining room:", roomId, "as", playerName);
    };

    const handleCreateRoom = (playerName: string, config: GameConfig) => {
        // TODO: Connect to WebSocket and create room
        console.log("Creating room with config:", config, "Player:", playerName);
    };

    return (
        <div className="min-h-screen bg-black text-white py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="font-mono text-4xl font-bold mb-2">Play NextWord</h1>
                    <p className="font-mono text-white/60">
                        Join an existing room or create your own
                    </p>
                </div>

                {/* Mode Toggle */}
                <ModeToggle mode={mode} onModeChange={setMode} />

                {/* Main Content */}
                <div className="border border-white/10 rounded-lg p-8 bg-white/5">
                    {mode === "join" ? (
                        <JoinRoomForm onJoin={handleJoinRoom} />
                    ) : (
                        <CreateRoomForm onCreateRoom={handleCreateRoom} />
                    )}
                </div>

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <Link
                        href="/"
                        className="font-mono text-white/60 hover:text-white transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
