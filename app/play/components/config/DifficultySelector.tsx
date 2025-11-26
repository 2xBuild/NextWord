import { DifficultyLevel } from "../../types";

interface DifficultySelectorProps {
    value: DifficultyLevel;
    onChange: (value: DifficultyLevel) => void;
}

export default function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
    const levels: DifficultyLevel[] = ["easy", "medium", "hard"];

    return (
        <div>
            <label className="block font-mono text-sm font-bold mb-2">
                Starting Difficulty
            </label>
            <div className="grid grid-cols-3 gap-3">
                {levels.map((level) => (
                    <button
                        key={level}
                        onClick={() => onChange(level)}
                        className={`px-4 py-3 font-mono font-bold rounded-lg transition-colors capitalize ${value === level
                                ? "bg-white text-black"
                                : "bg-white/10 text-white hover:bg-white/20"
                            }`}
                    >
                        {level}
                    </button>
                ))}
            </div>
        </div>
    );
}
