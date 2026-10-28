<div align="center">

# 💧 Water Sort Puzzle

### Sort the Colors. Solve the Puzzle. Enjoy the Game!

An interactive color-sorting puzzle game featuring animated liquid pouring, progressive levels, daily rewards, achievements, and customizable gameplay.

<br>

<a href="https://water-sort-puzzle-1.vercel.app">
  <img src="https://img.shields.io/badge/PLAY_GAME-Live_Demo-20C997?style=for-the-badge" alt="Play Game">
</a>
<a href="https://github.com/nagarjuna1245/Water-sort-ReactJs-">
  <img src="https://img.shields.io/badge/VIEW_PROJECT-GitHub-24292F?style=for-the-badge&logo=github" alt="GitHub Repository">
</a>

</div>

---

## 📖 About the Project

Water Sort Puzzle is an interactive puzzle game where players sort colored liquids into separate bottles until each bottle contains a single color.

The game combines engaging puzzle mechanics, animated interactions, dynamic level generation, and player progression to create an enjoyable gaming experience.

## 📸 Game Screenshots

<p align="center">
  <img src="./home-screen.png" width="180" alt="Home Screen">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./level-selection.png" width="180" alt="Level Selection">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./gameplay-level-8.png" width="180" alt="Gameplay">
</p>

<p align="center">
  <b>🏠 Home Screen</b>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <b>🎯 Level Selection</b>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <b>🧪 Gameplay</b>
</p>

<br>

<p align="center">
  <img src="./settings.png" width="180" alt="Settings">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./player-profile.png" width="180" alt="Player Profile">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./daily-rewards.png" width="180" alt="Daily Rewards">
</p>

<p align="center">
  <b>⚙️ Settings</b>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <b>👤 Player Profile</b>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <b>🎁 Daily Rewards</b>
</p>

---

## ✨ Features

### 🧪 Interactive Gameplay
- Classic color-sorting puzzle mechanics.
- Animated liquid pouring and bottle tilting.
- Automatic move validation.
- Dynamic liquid transfer.
- Undo and restart functionality.
- Hint system and additional tube options.
- Move counter and best-move tracking.
- Automatic puzzle completion detection.

### 🎯 Levels & Progression
- Normal and Hard difficulty modes.
- Dynamic puzzle generation.
- Progressive level unlocking.
- Increasing puzzle complexity.
- Level completion tracking.
- Star ratings and gameplay rewards.

### 🏆 Player Achievements
- Player statistics and win tracking.
- Achievement progression.
- Hint and undo usage statistics.
- Best-move records.
- Daily streak tracking.
- Coin collection and rewards.

### 🎁 Daily Rewards & Challenges
- Daily challenge system.
- Daily reward claiming.
- Progress tracking.
- Streak-based rewards.
- Date-based challenge resets.

### 🎨 Customization
- Selectable game themes.
- Customizable bottles and tubes.
- Unlockable items.
- In-game coin system.
- Personalized gameplay appearance.

### 🔊 Audio & Interaction
- Pouring and dropping sound effects.
- Victory and tap sounds.
- Background music.
- Sound and music controls.
- Optional vibration or haptic feedback where supported.

### 💾 Persistent Progress
Player progress is saved using browser `localStorage`, including coins, unlocked levels, completed levels, achievements, selected themes, gameplay statistics, daily rewards, and audio preferences.

---

## 🧠 Game Logic

The puzzle engine manages the rules and state of the game independently of the visual interface.

### Puzzle Rules

Each bottle has a maximum capacity of **four liquid units**.

A valid pour requires:

1. The source bottle must contain liquid.
2. The destination bottle must have available space.
3. The destination must be empty or have the same color at the top.
4. Only the available matching top-color units are transferred.
5. The game checks whether the puzzle is complete after each valid move.

### Core Logic
- Move validation.
- Liquid transfer calculations.
- Bottle capacity management.
- Consecutive-color detection.
- Completed-bottle detection.
- Puzzle completion detection.
- Hint generation.

---

## 🖥️ Game Screens

The application includes multiple screens designed for different gameplay activities:

| Screen | Description |
|---|---|
| 🏠 Home | Main menu and game navigation |
| 📘 Instructions | Learn the puzzle rules |
| 🎯 Level Selection | Choose available levels |
| 🧪 Gameplay | Sort colored liquids |
| 🏆 Level Complete | View results and rewards |
| 🎁 Daily Rewards | Claim daily bonuses |
| 🎯 Daily Challenges | Complete daily objectives |
| 🛍️ Bottle Shop | Customize bottles |
| 🎨 Tube Shop | Unlock tube styles |
| 👤 Player Profile | View gameplay statistics |
| ⚙️ Settings | Configure game preferences |

---

## 📱 Responsive Design

The game is designed around a mobile-game experience while also supporting desktop browsers.

The gameplay layout adapts to different screen sizes and puzzle configurations by adjusting bottle dimensions, row arrangements, spacing, and board dimensions.

---

## 🚀 Run Locally

**1. Clone the repository**

```bash
git clone https://github.com/nagarjuna1245/Water-sort-ReactJs-.git
```

**2. Navigate to the project directory**

```bash
cd Water-sort-ReactJs-
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in your terminal to play the game.

---

## 🔮 Future Improvements

- Cloud-based player accounts and save synchronization.
- Global leaderboards.
- Multiplayer puzzle challenges.
- Additional difficulty modes and themes.
- Expanded achievements and rewards.
- Enhanced puzzle-generation algorithms.
- Mobile application deployment.
- Push notifications and gameplay analytics.

---


**Enjoy the challenge. Master the colors. 💧**

<a href="https://water-sort-puzzle-1.vercel.app">▶ Play Water Sort Puzzle</a>

</div>
