'use client';

import { Star, GitFork, AlertCircle, ExternalLink, BookOpen, Clock, Lock, Shield } from 'lucide-react';
import { LANGUAGE_COLORS } from '../lib/github';

export default function RepoCard({ repo, onSelectRepo }) {
  const langColor = LANGUAGE_COLORS[repo.language] || '#9CA3AF';
  const updatedDate = new Date(repo.updated_at).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className="glass-panel"
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
      }}
    >
      <div>
        {/* Repo Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <BookOpen size={18} color="var(--primary)" />
            <h3
              onClick={() => onSelectRepo(repo)}
              style={{
                fontSize: '1.05rem',
                fontWeight: '700',
                cursor: 'pointer',
                color: '#818CF8',
                wordBreak: 'break-word',
              }}
            >
              {repo.name}
            </h3>
            {repo.private ? (
              <span className="badge badge-amber"><Lock size={10} /> Private</span>
            ) : (
              <span className="badge badge-emerald">Public</span>
            )}
            {repo.fork && <span className="badge badge-primary">Fork</span>}
          </div>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--text-subtle)', transition: 'color 0.2s' }}
            title="Open on GitHub"
          >
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          marginBottom: '16px',
          lineHeight: '1.45',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '3.6em',
        }}>
          {repo.description || 'No description provided.'}
        </p>
      </div>

      {/* Repo Footer Metrics */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '14px' }}>
          {repo.language && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: langColor }} />
              <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{repo.language}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={14} color="#FBBF24" />
            <span>{repo.stargazers_count}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <GitFork size={14} color="#60A5FA" />
            <span>{repo.forks_count}</span>
          </div>

          {repo.open_issues_count > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={14} color="#FB7185" />
              <span>{repo.open_issues_count}</span>
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.75rem',
          color: 'var(--text-subtle)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} /> Updated {updatedDate}
          </div>

          <button
            onClick={() => onSelectRepo(repo)}
            className="outline-btn"
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            Inspect Details
          </button>
        </div>
      </div>
    </div>
  );
}
