'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GitBranch, ShieldCheck, Key, Code2, ArrowUpRight, BarChart3, GitCompare } from 'lucide-react';
import TokenModal from './TokenModal';

export default function Navbar({ activeTab, setActiveTab }) {
  const [showTokenModal, setShowTokenModal] = useState(false);

  return (
    <>
      <nav className="glass-panel" style={{
        margin: '16px 24px 24px 24px',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '16px',
        zIndex: 100,
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
          }}>
            <GitBranch size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #FFFFFF 0%, #C7D2FE 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              GitPulse
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', fontWeight: '600', letterSpacing: '0.05em' }}>
              GITHUB REST API DASHBOARD
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(15, 23, 42, 0.6)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={activeTab === 'dashboard' ? 'glow-btn' : 'outline-btn'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <BarChart3 size={16} /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={activeTab === 'compare' ? 'glow-btn' : 'outline-btn'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <GitCompare size={16} /> Compare Repos
          </button>
        </div>

        {/* Developer Program Indicator & PAT Token Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="badge badge-emerald" title="Registered Support Email: work@tapesh.me">
            <ShieldCheck size={14} /> Dev Program Ready
          </div>

          <button
            onClick={() => setShowTokenModal(true)}
            className="outline-btn"
            style={{ fontSize: '0.8rem', padding: '8px 12px' }}
          >
            <Key size={14} /> API Token
          </button>
        </div>
      </nav>

      {showTokenModal && (
        <TokenModal onClose={() => setShowTokenModal(false)} />
      )}
    </>
  );
}
