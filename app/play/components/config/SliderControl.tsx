interface SliderControlProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    onChange: (value: number) => void;
}

export default function SliderControl({
    label,
    value,
    min,
    max,
    step = 1,
    unit = "",
    onChange,
}: SliderControlProps) {
    return (
        <div>
            <label className="block font-mono text-sm font-bold mb-2">
                {label}: {value}{unit}
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
            />
            <div className="flex justify-between font-mono text-xs text-white/40 mt-1">
                <span>{min}{unit}</span>
                <span>{max}{unit}</span>
            </div>
        </div>
    );
}
