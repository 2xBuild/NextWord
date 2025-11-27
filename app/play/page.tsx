"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ModeToggle from "./components/ModeToggle";
import JoinRoomForm from "./components/JoinRoomForm";
import CreateRoomForm from "./components/CreateRoomForm";
import GameRoom from "./components/GameRoom";
import { GameConfig } from "./types";
import { BACKEND_SERVER } from "../constants";

export default function PlayPage() {
    const [mode, setMode] = useState<"join" | "create">("create");
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");
    const [isHost, setIsHost] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [initialUsers, setInitialUsers] = useState<string[]>([]);

    const connectAndSend = (type: "CRT_ROOM" | "JOIN_ROOM", payload: any) => {
        setIsLoading(true);
        setError("");

        const ws = new WebSocket(BACKEND_SERVER);
        let responseReceived = false;

        // Timeout after 5 seconds
        const timeout = setTimeout(() => {
            if (!responseReceived) {
                setError("Connection timeout. Please check if the server is running.");
                setIsLoading(false);
                ws.close();
            }
        }, 5000);

        ws.onopen = () => {
            console.log("Connected to server");
            ws.send(JSON.stringify({ type, payload }));
        };

        ws.onmessage = (event) => {
            responseReceived = true;
            clearTimeout(timeout);
            const data = JSON.parse(event.data);
            console.log("Initial response:", data);

            if (data.result === "success") {
                setRoomId(data.room_id);
                setUsername(data.username);
                setIsHost(type === "CRT_ROOM");
                setInitialUsers(data.users || [data.username]); // Extract user list
                setSocket(ws);
                setJoinedRoom(true);
                setIsLoading(false);
                // Remove this one-time listener so GameRoom can handle future messages cleanly
                ws.onmessage = null;
            } else {
                // Handle specific error messages
                let errorMsg = data.message || "Failed to join/create room";
                if (errorMsg.includes("does not exist")) {
                    errorMsg = "Room not found. Please check the Room ID.";
                } else if (errorMsg.includes("already exists")) {
                    errorMsg = "Username already taken. Please choose a different username.";
                } else if (errorMsg.includes("full")) {
                    errorMsg = "Room is full. Cannot join.";
                }
                setError(errorMsg);
                setIsLoading(false);
                ws.close();
            }
        };

        ws.onerror = (err) => {
            responseReceived = true;
            clearTimeout(timeout);
            console.error("WebSocket error:", err);
            setError("Connection failed. Please ensure the backend server is running on port 8080.");
            setIsLoading(false);
        };

        ws.onclose = () => {
            if (!responseReceived) {
                clearTimeout(timeout);
                setError("Connection closed unexpectedly. Please try again.");
                setIsLoading(false);
            }
        };
    };

    const handleJoinRoom = (playerName: string, roomId: string) => {
        connectAndSend("JOIN_ROOM", { username: playerName, room_id: roomId });
    };

    const handleCreateRoom = (playerName: string, config: GameConfig) => {
        connectAndSend("CRT_ROOM", {
            username: playerName,
            max_players: config.maxPlayers,
            init_time_per_turn: config.initialTime,
            min_word_len: config.minWordLength,
            diff: config.difficulty,
            prg_time_dcr: config.timeDecreaseEnabled,
            prg_diff_incr: config.difficultyIncrease,
            reward_by_word_length: config.rewardByWordLength
        });
    };

    const handleLeaveRoom = () => {
        if (socket) {
            socket.close();
        }
        setSocket(null);
        setJoinedRoom(false);
        setRoomId("");
        setUsername("");
        setIsHost(false);
        setInitialUsers([]);
    };

    if (joinedRoom && socket) {
        return (
            <div className="min-h-screen bg-black text-white py-8">
                <GameRoom
                    socket={socket}
                    username={username}
                    roomId={roomId}
                    isHost={isHost}
                    initialUsers={initialUsers}
                    onLeave={handleLeaveRoom}
                />
            </div>
        );
    }

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
                <div className="border border-white/10 rounded-lg p-8 bg-white/5 relative">
                    {isLoading && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 rounded-lg">
                            <div className="text-white font-mono animate-pulse">Connecting...</div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 text-red-200 rounded font-mono text-sm">
                            Error: {error}
                        </div>
                    )}

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
