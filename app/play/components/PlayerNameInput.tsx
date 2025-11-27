import { useState } from "react";

interface PlayerNameInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function PlayerNameInput({ value, onChange }: PlayerNameInputProps) {
    const [error, setError] = useState<string>("");

    const validateUsername = (username: string): string | null => {
        if (!username || username.trim().length === 0) {
            return "Username cannot be empty";
        }

        if (username.length < 2) {
            return "Username must be at least 2 characters long";
        }

        if (username.length > 20) {
            return "Username must be at most 20 characters long";
        }

        if (username.includes(' ')) {
            return "Username cannot contain spaces";
        }

        const validUsernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!validUsernameRegex.test(username)) {
            return "Username can only contain letters, numbers, and underscores";
        }

        return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);

        // Validate and set error
        const validationError = validateUsername(newValue);
        setError(validationError || "");
    };

    return (
        <div className="mb-6">
            <label className="block font-mono text-sm font-bold mb-2">
                Username
            </label>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Enter your username (letters, numbers, _)"
                className={`w-full px-4 py-3 bg-black border rounded-lg font-mono text-white placeholder:text-white/40 focus:outline-none transition-colors ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/20 focus:border-white/40'
                    }`}
            />
            {error && (
                <p className="mt-2 text-sm font-mono text-red-400">
                    {error}
                </p>
            )}
            {!error && value && (
                <p className="mt-2 text-sm font-mono text-green-400">
                    ✓ Valid username
                </p>
            )}
        </div>
    );
}
