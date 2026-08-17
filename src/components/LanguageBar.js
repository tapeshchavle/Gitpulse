'use client';

import { LANGUAGE_COLORS } from '../lib/github';
import { Code2 } from 'lucide-react';

export default function LanguageBar({ langPercentages }) {
  if (!langPercentages || langPercentages.length === 0) return null;

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Code2 size={20} color="var(--primary)" />
        <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Primary Programming Languages Breakdown</h2>
      </div>

      {/* Multi-segment Progress Bar */}
      <div style={{
        height: '14px',
        width: '100%',
        borderRadius: '7px',
        overflow: 'hidden',
        display: 'flex',
        background: 'rgba(255, 255, 255, 0.05)',
        marginBottom: '16px',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {langPercentages.map((item) => {
          const color = LANGUAGE_COLORS[item.language] || '#9CA3AF';
          return (
            <div
              key={item.language}
              title={`${item.language}: ${item.percentage}% (${item.count} repos)`}
              style={{
                width: `${item.percentage}%`,
                height: '100%',
                backgroundColor: color,
                transition: 'width 0.5s ease',
              }}
            />
          );
        })}
      </div>

      {/* Language Chips & Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {langPercentages.map((item) => {
          const color = LANGUAGE_COLORS[item.language] || '#9CA3AF';
          return (
            <div
              key={item.language}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(15, 23, 42, 0.6)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  display: 'inline-block',
                }}
              />
              <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{item.language}</span>
              <span style={{ color: 'var(--text-subtle)', marginLeft: '4px' }}>{item.percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
