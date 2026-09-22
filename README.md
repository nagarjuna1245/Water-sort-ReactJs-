# 💧 Water Sort Puzzle — React.js

A modern and interactive **Water Sort Puzzle Game** built with **React.js and Vite**. The game features dynamic puzzle generation, animated liquid pouring, multiple difficulty levels, player progression, themes, daily challenges, rewards, achievements, and persistent game data.

🔗 **Live Demo:** https://puzz.vercel.app/

🔗 **GitHub:** https://github.com/nagarjuna1245/Water-sort-ReactJs-

---

## 🎮 Features

### 🧪 Core Gameplay

* Classic Water Sort Puzzle mechanics
* Pour liquid between tubes/bottles
* Automatic move validation
* Matching-color liquid transfer
* Dynamic liquid levels
* Puzzle completion detection
* Move counter
* Best moves tracking
* Undo functionality
* Restart level
* Add Tube functionality
* Hint system
* Animated pouring with bottle/tube tilt
* Gravity-based liquid transfer animation
* Win/completion screen

### 🎯 Game Modes

* Normal difficulty
* Hard difficulty
* Dynamic level generation
* Multiple puzzle configurations
* Increasing puzzle complexity

### 🏆 Progression System

* Level unlocking
* Completed-level tracking
* Star ratings
* Best-move records
* Coins/rewards
* Player statistics
* Achievement tracking
* Win tracking
* Move tracking
* Hint usage tracking
* Undo tracking
* Daily streak system

### 🎁 Daily Features

* Daily challenges
* Daily rewards
* Daily progress tracking
* Reward claiming
* Streak tracking
* Challenge reset based on date

### 🛍️ Customization

* Bottle customization
* Tube customization
* Theme customization
* Unlockable game items
* In-game coin system
* Player-selected themes and containers

### 🔊 Audio & Interaction

* Pour sound effects
* Drop sound effects
* Win sound
* Tap sound
* Error sound
* Background/ambient music
* Sound settings
* Music settings
* Optional vibration/haptic feedback

### 💾 Local Game Data

Player progress is persisted using browser `localStorage`.

The game stores information such as:

* Coins
* Unlocked levels
* Completed levels
* Stars
* Best moves
* Selected theme
* Selected bottle/tube
* Hints
* Statistics
* Daily challenges
* Daily rewards
* Achievements
* Streak information
* Audio preferences

---

## 🖥️ Screens

The application includes multiple screens:

* Home
* Instructions
* Level Selection
* Gameplay
* Level Complete
* Daily Challenges
* Daily Rewards
* Bottle Shop
* Tube Shop
* Profile
* Settings

---

## 🧩 Game Logic

The core puzzle engine is implemented separately from the UI.

The game engine handles:

* Move validation
* Liquid transfer
* Maximum tube capacity
* Consecutive-color calculation
* Completed tube detection
* Puzzle completion detection
* Hint generation

Each tube has a maximum capacity of **4 liquid units**.

A valid pour requires:

1. The source tube must contain liquid.
2. The destination tube must not be full.
3. The destination must be empty or have the same top color as the source.
4. Only the available matching top-color units are transferred.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### Build Tool

* Vite

### Routing

* React Router

### Icons

* Lucide React

### State Management

* React Context API
* React Hooks

### Storage

* Browser LocalStorage

---

## 📁 Project Structure

```text
water-sort-puzzle/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── containers/
│   │   ├── effects/
│   │   ├── environment/
│   │   ├── home/
│   │   └── shop/
│   │
│   ├── context/
│   │   └── PlayerContext.jsx
│   │
│   ├── game/
│   │   ├── catalogData.js
│   │   ├── colors.js
│   │   ├── gameEngine.js
│   │   ├── glassGeometry.js
│   │   ├── levelGenerator.js
│   │   ├── levels.js
│   │   ├── liquidMath.js
│   │   └── pourAnimator.js
│   │
│   ├── screens/
│   │   ├── DailyChallengesScreen.jsx
│   │   ├── DailyRewardsScreen.jsx
│   │   ├── GameplayScreen.jsx
│   │   ├── InstructionsScreen.jsx
│   │   ├── LevelCompleteScreen.jsx
│   │   ├── LevelSelectScreen.jsx
│   │   ├── ProfileScreen.jsx
│   │   ├── SettingsScreen.jsx
│   │   ├── ShopBottlesScreen.jsx
│   │   ├── ShopThemesScreen.jsx
│   │   └── ShopTubesScreen.jsx
│   │
│   ├── utils/
│   │   └── audio.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nagarjuna1245/Water-sort-ReactJs-.git
```

### 2. Open the project

```bash
cd Water-sort-ReactJs-
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local Vite development URL shown in the terminal.

---

## 📦 Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🌐 Deployment

The project can be deployed using platforms such as:

* Vercel
* Netlify
* GitHub Pages

### Vercel

The current live deployment:

**https://puzz.vercel.app/**

---

## 📱 Responsive Design

The game is designed around a mobile-game experience while supporting desktop browsers.

The gameplay board dynamically adjusts:

* Number of bottles/tubes
* Number of rows
* Bottle size
* Horizontal spacing
* Vertical spacing
* Board dimensions

This allows different puzzle sizes to fit the available screen area.

---

## 🧠 Architecture

The application separates gameplay logic from presentation.

### Game Engine

```text
gameEngine.js
```

Responsible for:

```text
Move Validation
      ↓
Liquid Transfer
      ↓
Tube Completion
      ↓
Puzzle Completion
      ↓
Hint Generation
```

### Player State

```text
PlayerContext.jsx
```

Responsible for:

```text
Coins
Levels
Stars
Statistics
Themes
Bottles
Tubes
Hints
Achievements
Daily Challenges
Daily Rewards
Streaks
Audio Preferences
```

### Gameplay

```text
GameplayScreen.jsx
        ↓
Game Engine
        ↓
Level Generator
        ↓
Pour Animator
        ↓
Tube Renderer
        ↓
Liquid Renderer
```

---

## 🎨 Design

The game uses a polished casual-game interface with:

* Glass-style tubes
* Animated liquid
* Wooden game platforms
* Dynamic backgrounds
* Game HUD
* Coins
* Hints
* Game controls
* Animated transitions
* Responsive layouts
* Custom game themes

---

## 🔮 Future Improvements

Possible future enhancements include:

* Online player accounts
* Cloud save synchronization
* Global leaderboards
* Multiplayer challenges
* More difficulty modes
* Additional bottle/tube skins
* More themes
* Achievement expansion
* Advanced puzzle-generation algorithms
* Cloud-based player profiles
* Mobile app deployment
* Push notifications
* Analytics and player progression tracking

---

## 👨‍💻 Author

**Kotha Venkata Nagarjuna**

Frontend / React.js Developer

GitHub:
https://github.com/nagarjuna1245

---

## 📄 License

This project is intended for portfolio and educational purposes.
