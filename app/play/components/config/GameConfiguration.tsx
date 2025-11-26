import { GameConfig } from "../../types";
import SliderControl from "./SliderControl";
import DifficultySelector from "./DifficultySelector";
import ToggleSwitch from "./ToggleSwitch";

interface GameConfigurationProps {
    config: GameConfig;
    onConfigChange: (config: GameConfig) => void;
}

export default function GameConfiguration({
    config,
    onConfigChange,
}: GameConfigurationProps) {
    const updateConfig = (updates: Partial<GameConfig>) => {
        onConfigChange({ ...config, ...updates });
    };

    return (
        <div className="space-y-6 mb-6">
            <h3 className="font-mono text-xl font-bold border-b border-white/10 pb-2">
                Game Configuration
            </h3>

            {/* Max Players */}
            <SliderControl
                label="Max Players"
                value={config.maxPlayers}
                min={2}
                max={10}
                onChange={(maxPlayers) => updateConfig({ maxPlayers })}
            />

            {/* Initial Time */}
            <SliderControl
                label="Initial Time per Turn"
                value={config.initialTime}
                min={10}
                max={60}
                step={5}
                unit="s"
                onChange={(initialTime) => updateConfig({ initialTime })}
            />

            {/* Minimum Word Length */}
            <SliderControl
                label="Minimum Word Length"
                value={config.minWordLength}
                min={3}
                max={8}
                unit=" letters"
                onChange={(minWordLength) => updateConfig({ minWordLength })}
            />

            {/* Difficulty Level */}
            <DifficultySelector
                value={config.difficulty}
                onChange={(difficulty) => updateConfig({ difficulty })}
            />

            {/* Advanced Options */}
            <div className="border-t border-white/10 pt-6">
                <h4 className="font-mono text-sm font-bold mb-4 text-white/80">
                    Advanced Options
                </h4>

                <div className="space-y-4">
                    {/* Time Decrease */}
                    <ToggleSwitch
                        title="Progressive Time Decrease"
                        description="Time limit decreases as game progresses"
                        enabled={config.timeDecreaseEnabled}
                        onToggle={() =>
                            updateConfig({ timeDecreaseEnabled: !config.timeDecreaseEnabled })
                        }
                    />

                    {/* Difficulty Increase */}
                    <ToggleSwitch
                        title="Progressive Difficulty Increase"
                        description="Minimum word length increases over time"
                        enabled={config.difficultyIncrease}
                        onToggle={() =>
                            updateConfig({ difficultyIncrease: !config.difficultyIncrease })
                        }
                    />
                </div>
            </div>
        </div>
    );
}
