# Play Page Structure

This directory contains the play page and all its components, organized for easy understanding and maintenance.

## 📁 File Structure

```
play/
├── page.tsx                          # Main play page (entry point)
├── types.ts                          # TypeScript type definitions
└── components/
    ├── ModeToggle.tsx                # Toggle between Join/Create modes
    ├── PlayerNameInput.tsx           # Player name input field
    ├── JoinRoomForm.tsx              # Form for joining existing rooms
    ├── CreateRoomForm.tsx            # Form for creating new rooms
    └── config/
        ├── GameConfiguration.tsx     # Main game config component
        ├── SliderControl.tsx         # Reusable slider component
        ├── DifficultySelector.tsx    # Difficulty level selector
        └── ToggleSwitch.tsx          # Reusable toggle switch
```

## 🧩 Component Breakdown

### **Main Page** (`page.tsx`)
- Entry point for the `/play` route
- Manages mode state (join vs create)
- Handles room creation and joining logic
- Clean and minimal (~50 lines)

### **Types** (`types.ts`)
- `GameConfig` - Game configuration interface
- `DifficultyLevel` - Type for difficulty levels
- `PlayerInfo` - Player information interface

### **Top-Level Components**

#### `ModeToggle.tsx`
- Switches between "Join Room" and "Create Room" modes
- Simple button toggle

#### `PlayerNameInput.tsx`
- Reusable input for player name
- Used in both join and create forms

#### `JoinRoomForm.tsx`
- Form for joining existing game rooms
- Contains: player name + room ID input
- Manages its own state

#### `CreateRoomForm.tsx`
- Form for creating new game rooms
- Contains: player name + game configuration
- Manages its own state

### **Config Components** (`components/config/`)

#### `GameConfiguration.tsx`
- Main configuration component
- Combines all config controls
- Manages config state updates

#### `SliderControl.tsx`
- Reusable slider for numeric inputs
- Used for: max players, time, word length

#### `DifficultySelector.tsx`
- Three-button selector for difficulty
- Options: Easy, Medium, Hard

#### `ToggleSwitch.tsx`
- Reusable toggle for boolean settings
- Used for: time decrease, difficulty increase

## 🎯 Benefits of This Structure

1. **Easy to Understand** - Each file has a single, clear purpose
2. **Reusable Components** - SliderControl and ToggleSwitch can be used anywhere
3. **Maintainable** - Changes to one feature don't affect others
4. **Testable** - Each component can be tested independently
5. **Scalable** - Easy to add new config options or features

## 🔄 Data Flow

```
page.tsx
  ├─> ModeToggle (controls which form to show)
  ├─> JoinRoomForm
  │     ├─> PlayerNameInput
  │     └─> Room ID Input
  └─> CreateRoomForm
        ├─> PlayerNameInput
        └─> GameConfiguration
              ├─> SliderControl (x3)
              ├─> DifficultySelector
              └─> ToggleSwitch (x2)
```

## 🚀 Next Steps

To connect to WebSocket:
1. Update `handleJoinRoom()` in `page.tsx`
2. Update `handleCreateRoom()` in `page.tsx`
3. Add WebSocket connection logic
4. Navigate to game room after successful connection
