'use client';

import { Users, FolderGit2, Star, MapPin, Building, Link2, ExternalLink, Calendar, Award } from 'lucide-react';

export default function ProfileHeader({ profile, stats, searchUser, setSearchUser, onSearch }) {
  if (!profile) return null;

  return (
    <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}>
        {/* User Info & Avatar */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: '1 1 320px' }}>
          <img
            src={profile.avatar_url}
            alt={profile.name || profile.login}
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '24px',
              border: '2px solid rgba(99, 102, 241, 0.4)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                {profile.name || profile.login}
              </h1>
              <span className="badge badge-primary">
                @{profile.login}
              </span>
              <a
                href={`https://github.com/${profile.login}`}
                target="_blank"
                rel="noreferrer"
                className="outline-btn"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                GitHub Profile <ExternalLink size={12} />
              </a>
            </div>

            {profile.bio && (
              <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.95rem', maxWidth: '600px' }}>
                {profile.bio}
              </p>
            )}

            {/* Metadata Chips */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px', fontSize: '0.82rem', color: 'var(--text-subtle)' }}>
              {profile.company && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Building size={14} /> {profile.company}
                </div>
              )}
              {profile.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} /> {profile.location}
                </div>
              )}
              {profile.blog && (
                <a
                  href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary)' }}
                >
                  <Link2 size={14} /> {profile.blog}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* User Search Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchUser.trim()) onSearch(searchUser.trim());
          }}
          style={{ display: 'flex', gap: '8px', flex: '0 1 300px' }}
        >
          <input
            type="text"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="Explore GitHub user..."
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          />
          <button type="submit" className="glow-btn" style={{ padding: '10px 16px', fontSize: '0.85rem' }}>
            Fetch
          </button>
        </form>
      </div>

      {/* Aggregate Metric Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        marginTop: '24px',
        paddingTop: '20px',
        borderTop: '1px solid var(--border-color)',
      }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: '600', textTransform: 'uppercase' }}>
            Public Repositories
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FolderGit2 size={20} /> {profile.public_repos}
          </div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: '600', textTransform: 'uppercase' }}>
            Total Stars Earned
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FBBF24', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Star size={20} /> {stats ? stats.totalStars : 0}
          </div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: '600', textTransform: 'uppercase' }}>
            Followers
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#34D399', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} /> {profile.followers}
          </div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: '600', textTransform: 'uppercase' }}>
            Following
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#60A5FA', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} /> {profile.following}
          </div>
        </div>
      </div>
    </div>
  );
}
