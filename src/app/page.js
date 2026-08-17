'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import LanguageBar from '../components/LanguageBar';
import RepoCard from '../components/RepoCard';
import RepoDetailsModal from '../components/RepoDetailsModal';
import RepoComparison from '../components/RepoComparison';
import { fetchUserProfile, fetchUserRepos, computeAggregatedLanguages } from '../lib/github';
import { Search, Filter, ShieldCheck, ArrowUpRight, FolderGit2, AlertCircle } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [username, setUsername] = useState('tapeshchavle');
  const [searchUser, setSearchUser] = useState('tapeshchavle');
  
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filtering & Sorting State
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('All');
  const [sortBy, setSortBy] = useState('updated');
  
  // Modal State
  const [selectedRepo, setSelectedRepo] = useState(null);

  const loadUserData = async (targetUser) => {
    setLoading(true);
    setError('');
    try {
      const userProfile = await fetchUserProfile(targetUser);
      const userRepos = await fetchUserRepos(targetUser, 'updated', 100);
      
      setProfile(userProfile);
      setRepos(userRepos);
      
      const computed = computeAggregatedLanguages(userRepos);
      setStats(computed);
    } catch (err) {
      setError(err.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData(username);
  }, [username]);

  const handleSearch = (newUsername) => {
    setUsername(newUsername);
  };

  // Filter Repositories logic
  const filteredRepos = repos.filter((repo) => {
    const matchesSearch = repo.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(filterQuery.toLowerCase()));
    
    const matchesLang = selectedLang === 'All' || repo.language === selectedLang;
    
    return matchesSearch && matchesLang;
  }).sort((a, b) => {
    if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
    if (sortBy === 'forks') return b.forks_count - a.forks_count;
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  const availableLanguages = ['All', ...new Set(repos.map(r => r.language).filter(Boolean))];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Sticky Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main App Container */}
      <main style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '0 24px 60px 24px', flex: 1 }}>
        {activeTab === 'dashboard' ? (
          <>
            {/* User Profile Header */}
            {loading ? (
              <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Fetching profile data for @{username} from GitHub REST API...
              </div>
            ) : error ? (
              <div className="glass-panel" style={{ padding: '40px', color: '#FB7185', textAlign: 'center' }}>
                <AlertCircle size={32} style={{ marginBottom: '12px' }} />
                <h3>{error}</h3>
                <button
                  onClick={() => loadUserData('tapeshchavle')}
                  className="glow-btn"
                  style={{ marginTop: '16px' }}
                >
                  Reset to @tapeshchavle
                </button>
              </div>
            ) : (
              <>
                <ProfileHeader
                  profile={profile}
                  stats={stats}
                  searchUser={searchUser}
                  setSearchUser={setSearchUser}
                  onSearch={handleSearch}
                />

                {/* Aggregate Language Percentage Bar */}
                {stats && <LanguageBar langPercentages={stats.langPercentages} />}

                {/* Repositories Section & Controls */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FolderGit2 size={22} color="var(--primary)" />
                      <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>
                        Repositories ({filteredRepos.length})
                      </h2>
                    </div>

                    {/* Filter & Sort Toolbar */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {/* Search Filter */}
                      <div style={{ position: 'relative', width: '220px' }}>
                        <input
                          type="text"
                          value={filterQuery}
                          onChange={(e) => setFilterQuery(e.target.value)}
                          placeholder="Filter repos..."
                          style={{
                            width: '100%',
                            padding: '8px 12px 8px 34px',
                            borderRadius: '8px',
                            background: 'var(--bg-input)',
                            border: '1px solid var(--border-color)',
                            fontSize: '0.8rem',
                            outline: 'none',
                          }}
                        />
                        <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
                      </div>

                      {/* Language Selector */}
                      <select
                        value={selectedLang}
                        onChange={(e) => setSelectedLang(e.target.value)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          background: 'var(--bg-input)',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.8rem',
                          outline: 'none',
                        }}
                      >
                        {availableLanguages.map((lang) => (
                          <option key={lang} value={lang}>{lang === 'All' ? 'All Languages' : lang}</option>
                        ))}
                      </select>

                      {/* Sort Selector */}
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          background: 'var(--bg-input)',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.8rem',
                          outline: 'none',
                        }}
                      >
                        <option value="updated">Sort: Recently Updated</option>
                        <option value="stars">Sort: Most Stars</option>
                        <option value="forks">Sort: Most Forks</option>
                      </select>
                    </div>
                  </div>

                  {/* Repository Cards Grid */}
                  {filteredRepos.length > 0 ? (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                      gap: '20px',
                    }}>
                      {filteredRepos.map((repo) => (
                        <RepoCard
                          key={repo.id}
                          repo={repo}
                          onSelectRepo={(r) => setSelectedRepo(r)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-subtle)' }}>
                      No repositories match your filter criteria.
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          /* Side-by-Side Repo Comparison Tab */
          <RepoComparison />
        )}

        {/* GitHub Developer Program Information Banner */}
        <div className="glass-panel" style={{
          marginTop: '40px',
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.08) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <ShieldCheck size={24} color="#34D399" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>
                GitHub Developer Program Member Registration
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Deploy this GitPulse app to Vercel (subdomain) and register at GitHub to receive your profile badge! Support email: <strong>work@tapesh.me</strong>
              </p>
            </div>
          </div>

          <a
            href="https://github.com/developer/register?account=tapeshchavle"
            target="_blank"
            rel="noreferrer"
            className="glow-btn"
            style={{ fontSize: '0.85rem' }}
          >
            Register on GitHub <ArrowUpRight size={16} />
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.8rem',
        color: 'var(--text-subtle)',
      }}>
        GitPulse — Built with Next.js & GitHub REST API v3 for @tapeshchavle
      </footer>

      {/* Repository Deep Dive Modal */}
      {selectedRepo && (
        <RepoDetailsModal
          repo={selectedRepo}
          onClose={() => setSelectedRepo(null)}
        />
      )}
    </div>
  );
}
