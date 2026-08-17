'use client';

import { useState, useEffect } from 'react';
import { X, Star, GitFork, AlertCircle, ExternalLink, Code2, FileText, CheckCircle2, Tag, Calendar, Layers } from 'lucide-react';
import { fetchRepoLanguages, fetchRepoReadme, fetchRepoIssues, LANGUAGE_COLORS } from '../lib/github';

export default function RepoDetailsModal({ repo, onClose }) {
  const [languages, setLanguages] = useState({});
  const [readme, setReadme] = useState('');
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!repo) return;
    setLoading(true);

    const [owner, name] = [repo.owner?.login || repo.full_name.split('/')[0], repo.name];

    Promise.all([
      fetchRepoLanguages(owner, name),
      fetchRepoReadme(owner, name),
      fetchRepoIssues(owner, name, 'open'),
    ])
      .then(([langs, readmeText, repoIssues]) => {
        setLanguages(langs || {});
        setReadme(readmeText || '');
        setIssues(repoIssues || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [repo]);

  if (!repo) return null;

  // Calculate Language Percentages for this specific repo
  const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
  const langList = Object.entries(languages).map(([lang, bytes]) => ({
    language: lang,
    percentage: Math.round((bytes / (totalBytes || 1)) * 100),
    bytes,
  }));

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '850px',
        maxHeight: '90vh',
        background: '#0B0F17',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>{repo.full_name}</h2>
              <span className="badge badge-primary">{repo.visibility || 'public'}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
              {repo.description || 'No description provided.'}
            </p>
          </div>

          <button onClick={onClose} style={{ color: 'var(--text-subtle)', padding: '4px' }}>
            <X size={22} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: 'rgba(15, 23, 42, 0.4)', padding: '0 28px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '14px 18px',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: activeTab === 'overview' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'overview' ? '2px solid var(--primary)' : '2px solid transparent',
            }}
          >
            Overview & Stats
          </button>
          <button
            onClick={() => setActiveTab('readme')}
            style={{
              padding: '14px 18px',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: activeTab === 'readme' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'readme' ? '2px solid var(--primary)' : '2px solid transparent',
            }}
          >
            README.md
          </button>
          <button
            onClick={() => setActiveTab('issues')}
            style={{
              padding: '14px 18px',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: activeTab === 'issues' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'issues' ? '2px solid var(--primary)' : '2px solid transparent',
            }}
          >
            Open Issues ({issues.length})
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '28px', overflowY: 'auto', flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              Loading repository details...
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <div>
                  {/* Quick Stat Badges */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Stargazers</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FBBF24', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Star size={18} /> {repo.stargazers_count}
                      </div>
                    </div>
                    <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Forks</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#60A5FA', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <GitFork size={18} /> {repo.forks_count}
                      </div>
                    </div>
                    <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Open Issues</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FB7185', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <AlertCircle size={18} /> {repo.open_issues_count}
                      </div>
                    </div>
                    <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Default Branch</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#34D399', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Layers size={16} /> {repo.default_branch || 'main'}
                      </div>
                    </div>
                  </div>

                  {/* Language Breakdown */}
                  {langList.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px' }}>Languages Code Composition</h4>
                      <div style={{ height: '12px', borderRadius: '6px', overflow: 'hidden', display: 'flex', marginBottom: '12px' }}>
                        {langList.map((item) => (
                          <div
                            key={item.language}
                            style={{
                              width: `${item.percentage}%`,
                              backgroundColor: LANGUAGE_COLORS[item.language] || '#9CA3AF',
                            }}
                          />
                        ))}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {langList.map((item) => (
                          <span key={item.language} style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            <strong style={{ color: LANGUAGE_COLORS[item.language] || '#FFF' }}>{item.language}</strong>: {item.percentage}%
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Topics */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '10px' }}>Topics</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {repo.topics.map((topic) => (
                          <span key={topic} className="badge badge-primary">
                            <Tag size={10} /> {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <a href={repo.html_url} target="_blank" rel="noreferrer" className="glow-btn">
                      Open on GitHub <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              )}

              {activeTab === 'readme' && (
                <div>
                  {readme ? (
                    <pre style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      padding: '20px',
                      borderRadius: '12px',
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border-color)',
                      maxHeight: '500px',
                      overflowY: 'auto',
                    }}>
                      {readme}
                    </pre>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-subtle)' }}>
                      No README file found for this repository.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'issues' && (
                <div>
                  {issues.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {issues.map((issue) => (
                        <a
                          key={issue.id}
                          href={issue.html_url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'rgba(15, 23, 42, 0.6)',
                            padding: '14px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.06)',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <AlertCircle size={16} color="#FB7185" />
                            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>
                              #{issue.number} {issue.title}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                            by @{issue.user?.login}
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-subtle)' }}>
                      No open issues found!
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
