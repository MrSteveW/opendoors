/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function GlobalNotFound() {
  return (
    <html>
      <body>
        <h1>404 - Page Not Found</h1>
        <a href="/">Return to Calendar</a>
      </body>
    </html>
  );
}
