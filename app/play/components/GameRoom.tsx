import { useEffect, useState, useRef } from "react";
import { ChatMessage, Player, GameStatus } from "../types";

interface GameRoomProps {
    socket: WebSocket;
    username: string;
    roomId: string;
    isHost: boolean;
    initialUsers?: string[];
    onLeave: () => void;
}

export default function GameRoom({ socket, username, roomId, isHost, initialUsers, onLeave }: GameRoomProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [systemMessage, setSystemMessage] = useState("Waiting for players...");
    const [gameStatus, setGameStatus] = useState<GameStatus>("lobby");

    // Initialize players from initialUsers if provided
    const [players, setPlayers] = useState<Player[]>(() => {
        console.log("Initializing players with initialUsers:", initialUsers);
        if (initialUsers && initialUsers.length > 0) {
            return initialUsers.map((name, index) => ({
                username: name,
                score: 0,
                missedTurns: 0,
                isHost: index === 0 // First user is host
            }));
        }
        return [{ username, score: 0, missedTurns: 0, isHost }];
    });

    // Update players when initialUsers changes (when joining a room)
    useEffect(() => {
        if (initialUsers && initialUsers.length > 0) {
            console.log("Updating players from initialUsers:", initialUsers);
            setPlayers(initialUsers.map((name, index) => ({
                username: name,
                score: 0,
                missedTurns: 0,
                isHost: index === 0
            })));
        }
    }, [initialUsers]);

    const [currentTurnPlayer, setCurrentTurnPlayer] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            console.log("Received:", data);

            if (data.event) {
                switch (data.event) {
                    case "game_started":
                        setGameStatus("playing");
                        setCurrentTurnPlayer(data.currentPlayer);
                        setSystemMessage(`${data.currentPlayer}'s turn - Start with: ${data.startingWord?.slice(-1) || "Any"}`);
                        addGameMessage(`Game Started! Turn order: ${data.turnOrder.join(", ")}`);

                        // Initialize players from turn order
                        const initialPlayers = data.turnOrder.map((name: string) => ({
                            username: name,
                            score: 0,
                            missedTurns: 0,
                            isHost: name === username && isHost
                        }));
                        setPlayers(initialPlayers);
                        break;
                    case "turn_started":
                        setCurrentTurnPlayer(data.currentPlayer);
                        setSystemMessage(`${data.currentPlayer}'s turn - Last: ${data.lastWord || "None"} | Start with: ${data.requiredLetter || "Any"}`);
                        break;
                    case "word_accepted":
                        addGameMessage(`${data.player} played "${data.word}" (+${data.score} points)`);
                        // Update player score
                        setPlayers(prev => prev.map(p =>
                            p.username === data.player
                                ? { ...p, score: p.score + data.score }
                                : p
                        ));
                        break;
                    case "word_rejected":
                        addGameMessage(`${data.player} tried "${data.word}" - ${data.reason}`);
                        break;
                    case "turn_timeout":
                        addGameMessage(`${data.player} ran out of time! (${data.missedTurns} missed turns)`);
                        setPlayers(prev => prev.map(p =>
                            p.username === data.player
                                ? { ...p, missedTurns: data.missedTurns }
                                : p
                        ));
                        break;
                    case "player_eliminated":
                        addGameMessage(`${data.player} has been eliminated! Remaining: ${data.remainingPlayers.join(", ")}`);
                        setPlayers(prev => prev.filter(p => data.remainingPlayers.includes(p.username)));
                        break;
                    case "game_ended":
                        setGameStatus("ended");
                        setSystemMessage(`Game Over! Winner: ${data.winner}`);
                        addGameMessage(`Game Over! Winner: ${data.winner}`);
                        break;
                }
            } else if (data.type) {
                switch (data.type) {
                    case "USER_LEFT":
                        addGameMessage(`${data.username} left the room.`);
                        setPlayers(prev => prev.filter(p => p.username !== data.username));
                        break;
                    case "USER_JOINED":
                        // Update player list with all users
                        if (data.users && Array.isArray(data.users)) {
                            console.log("Received USER_JOINED with users:", data.users);
                            setPlayers(data.users.map((name: string, index: number) => ({
                                username: name,
                                score: 0,
                                missedTurns: 0,
                                isHost: index === 0
                            })));
                        }

                        // Show message in chat
                        if (data.username !== username) {
                            addGameMessage(`${data.username} joined the room.`);
                            // Show active users list
                            if (data.users && data.users.length > 0) {
                                addGameMessage(`Active players: ${data.users.join(", ")}`);
                            }
                        } else {
                            // Current user just joined
                            addGameMessage(`Welcome! You joined the room.`);
                            if (data.users && data.users.length > 1) {
                                addGameMessage(`Active players: ${data.users.join(", ")}`);
                            }
                        }
                        break;
                    case "NEW_HOST":
                        if (data.hostId === username) {
                            addGameMessage("You are now the host!");
                        } else {
                            addGameMessage(`${data.hostId} is now the host.`);
                            addGameMessage(`${data.username} joined the room.`);
                        }
                        break;
                    case "CHAT_MESSAGE":
                        // Handle incoming chat messages from other users
                        if (data.sender !== username) {
                            addUserMessage(data.sender, data.message);
                        }
                        break;
                }
            }
        };

        socket.addEventListener("message", handleMessage);

        return () => {
            socket.removeEventListener("message", handleMessage);
        };
    }, [socket, username, isHost, players]);

    const addGameMessage = (content: string) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString() + Math.random(),
            type: "game",
            content,
            timestamp: Date.now()
        }]);
    };

    const addUserMessage = (sender: string, content: string) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString() + Math.random(),
            type: "user",
            content,
            sender,
            timestamp: Date.now()
        }]);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // If playing, treat as game move
        if (gameStatus === "playing") {
            socket.send(JSON.stringify({
                type: "GAME_MOVE",
                payload: { word: inputValue.trim() }
            }));
            // Show user's word attempt in chat
            addUserMessage(username, inputValue.trim());
        } else {
            // In lobby, send as chat message (broadcast to all)
            socket.send(JSON.stringify({
                type: "CHAT_MESSAGE",
                payload: { message: inputValue.trim() }
            }));
            // Show message locally
            addUserMessage(username, inputValue.trim());
        }

        setInputValue("");
    };

    const handleStartGame = () => {
        socket.send(JSON.stringify({
            type: "START_GAME",
            payload: {}
        }));
    };

    return (
        <div className="flex flex-col h-screen md:h-[700px] w-full md:max-w-5xl md:mx-auto bg-black border-0 md:border md:border-white/20 md:rounded-2xl overflow-hidden">
            {/* Header with Player List */}
            <div className="bg-white/5 border-b border-white/20 p-3 md:p-5">
                <div className="flex justify-between items-center mb-3">
                    <div className="text-white text-xs md:text-sm font-mono font-bold">
                        Room: <span className="text-white/70">{roomId}</span>
                    </div>
                    <button
                        onClick={onLeave}
                        className="text-red-400 hover:text-red-300 text-xs md:text-sm font-mono font-bold px-2 md:px-3 py-1 border border-red-400/30 rounded hover:bg-red-900/20 transition-all"
                    >
                        Leave
                    </button>
                </div>

                {/* Player List with Turn Indicator */}
                <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {players.map((player) => {
                        const isCurrentTurn = currentTurnPlayer === player.username;
                        const isMyTurn = isCurrentTurn && player.username === username;

                        return (
                            <div
                                key={player.username}
                                className={`flex-shrink-0 px-3 md:px-4 py-2 rounded-lg font-mono text-xs md:text-sm transition-all duration-500 ${isMyTurn
                                    ? "bg-white text-black font-bold scale-110 md:scale-125 shadow-2xl ring-4 ring-white animate-pulse-subtle"
                                    : isCurrentTurn
                                        ? "bg-white text-black font-bold scale-105 md:scale-110 shadow-lg ring-2 ring-white"
                                        : "bg-white/10 text-white/80 border border-white/20"
                                    }`}
                            >
                                <div className="flex items-center gap-1 md:gap-2">
                                    <span className="truncate max-w-[80px] md:max-w-none">{player.username}</span>
                                    {player.isHost && <span className="text-xs">👑</span>}
                                    {isMyTurn && <span className="text-xs">⏰</span>}
                                </div>
                                {gameStatus === "playing" && (
                                    <div className="text-xs mt-1 opacity-80 whitespace-nowrap">
                                        {player.score}pts | {player.missedTurns}❌
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* YOUR TURN Banner - Only shown when it's the current user's turn */}
                {gameStatus === "playing" && currentTurnPlayer === username && (
                    <div className="mb-2 bg-white text-black py-2 px-4 rounded-lg text-center font-mono font-bold text-sm md:text-base animate-pulse-subtle">
                        ⏰ YOUR TURN! Type your word below ⏰
                    </div>
                )}

                {/* System Message Slider */}
                <div className="h-8 md:h-10 flex items-center justify-center relative overflow-hidden bg-white/5 rounded-lg border border-white/10">
                    <div key={systemMessage} className="animate-slide-up absolute w-full text-center px-2 md:px-4">
                        <h2 className="text-sm md:text-lg font-bold text-white font-mono tracking-wide truncate">
                            {systemMessage}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-3 md:p-5 space-y-2 md:space-y-3 bg-black">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.type === 'user' && msg.sender === username ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.type === 'game' ? (
                            <div className="w-full bg-white/5 border border-white/20 text-white/70 text-xs md:text-sm px-3 md:px-4 py-2 rounded-lg text-center font-mono">
                                🎮 {msg.content}
                            </div>
                        ) : msg.type === 'user' ? (
                            <div className="max-w-[85%] md:max-w-[70%]">
                                <div className="text-xs font-mono text-white/50 mb-1 px-2">
                                    {msg.sender}
                                </div>
                                <div className={`px-3 md:px-4 py-2 rounded-2xl break-words ${msg.sender === username
                                    ? 'bg-white text-black rounded-br-sm'
                                    : 'bg-white/10 text-white border border-white/20 rounded-bl-sm'
                                    }`}>
                                    <p className="font-mono text-xs md:text-sm">{msg.content}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full bg-white/5 text-white/60 text-xs italic px-3 md:px-4 py-2 rounded text-center font-mono">
                                {msg.content}
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Controls Area */}
            <div className="p-3 md:p-5 bg-white/5 border-t border-white/10">
                {gameStatus === "lobby" && isHost && (
                    <button
                        onClick={handleStartGame}
                        className="w-full mb-3 md:mb-4 py-2 md:py-3 bg-white hover:bg-white/90 text-black font-bold rounded-lg transition-all font-mono text-sm md:text-lg"
                    >
                        🚀 START GAME
                    </button>
                )}

                <form onSubmit={handleSendMessage} className="flex gap-2 md:gap-3">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={gameStatus === "playing" ? "Type your word..." : "Type a message..."}
                        className="flex-1 bg-black border border-white/30 rounded-lg md:rounded-xl px-3 md:px-5 py-2 md:py-3 text-white text-sm md:text-base focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50 font-mono transition-all"
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="px-4 md:px-8 py-2 md:py-3 bg-white hover:bg-white/90 text-black rounded-lg md:rounded-xl font-mono font-bold text-sm md:text-base transition-all"
                    >
                        SEND
                    </button>
                </form>
            </div>

            <style jsx>{`
                @keyframes slide-enter {
                    0% { transform: translateY(100%); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up {
                    animation: slide-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes pulse-subtle {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                .animate-pulse-subtle {
                    animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
