'use client';

import { useState } from 'react';
import { GitCompare, Search, Star, GitFork, AlertCircle, Shield, Clock, Layers, ExternalLink, ArrowRight } from 'lucide-react';
import { fetchRepoDetails, LANGUAGE_COLORS } from '../lib/github';

export default function RepoComparison() {
  const [repoAQuery, setRepoAQuery] = useState('facebook/react');
  const [repoBQuery, setRepoBQuery] = useState('vuejs/core');
  
  const [repoA, setRepoA] = useState(null);
  const [repoB, setRepoB] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCompare = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const partsA = repoAQuery.trim().split('/');
      const partsB = repoBQuery.trim().split('/');

      if (partsA.length !== 2 || partsB.length !== 2) {
        throw new Error('Please enter repositories in the format owner/repository (e.g. facebook/react)');
      }

      const [dataA, dataB] = await Promise.all([
        fetchRepoDetails(partsA[0], partsA[1]),
        fetchRepoDetails(partsB[0], partsB[1]),
      ]);

      setRepoA(dataA);
      setRepoB(dataB);
    } catch (err) {
      setError(err.message || 'Failed to compare repositories');
    } finally {
      setLoading(false);
    }
  };

  const setPreset = (a, b) => {
    setRepoAQuery(a);
    setRepoBQuery(b);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <GitCompare size={24} color="var(--primary)" />
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Side-by-Side Repository Comparison Tool</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Compare metrics, activity, stargazers, and forks between any two GitHub repositories.
          </p>
        </div>
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleCompare} style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '14px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Repository A (owner/repo)
            </label>
            <input
              type="text"
              value={repoAQuery}
              onChange={(e) => setRepoAQuery(e.target.value)}
              placeholder="e.g. facebook/react"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Repository B (owner/repo)
            </label>
            <input
              type="text"
              value={repoBQuery}
              onChange={(e) => setRepoBQuery(e.target.value)}
              placeholder="e.g. vuejs/core"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <button type="submit" className="glow-btn" style={{ padding: '12px 24px' }}>
            <Search size={18} /> Compare
          </button>
        </div>
      </form>

      {/* Preset Comparison Shortcuts */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '28px', fontSize: '0.8rem' }}>
        <span style={{ color: 'var(--text-subtle)', fontWeight: '600' }}>Presets:</span>
        <button
          onClick={() => setPreset('vercel/next.js', 'nuxt/nuxt')}
          className="outline-btn"
          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
        >
          Next.js vs Nuxt.js
        </button>
        <button
          onClick={() => setPreset('facebook/react', 'vuejs/core')}
          className="outline-btn"
          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
        >
          React vs Vue
        </button>
        <button
          onClick={() => setPreset('expressjs/express', 'fastify/fastify')}
          className="outline-btn"
          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
        >
          Express vs Fastify
        </button>
      </div>

      {error && (
        <div style={{ padding: '14px 18px', borderRadius: '10px', background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.3)', color: '#FB7185', marginBottom: '24px', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          Fetching comparison data from GitHub REST API...
        </div>
      )}

      {repoA && repoB && !loading && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', background: 'rgba(15, 23, 42, 0.6)' }}>
                <th style={{ padding: '16px 20px', color: 'var(--text-subtle)', fontWeight: '700', width: '30%' }}>Metric</th>
                <th style={{ padding: '16px 20px', color: '#818CF8', fontWeight: '800', width: '35%', fontSize: '1.05rem' }}>
                  <a href={repoA.html_url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {repoA.full_name} <ExternalLink size={14} />
                  </a>
                </th>
                <th style={{ padding: '16px 20px', color: '#34D399', fontWeight: '800', width: '35%', fontSize: '1.05rem' }}>
                  <a href={repoB.html_url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {repoB.full_name} <ExternalLink size={14} />
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Stars */}
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 20px', color: 'var(--text-muted)', fontWeight: '600' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Star size={16} color="#FBBF24" /> Stargazers</span>
                </td>
                <td style={{ padding: '14px 20px', fontWeight: '700', color: repoA.stargazers_count >= repoB.stargazers_count ? '#FBBF24' : 'var(--text-main)' }}>
                  {repoA.stargazers_count.toLocaleString()} {repoA.stargazers_count > repoB.stargazers_count && '🏆'}
                </td>
                <td style={{ padding: '14px 20px', fontWeight: '700', color: repoB.stargazers_count >= repoA.stargazers_count ? '#FBBF24' : 'var(--text-main)' }}>
                  {repoB.stargazers_count.toLocaleString()} {repoB.stargazers_count > repoA.stargazers_count && '🏆'}
                </td>
              </tr>

              {/* Forks */}
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 20px', color: 'var(--text-muted)', fontWeight: '600' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><GitFork size={16} color="#60A5FA" /> Forks</span>
                </td>
                <td style={{ padding: '14px 20px', fontWeight: '700' }}>
                  {repoA.forks_count.toLocaleString()}
                </td>
                <td style={{ padding: '14px 20px', fontWeight: '700' }}>
                  {repoB.forks_count.toLocaleString()}
                </td>
              </tr>

              {/* Open Issues */}
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 20px', color: 'var(--text-muted)', fontWeight: '600' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><AlertCircle size={16} color="#FB7185" /> Open Issues & PRs</span>
                </td>
                <td style={{ padding: '14px 20px' }}>
                  {repoA.open_issues_count.toLocaleString()}
                </td>
                <td style={{ padding: '14px 20px' }}>
                  {repoB.open_issues_count.toLocaleString()}
                </td>
              </tr>

              {/* Primary Language */}
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 20px', color: 'var(--text-muted)', fontWeight: '600' }}>Language</td>
                <td style={{ padding: '14px 20px', fontWeight: '600', color: LANGUAGE_COLORS[repoA.language] || '#FFF' }}>
                  {repoA.language || 'N/A'}
                </td>
                <td style={{ padding: '14px 20px', fontWeight: '600', color: LANGUAGE_COLORS[repoB.language] || '#FFF' }}>
                  {repoB.language || 'N/A'}
                </td>
              </tr>

              {/* License */}
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 20px', color: 'var(--text-muted)', fontWeight: '600' }}>License</td>
                <td style={{ padding: '14px 20px' }}>
                  {repoA.license?.name || 'No License'}
                </td>
                <td style={{ padding: '14px 20px' }}>
                  {repoB.license?.name || 'No License'}
                </td>
              </tr>

              {/* Last Updated */}
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 20px', color: 'var(--text-muted)', fontWeight: '600' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> Last Push</span>
                </td>
                <td style={{ padding: '14px 20px' }}>
                  {new Date(repoA.pushed_at).toLocaleDateString()}
                </td>
                <td style={{ padding: '14px 20px' }}>
                  {new Date(repoB.pushed_at).toLocaleDateString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
