interface ModeToggleProps {
    mode: "join" | "create";
    onModeChange: (mode: "join" | "create") => void;
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
    return (
        <div className="flex gap-4 mb-8 justify-center">
            <button
                onClick={() => onModeChange("create")}
                className={`px-6 py-3 font-mono font-bold rounded-lg transition-colors ${mode === "create"
                        ? "bg-white text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
            >
                Create Room
            </button>
            <button
                onClick={() => onModeChange("join")}
                className={`px-6 py-3 font-mono font-bold rounded-lg transition-colors ${mode === "join"
                        ? "bg-white text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
            >
                Join Room
            </button>
        </div>
    );
}
