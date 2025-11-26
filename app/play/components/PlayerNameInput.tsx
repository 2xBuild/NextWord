interface PlayerNameInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function PlayerNameInput({ value, onChange }: PlayerNameInputProps) {
    return (
        <div className="mb-6">
            <label className="block font-mono text-sm font-bold mb-2">
                Your Name
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg font-mono text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
            />
        </div>
    );
}
