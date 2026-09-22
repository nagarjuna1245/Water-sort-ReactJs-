import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Trophy, Store, BarChart3 } from 'lucide-react';
import { playTapSound } from '../../utils/audio';
import { usePlayer } from '../../context/PlayerContext';

/**
 * Mobile Game Floating Bottom Navigation Bar
 * 4 Tabs: Home | Levels | Shop | Stats
 * Conforms strictly to global mobile design system.
 */
export const BottomNav = ({ activeTab = 'home' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { soundEnabled } = usePlayer();

  // Determine active item if not explicitly provided
  const currentPath = location.pathname;
  const currentTab = activeTab || (
    currentPath === '/' ? 'home' :
    currentPath.startsWith('/levels') ? 'levels' :
    currentPath.startsWith('/shop') ? 'shop' :
    currentPath.startsWith('/profile') ? 'stats' : 'home'
  );

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'levels', label: 'Levels', icon: Trophy, path: '/levels' },
    { id: 'shop', label: 'Shop', icon: Store, path: '/shop/bottles' },
    { id: 'stats', label: 'Stats', icon: BarChart3, path: '/profile' },
  ];

  const handleTabClick = (item) => {
    playTapSound(soundEnabled);
    navigate(item.path);
  };

  return (
    <nav className="mobile-game-bottom-nav" aria-label="Bottom Navigation">
      <div className="bottom-nav-inner">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              className={`game-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleTabClick(item)}
              aria-label={item.label}
            >
              <div className="nav-icon-wrap">
                <IconComponent
                  size={20}
                  strokeWidth={isActive ? 2.4 : 1.8}
                  color={isActive ? '#6D5AE6' : '#93A5C4'}
                />
              </div>
              <span className={`nav-label ${isActive ? 'active' : ''}`}>{item.label}</span>
              {isActive && <span className="nav-active-indicator" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
