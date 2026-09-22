import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { THEMES_CATALOG } from './game/catalogData';
import { HomeScreen } from './screens/HomeScreen';
import { LevelSelectScreen } from './screens/LevelSelectScreen';
import { GameplayScreen } from './screens/GameplayScreen';
import { LevelCompleteScreen } from './screens/LevelCompleteScreen';
import { InstructionsScreen } from './screens/InstructionsScreen';
import { ShopBottlesScreen } from './screens/ShopBottlesScreen';
import { ShopTubesScreen } from './screens/ShopTubesScreen';
import { DailyChallengesScreen } from './screens/DailyChallengesScreen';
import { DailyRewardsScreen } from './screens/DailyRewardsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ProfileScreen } from './screens/ProfileScreen';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          fontFamily: 'Inter, sans-serif',
          color: '#333'
        }}>
          <h1>Something went wrong</h1>
          <p>{this.state.error?.toString()}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#635BFF',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Dynamic theme background from catalog
const getThemeBg = (themeId) => {
  const found = THEMES_CATALOG.find(t => t.id === themeId);
  return found ? found.bg : '#F8FAFF';
};

const AppShell = () => {
  const { currentTheme } = usePlayer();
  const bg = getThemeBg(currentTheme);

  return (
    <div className="app-container">
      {/* Centered Mobile Device Frame (Desktop max width 440px, full viewport on mobile) */}
      <main 
        className="mobile-device-shell"
        style={{ backgroundColor: bg }}
      >
        {/* Active Screen Viewport */}
        <div 
          className="mobile-screen-content"
          style={{ backgroundColor: bg }}
        >
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/instructions" element={<InstructionsScreen />} />
            <Route path="/levels" element={<LevelSelectScreen />} />
            <Route path="/game/:difficulty/:levelId" element={<GameplayScreen />} />
            <Route path="/complete/:difficulty/:levelId" element={<LevelCompleteScreen />} />
            <Route path="/shop/bottles" element={<ShopBottlesScreen />} />
            <Route path="/shop/tubes" element={<ShopTubesScreen />} />
            <Route path="/daily" element={<DailyChallengesScreen />} />
            <Route path="/rewards" element={<DailyRewardsScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export const App = () => {
  return (
    <ErrorBoundary>
      <PlayerProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </PlayerProvider>
    </ErrorBoundary>
  );
};

export default App;
