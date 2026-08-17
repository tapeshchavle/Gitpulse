/**
 * GitHub REST API Client Service for GitPulse
 */

const BASE_URL = 'https://api.github.com';

export function getStoredToken() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('gitpulse_pat') || '';
}

export function setStoredToken(token) {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem('gitpulse_pat', token);
  } else {
    localStorage.removeItem('gitpulse_pat');
  }
}

function getHeaders() {
  const token = getStoredToken();
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  return headers;
}

/**
 * Fetch GitHub User Profile
 */
export async function fetchUserProfile(username) {
  const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}`, {
    headers: getHeaders(),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch profile for ${username}`);
  }
  return res.json();
}

/**
 * Fetch User Repositories (up to 100)
 */
export async function fetchUserRepos(username, sort = 'updated', perPage = 100) {
  const res = await fetch(
    `${BASE_URL}/users/${encodeURIComponent(username)}/repos?sort=${sort}&per_page=${perPage}`,
    { headers: getHeaders() }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch repositories for ${username}`);
  }
  return res.json();
}

/**
 * Fetch Single Repository Details
 */
export async function fetchRepoDetails(owner, repo) {
  const res = await fetch(`${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`, {
    headers: getHeaders(),
  });
  if (!res.ok) {
    throw new Error(`Repository ${owner}/${repo} not found`);
  }
  return res.json();
}

/**
 * Fetch Language breakdown for a repository
 */
export async function fetchRepoLanguages(owner, repo) {
  const res = await fetch(`${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`, {
    headers: getHeaders(),
  });
  if (!res.ok) return {};
  return res.json();
}

/**
 * Fetch Repository README
 */
export async function fetchRepoReadme(owner, repo) {
  const res = await fetch(`${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`, {
    headers: {
      ...getHeaders(),
      'Accept': 'application/vnd.github.v3.raw',
    },
  });
  if (!res.ok) return null;
  return res.text();
}

/**
 * Fetch Repository Releases
 */
export async function fetchRepoReleases(owner, repo) {
  const res = await fetch(`${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases`, {
    headers: getHeaders(),
  });
  if (!res.ok) return [];
  return res.json();
}

/**
 * Fetch Repository Issues & PRs
 */
export async function fetchRepoIssues(owner, repo, state = 'open') {
  const res = await fetch(
    `${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues?state=${state}&per_page=30`,
    { headers: getHeaders() }
  );
  if (!res.ok) return [];
  return res.json();
}

/**
 * Global GitHub Repository Search
 */
export async function searchRepositories(query, sort = 'stars', order = 'desc') {
  const res = await fetch(
    `${BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&sort=${sort}&order=${order}&per_page=20`,
    { headers: getHeaders() }
  );
  if (!res.ok) {
    throw new Error('Failed to search repositories');
  }
  return res.json();
}

/**
 * Compute aggregated language metrics across multiple repositories
 */
export function computeAggregatedLanguages(repos) {
  const langCount = {};
  let totalStars = 0;
  let totalForks = 0;
  let totalOpenIssues = 0;

  repos.forEach((repo) => {
    totalStars += repo.stargazers_count || 0;
    totalForks += repo.forks_count || 0;
    totalOpenIssues += repo.open_issues_count || 0;

    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  });

  const totalLangRepos = Object.values(langCount).reduce((a, b) => a + b, 0);
  const langPercentages = Object.entries(langCount)
    .map(([lang, count]) => ({
      language: lang,
      count,
      percentage: Math.round((count / (totalLangRepos || 1)) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  return {
    langPercentages,
    totalStars,
    totalForks,
    totalOpenIssues,
    totalRepos: repos.length,
  };
}

/**
 * Standard Language Color Palette
 */
export const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Vue: '#41b883',
};
