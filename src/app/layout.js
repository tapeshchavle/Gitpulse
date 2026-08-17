import './globals.css';

export const metadata = {
  title: 'GitPulse — GitHub REST API Developer & Repository Analytics Dashboard',
  description: 'A feature-rich developer analytics dashboard built with Next.js and GitHub REST API v3. Live repository metrics, language composition analysis, and side-by-side repo comparison.',
  keywords: ['GitHub REST API', 'Developer Dashboard', 'Repository Analytics', 'Next.js', 'GitHub Integration'],
  authors: [{ name: 'Tapesh Chavle', url: 'https://tapesh.me' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
