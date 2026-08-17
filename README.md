# GitPulse — GitHub REST API Analytics & Developer Dashboard 🚀

**GitPulse** is a high-performance, responsive web application built with **Next.js 14**, **Vanilla CSS**, and the official **GitHub REST API v3**. It provides live developer profile analytics, repository metric deep dives, code language composition analysis, and side-by-side repository comparisons.

Built for registration in the official [GitHub Developer Program](https://docs.github.com/en/integrations/concepts/github-developer-program).

---

## ✨ Features

- **⚡ Developer Analytics Dashboard**: View aggregate profile metrics (stars, public repos, followers, following) and dynamic color-coded programming language distribution bars.
- **🔍 Repository Explorer**: Real-time repo search, language filter, and sorting by *Recently Updated*, *Most Stars*, or *Most Forks*.
- **📊 Repository Deep Dive**: Inspect exact language byte percentages, view open issues, and parse live `README.md` documentation.
- **⚔️ Side-by-Side Repo Comparison Tool**: Compare metrics between any two GitHub repositories (e.g. `facebook/react` vs `vuejs/core`).
- **🔑 Personal Access Token Management**: Support for local PAT storage to bump API rate limits from 60 to **5,000 requests/hr**.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Vanilla CSS (Custom Design System, Dark Mode, Glassmorphism, Responsive UI)
- **Icons**: Lucide React
- **API**: Official GitHub REST API (`https://api.github.com`)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, pnpm, or yarn

### Installation

```bash
git clone https://github.com/tapeshchavle/Gitpulse.git
cd Gitpulse
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛡 GitHub Developer Program Registration Details

- **Application Name**: GitPulse
- **Homepage**: `https://gitpulse.tapesh.me`
- **Support Email**: `work@tapesh.me`
- **GitHub Account**: `@tapeshchavle`
