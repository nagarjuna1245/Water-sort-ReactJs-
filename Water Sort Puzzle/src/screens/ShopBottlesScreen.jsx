import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Search, Wine, TestTube } from 'lucide-react';
import { Header } from '../components/common/Header';
import { BottleRenderer } from '../components/containers/BottleRenderer';
import { usePlayer } from '../context/PlayerContext';
import { playTapSound, playPurchaseSound, playErrorSound } from '../utils/audio';
import { BOTTLES_CATALOG } from '../game/catalogData';
import { ShopBackdrop } from '../components/shop/ShopBackdrop';

/**
 * SCREEN 6 — SHOP / BOTTLES
 * Real-time dynamic shop for Bottle Skins:
 * Default (0), Ocean (100), Pastel (150), Galaxy (200), Leaf (250), Cherry (300).
 */
export const ShopBottlesScreen = () => {
  const navigate = useNavigate();
  const { 
    coins, 
    currentBottle, 
    ownedBottles, 
    buyBottle, 
    equipBottle, 
    soundEnabled 
  } = usePlayer();

  const [pendingBottle, setPendingBottle] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [search, setSearch] = useState('');

  const getRarityLabel = (price) => {
    if (price === 0) return { label: 'Free', cls: 'rarity-free', glow: '#10B981' };
    if (price <= 500) return { label: 'Common', cls: 'rarity-common', glow: '#3B82F6' };
    if (price <= 1000) return { label: 'Rare', cls: 'rarity-rare', glow: '#8B5CF6' };
    if (price <= 1500) return { label: 'Epic', cls: 'rarity-epic', glow: '#F97316' };
    return { label: 'Legendary', cls: 'rarity-legendary', glow: '#F59E0B' };
  };

  const filteredBottles = useMemo(() => {
    if (!search.trim()) return BOTTLES_CATALOG;
    const q = search.toLowerCase();
    return BOTTLES_CATALOG.filter(b =>
      b.name.toLowerCase().includes(q) || (b.desc || '').toLowerCase().includes(q)
    );
  }, [search]);

  const ownedCount = ownedBottles.length;

  const handleBottleClick = (bottle) => {
    const isOwned = ownedBottles.some(b => b.toLowerCase() === bottle.skin.toLowerCase());
    if (isOwned) {
      playTapSound(soundEnabled);
      equipBottle(bottle.skin);
    } else {
      if (coins < bottle.price) {
        playErrorSound(soundEnabled);
        setToastMessage('Not enough coins! 🪙');
        setTimeout(() => setToastMessage(null), 2000);
      } else {
        playTapSound(soundEnabled);
        setPendingBottle(bottle);
      }
    }
  };

  const handleConfirmPurchase = () => {
    if (!pendingBottle) return;
    buyBottle(pendingBottle.skin, pendingBottle.price);
    playPurchaseSound(soundEnabled);
    setPendingBottle(null);
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
            className="segment-btn active"
            onClick={() => {}}
          >
            <Wine size={15} />
            Bottles
          </button>
          <button 
            className="segment-btn"
            onClick={() => {
              playTapSound(soundEnabled);
              navigate('/shop/tubes');
            }}
          >
            <TestTube size={15} />
            Tubes
          </button>
        </div>

        {/* Section Header */}
        <div className="shop-section-header">
          <h2 className="shop-section-title" style={{ margin: 0 }}>
            <span className="title-text">Bottles</span>
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
            placeholder="Search bottles..."
          />
        </div>

        {/* Bottle Grid */}
        <div className="shop-grid-2col">
          {filteredBottles.map((bottle) => {
            const isEquipped = currentBottle.toLowerCase() === bottle.skin.toLowerCase();
            const isOwned = ownedBottles.some(b => b.toLowerCase() === bottle.skin.toLowerCase());
            const rarity = getRarityLabel(bottle.price);

            return (
              <div
                key={bottle.id}
                className={`shop-card ${isEquipped ? 'shop-card-selected' : ''}`}
                style={{ '--rc': rarity.glow }}
                onClick={() => handleBottleClick(bottle)}
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
                  <BottleRenderer
                    skin={bottle.skin}
                    layers={bottle.layers}
                    height={88}
                    width={36}
                  />
                </div>

                {/* Info */}
                <div className="shop-item-info">
                  <span className="shop-item-name" style={{ fontSize: 11, lineHeight: 1.2 }}>{bottle.name}</span>
                  {isEquipped ? (
                    <span className="shop-selected-label">Selected</span>
                  ) : isOwned ? (
                    <span className="shop-available-label">Equip</span>
                  ) : (
                    <div className="shop-price-tag">
                      <span className="coin-mini-circle">🪙</span>
                      <span>{bottle.price}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredBottles.length === 0 && (
          <div className="shop-empty">
            <span style={{ fontSize: 26, display: 'block', marginBottom: 6 }}>🔍</span>
            No bottles match your search
          </div>
        )}
      </div>

      {/* Buy Confirmation Modal */}
      {pendingBottle && (
        <div className="shop-modal-veil" onClick={() => setPendingBottle(null)}>
          <div className="shop-modal" onClick={e => e.stopPropagation()}>
            <div className="shop-modal-glow" />
            <div className="shop-modal-preview" style={{ width: 44, height: 104 }}>
              <BottleRenderer skin={pendingBottle.skin} layers={pendingBottle.layers} height={104} width={44} />
            </div>
            <h3 className="shop-modal-title">Buy {pendingBottle.name}?</h3>
            <p className="shop-modal-desc">{pendingBottle.desc}</p>
            <div className="shop-modal-price">
              <span>🪙</span>
              <span>{pendingBottle.price} coins</span>
            </div>
            <div className="shop-modal-actions">
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setPendingBottle(null)}>Cancel</button>
              <button className="btn-primary" style={{ flex: 1 }} onClick={handleConfirmPurchase}>Buy</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ShopBottlesScreen;
