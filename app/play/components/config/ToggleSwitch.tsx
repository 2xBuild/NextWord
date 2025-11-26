interface ToggleSwitchProps {
    title: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
}

export default function ToggleSwitch({
    title,
    description,
    enabled,
    onToggle,
}: ToggleSwitchProps) {
    return (
        <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
            <div>
                <div className="font-mono font-bold text-sm">{title}</div>
                <div className="font-mono text-xs text-white/60 mt-1">
                    {description}
                </div>
            </div>
            <button
                onClick={onToggle}
                className={`w-12 h-6 rounded-full transition-colors relative ${enabled ? "bg-white" : "bg-white/20"
                    }`}
            >
                <div
                    className={`w-4 h-4 rounded-full bg-black absolute top-1 transition-transform ${enabled ? "translate-x-7" : "translate-x-1"
                        }`}
                />
            </button>
        </div>
    );
}
