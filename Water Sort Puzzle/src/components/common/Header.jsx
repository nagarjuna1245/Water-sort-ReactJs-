import React from 'react';
import { ArrowLeft, Pause, X } from 'lucide-react';

export const Header = ({ 
  title, 
  onBack, 
  rightContent, 
  showBack = true,
  backIcon = 'arrow' // 'arrow' or 'close'
}) => {
  return (
    <header className="screen-header">
      <div className="header-left">
        {showBack && (
          <button 
            className="icon-btn" 
            onClick={onBack}
            aria-label={backIcon === 'close' ? 'Close' : 'Go Back'}
          >
            {backIcon === 'close' ? (
              <X size={20} strokeWidth={2} />
            ) : (
              <ArrowLeft size={20} strokeWidth={2} />
            )}
          </button>
        )}
      </div>

      <h1 className="header-title">{title}</h1>

      <div className="header-right">
        {rightContent || <div style={{ width: 44 }} />}
      </div>
    </header>
  );
};
