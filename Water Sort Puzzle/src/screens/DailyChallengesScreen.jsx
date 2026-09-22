import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Trophy, Zap, Star, Play, Gift, Clock, Check, Flame } from 'lucide-react';
import { Header } from '../components/common/Header';
import { usePlayer } from '../context/PlayerContext';
import { playTapSound, playPurchaseSound, playWinSound } from '../utils/audio';

/**
 * SCREEN 8 — DAILY CHALLENGES
 * Real-time gameplay-driven challenge progress, live midnight countdown timer,
 * dynamic local date, claimable coin rewards, and streak tracking.
 */
export const DailyChallengesScreen = () => {
  const navigate = useNavigate();
  const { 
    dailyChallenges, 
    streak, 
    claimDailyReward, 
    watchAdDaily, 
    soundEnabled,
    coins 
  } = usePlayer();

  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  // Live countdown to local midnight
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diffMs = Math.max(0, midnight.getTime() - now.getTime());
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${mins}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 30000);
    return () => clearInterval(interval);
  }, []);

  // Format today's real date
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const challenges = [
    {
      id: 1,
      title: 'Complete 3 levels',
      icon: Trophy,
      current: Math.min(3, dailyChallenges.levelsCompletedToday || 0),
      total: 3,
      reward: 50,
      isCompleted: (dailyChallenges.levelsCompletedToday || 0) >= 3,
      isClaimed: !!dailyChallenges.claimed?.[1],
    },
    {
      id: 2,
      title: 'Complete a level in < 15 moves',
      icon: Zap,
      current: dailyChallenges.movesUnder15Achieved ? 1 : 0,
      total: 1,
      reward: 100,
      isCompleted: !!dailyChallenges.movesUnder15Achieved,
      isClaimed: !!dailyChallenges.claimed?.[2],
    },
    {
      id: 3,
      title: 'Complete Level 5',
      icon: Star,
      current: dailyChallenges.completedLevel5Today ? 1 : 0,
      total: 1,
      reward: 150,
      isCompleted: !!dailyChallenges.completedLevel5Today,
      isClaimed: !!dailyChallenges.claimed?.[3],
    },
    {
      id: 4,
      title: 'Watch 1 demo reward video',
      icon: Play,
      current: dailyChallenges.adWatchedToday ? 1 : 0,
      total: 1,
      reward: 50,
      isCompleted: !!dailyChallenges.adWatchedToday,
      isClaimed: !!dailyChallenges.claimed?.[4],
      isAd: true,
    },
  ];

  const handleClaim = (ch) => {
    if (!ch.isCompleted || ch.isClaimed) return;
    playWinSound(soundEnabled);
    claimDailyReward(ch.id, ch.reward);
  };

  const handleWatchAd = () => {
    if (dailyChallenges.adWatchedToday || isWatchingAd) return;
    setIsWatchingAd(true);
    playTapSound(soundEnabled);
    setTimeout(() => {
      setIsWatchingAd(false);
      watchAdDaily();
      playPurchaseSound(soundEnabled);
    }, 700);
  };

  return (
    <div className="daily-screen-layout">
      {/* Header with Coin Counter */}
      <Header
        title="Daily Challenges"
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

      <div className="daily-screen-body">
        {/* Dynamic Date & Reset Timer Card */}
        <div className="daily-date-card">
          <div className="date-card-left">
            <div className="date-icon-circle">
              <Calendar size={18} strokeWidth={2} color="#635BFF" />
            </div>
            <span className="date-display-text">{todayFormatted}</span>
          </div>

          <div className="reset-timer-pill">
            <Clock size={12} strokeWidth={2} />
            <span>Resets in {timeLeft || '24h'}</span>
          </div>
        </div>

        {/* Streak Ribbon Card */}
        <div style={{
          background: 'linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 100%)',
          border: '1.5px solid #FFEDD5',
          borderRadius: 16,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#FFEDD5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Flame size={20} strokeWidth={2.2} color="#F97316" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#172554' }}>
                {streak.currentStreak} Day Streak
              </div>
              <div style={{ fontSize: 11, color: '#64748B' }}>
                Best: {streak.bestStreak} days
              </div>
            </div>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#EA580C' }}>
            Active Today 🔥
          </span>
        </div>

        {/* 4 Clean Challenge Cards */}
        <div className="challenges-list">
          {challenges.map((ch) => {
            const IconComp = ch.icon;
            const progressPercent = Math.min(100, (ch.current / ch.total) * 100);

            return (
              <div 
                key={ch.id} 
                className="challenge-card"
              >
                <div className="challenge-card-top">
                  <div className="challenge-info-wrap">
                    <div className="challenge-icon-box">
                      <IconComp size={18} strokeWidth={2} color="#635BFF" />
                    </div>
                    <div className="challenge-texts">
                      <h3 className="challenge-title">
                        {ch.title}
                      </h3>
                      <span className="challenge-progress-text">
                        Progress: {ch.current} / {ch.total}
                      </span>
                    </div>
                  </div>

                  {/* Actions / Badges */}
                  <div>
                    {ch.isClaimed ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        background: '#F1F5F9',
                        color: '#64748B',
                        padding: '6px 10px',
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 700,
                      }}>
                        <Check size={13} strokeWidth={2.5} />
                        <span>Claimed</span>
                      </div>
                    ) : ch.isCompleted ? (
                      <button
                        onClick={() => handleClaim(ch)}
                        style={{
                          background: '#22C55E',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)',
                        }}
                      >
                        <span>Claim</span>
                        <span>+{ch.reward}</span>
                      </button>
                    ) : ch.isAd ? (
                      <button
                        onClick={handleWatchAd}
                        disabled={isWatchingAd}
                        style={{
                          background: '#635BFF',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {isWatchingAd ? 'Playing...' : 'Watch Demo'}
                      </button>
                    ) : (
                      <div className="challenge-reward-badge">
                        <span className="coin-mini-circle">🪙</span>
                        <span className="reward-num">+{ch.reward}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Track */}
                <div className="challenge-progress-track">
                  <div 
                    className="challenge-progress-fill" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bonus Card */}
        <div className="daily-bonus-card">
          <div className="bonus-icon-box">
            <Gift size={24} strokeWidth={1.8} color="#F59E0B" />
          </div>
          <p className="bonus-card-text">
            Play every day to maintain your streak and earn rewards!
          </p>
        </div>
      </div>

    </div>
  );
};

export default DailyChallengesScreen;
