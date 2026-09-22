import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Search, Wine, TestTube } from 'lucide-react';
import { Header } from '../components/common/Header';
import { TubeRenderer } from '../components/containers/TubeRenderer';
import { usePlayer } from '../context/PlayerContext';
import { playTapSound, playPurchaseSound, playErrorSound } from '../utils/audio';
import { TUBES_CATALOG } from '../game/catalogData';
import { ShopBackdrop } from '../components/shop/ShopBackdrop';

/**
 * SCREEN 7 — SHOP / TUBES
 * Dedicated TEST-TUBE customization system:
 * Default Tube (0), Rounded Tube (100), Crystal Tube (150),
 * Rainbow Tube (200), Bubble Tube (250), Tall Tube (300).
 */
export const ShopTubesScreen = () => {
  const navigate = useNavigate();
  const { 
    coins, 
    currentTube, 
    ownedTubes, 
    buyTube, 
    equipTube, 
    soundEnabled 
  } = usePlayer();

  const [pendingTube, setPendingTube] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [search, setSearch] = useState('');

  const getRarityLabel = (price) => {
    if (price === 0) return { label: 'Free', cls: 'rarity-free', glow: '#10B981' };
    if (price <= 500) return { label: 'Common', cls: 'rarity-common', glow: '#3B82F6' };
    if (price <= 1000) return { label: 'Rare', cls: 'rarity-rare', glow: '#8B5CF6' };
    if (price <= 1500) return { label: 'Epic', cls: 'rarity-epic', glow: '#F97316' };
    return { label: 'Legendary', cls: 'rarity-legendary', glow: '#F59E0B' };
  };

  const filteredTubes = useMemo(() => {
    if (!search.trim()) return TUBES_CATALOG;
    const q = search.toLowerCase();
    return TUBES_CATALOG.filter(t =>
      t.name.toLowerCase().includes(q) || (t.desc || '').toLowerCase().includes(q)
    );
  }, [search]);

  const ownedCount = ownedTubes.length;

  const handleTubeClick = (tube) => {
    const isOwned = ownedTubes.some(t => t.toLowerCase() === tube.styleType.toLowerCase());
    if (isOwned) {
      playTapSound(soundEnabled);
      equipTube(tube.styleType);
    } else {
      if (coins < tube.price) {
        playErrorSound(soundEnabled);
        setToastMessage('Not enough coins! 🪙');
        setTimeout(() => setToastMessage(null), 2000);
      } else {
        playTapSound(soundEnabled);
        setPendingTube(tube);
      }
    }
  };

  const handleConfirmPurchase = () => {
    if (!pendingTube) return;
    buyTube(pendingTube.styleType, pendingTube.price);
    playPurchaseSound(soundEnabled);
    setPendingTube(null);
  };

  return (
    <div className="shop-screen-layout">
      <ShopBackdrop />

      {/* Toast */}
      {toastMessage && (
        <div className="shop-toast" role="status">
          <span>🪙</span>
          <span>{toastMessage.replace(' 🪙', '')}</span>
        </div>
      )}

      {/* Header */}
      <Header
        title="Shop"
        onBack={() => {
          playTapSound(soundEnabled);
          navigate('/');
        }}
        rightContent={
          <div className="coin-pill">
            <span className="coin-icon">🪙</span>
            <span>{coins}</span>
          </div>
        }
      />

      <div className="shop-screen-body">
        {/* Category Tabs */}
        <div className="segmented-control shop-tabs">
          <button 
            className="segment-btn"
            onClick={() => {
              playTapSound(soundEnabled);
              navigate('/shop/bottles');
            }}
          >
            <Wine size={15} />
            Bottles
          </button>
          <button 
            className="segment-btn active"
            onClick={() => {}}
          >
            <TestTube size={15} />
            Tubes
          </button>
        </div>

        {/* Section Header */}
        <div className="shop-section-header">
          <h2 className="shop-section-title" style={{ margin: 0 }}>
            <span className="title-text">Tubes</span>
          </h2>
          <span className="shop-owned-chip">
            <Check size={12} strokeWidth={2.5} />
            {ownedCount}/40 owned
          </span>
        </div>

        {/* Search */}
        <div className="shop-search">
          <Search size={15} className="shop-search-icon" color="#9AA3BC" />
          <input
            className="shop-search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tubes..."
          />
        </div>

        {/* Tube Grid */}
        <div className="shop-grid-2col">
          {filteredTubes.map((tube) => {
            const isEquipped = currentTube.toLowerCase() === tube.styleType.toLowerCase();
            const isOwned = ownedTubes.some(t => t.toLowerCase() === tube.styleType.toLowerCase());
            const rarity = getRarityLabel(tube.price);

            return (
              <div
                key={tube.id}
                className={`shop-card ${isEquipped ? 'shop-card-selected' : ''}`}
                style={{ '--rc': rarity.glow }}
                onClick={() => handleTubeClick(tube)}
                role="button"
                tabIndex={0}
              >
                {isEquipped && (
                  <div className="card-selected-badge">
                    <Check size={12} strokeWidth={2.5} color="#FFFFFF" />
                  </div>
                )}

                {/* Rarity badge */}
                <div className={`shop-rarity-badge ${rarity.cls}`}>
                  {rarity.label}
                </div>

                {/* Silhouette Preview */}
                <div className="container-preview-pod">
                  <TubeRenderer
                    styleType={tube.styleType}
                    layers={tube.layers}
                    height={90}
                    width={32}
                  />
                </div>

                {/* Info */}
                <div className="shop-item-info">
                  <span className="shop-item-name" style={{ fontSize: 11, lineHeight: 1.2 }}>{tube.name}</span>
                  {isEquipped ? (
                    <span className="shop-selected-label">Selected</span>
                  ) : isOwned ? (
                    <span className="shop-available-label">Equip</span>
                  ) : (
                    <div className="shop-price-tag">
                      <span className="coin-mini-circle">🪙</span>
                      <span>{tube.price}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredTubes.length === 0 && (
          <div className="shop-empty">
            <span style={{ fontSize: 26, display: 'block', marginBottom: 6 }}>🔍</span>
            No tubes match your search
          </div>
        )}
      </div>

      {/* Buy Confirmation Modal */}
      {pendingTube && (
        <div className="shop-modal-veil" onClick={() => setPendingTube(null)}>
          <div className="shop-modal" onClick={e => e.stopPropagation()}>
            <div className="shop-modal-glow" />
            <div className="shop-modal-preview" style={{ width: 40, height: 106 }}>
              <TubeRenderer styleType={pendingTube.styleType} layers={pendingTube.layers} height={106} width={40} />
            </div>
            <h3 className="shop-modal-title">Buy {pendingTube.name}?</h3>
            <p className="shop-modal-desc">{pendingTube.desc}</p>
            <div className="shop-modal-price">
              <span>🪙</span>
              <span>{pendingTube.price} coins</span>
            </div>
            <div className="shop-modal-actions">
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setPendingTube(null)}>Cancel</button>
              <button className="btn-primary" style={{ flex: 1 }} onClick={handleConfirmPurchase}>Buy</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ShopTubesScreen;
