'use client';

import { useState, useEffect } from 'react';
import { Key, CheckCircle, Trash2, X, Info } from 'lucide-react';
import { getStoredToken, setStoredToken } from '../lib/github';

export default function TokenModal({ onClose }) {
  const [tokenInput, setTokenInput] = useState('');
  const [hasToken, setHasToken] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const existing = getStoredToken();
    if (existing) {
      setTokenInput(existing);
      setHasToken(true);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setStoredToken(tokenInput.trim());
    setHasToken(!!tokenInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setStoredToken('');
    setTokenInput('');
    setHasToken(false);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '480px',
        padding: '28px',
        background: '#0F172A',
        position: 'relative',
      }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '18px', right: '18px', color: 'var(--text-subtle)' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Key size={22} color="var(--primary)" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>GitHub Personal Access Token</h3>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>
          GitHub REST API limits unauthenticated requests to 60/hr. Adding a Personal Access Token increases your rate limit to <strong>5,000 requests/hr</strong>.
        </p>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Personal Access Token (classic or fine-grained)
            </label>
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="ghp_..."
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', background: 'rgba(99, 102, 241, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', color: '#A5B4FC' }}>
            <Info size={16} />
            <span>Tokens are stored locally in your browser session only.</span>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            {hasToken && (
              <button
                type="button"
                onClick={handleClear}
                className="outline-btn"
                style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244,63,94,0.3)' }}
              >
                <Trash2 size={16} /> Clear Token
              </button>
            )}
            <button type="submit" className="glow-btn">
              {savedSuccess ? <CheckCircle size={16} /> : <Key size={16} />}
              {savedSuccess ? 'Saved!' : 'Save Token'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
